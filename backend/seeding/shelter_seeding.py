import os
import sys
import json
import requests
import pprint
from dotenv import load_dotenv

sys.path.append("../")
from application import db
from models import Shelter

load_dotenv()
pp = pprint.PrettyPrinter(indent=2)

PETFINDER_KEY = os.getenv("PETFINDER_API_KEY")
PETFINDER_SECRET = os.getenv("PETFINDER_API_SECRET")
API_URL = "http://api.petfinder.com/"

def delete_shelters():
    """
    TODO
    """
    Shelter.query.delete()
    db.session.commit()



def get_shelters(location = "texas", count = 1000, offset=0):
    """
    Returns shelters close to a certain zip code
    location - string, state pertaining to location
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
        print("Request to get details about shelters failed." + str(location))



def build_shelter(shelter):
    """
    Builds a shelter dictionary based on the results of get_shelter
    """
    if shelter == {}:
        return None

    # Ensures that shelter contains dogs.
    # TODO: False positives on some shelter names (ReloCATed animals)
    if ("cat" in shelter['name']['$t'] or "rabbit" in shelter['name']['$t']):
        return None

    phone_number = 0
    address = ""

    if "$t" in shelter['phone']:
        phone_string = (''.join(x for x in shelter['phone']['$t'] if x.isdigit()))
        if phone_string != "":
            phone_number = int(phone_string)
        else:
            phone_number = None
    else:
        phone_number = None

    if "$t" in shelter['address1']:
        address = shelter['address1']['$t']
    else:
        address = None

    curr_shelter = Shelter(
        id = shelter['id']['$t'],
        name = shelter['name']['$t'],
        latitude = float(shelter['latitude']['$t']),
        longitude = float(shelter['longitude']['$t']),
        city = shelter['city']['$t'],
        state = shelter['state']['$t'],
        zipcode = int(shelter['zip']['$t']),
        phone = phone_number,
        address = address
        )

    db.session.add(curr_shelter)
    db.session.commit()



def main():
    """
    Seeds database with records of local shelters based on Texas Zip Codes
    """
    delete_shelters()
    print("Previous shelters deleted from database!")

    shelter_dict = get_shelters()
    for shelter in shelter_dict:
        t = build_shelter(shelter)
    print("Shelter seeding complete!")

if __name__ == "__main__":
    main()
