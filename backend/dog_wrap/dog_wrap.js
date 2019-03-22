const request = require('request');

// Builds base query for /shelter
function buildQuery(model, id, name, latitude, longitude, range, page){
    queryString = '';
    // Add case for all params except page 
    if (id != '' && !name && !latitude && !longitude && !range && !page){
        queryString+= '/' + id;
    }
    else if (name != '' && !latitude && !longitude && !range && !page){
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
    }
    else if (latitude && longitude){
        if (!range)
            range = 0
        if (!page)
            page = 1
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
        queryString += `&page[number]=${page}`

    }
    return queryString
}

async function getShelters (id, name, latitude, longitude, range, page) {
    var queryString = '';
    if (arguments.length > 0){
        queryString = await buildQuery("shelter", id, name, latitude, longitude, range, page);
    }
    else{
        queryString = '';
    }
    return new Promise ((resolve, reject) => {
        request({
            url:`https://api.findadogfor.me/api/shelter${queryString}`, 
            method: "GET",
        }, (error, response, body) => {
            if(error){
                reject(new Error('Unable to connect to API'));
            }else{
                resolve(JSON.parse(body));
            }
        });
    });
}

// Activity id 
async function getActivities (id, name, latitude, longitude, range, page) {
    var queryString = '';
    if (arguments.length > 0){
        queryString = await buildQuery("activity", id, name, latitude, longitude, range, page);
    }else{
        queryString = '';
    }
    return new Promise ((resolve, reject) => {
        request({
            url:`https://api.findadogfor.me/api/activity${queryString}`,
            method: "GET",
        }, (error, response, body) => {
            if(error){
                reject(new Error('Unable to connect to API'));
            }else{
                resolve(JSON.parse(body));
            }
        });
    });
}

//TODO: Get all results at once, what to pass in for page
async function getBreeds (name) {
    var queryString = '';
    if (name){
        queryString = await buildQuery("breed", '', name);
    }else{
        queryString = '';
    }
    return new Promise ((resolve, reject) => {
        request ({
            url: `https://api.findadogfor.me/api/breed${queryString}`,
            method: "GET",
        }, (error, response, body) => {
            if (error){
                reject(new Error('Unable to connect to API'));
            }else{
                resolve(JSON.parse(body));
            }
        })
    })

}

//TODO: Is range useful for this method?
async function getDogs (id, shelter_id, range, page){
    var queryString = '';
    if (id != '' && id){
        queryString = `/${id}`;
    }else if(shelter_id != '' && shelter_id){
        return getShelterDogs(shelter_id, page);
    }else if (page){
        queryString=`?page[number]=${page}`;
    }else{
        queryString = '';
    }

    return new Promise ((resolve, reject) => {
        request({
            url:`https://api.findadogfor.me/api/dog${queryString}`,
            method: "GET",
        }, (error, response, body) => {
            if(error){
                reject(new Error('Unable to connect to API'));
            }else{
                resolve(JSON.parse(body));
            }
        });
    });
}

// Returns activities close to a certain shelter
async function getShelterActivities(id, range, page){
    return new Promise ((resolve, reject) => {
        if (!id){
            reject("Must provide a shelter id!")
        }else{
            getShelters(id).then((result) => {
                lat = result.latitude;
                lng = result.longitude;
                getActivities('','',lat, lng, range, page).then((response) => {
                    resolve(response);
                })
            });
        }
    });
}

// TODO: Figure out paging, get only unique breeds? STILL INCOMPLETE!
async function getShelterBreeds(id){
    queryObject = {
        name:"shelter_id",
        op:"eq",
        val:id
    }
    var queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`
    return new Promise ((resolve, reject) => {
        if(!id){
            reject("Must provide a shelter id!")
        }else{

            request({
                url: `https://api.findadogfor.me/api/dog${queryString}`,
                method:"GET",
            }, (error, response, body) => {
                if(error){
                    reject(new Error('Unable to connect to API'));
                }else{
                    resolve("Got list of dogs, need to get breeds");
                    // Have a list of dogs, need to extract breed list and then get 
                    // list of breed objects
                    // Relational filters would help immensely 
                }
            })
        }
    })
}

//Returns dogs within a specific shelter 
async function getShelterDogs(id, page){
    let queryObject = {
        name:"shelter_id",
        op:"eq",
        val:id
    }
    var queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`
    if(page){
        queryString += `page[number]=${page}`
    }
    return new Promise ((resolve, reject) => {
        if(!id){
            reject("Must provide a shelter id!");
        }else{
            request({
                url: `https://api.findadogfor.me/api/dog${queryString}`,
                method:"GET",
            }, (error, response, body) => {
                if(error){
                    reject(new Error('Unable to connect to API'));
                }else{
                    resolve(JSON.parse(body));
                }
            })
        }
    })
}

//function getDogActivities();

function getDogBreed(id){
    return new Promise((resolve, reject) => {
        getDogs(id).then((response) => {
            breed = response.breed;
            getBreeds(breed).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    })
}

function getDogShelter(id){
    return new Promise((resolve, reject) => {
        getDogs(id).then((response) => {
            shelter_id = response.shelter_id;
            getShelters(shelter_id).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error)
            });
        });
    })
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

async function getBreedActivities(name, latitude, longitude, range, page) {
    var multipleArgs = false;
    var queryString = '';
    if (arguments.length > 1){
        queryString = await buildQuery("activity", '', name, latitude, longitude, range, page);
        multipleArgs = true; 
    }else{
        queryString = '';
    }
    return new Promise((resolve, reject) => {
        getBreeds(name).then(async (response) => {
            active = response.objects[0].is_active;
            queryString = await buildBreedActivityQuery(active, queryString, multipleArgs);
            console.log(queryString);
            request({
                url: `https://api.findadogfor.me/api/activity${queryString}`,
                method: "GET",
            }, (error, response, body) => {
                if(error){
                    reject(error)
                }else{
                    resolve(JSON.parse(body));
                }
            })
        })
    })
}

getShelters().then((response) => {
    //console.log(response)
})

getActivities("257930562").then((response) => {
    //console.log(response)
})

getBreeds().then((response) => {
    //console.log(response);
});

getBreeds('alaskan husky').then((response) => {
    //console.log(response);
})

getShelterBreeds("TX1399")

getShelterActivities("TX1399", 0.1).then((response) => {
    //console.log(response);
});

getShelterDogs("TX1399");

getDogs('',"TX1399").then((response) => {
    //console.log(response);
})

getDogBreed('43022980').then((response) =>{
    //console.log(response);
});

getDogShelter('43022980').then((response) => {
    //console.log(response);
});

getBreedActivities('affenpinscher', 29.7856, -95.8242, 1).then((response) => {
    console.log(response)
});
