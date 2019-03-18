import os
import json
import requests
import pprint
from dotenv import load_dotenv

load_dotenv()
pp = pprint.PrettyPrinter(indent=2)

PETFINDER_KEY = os.getenv("PETFINDER_API_KEY")
PETFINDER_SECRET = os.getenv("PETFINDER_API_SECRET")
API_URL = "http://api.petfinder.com/"

TX_ZIPS = [78705]           # Populate with other Texas Zip Codes
COUNT = 15                  # Kept it at 15 right now for testing purposes

def get_shelters(location, count, offset=0):
    """
    Returns shelters close to a certain zip code
    location - int, a zipcode pertaining to your location
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """

    payload = {"key" : PETFINDER_KEY, "location" : str(location),
               "offset" : str(offset), "count" : str(count), "format" : "json"}
    response = requests.get(API_URL + "shelter.find", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        shelter_dict = response_obj["petfinder"]['shelters']['shelter']
        return shelter_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return shelter_dict

def build_shelter(shelter):
    """
    Builds a shelter dictionary based on the results of get_shelter
    """
    if shelter == {}:
        return None

    phone_number = 0
    address = ""

    if shelter['phone'] != {}:
        phone_number = int(''.join(x for x in shelter['phone']['$t'] if x.isdigit()))
    else:
        phone_number = None

    if shelter['address1'] != {}:
        address = shelter['address1']['$t']
    else:
        address = None

    curr_shelter = {
        'id':shelter['id']['$t'],
        'name':shelter['name']['$t'],
        'latitude':float(shelter['latitude']['$t']),
        'longitude':float(shelter['longitude']['$t']),
        'city':shelter['city']['$t'],
        'state':shelter['state']['$t'],
        'zipcode':int(shelter['zip']['$t']),
        'phone': phone_number,
        'address': address
    }
    #pp.pprint(curr_shelter)
    return curr_shelter


def main():
    """
    Seeds database with records of local shelters based on Texas Zip Codes
    """
    for zip_code in TX_ZIPS:
        shelter_dict = get_shelters(zip_code, COUNT)
        for shelter in shelter_dict:
            result = build_shelter(shelter)
            if result != None:
                print("Found a shelter!")

if __name__ == "__main__":
    main()
