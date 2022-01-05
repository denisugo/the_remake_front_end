const { Builder, until } = require("selenium-webdriver");
const { selectUserError } = require("../../features/UserSlice/UserSlice");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium Cart page", () => {
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  beforeAll(async () => {
    await driver.get("http://localhost:3000/cart");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  describe("User flow", () => {
    it("Should be redirected to login page when no valid cookie provided", async () => {
      //Page title
      const title = await driver.getTitle();
      expect(title).toBe("Login page");
    });

    //   It will create a user for futher updating its details
    it("Should redirect to user", async () => {
      const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
      const usernameField = (await findByDataTestSelenium("input", driver))[0];
      const passwordField = (await findByDataTestSelenium("input", driver))[1];

      await usernameField.sendKeys(nonAdminUsername);
      await passwordField.sendKeys(nonAdminPassword);

      const actions = driver.actions({ async: true });
      await actions.move({ origin: button }).press().release().perform();

      await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/user`);

      // Navigate to cart page
      const navigation = (
        await findByDataTestSelenium("navigation", driver)
      )[0];
      const link = (await findByComponentSelenium("a", navigation))[1]; // cart link
      link.click();
      await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);
    });

    it("Should open cart page", async () => {
      //Page title
      const title = await driver.getTitle();
      expect(title).toBe("Cart");

      // Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });

    it("Should redirect to checkout", async () => {
      const buttons = await findByDataTestSelenium("button", driver);
      buttons[buttons.length - 2].click(); // -2 is for checkout link button

      await driver.wait(until.urlIs("http://localhost:3000/checkout"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/checkout`);

      // Navigate back to cart page
      const navigation = (
        await findByDataTestSelenium("navigation", driver)
      )[0];
      const link = (await findByComponentSelenium("a", navigation))[1]; // cart link
      link.click();
      await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);
    });

    it("Should redirect to orders page", async () => {
      const buttons = await findByDataTestSelenium("button", driver);
      buttons[buttons.length - 1].click(); // -1 is for orders link button

      await driver.wait(until.urlIs("http://localhost:3000/orders"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/orders`);
    });
  });

  // Deletion of items is tested within product page test suit
});
