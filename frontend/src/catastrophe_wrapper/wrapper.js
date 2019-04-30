const utilities = require("./utilities").default;
const API_URL = "https://api.catastrophe.world/";

async function get_states_models(region, pop_min, pop_max, area_min, area_max, sortby, page, per_page){
    let qs = await utilities.get_states_models_query(region, pop_min, pop_max, area_min, area_max, sortby, per_page, page);
    return utilities.perform_api_call(API_URL + "states/", qs);
};

async function get_natural_disasters(incident, funding, statecode, sortby, page, per_page){
    let qs = await utilities.get_natural_disasters_query(incident, funding, statecode, sortby, page, per_page);
    return utilities.perform_api_call(API_URL + "natural-disasters/", qs);
}

async function get_organizations(rating, stateorprovince, sortby, page, per_page){
    let qs = await utilities.get_organizations_query(rating, stateorprovince, sortby, page, per_page);
    return utilities.perform_api_call(API_URL + "organizations/", qs);
}

function get_specific_state(state){
    return utilities.perform_api_call(API_URL + "states/" + state);
}

function get_specific_disaster(disaster_number){
    return utilities.perform_api_call(API_URL + "natural-disasters/" + disaster_number);
}

function get_specific_organization(organization_number){
    return utilities.perform_api_call(API_URL + "organizations/" + organization_number);
}

export default {
    get_states_models,
    get_natural_disasters,
    get_organizations,
    get_specific_state,
    get_specific_disaster,
    get_specific_organization
}
