const request = require('request');

// Builds base query for /shelter
var buildQueryShelters = (model ,id, name, latitude, longitude, range, page) => {
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
    if (arguments.length > 0){
        queryString = await buildQueryShelters("shelter", id, name, latitude, longitude, range, page);
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
    if (arguments.length > 0){
        queryString = await buildQueryShelters ("activity", id, name, latitude, longitude, range, page);
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
    if (name){
        queryString = await buildQueryShelters ("breed", '', name);
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
    queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`
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
    queryObject = {
        name:"shelter_id",
        op:"eq",
        val:id
    }
    queryString = `?q={"filters":[${JSON.stringify(queryObject)}]}`
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


getShelters('','',29.5961, -95.5169).then((response) => {
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