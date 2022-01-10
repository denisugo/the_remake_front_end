const { Builder, until } = require("selenium-webdriver");
const {
  findByDataTestSelenium,
  findByComponentSelenium,
} = require("../../utils/testUtils");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium User page", () => {
  //* User details
  const username = "jafar";
  const password = "secret01";
  const email = "jafar@gmail.com";
  const firstName = "Abdul";
  const lastName = "Jafar";
  const newFirstName = "Boris";

  beforeAll(async () => {
    await driver.get("http://localhost:3000/registration");
  });

  afterAll(async () => {
    await driver.manage().deleteAllCookies();
  });
  afterAll(async () => {
    await driver.quit();
  });

  //!   This test was copied from registration page test suit.
  //!   It will create a user for futher updating its details
  //!   Before running this test, make sure that this user is not already created!!!
  //!   This test doesn't have teardown
  it("Should redirect to user", async () => {
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

  it("Should open user page", async () => {
    //*Page title
    const title = await driver.getTitle();
    expect(title).toBe("User page");

    //* Nav bar conten
    const svgs = await findByComponentSelenium("svg", driver); // Navigation icons
    expect(svgs.length).toBe(3);
    const logo = await findByDataTestSelenium("logo", driver);
    expect(logo.length).toBe(1);
  });

  it("Should update first name", async () => {
    //* Locate first name and check its value
    let firstNameValue = (
      await findByDataTestSelenium("first-name", driver)
    )[0];
    firstNameValue = await firstNameValue.getText();
    expect(firstNameValue).toBe(firstName);

    //* Locate first name edit button and click it
    const button = (
      await findByDataTestSelenium("first-name-button", driver)
    )[0];
    button.click();

    //* Wait until edit box appears
    let editBox;
    await driver.wait(async () => {
      editBox = await findByDataTestSelenium("edit-box", driver);
      return editBox.length === 1;
    }, 3000);
    expect(editBox.length).toBe(1);
    editBox = editBox[0];

    //* Locate input for changing the first name
    const inputs = await findByDataTestSelenium("input", driver);
    expect(inputs.length).toBe(1);
    const newFirstNameInput = inputs[0];

    //* Send new first name to the input
    await newFirstNameInput.sendKeys(newFirstName);

    //* Locate accept button and click it
    const acceptButton = (await findByDataTestSelenium("accept", driver))[0];
    acceptButton.click();

    //* Wait until editbox disappears
    await driver.wait(async () => {
      editBox = await findByDataTestSelenium("edit-box", driver);
      return editBox[0] ? false : true;
    }, 3000);

    //* Check if the first name is updated
    firstNameValue = (await findByDataTestSelenium("first-name", driver))[0];
    firstNameValue = await firstNameValue.getText();
    expect(firstNameValue).toBe(newFirstName);
  });

  it("Should fetch a user if cookie is provided", async () => {
    //* Attempt to open user page
    await driver.get("http://localhost:3000/user");

    //* Wait for redirection
    //? Should not redirect, therefore we are using setTimeout to wait certain amount of time without
    //? being interrupted by an error
    await new Promise((resolved) => setTimeout(resolved, 3000));

    //* Get current url
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/user`);
  });

  it("Should logout a user", async () => {
    //* Locate logout button and click it
    const button = (await findByDataTestSelenium("logout", driver))[0];
    button.click();

    //* Wait for redirection
    await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);
    //* Get current url
    const url = await driver.getCurrentUrl();
    expect(url).toBe(`http://localhost:3000/login`);

    //* Check cookies
    const cookie = await driver.manage().getCookies();
    expect(cookie).toStrictEqual([]);
  });

  it("Should redirect to login page when no user provided", async () => {
    //* Attempt to open user page
    await driver.get("http://localhost:3000/user");

    //* Wait for redirection to login page
    await driver.wait(until.urlIs("http://localhost:3000/login"), 3000);
  });
});
