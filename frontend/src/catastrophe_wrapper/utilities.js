const request = require('request');
const API_URL = "http://api.catastrophe.world/";

function perform_api_call(url, qs) {
    return new Promise ((resolve, reject) => {
        request({
            "url": url,
            "method": "GET",
            "qs": qs,
        }, (error, response, body) => {
            if(error) {
                reject(new Error('Unable to connect to API'));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function get_states_models_query(region, pop_min, pop_max, area_min, area_max, sortby, per_page, page){
    let qs = {};
    if(region)
        qs.region = region; 
    if(pop_min)
        qs.pop_min = pop_min;
    if(pop_max)
        qs.pop_max = pop_max;
    if(area_min)
        qs.area_min = area_min;
    if(area_max)
        qs.area_max = area_max;
    if(sortby)
        qs.sortby = sortby;
    if(per_page)
        qs.per_page = per_page;
    if(page)
        qs.page = page; 
    return qs;
}

function get_natural_disasters_query(incident, funding, statecode, sortby, page, per_page){
    let qs = {};
    if(incident)
        qs.incident = incident;
    if(funding)
        qs.funding = funding;
    if(statecode) 
        qs.statecode = statecode;
    if(sortby)
        qs.sortby = sortby;
    if(page)
        qs.page = page;
    if(per_page)
        qs.per_page = per_page;
    return qs; 
}

function get_organizations_query(rating, stateorprovince, sortby, page, per_page){
    let qs = {};
    if(rating)
        qs.rating = rating;
    if(stateorprovince)
        qs.stateorprovince = stateorprovince;
    if(sortby)
        qs.sortby = sortby; 
    if(page) 
        qs.page = page;
    if(per_page) 
        qs.per_page = per_page;
    return qs;
}


module.exports = {
    perform_api_call,
    get_states_models_query,
    get_natural_disasters_query,
    get_organizations_query
}