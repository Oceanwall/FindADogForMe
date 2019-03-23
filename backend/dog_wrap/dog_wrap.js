const utilities = require("./utilities");
const API_URL = "https://api.findadogfor.me/api/";

/*
 * NOTE: If you're not using a param, then you can simply ignore it.
 * Example:
 *      getShelter(id);
 * However, if you want to use a param, but there are unneeded params in the
 * way, then use undefined to ignore those params.
 * Example:
 *      getBreedDogs('shiba inu', undefined, undefined, undefined, 2);
 *
 * NOTE: range parameter default value is 0.5
 */

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SHELTERS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

async function getShelter(id, page) {
    return utilities.getShelters(id, page);
}

 // Returns activities close to a certain shelter
async function getShelterActivities(id, range, page){
    if (!id)
     throw new Error("You must provide a shelter ID.");

    let shelter_info = await utilities.getShelters(id);
    lat = shelter_info.latitude;
    lng = shelter_info.longitude;
    return utilities.getActivities('','',lat, lng, range, page);
}

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

//Returns dogs within a specific shelter
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

async function getDog(id, page) {
    return utilities.getDogs(id, page);
}

// Retrieve the breed information for a particular dog
async function getDogBreed(id){
    let dog = await utilities.getDogs(id);
    return await utilities.getBreeds(dog.breed);
}

// Retrieve the shelter a dog is hosted at
async function getDogShelter(id){
    let dog = await utilities.getDogs(id);
    return await utilities.getShelters(dog.shelter_id);
}

async function getDogActivities(id, range = 0.5, page) {
    if (!id)
        throw new Error("You must provide a shelter ID.");

    let dog = await utilities.getDogs(id);

    let breed = await getDogBreed(id);
    let is_active = breed.is_active;

    let shelter = (await getShelter(dog.shelter_id));

    return await getBreedActivities(breed.name, shelter.latitude, shelter.longitude, range, page);
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
BREEDS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

async function getBreed(name, page) {
    return utilities.getBreeds(name, page);
}

//Returns a activities nearby for a particular breed
async function getBreedActivities(name, latitude, longitude, range, page) {
    var multipleArgs = false;
    var queryString = '';
    if (arguments.length > 1){
        queryString = utilities.build_query("activity", undefined, undefined, latitude, longitude, range, page);
        multipleArgs = true;
    }

    let breed_info = await utilities.getBreeds(name);
    let is_active = breed_info.objects[0].is_active;
    queryString = utilities.buildBreedActivityQuery(is_active, queryString, multipleArgs);
    return utilities.perform_api_call(`${API_URL}activity${queryString}`);
}

async function getBreedDogs(name, page) {
    let queryString = utilities.build_query("dog", undefined, name, undefined, undefined, undefined, page);
    return utilities.perform_api_call(`${API_URL}dog${queryString}`);
}

// Only returns 6 shelters to maximize search speed.
// Warning: Very slow for rarer species.
async function getBreedShelters(name, latitude, longitude, range) {
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

async function getActivity(id, page) {
    return utilities.getActivities(id, page);
}

//TODO: getActivityBreeds, getActivityShelters, getActivityDogs


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
// getBreedActivities('affenpinscher', 29.7856, -95.8242, 1).then((response) => {
//     console.log(response)
// });
//
// getBreedDogs('boxer').then((response) => {
//     console.log(response);
// })
getBreedShelters('bull terrier', 29.7856, -95.8242).then((response) => {
    console.log(response);
});
//
// getBreedShelters('labrador retriever').then((response) => {
//     //console.log(response);
// });
