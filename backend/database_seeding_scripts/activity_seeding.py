import os
import json
import requests
from dotenv import load_dotenv

PARKS_KEY = os.getenv("NATIONAL_PARKS_API_KEY")
API_URL = "https://api.nps.gov/api/v1/parks?"

def delete_activities():
    """
    TODO
    """
    pass


def get_all_parks():
    """
    TODO
    """
    payload = {"stateCode" : "TX", "fields": "addresses,images,entranceFees", "api_key" : PARKS_KEY}
    response = requests.get(API_URL + "parks?", params=payload)

    if response.status_code == 200:
        return json.loads(response.text)["data"]
    else:
        print("Retrieving information about parks failed.")
        return None


def build_park(info):
    """
    TODO
    """
    # Converts the latitude-longitude string into a list.
    # Places latitude at index 0 and longitude at index 1.
    if info["latLong"] == "":
        return
    location = info["latLong"].replace("lat:", "").replace("long:", "").replace(",", "").split()
    main_address = info["addresses"][0]

    park = {
        "id": info["id"],
        "type": "park",
        "url": info["url"],
        "name": info["name"],
        "description": info["description"],
        "latitude": location[0],
        "longitude": location[1],
        "location": main_address["line3"] + ", " + main_address["city"] + ", " + main_address["stateCode"],
        "is_active": True,
        "is_free": True if info["entranceFees"][0]["cost"] == 0 else False,
        "cost": info["entranceFees"][0]["cost"],
        "image_1": info["images"][0]["url"],
        "image_2": info["images"][1]["url"],
        "image_3": info["images"][2]["url"],
        "image_4": info["images"][3]["url"],
        "designation": info["designation"],
        "weather": info["weatherInfo"],
        "directions": info["directionsInfo"],
        "date": None,
    }

    # TODO: Add park to database, commit database



def main():
    """
    Seeds database with information on activities (national parks, eventbrite, meetup).
    """

    # National Parks
    parks_data = get_all_parks()
    for park in parks_data:
        build_park(park)
    print("Parks seeded!")

    # Eventbrite

    # Meetup


if __name__ == "__main__":
    main()
