"use strict";

const expect = require("chai").expect;

const assert = require("chai").assert;

const wrapper = require('./wrapper.js').default; // TODO: Add additional tests for function failures, different parameters.


describe("FindADogForMe API Wrapper Functions", function () {
  // SHELTERS
  it("should get information about all shelters", async function () {
    let shelters = await wrapper.getShelter(undefined, 2);
    expect(shelters).to.be.an("object");
    expect(shelters).to.have.property("num_results");
    expect(shelters).to.have.property("objects");
    expect(shelters["page"]).to.equal(2);
    expect(shelters["objects"]).to.be.an("array");
    expect(shelters["objects"][0]).to.be.an("object");
    expect(shelters["objects"][0]).to.have.property("id");
    expect(shelters["objects"][0]).to.have.property("name");
    expect(shelters["objects"][0]).to.have.property("address");
    expect(shelters["objects"][0]).to.have.property("phone");
    expect(shelters["objects"][0]).to.have.property("state");
  });
  it("should get information about a shelter", async function () {
    let shelter = await wrapper.getShelter("TX1399");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("id");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  });
  it("should get activities hosted near a shelter", async function () {
    let activities = await wrapper.getShelterActivities("TX1399");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
    expect(activities["objects"][0]).to.have.property("designation");
    expect(activities["objects"][0]).to.have.property("url");
    expect(activities["objects"][0]).to.have.property("weather");
    expect(activities["objects"][0]).to.have.property("description");
  });
  it("should get breeds hosted by a shelter", async function () {
    let breeds = await wrapper.getShelterBreeds("TX1399");
    expect(breeds).to.be.an("array");
    expect(breeds[0]).to.have.property("name");
    expect(breeds[0]).to.have.property("temperament");
    expect(breeds[0]).to.have.property("is_active");
    expect(breeds[0]).to.have.property("group");
  });
  it("should get dogs hosted by a shelter", async function () {
    let dogs = await wrapper.getShelterDogs("TX1399");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"]).to.be.an("array");
    expect(dogs["objects"][0]).to.be.an("object");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
  }); // DOGS

  it("should get information about all dogs", async function () {
    let dogs = await wrapper.getDog(undefined, 3);
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["page"]).to.equal(3);
    expect(dogs["objects"]).to.be.an("array");
    expect(dogs["objects"][0]).to.be.an("object");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
  });
  it("should get information about a dog", async function () {
    let dog = await wrapper.getDog("43022980");
    expect(dog).to.be.an("object");
    expect(dog).to.have.property("breed");
    expect(dog).to.have.property("age");
    expect(dog).to.have.property("shelter_id");
    expect(dog).to.have.property("image_1");
  });
  it("should get activities suitable for a dog, hosted near its shelter", async function () {
    let activities = await wrapper.getDogActivities("43022980");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
    expect(activities["objects"][0]).to.have.property("designation");
    expect(activities["objects"][0]).to.have.property("url");
    expect(activities["objects"][0]).to.have.property("weather");
    expect(activities["objects"][0]).to.have.property("description");
  });
  it("should get breed of the dog", async function () {
    let breed = await wrapper.getDogBreed("43022980");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed.objects[0]).to.have.property("name");
    expect(breed.objects[0]).to.have.property("temperament");
    expect(breed.objects[0]).to.have.property("is_active");
    expect(breed.objects[0]).to.have.property("group");
  });
  it("should get shelter hosting the dog", async function () {
    let shelter = await wrapper.getDogShelter("43022980");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  }); // BREEDS

  it("should get information about all breeds", async function () {
    let breeds = await wrapper.getBreed();
    expect(breeds).to.be.an("object");
    expect(breeds).to.have.property("num_results");
    expect(breeds).to.have.property("objects");
    expect(breeds["objects"]).to.be.an("array");
    expect(breeds["objects"][0]).to.be.an("object");
    expect(breeds["objects"][0]).to.have.property("name");
    expect(breeds["objects"][0]).to.have.property("temperament");
    expect(breeds["objects"][0]).to.have.property("is_active");
    expect(breeds["objects"][0]).to.have.property("group");
  });
  it("should get information about a breed", async function () {
    let breed = await wrapper.getBreed("bull terrier");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed["objects"]).to.be.an("array");
    expect(breed["objects"][0]).to.be.an("object");
    expect(breed["objects"][0]).to.have.property("name");
    expect(breed["objects"][0]).to.have.property("temperament");
    expect(breed["objects"][0]).to.have.property("is_active");
    expect(breed["objects"][0]).to.have.property("group");
    expect(breed["objects"][0]["name"]).to.equal("bull terrier");
  });
  it("should get activities suitable for a breed", async function () {
    let activities = await wrapper.getBreedActivities("bull terrier");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
  });
  it("should get dogs of that breed", async function () {
    let dogs = await wrapper.getBreedDogs("bull terrier");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
    expect(dogs["objects"][0]).to.have.property("image_1");
  }); // TODO: Too slow for mocha_test, but it does work!
  // it("should get shelters hosting the breed", async function() {
  //   let shelters = await wrapper.getBreedShelters(
  //     "bull terrier",
  //     29.7856,
  //     -95.8242
  //   );
  //
  //   expect(shelters).to.be.an("array");
  //   expect(shelters[0]).to.be.an("object");
  //   expect(shelters[0]).to.have.property("name");
  //   expect(shelters[0]).to.have.property("address");
  //   expect(shelters[0]).to.have.property("phone");
  //   expect(shelters[0]).to.have.property("state");
  // });
  // ACTIVITIES

  it("should get information about all activities", async function () {
    let activities = await wrapper.getActivity(undefined, 2);
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["page"]).to.equal(2);
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("designation");
    expect(activities["objects"][0]).to.have.property("url");
    expect(activities["objects"][0]).to.have.property("weather");
    expect(activities["objects"][0]).to.have.property("description");
  });
  it("should get information about an activity", async function () {
    let activity = await wrapper.getActivity("257930562");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get breeds that an activity is suitable for", async function () {
    let breeds = await wrapper.getActivityBreeds("257930562");
    expect(breeds).to.be.an("object");
    expect(breeds).to.have.property("num_results");
    expect(breeds).to.have.property("objects");
    expect(breeds["objects"]).to.be.an("array");
    expect(breeds["objects"][0]).to.be.an("object");
    expect(breeds["objects"][0]).to.have.property("name");
    expect(breeds["objects"][0]).to.have.property("temperament");
    expect(breeds["objects"][0]).to.have.property("is_active");
    expect(breeds["objects"][0]).to.have.property("group");
  });
  it("should get dogs in a shelter located near an activity that the activity is suitable for", async function () {
    let dogs = await wrapper.getActivityDogs("257930562", 0.25);
    expect(dogs).to.be.an("array");
    expect(dogs[0]).to.have.property("breed");
    expect(dogs[0]).to.have.property("age");
    expect(dogs[0]).to.have.property("shelter_id");
    expect(dogs[0]).to.have.property("image_1");
  });
  it("should get shelters located near an activity", async function () {
    let shelters = await wrapper.getActivityShelters("257930562");
    expect(shelters).to.be.an("object");
    expect(shelters).to.have.property("num_results");
    expect(shelters).to.have.property("objects");
    expect(shelters["objects"]).to.be.an("array");
    expect(shelters["objects"][0]).to.be.an("object");
    expect(shelters["objects"][0]).to.have.property("name");
    expect(shelters["objects"][0]).to.have.property("address");
    expect(shelters["objects"][0]).to.have.property("phone");
    expect(shelters["objects"][0]).to.have.property("state");
  });
});
