const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium login page", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:3000/login");
  });

  afterEach(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("Should open login page", async () => {
    //*Page title
    const title = await driver.getTitle();
    expect(title).toBe("Login page");

    //* Nav bar content
    const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
    expect(svgs.length).toBe(3);
    const logo = await findByDataTestSelenium("logo", driver);
    expect(logo.length).toBe(1);
  });

  it("Should redirect to registration page", async () => {
    //* Locate the button and click on it
    const button = (
      await findByDataTestSelenium("to-register-button", driver)
    )[0];
    button.click();

    //* Wait for redirection
    await driver.wait(until.urlIs("http://localhost:3000/registration"), 3000);
  });

  it("Should redirect to user", async () => {
    //* Credentials
    const username = "jb";
    const password = "secret";

    //* Locate inputs and insert credentials
    const usernameField = (
      await findByDataTestSelenium("username-input", driver)
    )[0];
    const passwordField = (
      await findByDataTestSelenium("password-input", driver)
    )[0];

    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    //* Locate login button and click on it
    const button = (await findByDataTestSelenium("login-button", driver))[0];
    button.click();

    //* Wait for redirection
    await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
  });
  it("Should not redirect to user", async () => {
    //* Credentials
    const username = "jb";
    const password = "nonono"; //! Incorrect password

    //* Locate inputs and insert credentials
    const usernameField = (
      await findByDataTestSelenium("username-input", driver)
    )[0];
    const passwordField = (
      await findByDataTestSelenium("password-input", driver)
    )[0];

    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    //* Locate login button and click on it
    const button = (await findByDataTestSelenium("login-button", driver))[0];
    button.click();

    //* Erase values from inputs
    await driver.wait(async () => {
      const val = await usernameField.getAttribute("value");
      return val === "";
    }, 3000);

    //* Should stay on the same page
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/login`);
  });
});
