import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

PETFINDER_KEY = os.getenv("PETFINDER_API_KEY")
PETFINDER_SECRET = os.getenv("PETFINDER_API_SECRET")
API_URL = "http://api.petfinder.com/"

def get_breeds():
    "Returns a list of all dog breeds available on Petfinder"

    breed_list = []

    payload = {"key" : PETFINDER_KEY, "animal" : "dog", "format" : "json"}
    response = requests.get(API_URL + "breed.list?", params=payload)
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        breed_dict = response_obj["petfinder"]["breeds"]["breed"]

        for elem in breed_dict:
            breed_list.append(elem['$t'])

        return breed_list
    else:
        # TODO: Decide whether we throw an error or have a prepoulated list of
        #       breeds to return, leaving empty list as return for now
        return breed_list

print(get_breeds())