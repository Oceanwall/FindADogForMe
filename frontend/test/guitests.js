const assert = require("chai").assert;
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const Builder = webdriver.Builder;
require("geckodriver");

// TO RUN:
// mocha --reporter spec --no-timeouts guitests.js
// MUST BE USED IN test DIRECTORY

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

  it("should confirm the presence of vector clickables below the carousel", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElement(By.id("vector-clickables-container"))
        .catch(() => reject(new Error("No item with ID vector-clickables-container was found.")));

      browser
        .findElements(By.className("vector_section"))
          .then((items) => {
            assert.equal(Number(items.length), 4);
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

  it("should confirm that total statistics are present", function() {
    return new Promise(function(resolve, reject) {
      browser
        .wait(until.elementLocated(By.id("Total-Commits")), 20000)
        .catch(() => reject(new Error("GitLab Statistics never loaded.")))
        .then((elem) => {
          browser
            .wait(until.elementTextMatches(elem, /^[1-9][0-9]*$/), 20000)
            .then(() => {
              browser
              .findElement(By.id("Total-Commits"))
              .then((item) => {
                item.getAttribute("innerHTML").then((value) => {
                  assert.isAbove(Number(value), 0);
                })
              })
              .catch(() => reject(new Error("Total-Commits is not greater than 0.")));
            })
            .catch((e) => reject(e))
          });

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

  it("should confirm the continued presence of the navigation bar and desired attributes", function() {
    return new Promise(function(resolve, reject) {
      browser
        .findElement(By.id("general-navbar"))
        .catch(() => reject(new Error("No item with ID general-navbar was found.")));

      browser
        .findElement(By.xpath('//a[@href="/activities"]'))
        .catch(() => reject(new Error("No item with the href attribute 'activities' was found.")));

      browser
        .findElement(By.xpath('//a[@href="/shelters"]'))
        .catch(() => reject(new Error("No item with the href attribute 'shelters' was found.")));

      browser
        .findElement(By.xpath('//a[@href="/dogs"]'))
        .catch(() => reject(new Error("No item with the href attribute 'dogs' was found.")));

      browser
        .findElement(By.xpath('//a[@href="/breeds"]'))
        .catch(() => reject(new Error("No item with the href attribute 'breeds' was found.")));

      browser
        .findElement(By.xpath('//a[@href="/about"]'))
        .catch(() => reject(new Error("No item with the href attribute 'about' was found.")));

      browser
        .findElement(By.id("searchbar"))
        .catch(() => reject(new Error("No item with the ID 'searchbar' was found.")))
        .then(() => resolve());
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

  it("should confirm presence of Google Maps API Integration on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .wait(until.elementLocated(By.id("google-map")), 20000)
        .catch(() => reject(new Error("Google Maps Integration never loaded in.")))
        .then(() => {
          browser
            .findElement(By.id("google-map"))
            .catch(() => reject(new Error("No Google Maps integration was found.")))
            .then(() => resolve());
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


  it("should load the activity instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "activities/eventbrite46549055478")
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

  it("should confirm presence of Google Maps API Integration on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .wait(until.elementLocated(By.id("google-map")), 20000)
        .catch(() => reject(new Error("Google Maps Integration never loaded in.")))
        .then(() => {
          browser
            .findElement(By.id("google-map"))
            .catch(() => reject(new Error("No Google Maps integration was found.")))
            .then(() => resolve());
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


  it("should load the breed instance page and confirm existence of related instances on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .get(serverUri + "breeds/australian%20terrier")
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

  it("should confirm presence of Google Maps API Integration on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .wait(until.elementLocated(By.id("google-map")), 20000)
        .catch(() => reject(new Error("Google Maps Integration never loaded in.")))
        .then(() => {
          browser
            .findElement(By.id("google-map"))
            .catch(() => reject(new Error("No Google Maps integration was found.")))
            .then(() => resolve());
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

  it("should confirm presence of Google Maps API Integration on page", function() {
    return new Promise(function(resolve, reject) {
      browser
        .wait(until.elementLocated(By.id("google-map")), 20000)
        .catch(() => reject(new Error("Google Maps Integration never loaded in.")))
        .then(() => {
          browser
            .findElement(By.id("google-map"))
            .catch(() => reject(new Error("No Google Maps integration was found.")))
            .then(() => resolve());
          });
    });
  });

  after(function() {
    browser.quit();
  });

});
