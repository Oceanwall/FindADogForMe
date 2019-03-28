const assert = require("assert");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const Builder = webdriver.Builder;
require("geckodriver");

const serverUri = "http://localhost:3000/";
const appTitle = "Find a Dog for Me";

const browser = new Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  // .withCapabilities({ browserName: "firefox" })
  .build();

function getWebsiteTitle() {
  return new Promise((resolve, reject) => {
    browser.getTitle().then(function(title) {
      resolve(title);
    });
  });
}

describe("Home Page", function() {

  it("should load the home page and confirm the presence of the carousel", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri)
        .then(getWebsiteTitle)
        .then((title) => {
          assert.strictEqual(title, appTitle);
        })
        .then(() => {
          browser.findElement(By.id("carousel-container"))
          .catch(() => reject(new Error("No item with ID carousel-container was found.")));
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  });

  it("should confirm the presence of the navigation bar, and navigate to the About page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElement(By.id("general-navbar"))
        .catch(() => reject(new Error("No item with ID general-navbar was found.")));

      browser
        .findElement(By.xpath('//a[@href="/about"]'))
        .catch(() => reject(new Error("No item with that href attribute was found.")))
        .then((element) => {
          element.click();
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  });

});

describe("About Page", function() {

  it("should confirm the presence of the description / motivation and members sections", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElement(By.id("desc-motivation"))
        .catch(() => reject(new Error("No item with ID desc-motivation was found.")));

      browser
        .findElement(By.id("members"))
        .catch(() => reject(new Error("No item with ID members was found.")))
        .then(() => resolve());
    });
  });


  after(function() {
    browser.quit();
  });

});
