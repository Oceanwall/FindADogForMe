"use strict";

const expect = require("chai").expect;

const assert = require("chai").assert;

const wrapper = require("./wrapper.js").default;

describe("FindADogForMe API Wrapper Functions", function() {
  // SHELTERS
  it("should get information about all shelters", async function() {
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
  it("should get information about all shelters on page 3", async function() {
    let shelters = await wrapper.getShelter(undefined, 3);
    expect(shelters).to.be.an("object");
    expect(shelters).to.have.property("num_results");
    expect(shelters).to.have.property("objects");
    expect(shelters["page"]).to.equal(3);
    expect(shelters["objects"]).to.be.an("array");
    expect(shelters["objects"][0]).to.be.an("object");
    expect(shelters["objects"][0]).to.have.property("id");
    expect(shelters["objects"][0]).to.have.property("name");
    expect(shelters["objects"][0]).to.have.property("address");
    expect(shelters["objects"][0]).to.have.property("phone");
    expect(shelters["objects"][0]).to.have.property("state");
  });
  it("should get information about a shelter", async function() {
    let shelter = await wrapper.getShelter("TX1399");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("id");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  });
  it("should get information about another shelter", async function() {
    let shelter = await wrapper.getShelter("TX1002");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("id");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  });
  it("should get activities hosted near a shelter", async function() {
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX538");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX54");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"].length).to.equal(0);
    expect(activities["objects"][0]).to.not.be.an("object");
  });
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX552");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX555");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX562");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX571");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"].length).to.equal(0);
    expect(activities["objects"][0]).to.not.be.an("object");
  });
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX585");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX613");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX62");
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
  it("should get activities hosted near a shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX621");
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
  it("should get activities hosted near another shelter", async function() {
    let activities = await wrapper.getShelterActivities("TX1002");
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
  it("should get breeds hosted by a shelter", async function() {
    let breeds = await wrapper.getShelterBreeds("TX1399");
    expect(breeds).to.be.an("array");
    expect(breeds[0]).to.have.property("name");
    expect(breeds[0]).to.have.property("temperament");
    expect(breeds[0]).to.have.property("is_active");
    expect(breeds[0]).to.have.property("group");
  });
  it("should get breeds hosted by another shelter", async function() {
    let breeds = await wrapper.getShelterBreeds("TX1002");
    expect(breeds).to.be.an("array");
    expect(breeds[0]).to.have.property("name");
    expect(breeds[0]).to.have.property("temperament");
    expect(breeds[0]).to.have.property("is_active");
    expect(breeds[0]).to.have.property("group");
  });
  it("should get dogs hosted by a shelter", async function() {
    let dogs = await wrapper.getShelterDogs("TX1399");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"]).to.be.an("array");
    expect(dogs["objects"][0]).to.be.an("object");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
  });
  it("should get dogs hosted by another shelter", async function() {
    let dogs = await wrapper.getShelterDogs("TX1002");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"]).to.be.an("array");
    expect(dogs["objects"][0]).to.be.an("object");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
  }); // DOGS
  it("should get information about all dogs", async function() {
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
  it("should get information about all dogs on page 4", async function() {
    let dogs = await wrapper.getDog(undefined, 4);
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["page"]).to.equal(4);
    expect(dogs["objects"]).to.be.an("array");
    expect(dogs["objects"][0]).to.be.an("object");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
  });
  it("should get information about a dog", async function() {
    let dog = await wrapper.getDog("43022980");
    expect(dog).to.be.an("object");
    expect(dog).to.have.property("breed");
    expect(dog).to.have.property("age");
    expect(dog).to.have.property("shelter_id");
    expect(dog).to.have.property("image_1");
  });
  it("should get information about another dog", async function() {
    let dog = await wrapper.getDog("11798982");
    expect(dog).to.be.an("object");
    expect(dog).to.have.property("breed");
    expect(dog).to.have.property("age");
    expect(dog).to.have.property("shelter_id");
    expect(dog).to.have.property("image_1");
  });
  it("should get activities suitable for a dog, hosted near its shelter", async function() {
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
  it("should get activities suitable for another dog, hosted near its shelter", async function() {
    let activities = await wrapper.getDogActivities("11798982");
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
  it("should get breed of the dog", async function() {
    let breed = await wrapper.getDogBreed("43022980");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed.objects[0]).to.have.property("name");
    expect(breed.objects[0]).to.have.property("temperament");
    expect(breed.objects[0]).to.have.property("is_active");
    expect(breed.objects[0]).to.have.property("group");
  });
  it("should get breed of another dog", async function() {
    let breed = await wrapper.getDogBreed("11798982");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed.objects[0]).to.have.property("name");
    expect(breed.objects[0]).to.have.property("temperament");
    expect(breed.objects[0]).to.have.property("is_active");
    expect(breed.objects[0]).to.have.property("group");
  });
  it("should get shelter hosting the dog", async function() {
    let shelter = await wrapper.getDogShelter("43022980");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  });
  it("should get shelter hosting another dog", async function() {
    let shelter = await wrapper.getDogShelter("11798982");
    expect(shelter).to.be.an("object");
    expect(shelter).to.have.property("name");
    expect(shelter).to.have.property("address");
    expect(shelter).to.have.property("phone");
    expect(shelter).to.have.property("state");
  }); // BREEDS
  it("should get information about all breeds", async function() {
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
  it("should get information about a breed", async function() {
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
  it("should get information about another breed", async function() {
    let breed = await wrapper.getBreed("border collie");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed["objects"]).to.be.an("array");
    expect(breed["objects"][0]).to.be.an("object");
    expect(breed["objects"][0]).to.have.property("name");
    expect(breed["objects"][0]).to.have.property("temperament");
    expect(breed["objects"][0]).to.have.property("is_active");
    expect(breed["objects"][0]).to.have.property("group");
    expect(breed["objects"][0]["name"]).to.equal("border collie");
  });
  it("should get information about one other breed", async function() {
    let breed = await wrapper.getBreed("great dane");
    expect(breed).to.be.an("object");
    expect(breed).to.have.property("num_results");
    expect(breed).to.have.property("objects");
    expect(breed["objects"]).to.be.an("array");
    expect(breed["objects"][0]).to.be.an("object");
    expect(breed["objects"][0]).to.have.property("name");
    expect(breed["objects"][0]).to.have.property("temperament");
    expect(breed["objects"][0]).to.have.property("is_active");
    expect(breed["objects"][0]).to.have.property("group");
    expect(breed["objects"][0]["name"]).to.equal("great dane");
  });
  it("should get activities suitable for a breed", async function() {
    let activities = await wrapper.getBreedActivities("bull terrier");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
  });
  it("should get activities suitable for another breed", async function() {
    let activities = await wrapper.getBreedActivities("border collie");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
  });
  it("should get activities suitable for one other breed", async function() {
    let activities = await wrapper.getBreedActivities("great dane");
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("type");
    expect(activities["objects"][0]).to.have.property("id");
  });
  it("should get dogs of that breed", async function() {
    let dogs = await wrapper.getBreedDogs("bull terrier");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
    expect(dogs["objects"][0]).to.have.property("image_1");
  });
  it("should get dogs of the other breed", async function() {
    let dogs = await wrapper.getBreedDogs("border collie");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
    expect(dogs["objects"][0]).to.have.property("image_1");
  });
  it("should get dogs of another breed", async function() {
    let dogs = await wrapper.getBreedDogs("great dane");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
    expect(dogs["objects"][0]).to.have.property("image_1");
  });
  it("should get shelters hosting the breed", async function() {
    let shelters = await wrapper.getBreedShelters("akita");
    expect(shelters).to.be.an("object");
    expect(shelters.objects[0]).to.have.property("name");
    expect(shelters.objects[0]).to.have.property("address");
    expect(shelters.objects[0]).to.have.property("phone");
    expect(shelters.objects[0]).to.have.property("state");
  });
  it("should get shelters hosting the other breed", async function() {
    let shelters = await wrapper.getBreedShelters("border collie");
    expect(shelters).to.be.an("object");
    expect(shelters.objects[0]).to.have.property("name");
    expect(shelters.objects[0]).to.have.property("address");
    expect(shelters.objects[0]).to.have.property("phone");
    expect(shelters.objects[0]).to.have.property("state");
  });
  it("should get shelters hosting another breed", async function() {
    let shelters = await wrapper.getBreedShelters("great dane");
    expect(shelters).to.be.an("object");
    expect(shelters.objects[0]).to.have.property("name");
    expect(shelters.objects[0]).to.have.property("address");
    expect(shelters.objects[0]).to.have.property("phone");
    expect(shelters.objects[0]).to.have.property("state");
  }); // ACTIVITIES

  it("should get information about all activities", async function() {
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
  it("should get information about all activities on page 3", async function() {
    let activities = await wrapper.getActivity(undefined, 3);
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["page"]).to.equal(3);
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("designation");
    expect(activities["objects"][0]).to.have.property("url");
    expect(activities["objects"][0]).to.have.property("weather");
    expect(activities["objects"][0]).to.have.property("description");
  });
  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity(
      "parkC9056F71-7162-4208-8AE9-2D0AEFA594FD"
    );
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get information about another activity", async function() {
    let activity = await wrapper.getActivity("eventbrite46549055478");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get breeds that an activity is suitable for", async function() {
    let breeds = await wrapper.getActivityBreeds("meetup258861199");
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
  it("should get breeds that another activity is suitable for", async function() {
    let breeds = await wrapper.getActivityBreeds("eventbrite56498965928");
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
  it("should get dogs in a shelter located near an activity that the activity is suitable for", async function() {
    let dogs = await wrapper.getActivityDogs("meetup258861199", 0.25);
    expect(dogs).to.be.an("array");
    expect(dogs[0]).to.have.property("breed");
    expect(dogs[0]).to.have.property("age");
    expect(dogs[0]).to.have.property("shelter_id");
    expect(dogs[0]).to.have.property("image_1");
  });
  it("should get dogs in a shelter located near an activity that the other activity is suitable for", async function() {
    let dogs = await wrapper.getActivityDogs("eventbrite46549055478", 1);
    expect(dogs).to.be.an("array");
    expect(dogs[0]).to.have.property("breed");
    expect(dogs[0]).to.have.property("age");
    expect(dogs[0]).to.have.property("shelter_id");
    expect(dogs[0]).to.have.property("image_1");
  });
  it("should get shelters located near an activity", async function() {
    let shelters = await wrapper.getActivityShelters("meetup258861199");
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
  it("should get shelters located near another activity", async function() {
    let shelters = await wrapper.getActivityShelters("eventbrite46549055478");
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
  it("should correctly filter and sort activity queries", async function() {
    let activities = await wrapper.getActivityQuery(
      true,
      true,
      "eventbrite",
      null,
      "alphabetical",
      1,
      true
    );
    expect(activities).to.be.an("object");
    expect(activities).to.have.property("num_results");
    expect(activities).to.have.property("objects");
    expect(activities["page"]).to.equal(1);
    expect(activities["objects"]).to.be.an("array");
    expect(activities["objects"][0]).to.be.an("object");
    expect(activities["objects"][0]).to.have.property("designation");
    expect(activities["objects"][0]).to.have.property("url");
    expect(activities["objects"][0]).to.have.property("weather");
    expect(activities["objects"][0]).to.have.property("description");
    for (let currActivity of activities["objects"]) {
      expect(currActivity["type"]).to.equal("eventbrite");
    }
  });
  it("should correctly filter and sort breed queries", async function() {
    let breeds = await wrapper.getBreedQuery(
      "Mixed",
      10,
      24,
      null,
      "alphabetical"
    );
    expect(breeds).to.be.an("object");
    expect(breeds).to.have.property("num_results");
    expect(breeds).to.have.property("objects");
    expect(breeds["objects"]).to.be.an("array");
    expect(breeds["objects"][0]).to.be.an("object");
    expect(breeds["objects"][0]).to.have.property("name");
    expect(breeds["objects"][0]).to.have.property("temperament");
    expect(breeds["objects"][0]).to.have.property("is_active");
    expect(breeds["objects"][0]).to.have.property("group");
    for (let currBreed of breeds["objects"]) {
      expect(currBreed["group"]).to.equal("Mixed");
    }
  });
  it("should correctly filter and sort dog queries", async function() {
    let dogs = await wrapper.getDogQuery(
      "border collie",
      "Adult",
      "L",
      null,
      "alphabetical",
      1,
      true
    );
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("objects");
    expect(dogs["objects"][0]).to.have.property("breed");
    expect(dogs["objects"][0]).to.have.property("age");
    expect(dogs["objects"][0]).to.have.property("shelter_id");
    expect(dogs["objects"][0]).to.have.property("image_1");
    for (let currDog of dogs["objects"]) {
      expect(currDog["breed"]).to.equal("border collie");
    }
  });
  it("should correctly filter and sort shelter queries", async function() {
    let shelters = await wrapper.getShelterQuery(
      "Austin",
      null,
      null,
      null,
      "zipcode",
      2
    );
    expect(shelters).to.be.an("object");
    expect(shelters).to.have.property("num_results");
    expect(shelters).to.have.property("objects");
    expect(shelters["page"]).to.equal(2);
    expect(shelters["objects"]).to.be.an("array");
    expect(shelters["objects"][0]).to.be.an("object");
    expect(shelters["objects"][0]).to.have.property("name");
    expect(shelters["objects"][0]).to.have.property("address");
    expect(shelters["objects"][0]).to.have.property("phone");
    expect(shelters["objects"][0]).to.have.property("state");
    for (let currShelter of shelters["objects"]) {
      expect(currShelter["city"]).to.equal("Austin");
    }
  });
  it("should correctly search for border collies", async function() {
    let dogs = await wrapper.getWebsiteQuery("border collie");
    expect(dogs).to.be.an("object");
    expect(dogs).to.have.property("num_results");
    expect(dogs).to.have.property("breeds");
    expect(dogs).to.have.property("dogs");
    expect(dogs).to.have.property("activities");
    expect(dogs["breeds"][0]).to.have.property("name");
    expect(dogs["breeds"][0]).to.have.property("temperament");
    expect(dogs["breeds"][0]).to.have.property("is_active");
    expect(dogs["breeds"][0]).to.have.property("group");
    expect(dogs["breeds"][0]["name"]).to.equal("border collie");
    expect(dogs["dogs"][0]).to.have.property("breed");
    expect(dogs["dogs"][0]).to.have.property("age");
    expect(dogs["dogs"][0]).to.have.property("shelter_id");
    expect(dogs["dogs"][0]).to.have.property("image_1");
    expect(dogs["dogs"][0]["breed"]).to.equal("border collie");
  });

  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity("meetup260677349");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity("meetup261006344");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity(
      "parkDE70B987-01A4-4BA5-9662-030BE3329AB3"
    );
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });

  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity("eventbrite60479993288");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity("eventbrite60481223969");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });
  it("should get information about an activity", async function() {
    let activity = await wrapper.getActivity("meetup260790812");
    expect(activity).to.be.an("object");
    expect(activity).to.have.property("designation");
    expect(activity).to.have.property("url");
    expect(activity).to.have.property("weather");
    expect(activity).to.have.property("description");
  });

  it("should only show border collie related dogs inside the dogs array", async function() {
    let dogs = await wrapper.getWebsiteQuery("border collie");
    for (let currDog of dogs["dogs"]) {
      expect(currDog["breed"]).to.be.oneOf([
        "border collie",
        "australian cattle dog",
        "great dane",
        "labrador retriever"
      ]);
    }
  });
});
