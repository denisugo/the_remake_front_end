const { Builder, until } = require("selenium-webdriver");
const { selectUserError } = require("../../features/UserSlice/UserSlice");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

//!   Before running this test, make sure that this record (in 'carts' table) is not already created!!!

//TODO: test with user admin cookie,
describe("Selenium Product page", () => {
  //* Credentials
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  //* Product name for futher selcetion
  const productName = "HomeOffice";

  beforeAll(async () => {
    await driver.get(
      "http://localhost:3000/product?id=10&name=HomeOffice&description=New+energy+pills+for+your+productive+life&price=250&preview=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1612475498158-014b71f98625%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D2028%26q%3D80"
    );
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  describe("User flow", () => {
    it("Should open product page", async () => {
      //*Page title
      const title = await driver.getTitle();
      expect(title).toBe(productName); //? generated by product name

      //* Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); //? Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });

    //   It will create a user cookie for futher updating its details
    it("Should log in", async () => {
      //* Store the original tab
      const originalWindow = await driver.getWindowHandle();
      //* Locate a button to log in and click it
      const youShouldLogin = await findByDataTestSelenium(
        "you-should-login",
        driver
      );

      youShouldLogin[0].click();

      //* Initiate login flow
      //* Wait for the new tab
      await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
        10000
      );

      //* Loop through until we find a new window handle
      //? Copied from official docs
      const windows = await driver.getAllWindowHandles();
      windows.forEach(async (handle) => {
        if (handle !== originalWindow) {
          await driver.switchTo().window(handle);
        }
      });

      //* Standard login process from login page test
      //* Locate inputs and insert credentials
      const usernameField = (
        await findByDataTestSelenium("username-input", driver)
      )[0];
      const passwordField = (
        await findByDataTestSelenium("password-input", driver)
      )[0];

      await usernameField.sendKeys(nonAdminUsername);
      await passwordField.sendKeys(nonAdminPassword);

      //* Locate login button and click on it
      const button = (await findByDataTestSelenium("login-button", driver))[0];
      button.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/user`);

      //* Return to the original tab
      await driver.switchTo().window(originalWindow);
      //* Reload the page
      await driver.navigate().refresh();

      //* Confirm that the page fetched the user
      const quantity = await findByDataTestSelenium("quantity-input", driver);
      expect(quantity.length).toBe(1);
    });

    it("Should add an item to a cart", async () => {
      //* Locate 'add-to-cart-button' and click it
      let addButton = (
        await findByDataTestSelenium("add-to-cart-button", driver)
      )[0];
      addButton.click();

      //? Copied from Selenium docs
      //* Wait for the alert to be displayed
      await driver.wait(until.alertIsPresent());
      //* Store the alert in a variable
      const alert = await driver.switchTo().alert();
      //* Press the OK button
      await alert.accept();

      //* Redirecting to cart page
      const navigation = await findByDataTestSelenium("navigation", driver);
      const link = (await findByComponentSelenium("a", navigation[0]))[1]; //?  cart link
      link.click();

      //* Check if the page address is correct
      await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);

      //? Check the number of cart items (new cart item data test id added)
      let cartItem = await findByDataTestSelenium("cart-item", driver);
      expect(cartItem.length).toBe(1);

      //* Locate cancel button and click it
      const cancelButton = (
        await findByDataTestSelenium("cancel-button", driver)
      )[0];
      cancelButton.click();

      //? Now the cart item should be deleted
      await driver.wait(async () => {
        cartItem = await findByDataTestSelenium("cart-item", driver);
        return cartItem.length === 0;
      }, 3000);
    });
  });
});
