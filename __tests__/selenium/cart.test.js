const { Builder, until } = require("selenium-webdriver");
const { selectUserError } = require("../../features/UserSlice/UserSlice");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

//! Adding and deleting items from cart were tested in product page selenium test suit

describe("Selenium Cart page", () => {
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  beforeEach(async () => {
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
      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);

      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Login page");
    });

    it("Should redirect to user", async () => {
      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);

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

      //* Navigate back to cart page
      //* Locate correct link and click it
      const navigation = (
        await findByDataTestSelenium("navigation", driver)
      )[0];
      const link = (await findByComponentSelenium("a", navigation))[1]; //? cart link
      link.click();
      await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);
    });

    it("Should open cart page", async () => {
      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Cart");

      //* Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); //? Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });

    it("Should redirect to checkout", async () => {
      //* Locate chekout button and click it
      const checkoutButtons = (
        await findByDataTestSelenium("checkout-button", driver)
      )[0];
      checkoutButtons.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/checkout"), 3000);
    });

    it("Should redirect to orders page", async () => {
      //* Locate orders button and click it
      const ordersButtons = (
        await findByDataTestSelenium("view-orders-button", driver)
      )[0];
      ordersButtons.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/orders"), 3000);
    });
  });
});
