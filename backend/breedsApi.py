import os
import json
import requests
from dotenv import load_dotenv

THE_DOG_API_KEY = os.getenv("THE_DOG_API_KEY")
THE_DOG_API_URL = "https://api.thedogapi.com/v1/"

DOG_IMAGES_API_URL = "https://dog.ceo/api/breed/"

def get_all_breeds():
    payload = {"x-api-key" : THE_DOG_API_KEY}
    response = requests.get(THE_DOG_API_URL + "breeds?", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        return response_obj
    # Need to agree on this
    return None

def get_breed_information(breed):
    payload = {"x-api-key" : THE_DOG_API_KEY, "q" : breed}
    response = requests.get(THE_DOG_API_URL + "breeds/search?", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        return response_obj
    # Need to agree on this
    return None

def get_breed_pictures(breed):
    if ' ' in breed:
        breed_words = breed.split()
        main_breed = breed_words[1]
        sub_breed = breed_words[0]

        response = requests.get(DOG_IMAGES_API_URL + main_breed + "/" + sub_breed + "/images/random/5")
        if response.status_code == 200:
            response_obj = json.loads(response.text)
            return response_obj['message']
        else:
            breed = main_breed

    # Fall through
    response = requests.get(DOG_IMAGES_API_URL + breed + "/images/random/5")
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        return response_obj['message']
    else:
        return None



# print (get_breed_information("Alaskan Malamute"))
# print (get_breed_pictures("Alaskan Malamute"))
