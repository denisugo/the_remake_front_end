const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

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
    //Page title
    const title = await driver.getTitle();
    expect(title).toBe("Registration page");

    // Nav bar conten
    const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
    expect(svgs.length).toBe(3);
    const logo = await findByDataTestSelenium("logo", driver);
    expect(logo.length).toBe(1);

    // Main page content
    const buttons = await findByDataTestSelenium("button", driver);
    expect(buttons.length).toBe(1);
    const inputs = await findByDataTestSelenium("input", driver);
    expect(inputs.length).toBe(5);
    const hints = await findByDataTestSelenium("hint", driver);
    expect(hints.length).toBe(5);
  });

  it("Should redirect to user", async () => {
    const username = "jafar";
    const password = "secret01";
    const email = "jafar@gmail.com";
    const firstName = "Abdul";
    const lastName = "Jafar";

    const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
    const firstNameField = (await findByDataTestSelenium("input", driver))[0];
    const lastNameField = (await findByDataTestSelenium("input", driver))[1];
    const emailField = (await findByDataTestSelenium("input", driver))[2];
    const usernameField = (await findByDataTestSelenium("input", driver))[3];
    const passwordField = (await findByDataTestSelenium("input", driver))[4];

    await firstNameField.sendKeys(firstName);
    await lastNameField.sendKeys(lastName);
    await emailField.sendKeys(email);
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    const actions = driver.actions({ async: true });
    await actions.move({ origin: button }).press().release().perform();

    await driver.wait(until.urlIs("http://localhost:3000/user"), 3000);
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/user`);
  });

  it("Should not redirect to user", async () => {
    const username = "jb";
    const password = "secret";
    const email = "error.com"; //error in email format
    const firstName = "Abdul";
    const lastName = "Jafar";

    const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
    const firstNameField = (await findByDataTestSelenium("input", driver))[0];
    const lastNameField = (await findByDataTestSelenium("input", driver))[1];
    const emailField = (await findByDataTestSelenium("input", driver))[2];
    const usernameField = (await findByDataTestSelenium("input", driver))[3];
    const passwordField = (await findByDataTestSelenium("input", driver))[4];

    await firstNameField.sendKeys(firstName);
    await lastNameField.sendKeys(lastName);
    await emailField.sendKeys(email);
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    const actions = driver.actions({ async: true });
    await actions.move({ origin: button }).press().release().perform();

    await new Promise((resolved) => setTimeout(resolved, 3000));
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/registration`);
  });
});
