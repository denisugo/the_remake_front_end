//! Ensure that admin user has some items in their cart
//! Non admin user has to have an empty cart

//! It is strongly recomended to add only one item to the cart befor running this test

const { Builder, until, By } = require("selenium-webdriver");
const { selectUserError } = require("../../features/UserSlice/UserSlice");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium Cart page", () => {
  const noErrorCardNumber = "4242424242424242";
  const errorCardNumber = "4000000000000002";
  const invalidCardNumber = "1111111111111111";

  const validUntil = "0222";
  const cvc = "222";

  const nonAdminUsername = "davy000";
  const nonAdminPassword = "treasure";
  const adminUsername = "jb";
  const adminPassword = "secret";

  const login = async (username, password) => {
    //? Redirect if not login page
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl !== "http://localhost:3000/login")
      await driver.get("http://localhost:3000/checkout");

    //? Locate username and password fields
    const usernameField = (await findByDataTestSelenium("input", driver))[0];
    const passwordField = (await findByDataTestSelenium("input", driver))[1];

    //? Set up values of its fields
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    //? Submit the form
    const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
    button.click();

    //? Wait until it redirects to the user page
    await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
    const url = await driver.getCurrentUrl();

    //? Navigate to the cart page
    const navigation = (await findByDataTestSelenium("navigation", driver))[0];
    const link = (await findByComponentSelenium("a", navigation))[1]; // cart link
    link.click();
    await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);

    const cartPageButtons = await findByDataTestSelenium("button", driver);

    //? Navigate to the checkout page
    const checkoutButton = cartPageButtons[cartPageButtons.length - 1 - 1];
    checkoutButton.click();
    await driver.wait(until.urlIs("http://localhost:3000/checkout"), 3000);
  };

  beforeAll(async () => {
    await driver.get("http://localhost:3000/checkout");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  describe("User flow", () => {
    describe("Redirection when no user is registered", () => {
      it("Should be redirected to login page when no valid cookie provided", async () => {
        //Page title
        const title = await driver.getTitle();
        expect(title).toBe("Login page");
      });
    });

    describe("Tests with users", () => {
      it("Should open checkout page", async () => {
        //? Log a usser in
        await login(nonAdminUsername, nonAdminPassword);

        //* Page title
        const title = await driver.getTitle();
        expect(title).toBe("Checkout");

        //* Nav bar conten
        const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
        expect(svgs.length).toBe(3);
        const logo = await findByDataTestSelenium("logo", driver);
        expect(logo.length).toBe(1);
      });

      it("Should show a message that this user does not have any items in their cart", async () => {
        const message = (await findByDataTestSelenium("message", driver))[0];
        expect(await message.getText()).toBe("Your cart is probably empty");

        const buttons = await findByDataTestSelenium("button", driver);
        expect(buttons.length).toBe(0);
      });

      it("Should show error message when payment decclined", async () => {
        //? Log a usser in
        await login(adminUsername, adminPassword);

        //? Recieve client secret
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Local taxes could be applied";
        }, 5000);

        //? Switch to iframe
        let iframe;
        await driver.wait(async () => {
          iframe = (await findByComponentSelenium("iframe", driver))[0];
          return typeof iframe !== "undefined";
        }, 3000);

        await driver.switchTo().frame(iframe);

        //? Setting up a card field

        //? Unable to search by attribute,
        //? The order is following:
        //? 1 - card number
        //? 2 - valid until
        //? 3 - cvc

        //? Sometimes it might not send keys successfully, I dont know why.
        await driver.wait(async () => {
          const cardInputFields = await findByComponentSelenium(
            "input",
            driver
          );
          try {
            await cardInputFields[1].sendKeys(errorCardNumber);
            await cardInputFields[2].sendKeys(validUntil);
            await cardInputFields[3].sendKeys(cvc);
          } catch (error) {
            return false;
          }
          return true;
        }, 5000);

        //? Switch back
        await driver.switchTo().defaultContent();
        //? Submitting
        (await findByDataTestSelenium("button", driver))[0].click();

        //? Check the message to be 'Processing your payment...'
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Processing your payment...";
        }, 3000);

        //? Check the message to be 'Accepted!'
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (
            (await message.getText()) ===
            "An error occured. You payment cannot be finished"
          );
        }, 10000);
      }, 20000);

      it("Should do nothing when card number is not valid", async () => {
        //? Log a usser in
        await login(adminUsername, adminPassword);

        //? Recieve client secret
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Local taxes could be applied";
        }, 5000);

        //? Switch to iframe
        let iframe;
        await driver.wait(async () => {
          iframe = (await findByComponentSelenium("iframe", driver))[0];
          return typeof iframe !== "undefined";
        }, 3000);

        await driver.switchTo().frame(iframe);

        //? Setting up a card field

        //? Unable to search by attribute,
        //? The order is following:
        //? 1 - card number
        //? 2 - valid until
        //? 3 - cvc

        //? Sometimes it might not send keys successfully, I dont know why.
        await driver.wait(async () => {
          const cardInputFields = await findByComponentSelenium(
            "input",
            driver
          );
          try {
            await cardInputFields[1].sendKeys(invalidCardNumber);
            await cardInputFields[2].sendKeys(validUntil);
            await cardInputFields[3].sendKeys(cvc);
          } catch (error) {
            return false;
          }
          return true;
        }, 5000);

        //? Switch back
        await driver.switchTo().defaultContent();
        //? Submitting
        (await findByDataTestSelenium("button", driver))[0].click();

        //? Nothing should change during 3s
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const message = (await findByDataTestSelenium("message", driver))[0];
        expect(await message.getText()).toBe("Local taxes could be applied");
      }, 20000);

      it("Should show success message when payment finished", async () => {
        //? Log a usser in
        await login(adminUsername, adminPassword);
        //? Recieve client secret
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Local taxes could be applied";
        }, 5000);

        //? Switch to iframe
        let iframe;
        await driver.wait(async () => {
          iframe = (await findByComponentSelenium("iframe", driver))[0];
          return typeof iframe !== "undefined";
        }, 3000);

        await driver.switchTo().frame(iframe);

        //? Setting up a card field

        //? Unable to search by attribute,
        //? The order is following:
        //? 1 - card number
        //? 2 - valid until
        //? 3 - cvc

        //? Sometimes it might not send keys successfully, I dont know why.
        await driver.wait(async () => {
          const cardInputFields = await findByComponentSelenium(
            "input",
            driver
          );
          try {
            await cardInputFields[1].sendKeys(noErrorCardNumber);
            await cardInputFields[2].sendKeys(validUntil);
            await cardInputFields[3].sendKeys(cvc);
          } catch (error) {
            return false;
          }
          return true;
        }, 5000);

        //? Switch back
        await driver.switchTo().defaultContent();
        //? Submitting
        (await findByDataTestSelenium("button", driver))[0].click();

        //? Check the message to be 'Processing your payment...'
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Processing your payment...";
        }, 3000);

        //? Check the message to be 'Accepted!'
        await driver.wait(async () => {
          const message = (await findByDataTestSelenium("message", driver))[0];
          return (await message.getText()) === "Accepted!";
        }, 10000);

        //TODO: go to the card page and check the number of card items

        //? Navigate to the cart page
        const navigation = (
          await findByDataTestSelenium("navigation", driver)
        )[0];
        const link = (await findByComponentSelenium("a", navigation))[1]; // cart link
        link.click();
        await driver.wait(until.urlIs("http://localhost:3000/cart"), 3000);

        const cartItems = await findByDataTestSelenium("cart-item", driver);
        expect(cartItems.length).toBe(0);

        //? Navigate to the orders page
        const cartPageButtons = await findByDataTestSelenium("button", driver);
        const checkoutButton = cartPageButtons[cartPageButtons.length - 1];
        checkoutButton.click();
        await driver.wait(until.urlIs("http://localhost:3000/orders"), 3000);

        //? Here should be at least one product that originally was in the cart

        // await driver.wait(async () => {
        //     const products = await findByDataTestSelenium("product", driver);
        //   return products.length !== 0;
        // }, 3000);
        const products = await findByDataTestSelenium("product", driver);
        expect(products.length).not.toBe(0);
      }, 20000);
    });
  });
});
