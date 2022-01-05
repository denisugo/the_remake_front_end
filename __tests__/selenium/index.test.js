const { Builder, until } = require("selenium-webdriver");
const { selectUserError } = require("../../features/UserSlice/UserSlice");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

//TODO: test with user admin cookie,
describe("Selenium Main page", () => {
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";
  //let cookie;

  beforeAll(async () => {
    await driver.get("http://localhost:3000");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  describe("User flow", () => {
    it("Should open main page", async () => {
      //Page title
      const title = await driver.getTitle();
      expect(title).toBe("Main page");

      // Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);

      // Main page content
      const header = await findByDataTestSelenium("header", driver);
      expect(header.length).toBe(1);
    });

    it("Should redirect to login page, when no user cookies provided", async () => {
      const navigation = await findByDataTestSelenium("navigation", driver);
      expect(navigation.length).toBe(1);
      const link = (await findByComponentSelenium("a", navigation[0]))[2]; //  user link

      let actions = driver.actions({ async: true });
      await actions.move({ origin: link }).press().release().perform();

      await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/login`);
    });

    //   It will create a user cookie for futher updating its details
    it("Should log in", async () => {
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

      //cookie = await driver.manage().getCookies()[0];
      await driver.get("http://localhost:3000/");
    });

    it("Should redirect to user page, when user cookies provided", async () => {
      const navigation = await findByDataTestSelenium("navigation", driver);
      expect(navigation.length).toBe(1);
      const link = (await findByComponentSelenium("a", navigation[0]))[2]; //  user link

      let actions = driver.actions({ async: true });
      await actions.move({ origin: link }).press().release().perform();

      await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`http://localhost:3000/user`);
    });
  });

  describe("Filters", () => {
    beforeEach(async () => {
      await driver.get("http://localhost:3000");
    });

    it("Should filter products based on category selector", async () => {
      // Checks the number of products
      let products = await findByDataTestSelenium("product", driver);
      expect(products.length).toBe(6);

      // Should find 1 select component
      const selects = await findByComponentSelenium("select", driver);
      expect(selects.length).toBe(1);
      const select = selects[0];

      // Clicks on the select component
      select.click();

      // Should show 4 options
      const options = await findByComponentSelenium("option", driver);
      expect(options.length).toBe(4);
      const healthOption = options[1]; // health category

      // Clicks on the selected option
      await healthOption.click();

      // The number of products should be filtered now
      await driver.wait(async () => {
        products = await findByDataTestSelenium("product", driver);
        return products.length === 4;
      }, 3000);
      expect(products.length).toBe(4);
    });

    it("Should filter products based on name input", async () => {
      // Checks the number of products
      let products = await findByDataTestSelenium("product", driver);
      expect(products.length).toBe(6);

      // Should find 1 input component
      const inputs = await findByComponentSelenium("input", driver);
      expect(inputs.length).toBe(1);
      const input = inputs[0];

      // Enters a key to the input component
      await input.sendKeys("tab");

      // The number of products should be filtered now
      await driver.wait(async () => {
        products = await findByDataTestSelenium("product", driver);
        return products.length === 2;
      }, 3000);
      expect(products.length).toBe(2);
    });
  });
  describe("Redirection", () => {
    it("redirect to product page", async () => {
      await driver.get("http://localhost:3000");

      // Selects first product
      const products = await findByDataTestSelenium("product", driver);
      const product = products[0];
      product.click();

      // Waits until redirection
      await driver.wait(async () => {
        // Tests if a new url contains the product endpoint
        const testUrl = new RegExp("http://localhost:3000/product", "i");
        return testUrl.exec(await driver.getCurrentUrl());
      }, 3000);
      const url = await driver.getCurrentUrl();
      console.log(url);
    });
  });
});
