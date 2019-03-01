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

def shelters_by_breed(breed, offset=0, count=25):
    """
    Returns shelters that have a particular breed
    breed - string, must be one of the breeds returned from get_breeds()
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """

    shelter_list = []
    payload = {"key" : PETFINDER_KEY, "animal" : "dog", "breed" : breed,
               "offset" : str(offset), "count" : str(count), "format" : "json"}


    response = requests.get(API_URL + "shelter.listByBreed", params=payload)
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        shelter_dict = response_obj["petfinder"]['shelters']
        pp.pprint(shelter_dict)
        # TODO: Once this call gets fixed, I'll move the dict elements into the
        #       list
        return shelter_list
    else:

        # TODO: Decide whether we throw an error or just an empty list
        return shelter_list


test_breed = "Akita"
shelters_by_breed(test_breed)


def find_shelters(location, offset=0, count=25):
    """
    Returns shelters close to a certain location
    location - int, a zipcode pertaining to your location
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """

    shelter_list = []
    payload = {"key" : PETFINDER_KEY, "location" : str(location),
               "offset" : str(offset), "count" : str(count), "format" : "json"}


    response = requests.get(API_URL + "shelter.find", params=payload)
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        shelter_dict = response_obj["petfinder"]['shelters']
        pp.pprint(shelter_dict)

        # TODO: Check for case where shelter_dict has no results, decide what to
        #       return in that case
        return shelter_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return shelter_dict

find_shelters(78705, count=5)

def find_pet(breed, sex, location, offset=0, count=25):
    """
    Finds a specific pet based on certain criteria
    breed - string, must be a valid breed
    sex - string, can either be M or F
    location - int, zip code
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """
    pet_dict = []
    payload = {"key" : PETFINDER_KEY, "animal" : "dog", "breed" : breed,
               "sex" : sex, "location" : str(location), "offset" : str(offset),
               "count" : str(count), "format" : "json"}


    response = requests.get(API_URL + "pet.find", params=payload)
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        pp.pprint(response_obj)
        pet_dict = response_obj["petfinder"]["pets"]

        # TODO: Check for case where pet_dict has no results, decide what to
        #       return in that case
        return pet_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return pet_dict

find_pet("Retriever", "M", 78705, count=1)
