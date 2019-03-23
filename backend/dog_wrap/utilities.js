const request = require('request');
const API_URL = "https://api.findadogfor.me/api/";

function perform_api_call(url) {
    return new Promise ((resolve, reject) => {
        request({
            "url": url,
            "method": "GET",
        }, (error, response, body) => {
            if(error) {
                reject(new Error('Unable to connect to API'));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

// NOTE: range defaults to 0.5
function build_query(model, id, name, latitude, longitude, range = 0.5, page) {
    var queryString = '';
    // Add case for all params except page
    if (id && !name && !latitude && !longitude && !page){
        queryString+= '/' + id;
    }
    else if (name && !latitude && !longitude){
        if(model === "shelter" || model === "breed"){
            queryObject = {
                name: "name",
                op: "eq",
                val: name,
            }
        } else if (model === "activity"){
            queryObject = {
                name: "name",
                op: "eq",
                val: name,
            }
        } else if (model == "dog") {
            queryObject = {
                name: "breed",
                op: "eq",
                val: name,
            }
        }
        queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`;
        if (page){
            queryString += `&page=${page}`;
        }
    }
    else if (latitude && longitude){
        latitude_lower = {
            name:"latitude",
            op:"ge",
            val: latitude - range
        };
        latitude_upper = {
            name:"latitude",
            op: "le",
            val: latitude + range
        };
        longitude_lower = {
            name:"longitude",
            op:"ge",
            val: longitude - range
        };
        longitude_upper = {
            name:"longitude",
            op: "le",
            val: longitude + range
        };

        ll = JSON.stringify(latitude_lower);
        lu = JSON.stringify(latitude_upper);
        lol = JSON.stringify(longitude_lower);
        lou = JSON.stringify(longitude_upper);

        queryString = `?q={"filters":[${ll}, ${lu}, ${lol}, ${lou}]}`

        if (page){
            queryString += `&page=${page}`;
        }

    }

    return queryString;
}

async function getShelters(id, latitude, longitude, range, page) {
    let queryString = "";
    if (arguments.length > 0){
        queryString = build_query("shelter", id, undefined, latitude, longitude, range, page);
    }
    return perform_api_call(`${API_URL}shelter${queryString}`);
}

async function getDogs(id, shelter_id, range, page){
    let queryString = "";
    if (id){
        queryString = `/${id}`;
    }else if(shelter_id){
        return getShelterDogs(shelter_id, page);
    }else if (page){
        queryString=`?page=${page}`;
    }
    return perform_api_call(`${API_URL}dog${queryString}`);
}

async function getBreeds(name, latitude, longitude, range, page) {
    let queryString = "";
    if (name) {
        queryString = build_query("breed", undefined, name, latitude, longitude, range, page);
    }
    return perform_api_call(`${API_URL}breed${queryString}`);
}

async function getActivities(id, name, latitude, longitude, range, page) {
    let queryString = "";
    if (arguments.length > 0){
        queryString = build_query("activity", id, name, latitude, longitude, range, page);
    }
    return perform_api_call(`${API_URL}activity${queryString}`);
}

function buildBreedActivityQuery(active, queryString, multipleArgs){
    if (active === true){
        filter_string = '{"name" : "is_active", "op":"eq", "val": true}'
    } else {
        filter_string = '{"name" : "is_active", "op":"eq", "val": false}'
    }
    if(multipleArgs){
        queryString = [queryString.slice(0, 15), filter_string,',', queryString.slice(15)].join('');
    }else{
        queryString = '?q={"filters":[' + filter_string + ']}'
    }
    return queryString;
}

async function getAllNearbyShelters(latitude, longitude, range) {
    let page_num = 1;
    let shelters_objects = await getShelters(undefined, latitude, longitude, range, page_num);
    let shelter_promises = [];
    while (page_num < shelters_objects.total_pages) {
        ++page_num;
        shelter_promises.push(getShelters(undefined, latitude, longitude, range, page_num));
    }

    shelter_promises = await Promise.all(shelter_promises);

    let nearby_shelters = shelters_objects.objects;
    for (let shelters_object of shelter_promises) {
        nearby_shelters = nearby_shelters.concat(shelters_object.objects);
    }

    return nearby_shelters;
}

async function getBreedActivitiesWithLocation(name, latitude, longitude, range, page) {
    var multipleArgs = false;
    var queryString = '';
    if (latitude || longitude || range || page){
        queryString = build_query("activity", undefined, undefined, latitude, longitude, range, page);
        multipleArgs = true;
    }

    let breed_info = await getBreeds(name);
    let is_active = breed_info.objects[0].is_active;
    queryString = buildBreedActivityQuery(is_active, queryString, multipleArgs);

    return perform_api_call(`${API_URL}activity${queryString}`);
}

module.exports = {
    perform_api_call,
    build_query,
    getShelters,
    getDogs,
    getBreeds,
    getActivities,
    buildBreedActivityQuery,
    getAllNearbyShelters,
    getBreedActivitiesWithLocation
}
