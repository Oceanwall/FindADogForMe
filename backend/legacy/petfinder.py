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

#print(get_breeds())

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
        # pp.pprint(shelter_dict)
        # TODO: Once this call gets fixed, I'll move the dict elements into the
        #       list
        return shelter_list
    else:

        # TODO: Decide whether we throw an error or just an empty list
        return shelter_list


test_breed = "Akita"
#shelters_by_breed(test_breed)

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
        # pp.pprint(shelter_dict)

        # TODO: Check for case where shelter_dict has no results, decide what to
        #       return in that case
        return shelter_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return shelter_dict

# TODO: When giving out shelters, make sure that they host dogs
def get_shelter_information(location, offset = 0, count = 25):
    shelter_dict = find_shelters(location, offset, count)['shelter']
    shelter_data = []
    # print(shelter_dict)

    for shelter in shelter_dict:
        shelter_info = {}
        shelter_info["id"] = shelter["id"]['$t']
        shelter_info["name"] = shelter["name"]['$t']
        shelter_info["city"] = shelter["city"]['$t']
        shelter_info["state"] = shelter["state"]['$t']
        shelter_info["zip"] = shelter["zip"]['$t']
        shelter_info["email"] = shelter["email"]['$t']
        shelter_info["latitude"] = shelter["latitude"]['$t']
        shelter_info["longitude"] = shelter["longitude"]['$t']

        if '$t' in shelter["phone"]:
            shelter_info["phone"] = shelter["phone"]['$t']
        if '$t' in shelter["address1"]:
            shelter_info["address"] = shelter["address1"]['$t']

        shelter_data.append(shelter_info)

    return shelter_data


# print(get_shelter_information(78705))

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
        pet_dict = response_obj["petfinder"]["pets"]
        # pp.pprint(pet_dict)

        # TODO: Check for case where pet_dict has no results, decide what to
        #       return in that case
        return pet_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return pet_dict

#find_pet("Retriever", "M", 78705, count=1)

def get_pets_by_shelter(shelter_id, offset=0, count=25):
    """
    Returns a user specified number of pets for a certain shelter. INCLUDES ALL
    TYPES OF ANIMALS
    shelter_id - string, shelter id
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """

    payload = {"key" : PETFINDER_KEY, "id" : shelter_id,
               "offset" : str(offset), "count" : str(count), "format" : "json"}
    response = requests.get(API_URL + "shelter.getPets", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        pets_dict = response_obj["petfinder"]
        # pp.pprint(pets_dict)

        # TODO: Check for case where shelter_dict has no results, decide what to
        #       return in that case
        return pets_dict
    else:

        # TODO: Decide whether we throw an error or just an empty dictionary
        return pets_dict

# print(get_pets_by_shelter("TX1218", count=3))

def find_breeds_in_shelter(shelter_id):
    """
    Hopefully lists all the unique dog breeds for a specific shelter
    shelter_id - string, shelter id
    """

    breed_list = []
    pet_dict = get_pets_by_shelter(shelter_id, count=1000)
    pet_dict = pet_dict["pets"]["pet"]

    for elem in pet_dict:
        if elem["animal"]["$t"] == "Dog":
            if isinstance(elem["breeds"]["breed"], dict):
                breed_list.append(elem["breeds"]["breed"]["$t"])

    # Use a set so dulpicate breeds are removed
    breed_set = set(breed_list)

    return breed_set

# print(find_breeds_in_shelter("TX365"))

# Gets pictures of shelter animals
def pet_details_from_shelter(shelter_id, offset = 0, count = 50):
    """
    shelter_id - string, shelter id
    offset - int, offset into the result set
    count - int, how many records to return for this call
    """
    pet_data = []
    for pet in get_pets_by_shelter(shelter_id, offset, 2 * count)["pets"]["pet"]:
        if pet["animal"]["$t"] == "Dog":
            pet_info = {}
            pet_info["name"] = pet["name"]["$t"]
            pet_info["shelter_id"] = pet["shelterId"]["$t"]
            pet_info["id"] = pet["id"]["$t"]
            pet_info["size"] = pet["size"]["$t"]
            pet_info["sex"] = pet["sex"]["$t"]
            pet_info["description"] = pet["description"]["$t"]
            pet_info["age"] = pet["age"]["$t"]
            pet_info["pictures"] = []

            if isinstance(pet["breeds"]["breed"], dict):
                pet_info["breed"] = pet["breeds"]["breed"]["$t"]
            else:
                pet_info["breed"] = pet["breeds"]["breed"][0]["$t"]

            pic_id = 0
            if "photos" in pet["media"]:
                for picture in pet["media"]["photos"]["photo"]:
                    if int(picture['@id']) > pic_id and picture['@size'] == 'x':
                        pic_id += 1
                        pet_info["pictures"].append(picture["$t"])

            pet_data.append(pet_info)

    return pet_data


print(pet_details_from_shelter("TX1069", count=25))
