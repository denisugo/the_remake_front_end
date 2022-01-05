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

  beforeAll(async () => {
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
      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Login page");
    });

    //* It will create a user for futher updating its details
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

      //* Navigate to cart page
      const navigation = (
        await findByDataTestSelenium("navigation", driver)
      )[0];
      const link = (await findByComponentSelenium("a", navigation))[1]; // cart link
      link.click();
      await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);

      const buttons = await findByDataTestSelenium("button", driver);
      const orderButton = buttons[buttons.length - 1];
      orderButton.click();
      await driver.wait(until.urlIs("http://localhost:3000/orders"), 3000);
    });

    it("Should open Orders page", async () => {
      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Orders");

      //* Nav bar content
      const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });
  });
});
