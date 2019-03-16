import os
import json
import requests
from dotenv import load_dotenv

THE_DOG_API_KEY = os.getenv("THE_DOG_API_KEY")
THE_DOG_API_URL = "https://api.thedogapi.com/v1/"
DOG_IMAGES_API_URL = "https://dog.ceo/api/breed/"

def delete_breeds():
    """
    TODO
    """

    pass

def get_all_breeds():
    """
    Gets details about all the breeds of dogs.
    """
    payload = {"x-api-key" : THE_DOG_API_KEY}
    response = requests.get(THE_DOG_API_URL + "breeds?", params=payload)

    if response.status_code == 200:
        return json.loads(response.text)
    else:
        print("Request to get details about all breeds of dogs failed.")
        return None


def get_breed_images(breed):
    """
    TODO
    """
    # Notes: Important dogs failing: Most Shepherds, Bloodhound?
    main_breed = None
    sub_breed = None

    if ' ' in breed:
        breed_words = breed.split()
        main_breed = breed_words[len(breed_words) - 1]
        sub_breed = breed_words[len(breed_words) - 2]

        response = requests.get(DOG_IMAGES_API_URL + main_breed + "/" + sub_breed + "/images/random/4")
        if response.status_code == 200:
            response_obj = json.loads(response.text)
            return response_obj['message']
        else:
            breed = main_breed

    # Fall through 1
    response = requests.get(DOG_IMAGES_API_URL + breed + "/images/random/4")
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        return response_obj['message']
    else:
        if (sub_breed):
            breed = sub_breed
        else:
            return None

    # Fall through 2
    response = requests.get(DOG_IMAGES_API_URL + breed + "/images/random/4")
    if response.status_code == 200:
        response_obj = json.loads(response.text)
        return response_obj['message']
    else:
        return None


def build_breed(info):
    """
    TODO
    """

    breed_images = get_breed_images(info["name"])
    if breed_images is not None:
        height = info["height"]["imperial"].split()
        lifespan = info["life_span"].replace(" years", "").split()
        weight = info["weight"]["imperial"].split()
        num_images = len(breed_images)

        breed = {
            "name": info["name"] if "name" in info else None,
            "group": info["breed_group"] if "breed_group" in info else None,
            "min_height": height[0],
            "max_height": height[len(height) - 1],
            "min_lifespan": lifespan[0],
            "max_lifespan": lifespan[len(lifespan) - 1],
            "temperament": info["temperament"] if "temperament" in info else None,
            "min_weight": weight[0],
            "max_weight": weight[len(weight) - 1],
            "image_1": breed_images[0] if num_images >= 1 else None,
            "image_2": breed_images[1] if num_images >= 2 else None,
            "image_3": breed_images[2] if num_images >= 3 else None,
            "image_4": breed_images[3] if num_images >= 4 else None,
            "is_active": True
        }

        print(breed)

    # TODO: Add breed to database, commit database

def main():
    """
    Seeds database with information on dog breeds.
    """

    breeds_data = get_all_breeds()
    for breed in breeds_data:
        build_breed(breed)

    print("Breeds seeded!")

if __name__ == "__main__":
    main()
