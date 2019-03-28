const assert = require("chai").assert;
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const Builder = webdriver.Builder;
require("geckodriver");

// TO RUN:
// mocha --reporter spec --no-timeouts guitests.js

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

  // TODO: Add a wait period to make sure that stats have been updated from API?
  it("should confirm that total statistics are present", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElement(By.id("Total-Commits"))
        .then((item) => {
          item.getAttribute("innerHTML").then((value) => {
            assert.isAbove(Number(value), 0);
          })
        })
        .catch(() => reject(new Error("Total-Commits is not greater than 0.")));

      browser
        .findElement(By.id("Total-Issues"))
        .then((item) => {
          item.getAttribute("innerHTML").then((value) => {
            assert.isAbove(Number(value), 0);
          })
        })
        .catch(() => reject(new Error("Total-Issues is not greater than 0.")));

      browser
        .findElement(By.id("Total-UT"))
        .then((item) => {
          item.getAttribute("innerHTML").then((value) => {
            assert.isAbove(Number(value), 0);
          })
        })
        .then(() => resolve())
        .catch(() => reject(new Error("Total-UT is not greater than 0.")));
    });
  });

  it("should confirm that tools used are present", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElements(By.className("logo-container"))
        .then((items) => {
            assert.isAbove(Number(items.length), 10);
        })
        .then(() => resolve())
        .catch(() => reject(new Error("Number of tools present is not greater than 10.")));
      });
    });

});

describe("Dogs Page", function() {

  it("should load the dogs page and confirm the presence of dog cards", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "dogs")
        .catch(() => reject(new Error("Failed to open dogs page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Dog cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.equal(Number(items.length), 20);
                  })
                .then(() => resolve())
                .catch((error) => reject(error));
            })
        });
    });
  });

  // TODO: Make this via button click
  it("should load the dog instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "dogs/10946756")
        .catch(() => reject(new Error("Failed to open dog instance page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Related instance cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.isAbove(Number(items.length), 0);
                  })
                .then(() => resolve())
                .catch((error) => reject(new Error("Number of related instances on page is not greater than 0.")));
            })
        });
    });
  });

});

describe("Activities Page", function() {

  it("should load the activities page and confirm the presence of activity cards", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "activities")
        .catch(() => reject(new Error("Failed to open activities page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Activity cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.equal(Number(items.length), 12);
                  })
                .then(() => resolve())
                .catch((error) => reject(error));
            })
        });
    });
  });

  // TODO: Make this via button click
  it("should load the activity instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "activities/eventbrite50601879584")
        .catch(() => reject(new Error("Failed to open activity instance page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Related instance cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.isAbove(Number(items.length), 0);
                  })
                .then(() => resolve())
                .catch((error) => reject(new Error("Number of related instances on page is not greater than 0.")));
            })
        });
    });
  });

});

describe("Breeds Page", function() {

  it("should load the breeds page and confirm the presence of breed cards", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "breeds")
        .catch(() => reject(new Error("Failed to open breeds page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Breed cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.equal(Number(items.length), 20);
                  })
                .then(() => resolve())
                .catch((error) => reject(error));
            })
        });
    });
  });

  // TODO: Make this via button click
  it("should load the breed instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "breeds/airedale%20terrier")
        .catch(() => reject(new Error("Failed to open breed instance page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Related instance cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.isAbove(Number(items.length), 0);
                  })
                .then(() => resolve())
                .catch((error) => reject(new Error("Number of related instances on page is not greater than 0.")));
            })
        });
    });
  });

});

describe("Shelters Page", function() {

  it("should load the shelters page and confirm the presence of shelter cards", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "shelters")
        .catch(() => reject(new Error("Failed to open shelters page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Shelter cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.equal(Number(items.length), 12);
                  })
                .then(() => resolve())
                .catch((error) => reject(error));
            })
        });
    });
  });

  // TODO: Make this via button click
  it("should load the shelter instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "shelters/TX1002")
        .catch(() => reject(new Error("Failed to open shelter instance page.")))
        .then(() => {
          browser
            .wait(until.elementLocated(By.className("card")), 20000)
            .catch(() => reject(new Error("Related instance cards never loaded.")))
            .then(() => {
              browser
                .findElements(By.className("card"))
                  .then((items) => {
                    assert.isAbove(Number(items.length), 0);
                  })
                .then(() => resolve())
                .catch((error) => reject(new Error("Number of related instances on page is not greater than 0.")));
            })
        });
    });
  });

  after(function() {
    browser.quit();
  });

});
