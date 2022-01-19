const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium Orders page", () => {
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  beforeEach(async () => {
    await driver.get("http://localhost:3000/orders");
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

    //* It will create cookies
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
    });

    it("Should open Orders page", async () => {
      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Orders");

      //* Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); //? Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });
  });
});
