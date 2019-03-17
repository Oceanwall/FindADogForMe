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

def get_dogs(location, count, offset = 0):
    """
    Interfaces with petfinder api to get relevant pet info local to a certain 
    zipcode
    location - int, zipcode 
    count - int, number of results to return
    offset - int, where to start 
    """
    payload = {"key" : PETFINDER_KEY, "animal" : "dog",
               "location" : str(location), "offset" : str(offset),
               "count" : str(count), "format" : "json"}

    response = requests.get(API_URL + "pet.find", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        pet_dict = response_obj["petfinder"]["pets"]["pet"]
        return pet_dict
    else:
        # TODO: Decide whether we throw an error or just an empty dictionary
        return pet_dict

def build_dog(pet):
    "Builds a dog dict from petfinder data"
    if (pet == {}): 
        return None
        
    image_string = "image_"
    breed = ""

    if isinstance(pet["breeds"]["breed"], dict):
        breed = pet["breeds"]["breed"]["$t"]
    else:
        breed = pet["breeds"]["breed"][0]["$t"]

    dog = {
        'id': pet['id']['$t'],
        'shelter_id': pet['shelterId']['$t'],
        'name': pet['name']['$t'],
        'breed': breed.lower(),
        'age': pet['age']['$t'],
        'size': pet['size']['$t'],
        'description': pet['description']['$t'],
    }

    pic_id = 0
    for picture in pet["media"]["photos"]["photo"]:
        if int(picture['@id']) > pic_id and picture['@size'] == 'x' and pic_id <=3:
            pic_id += 1
            dog[image_string + str(pic_id)] = picture["$t"]

    while pic_id < 5:
        dog[image_string + str(pic_id)] = None
        pic_id+=1

    pp.pprint(dog)
    return dog

def main():
    """
    Seeds database with records of local dogs based on Texas Zip Codes 
    """
    for zip_code in TX_ZIPS:
        dog_dict = get_dogs(zip_code, COUNT)
        for dog in dog_dict:
            result = build_dog(dog)
            if result != None:
                print("Found a dog!")

if __name__ == "__main__":
    main()
