const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

//!   Before running this test, make sure that this user is not already created!!!
//!   This test doesn't have teardown
describe("Selenium registration page", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:3000/registration");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("Should open registration page", async () => {
    //*Page title
    const title = await driver.getTitle();
    expect(title).toBe("Registration page");

    //* Nav bar conten
    const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
    expect(svgs.length).toBe(3);
    const logo = await findByDataTestSelenium("logo", driver);
    expect(logo.length).toBe(1);
  });

  it("Should redirect to user", async () => {
    //* User details
    const username = "jafar";
    const password = "secret01";
    const email = "jafar@gmail.com";
    const firstName = "Abdul";
    const lastName = "Jafar";

    ///* Locate all fields and send them user details
    const firstNameField = (
      await findByDataTestSelenium("first-name", driver)
    )[0];
    await firstNameField.sendKeys(firstName);
    const lastNameField = (
      await findByDataTestSelenium("last-name", driver)
    )[0];
    await lastNameField.sendKeys(lastName);
    const emailField = (await findByDataTestSelenium("email", driver))[0];
    await emailField.sendKeys(email);
    const usernameField = (await findByDataTestSelenium("username", driver))[0];
    await usernameField.sendKeys(username);
    const passwordField = (await findByDataTestSelenium("password", driver))[0];
    await passwordField.sendKeys(password);

    //* Locate register me button and click it
    const button = (await findByDataTestSelenium("register", driver))[0];
    button.click();

    //* Wait for redirection
    await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/user`);
  });

  it("Should not redirect to user", async () => {
    //* User details (wrong)
    const username = "jarvis";
    const password = "secret";
    const email = "error.com"; //!error in email format
    const firstName = "Abdul";
    const lastName = "Jafar";

    ///* Locate all fields and send them user details
    const firstNameField = (
      await findByDataTestSelenium("first-name", driver)
    )[0];
    await firstNameField.sendKeys(firstName);
    const lastNameField = (
      await findByDataTestSelenium("last-name", driver)
    )[0];
    await lastNameField.sendKeys(lastName);
    const emailField = (await findByDataTestSelenium("email", driver))[0];
    await emailField.sendKeys(email);
    const usernameField = (await findByDataTestSelenium("username", driver))[0];
    await usernameField.sendKeys(username);
    const passwordField = (await findByDataTestSelenium("password", driver))[0];
    await passwordField.sendKeys(password);

    //* Locate register me button and click it
    const button = (await findByDataTestSelenium("register", driver))[0];
    button.click();

    //* Wait for redirection
    //? Should not redirect, therefore we are using setTimeout to wait certain amount of time without
    //? being interrupted by an error
    await new Promise((resolved) => setTimeout(resolved, 3000));
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/registration`);
  });
});
