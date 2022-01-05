const { Builder, until } = require("selenium-webdriver");
const { findByDataTestSelenium } = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium login page", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:3000/login");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("Should open login page", async () => {
    //Page title
    const title = await driver.getTitle();
    expect(title).toBe("Login page");

    // Nav bar conten
    const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
    expect(svgs.length).toBe(3);
    const logo = await findByDataTestSelenium("logo", driver);
    expect(logo.length).toBe(1);

    // Main page content
    const buttons = await findByDataTestSelenium("button", driver);
    expect(buttons.length).toBe(2);
    const inputs = await findByDataTestSelenium("input", driver);
    expect(inputs.length).toBe(2);
  });

  it("Should redirect to registration page", async () => {
    const button = (await findByDataTestSelenium("button", driver))[1]; // Don't have an account?
    const actions = driver.actions({ async: true });
    await actions.move({ origin: button }).press().release().perform();
    await driver.wait(until.urlIs("http://localhost:3000/registration"), 3000);
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/registration`);
  });

  it("Should redirect to user", async () => {
    const username = "jb";
    const password = "secret";

    const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
    const usernameField = (await findByDataTestSelenium("input", driver))[0];
    const passwordField = (await findByDataTestSelenium("input", driver))[1];

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
    const password = "notsecret"; //  Wrong password

    const button = (await findByDataTestSelenium("button", driver))[0]; //  Log me in
    const usernameField = (await findByDataTestSelenium("input", driver))[0];
    const passwordField = (await findByDataTestSelenium("input", driver))[1];

    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    console.log(await usernameField.getAttribute("value"));

    const actions = driver.actions({ async: true });
    await actions.move({ origin: button }).press().release().perform();

    await driver.wait(async () => {
      const val = await usernameField.getAttribute("value");
      return val === "";
    }, 3000);
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/login`);
  });
});
