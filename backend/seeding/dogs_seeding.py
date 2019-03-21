"""
Warning:
This script takes about 20-30 minutes to complete.
"""
import os
import sys
import json
import requests
import pprint
from dotenv import load_dotenv

sys.path.append("../")
from application import db
from application.models import Dog, Shelter

load_dotenv()
pp = pprint.PrettyPrinter(indent=2)

PETFINDER_KEY = os.getenv("PETFINDER_API_KEY")
PETFINDER_SECRET = os.getenv("PETFINDER_API_SECRET")
API_URL = "http://api.petfinder.com/"

VALID_BREEDS = {
    "norfolk terrier",
    "doberman pinscher",
    "boxer",
    "pug",
    "bichon frise",
    "bull terrier",
    "briard",
    "beagle",
    "tibetan mastiff",
    "shih tzu",
    "field spaniel",
    "keeshond",
    "english springer spaniel",
    "staffordshire bull terrier",
    "australian terrier",
    "german pinscher",
    "black and tan coonhound",
    "norwich terrier",
    "cairn terrier",
    "soft coated wheaten terrier",
    "pembroke welsh corgi",
    "english toy terrier",
    "great pyrenees",
    "alaskan husky",
    "thai ridgeback",
    "shetland sheepdog",
    "irish terrier",
    "appenzeller sennenhund",
    "toy fox terrier",
    "tibetan spaniel",
    "american pit bull terrier",
    "lhasa apso",
    "boykin spaniel",
    "standard schnauzer",
    "miniature pinscher",
    "miniature schnauzer",
    "yorkshire terrier",
    "border collie",
    "west highland white terrier",
    "samoyed",
    "american eskimo dog",
    "bearded collie",
    "smooth fox terrier",
    "bluetick coonhound",
    "shiba inu",
    "english toy spaniel",
    "australian cattle dog",
    "cocker spaniel",
    "great dane",
    "coton de tulear",
    "tibetan terrier",
    "old english sheepdog",
    "affenpinscher",
    "pharaoh hound",
    "scottish deerhound",
    "cocker spaniel (american)",
    "welsh springer spaniel",
    "rottweiler",
    "australian kelpie",
    "chow chow",
    "american bulldog",
    "treeing walker coonhound",
    "vizsla",
    "chesapeake bay retriever",
    "belgian malinois",
    "siberian husky",
    "saluki",
    "whippet",
    "kuvasz",
    "cardigan welsh corgi",
    "maltese",
    "irish setter",
    "rat terrier",
    "scottish terrier",
    "border terrier",
    "komondor",
    "bull terrier (miniature)",
    "pomeranian",
    "alaskan malamute",
    "clumber spaniel",
    "schipperke",
    "redbone coonhound",
    "bernese mountain dog",
    "rhodesian ridgeback",
    "basset hound",
    "greyhound",
    "wire fox terrier",
    "cavalier king charles spaniel",
    "english setter",
    "alapaha blue blood bulldog",
    "papillon",
    "irish wolfhound",
    "french bulldog",
    "golden retriever",
    "bedlington terrier",
    "nova scotia duck tolling retriever",
    "airedale terrier",
    "german shorthaired pointer",
    "boston terrier",
    "newfoundland",
    "italian greyhound",
    "giant schnauzer",
    "american staffordshire terrier",
    "american water spaniel",
    "afghan hound",
    "weimaraner",
    "silky terrier",
    "labrador retriever",
    "dalmatian",
    "glen of imaal terrier",
    "basset bleu de gascogne",
    "gordon setter",
    "akita",
    "basenji",
}


def delete_dogs():
    """
    TODO
    """
    pass
    Dog.query.delete()
    db.session.commit()


def delete_shelters():
    """
    TODO
    """
    Shelter.query.delete()
    db.session.commit()


def get_shelters(location="texas", count=500, offset=0):
    """
    Returns a list of shelters given a location
    location - string, zip/state
    count - number of shelters to list
    offset - how far to offset into the results list
    """

    payload = {
        "key": PETFINDER_KEY,
        "location": str(location),
        "offset": str(offset),
        "count": str(count),
        "format": "json",
    }
    response = requests.get(API_URL + "shelter.find", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        shelter_dict = response_obj["petfinder"]["shelters"]["shelter"]
        return shelter_dict
    else:
        print("Request to get details about shelters failed." + str(location))


def build_shelter(shelter, shelter_ids, commit=False):
    """
    Builds a shelter dictionary based on the results of get_shelter
    """
    if shelter == {}:
        return None

    # Ensures that shelter contains dogs.
    # TODO: False positives on some shelter names (ReloCATed animals)
    if "cat" in shelter["name"]["$t"] or "rabbit" in shelter["name"]["$t"]:
        return None

    phone_number = 0
    address = ""

    if "$t" in shelter["phone"]:
        phone_string = "".join(x for x in shelter["phone"]["$t"] if x.isdigit())
        if phone_string != "":
            phone_number = int(phone_string)
        else:
            phone_number = None
    else:
        phone_number = None

    if "$t" in shelter["address1"]:
        address = shelter["address1"]["$t"]
    else:
        address = None

    shelter_ids.add(shelter["id"]["$t"])

    curr_shelter = Shelter(
        id=shelter["id"]["$t"],
        name=shelter["name"]["$t"],
        latitude=float(shelter["latitude"]["$t"]),
        longitude=float(shelter["longitude"]["$t"]),
        city=shelter["city"]["$t"],
        state=shelter["state"]["$t"],
        zipcode=int(shelter["zip"]["$t"]),
        phone=phone_number,
        address=address,
    )

    if commit:
        db.session.add(curr_shelter)
        db.session.commit()

    return curr_shelter


def get_dogs(shelter_id, count=20, offset=0):
    """
    Interfaces with petfinder api to get relevant pet info local to a certain
    zipcode
    location - string, state
    count - int, number of results to return
    offset - int, where to start
    """
    dog_list = []

    payload = {
        "key": PETFINDER_KEY,
        "id": shelter_id,
        "output": "full",
        "status": "A",
        "offset": str(offset),
        "count": str(count),
        "format": "json",
    }

    response = requests.get(API_URL + "shelter.getPets", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        if "pet" in response_obj["petfinder"]["pets"]:
            pet_dict = response_obj["petfinder"]["pets"]["pet"]
            for pet in pet_dict:
                try:
                    if pet["animal"]["$t"] == "Dog":
                        dog_list.append(pet)
                except:
                    pass
            return dog_list
        else:
            return [{}]
    else:
        print("Request to get details about dogs failed.")


def build_dog(pet, commit=False):
    """
    Builds a dog dict from petfinder data
    """
    if pet == {}:
        return None

    breed = ""

    if isinstance(pet["breeds"]["breed"], dict):
        breed = pet["breeds"]["breed"]["$t"]
    else:
        breed = pet["breeds"]["breed"][0]["$t"]

    if "photos" not in pet["media"]:
        return None

    if breed.lower() not in VALID_BREEDS:
        # Manual fixing of inconsistent breeds
        # TODO: Find more manual fixes for hounds
        manual_fix = False
        if breed.lower() == "pit bull terrier":
            breed = "american pit bull terrier"
            manual_fix = True
        if (
            breed.lower() == "australian cattle dog / blue heeler"
            or breed.lower() == "cattle dog"
        ):
            breed = "australian cattle dog"
            manual_fix = True
        if breed.lower() == "collie":
            breed = "border collie"
            manual_fix = True

        if not manual_fix:
            return None

    images = {"image_1": None, "image_2": None, "image_3": None, "image_4": None}

    pic_id = 0
    for picture in pet["media"]["photos"]["photo"]:
        if int(picture["@id"]) > pic_id and picture["@size"] == "x" and pic_id < 4:
            pic_id += 1
            images["image_" + str(pic_id)] = picture["$t"]

    # TODO: Add "options" (noKids houseTrained, hasShots, etc)
    dog = Dog(
        id=pet["id"]["$t"],
        shelter_id=pet["shelterId"]["$t"],
        name=pet["name"]["$t"],
        breed=breed.lower(),
        age=pet["age"]["$t"],
        size=pet["size"]["$t"],
        sex=pet["sex"]["$t"],
        description=pet["description"]["$t"] if "$t" in pet["description"] else None,
        image_1=images["image_1"],
        image_2=images["image_2"],
        image_3=images["image_3"],
        image_4=images["image_4"],
    )

    if commit:
        db.session.add(dog)
        db.session.commit()

    return dog


def main():
    """
    Seeds database with both shelters and records of local dogs from shelters
    """
    delete_shelters()
    print("Previous shelters deleted from database!")
    delete_dogs()
    print("Previous dogs deleted from database!")

    shelter_dict = get_shelters()
    shelter_ids = set()
    for shelter in shelter_dict:
        t = build_shelter(shelter, shelter_ids, True)
    print("Shelter seeding complete!")

    shelter_count = 0
    for shelter in shelter_ids:
        dog_dict = get_dogs(shelter)
        for dog in dog_dict:
            build_dog(dog, True)
        shelter_count += 1
        print("Dogs from Shelter " + str(shelter_count) + " completed.")
    print("Dog seeding complete!")


if __name__ == "__main__":
    main()
