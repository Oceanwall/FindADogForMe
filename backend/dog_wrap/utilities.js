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
                type: "name",
                op: "eq",
                val: name,
            }
        }
        queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`;
        if (page){
            queryString += `&page[number]=${page}`;
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
            queryString += `&page[number]=${page}`;
        }

    }
    return queryString;
}

async function getShelters(id, name, latitude, longitude, range, page) {
    let queryString = "";
    if (arguments.length > 0){
        queryString = build_query("shelter", id, name, latitude, longitude, range, page);
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

module.exports = {
    perform_api_call,
    build_query,
    getShelters,
    getDogs,
    getBreeds,
    getActivities,
    buildBreedActivityQuery
}
