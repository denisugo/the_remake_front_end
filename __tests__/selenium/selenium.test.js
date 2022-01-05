const { Builder, By } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

describe("Selenium login page", () => {
  it("Should open login page", async () => {
    await driver.get("http://localhost:3000/login");
    let elements = await driver.findElement(By.css("div"));
    expect(elements).not.toBeUndefined();
    driver.quit();
  });
});
