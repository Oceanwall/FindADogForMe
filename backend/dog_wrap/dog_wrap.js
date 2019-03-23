const utilities = require("./utilities");
const API_URL = "https://api.findadogfor.me/api/";

/*
 * NOTE: If you're not using a param, then you can simply ignore it.
 * Example:
 *      getShelter(id);
 * However, if you want to use a param, but there are unneeded params in the
 * way, then use undefined to ignore those params.
 * Example:
 *      getShelterActivities('TX1399", undefined, 2);
 *
 * NOTE: range parameter default value is 0.5
 */

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SHELTERS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Get all shelters, or get a specific shelter.
async function getShelter(id, page) {
    return utilities.getShelters(id, page);
}

// Get activities near a specific shelter.
async function getShelterActivities(id, range, page){
    if (!id)
     throw new Error("You must provide a shelter ID.");

    let shelter_info = await utilities.getShelters(id);
    lat = shelter_info.latitude;
    lng = shelter_info.longitude;
    return utilities.getActivities('','',lat, lng, range, page);
}

// Get breeds hosted by a specific shelter.
async function getShelterBreeds(id){
    if (!id)
     throw new Error("You must provide a shelter ID.");

    queryObject = {
        name:"shelter_id",
        op:"eq",
        val:id
    }
    var queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`

    let dog_list = (await utilities.perform_api_call(`${API_URL}dog${queryString}`)).objects;
    let dog_set = new Set();
    for (let dog of dog_list) {
        if (!dog_set.has(dog["breed"]))
            dog_set.add(dog["breed"]);
    }

    let breed_promises = [];
    for (let breed_name of dog_set)
        breed_promises.push(utilities.getBreeds(breed_name));

    breed_promises = await Promise.all(breed_promises);
    let breeds = [];
    for (let breed of breed_promises) {
        breeds.push(breed.objects[0]);
    }
    return breeds;
}

// Get dogs hosted by a specific shelter.
async function getShelterDogs(id, page){
    if (!id)
        throw new Error("You must provide a shelter ID.");

    let queryObject = {
        name:"shelter_id",
        op:"eq",
        val:id
    }
    var queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`
    if(page){
        queryString += `&page=${page}`
    }

    return utilities.perform_api_call(`${API_URL}dog${queryString}`);
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DOGS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Get all dogs, or get a specific dog.
async function getDog(id, page) {
    return utilities.getDogs(id, page);
}

// Get a dog's breed.
async function getDogBreed(id){
    if (!id)
        throw new Error("You must provide a dog ID.");
    let dog = await utilities.getDogs(id);
    return await utilities.getBreeds(dog.breed);
}

// Get a dog's shelter.
async function getDogShelter(id){
    if (!id)
        throw new Error("You must provide a dog ID.");
    let dog = await utilities.getDogs(id);
    return await utilities.getShelters(dog.shelter_id);
}

// Get activities that would be suitable for a dog, near that dog's shelter.
async function getDogActivities(id, range = 0.5, page) {
    if (!id)
        throw new Error("You must provide a dog ID.");

    let dog = await utilities.getDogs(id);

    let breed = await getDogBreed(id);
    let is_active = breed.is_active;

    let shelter = (await getShelter(dog.shelter_id));

    return await utilities.getBreedActivitiesWithLocation(breed.name, shelter.latitude, shelter.longitude, range, page);
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
BREEDS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Get all breeds, or get a breed.
async function getBreed(name, page) {
    return utilities.getBreeds(name, page);
}

// Get activities suitable for a breed.
async function getBreedActivities(name, page) {
    if (!name)
        throw new Error("You must provide a breed name.");
    return utilities.getBreedActivitiesWithLocation(name, undefined, undefined, undefined, page);
}

// Get dogs of a breed.
async function getBreedDogs(name, page) {
    if (!name)
        throw new Error("You must provide a breed name.");
    let queryString = utilities.build_query("dog", undefined, name, undefined, undefined, undefined, page);
    return utilities.perform_api_call(`${API_URL}dog${queryString}`);
}

// Get (up to) 6 shelters that host some breed.
// Warning: Very slow for rarer species.
async function getBreedShelters(name, latitude, longitude, range) {
    if (!name)
        throw new Error("You must provide a breed name.");
    let nearby_shelters = await utilities.getAllNearbyShelters(latitude, longitude, range);

    let shelters_of_breed = [];
    for (let shelter of nearby_shelters) {
        let dogs = (await getShelterDogs(shelter.id)).objects;
        for (let dog of dogs) {
            if (dog.breed == name) {
                console.log("ding");
                shelters_of_breed.push(shelter);
                break;
            }
        }
        if (shelters_of_breed.length >= 6) {
            return shelters_of_breed;
        }
    }

    return shelters_of_breed;
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ACTIVITIES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Get all activities, or get an activity.
async function getActivity(id, page) {
    return utilities.getActivities(id, page);
}

// Get all breeds suitable for an activity.
async function getActivityBreeds(id) {
    if (!id)
        throw new Error("You must provide an activity ID.");
    let activity = await getActivity(id);
    let queryString = utilities.buildBreedActivityQuery(activity.is_active, "", false);
    return utilities.perform_api_call(`${API_URL}breed${queryString}`);
}

// Get shelters located near an activity.
async function getActivityShelters(id, range, page) {
    if (!id)
        throw new Error("You must provide an activity ID.");
    let activity = await getActivity(id);
    return utilities.getShelters(undefined, activity.latitude, activity.longitude, range);
}

// Get (up to) 12 dogs suitable for an activity located in shelters near the activity.
async function getActivityDogs(id, range) {
    if (!id)
        throw new Error("You must provide an activity ID.");
    let breeds = (await getActivityBreeds(id)).objects;
    let suitable_breeds = new Set();
    for (let breed of breeds)
        suitable_breeds.add(breed.name);
    let shelters = (await getActivityShelters(id, range)).objects;

    // console.log(shelters);

    let suitable_dogs = [];
    for (let shelter of shelters) {
        let dogs = (await getShelterDogs(shelter.id)).objects;
        for (let dog of dogs) {;
            if (suitable_breeds.has(dog.breed)) {
                console.log("ding");
                suitable_dogs.push(dog);
                if (suitable_dogs.length >= 12) {
                    return suitable_dogs;
                }
            }
        }
    }

    return suitable_dogs;
}



// getShelters().then((response) => {
//     console.log(response)
// })
//
// utilities.getActivities("257930562").then((response) => {
//     //console.log(response)
// })
//
// getBreeds().then((response) => {
//     //console.log(response);
// });
//
// getBreeds('alaskan husky', undefined, undefined, undefined, 2).then((response) => {
//     console.log(response);
// });
//
// getShelterBreeds("TX1399").then((response) => {
//     console.log(response);
// });
//
// getShelterActivities("TX1399", 0.5).then((response) => {
//     console.log(response);
// });
//
// getShelterDogs("TX1399");
//
// utilities.getDogs('',"TX1399").then((response) => {
//     //console.log(response);
// })
//
// getDogBreed('43022980').then((response) =>{
//     console.log(response);
// });
// getDogActivities("43022980").then((response) => {
//     console.log(response);
// });
//
// getDogShelter('43022980').then((response) => {
//     console.log(response);
// });
//
// getBreedActivities('affenpinscher').then((response) => {
//     console.log(response)
// });
//
// getBreedDogs('boxer').then((response) => {
//     console.log(response);
// })
// getBreedShelters('bull terrier', 29.7856, -95.8242).then((response) => {
//     console.log(response);
// });
//
// getBreedShelters('labrador retriever').then((response) => {
//     //console.log(response);
// });

// getActivityBreeds("257930562").then((response) => {
//     console.log(response);
// });
// getActivityShelters("257930562").then((response) => {
//     console.log(response);
// });
getActivityDogs("257930562", 0.25).then((response) => {
    console.log(response);
});
