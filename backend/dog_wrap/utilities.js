const request = require('request');

module.exports = {
    perform_api_call: function(url) {
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
    },
    build_query: function(model, id, name, latitude, longitude, range, page) {
        var queryString = '';
        // Add case for all params except page
        if (id && !name && !latitude && !longitude && !range && !page){
            queryString+= '/' + id;
        }
        else if (name && !latitude && !longitude && !range){
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
            if (!range)
                range = 0
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
};
