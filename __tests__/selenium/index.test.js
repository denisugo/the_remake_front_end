const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium Main page", () => {
  //* Credentials
  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  beforeAll(async () => {
    await driver.get("http://localhost:3000");
    await driver.manage().addCookie({ name: "CookieConsent", value: "true" });
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  describe("User flow", () => {
    it("Should open main page", async () => {
      //* Page title
      const title = await driver.getTitle();
      expect(title).toBe("Main page");

      //* Nav bar conten
      const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
      expect(svgs.length).toBe(3);
      const logo = await findByDataTestSelenium("logo", driver);
      expect(logo.length).toBe(1);
    });

    //* Nav bar tests
    it("Should redirect to login page, when no user cookies provided", async () => {
      //* Locate a link to login page and click on it
      //? Link is a Next.js, so I unable to set its data-testid up.
      //? Therefore, selecting with array indeces is used here.
      const navigation = await findByDataTestSelenium("navigation", driver);
      expect(navigation.length).toBe(1);
      const link = (await findByComponentSelenium("a", navigation[0]))[2]; //  user link

      link.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);
    });

    //? It will create a user cookie for futher updating its details
    it("Should log in (non admin user)", async () => {
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
    });

    it("Should NOT render 'Add new product' button", async () => {
      //? Going back to the main page
      await driver.get("http://localhost:3000/");

      //* Locate 'Add new product' button
      const addNewProductButton = await findByDataTestSelenium(
        "add-button",
        driver
      );
      expect(addNewProductButton.length).toBe(0);
    });

    it("Should redirect to user page, when user cookies provided", async () => {
      //* Locate a link to login page and click on it
      //? Link is a Next.js, so I unable to set its data-testid up.
      //? Therefore, selecting with array indeces is used here.
      const navigation = await findByDataTestSelenium("navigation", driver);
      expect(navigation.length).toBe(1);
      const link = (await findByComponentSelenium("a", navigation[0]))[2]; //  user link

      link.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
    });
  });

  describe("Filters", () => {
    beforeEach(async () => {
      await driver.get("http://localhost:3000");
    });

    it("Should filter products based on category selector", async () => {
      //* Checks the number of products
      //? 6 is the default value
      let products = await findByDataTestSelenium("product", driver);
      expect(products.length).toBe(6);

      //* Should find 1 select component
      const selects = await findByComponentSelenium("select", driver);
      expect(selects.length).toBe(1);
      const select = selects[0];

      //* Clicks on the select component
      select.click();

      //* Should find 'health' option
      const healthOption = (
        await findByDataTestSelenium("health-option", driver)
      )[0];

      //* Clicks on the selected option
      healthOption.click();

      //* The number of products should be filtered now
      await driver.wait(async () => {
        products = await findByDataTestSelenium("product", driver);
        return products.length === 4;
      }, 3000);
    });

    it("Should filter products based on name input", async () => {
      //* Checks the number of products
      //? 6 is the default value
      let products = await findByDataTestSelenium("product", driver);
      expect(products.length).toBe(6);

      //* Should find 1 input component
      const inputs = await findByComponentSelenium("input", driver);
      expect(inputs.length).toBe(1);
      const input = inputs[0];

      //* Insert a key to the input component
      await input.sendKeys("tab");

      //* The number of products should be filtered now
      await driver.wait(async () => {
        products = await findByDataTestSelenium("product", driver);
        return products.length === 2;
      }, 3000);
    });
  });
  describe("Redirection", () => {
    it("redirect to product page", async () => {
      //? This will reset all filters
      await driver.get("http://localhost:3000");

      //* Selects first product
      const products = await findByDataTestSelenium("product", driver);
      const product = products[0];
      product.click();

      //* Waits until redirection
      await driver.wait(async () => {
        //* Tests if a new url contains the product endpoint
        const testUrl = new RegExp("http://localhost:3000/product", "i");
        return testUrl.exec(await driver.getCurrentUrl());
      }, 3000);
    });
  });

  describe(" Admin user flow", () => {
    beforeAll(async () => {
      await driver.get("http://localhost:3000");
      await driver.manage().deleteAllCookies();
      //* Should hide cookie consent message
      await driver.manage().addCookie({ name: "CookieConsent", value: "true" });
    });

    it("Should log admin user in", async () => {
      //* Locate a link to login page and click on it
      //? Link is a Next.js, so I unable to set its data-testid up.
      //? Therefore, selecting with array indeces is used here.
      const navigation = await findByDataTestSelenium("navigation", driver);
      expect(navigation.length).toBe(1);
      const link = (await findByComponentSelenium("a", navigation[0]))[2]; //  user link

      link.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);

      //* Locate inputs and insert credentials
      const usernameField = (
        await findByDataTestSelenium("username-input", driver)
      )[0];
      const passwordField = (
        await findByDataTestSelenium("password-input", driver)
      )[0];

      await usernameField.sendKeys(adminUsername);
      await passwordField.sendKeys(adminPassword);

      //* Locate login button and click on it
      const button = (await findByDataTestSelenium("login-button", driver))[0];
      button.click();

      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);

      //? Going back to the main page
      await driver.get("http://localhost:3000/");
    });

    it("Should open 'Add new product' form and fill it", async () => {
      const body = {
        name: "New name product",
        description: "New description",
        price: 12,
        category: "other",
        prewiev:
          "https://images.unsplash.com/photo-1635272024672-aaf4810e2f47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      };
      //* Wait for redirection
      await driver.wait(until.urlIs("http://localhost:3000/"), 3000);

      //* Locate 'Add new product' button and click it
      const addNewProductButton = (
        await findByDataTestSelenium("add-button", driver)
      )[0];

      addNewProductButton.click();

      //? the form should appear
      let form; //= await findByComponentSelenium("form", driver);
      //expect(form.length).toBe(1);
      await driver.wait(async () => {
        form = await findByComponentSelenium("form", driver);
        return form.length === 1;
      }, 3000);

      //* Locate all inputs and fill them
      const nameInput = (await findByDataTestSelenium("name-input", driver))[0];
      await nameInput.sendKeys(body.name);
      const descInput = (
        await findByDataTestSelenium("description-input", driver)
      )[0];
      await descInput.sendKeys(body.description);
      const categoryInput = (
        await findByDataTestSelenium("category-input", driver)
      )[0];
      await categoryInput.sendKeys(body.category);
      const priceInput = (
        await findByDataTestSelenium("price-input", driver)
      )[0];
      await priceInput.sendKeys(body.price);
      const previewInput = (
        await findByDataTestSelenium("preview-input", driver)
      )[0];
      await previewInput.sendKeys(body.prewiev);

      //* Locate submit button and click it
      const submitButton = (
        await findByDataTestSelenium("submit-button", driver)
      )[0];
      submitButton.click();

      // //? the form should disappear
      await driver.wait(async () => {
        form = await findByComponentSelenium("form", driver);
        return form.length === 0;
      }, 3000);
    });

    it("Should locate the recently added product and delete it", async () => {
      let products = await findByDataTestSelenium("product", driver);
      const originalProductLength = products.length;
      //? This will select the most recent product and click on it
      const recentlyAddedProduct = products[originalProductLength - 1];
      recentlyAddedProduct.click();

      //? It should wait until delete button is rendered
      //? Without wait and try catch it may not work correct all the time,
      //? not sure why (originally I checked if there is a correct url address)
      await driver.wait(async () => {
        //? Now it should locate 'Delete' butoon and click it
        try {
          const deleteButton = (
            await findByDataTestSelenium("delete-button", driver)
          )[0];
          deleteButton.click();
          return true;
        } catch (error) {}
      }, 3000);

      //? Copied from Selenium docs
      //* Wait for the alert to be displayed
      await driver.wait(until.alertIsPresent());
      //* Store the alert in a variable
      const alert = await driver.switchTo().alert();
      //* Press the OK button
      await alert.accept();

      await driver.get("http://localhost:3000");

      products = await findByDataTestSelenium("product", driver);
      //? Now the product should be deleted and product count should be substarcted by 1
      expect(products.length).toBe(originalProductLength - 1);
    });
  });
});
