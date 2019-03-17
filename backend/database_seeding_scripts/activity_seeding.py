import os
import json
import requests
from dotenv import load_dotenv
load_dotenv()

PARKS_KEY = os.getenv("NATIONAL_PARKS_API_KEY")
EVENTBRITE_KEY = os.getenv("EVENTBRITE_API_KEY")

API_URL = "https://api.nps.gov/api/v1/parks?"
EVENTBRITE_URL = "https://www.eventbriteapi.com/v3/events/search"
EVENTBRITE_VENUE_URL = "https://www.eventbriteapi.com/v3/venues/"

def delete_activities():
    """
    TODO
    """
    pass


def get_all_parks():
    """
    TODO
    """
    payload = {"stateCode" : "TX", "fields": "addresses,images,entranceFees", "api_key" : PARKS_KEY, "limit": 1000}
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
        # "cost": info["entranceFees"][0]["cost"],
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



def get_all_eventbrites():
    """
    TODO
    """

    # TODO: Pagination?

    payload = {"q" : "dog-friendly, pet-friendly",
        "sort_by": "best",
        "location.viewport.northeast.latitude": 36.721274,
        "location.viewport.northeast.longitude": -93.295898,
        "location.viewport.southwest.latitude": 25.799891,
        "location.viewport.southwest.longitude": -107.182617,
        "categories": "113,105,108,107,109,111,115,119",
        "include_all_series_instances": False,
        "token" : EVENTBRITE_KEY
        }

    response = requests.get(EVENTBRITE_URL, params=payload)

    if response.status_code == 200:
        return json.loads(response.text)["events"]
    else:
        print("Retrieving Eventbrite information failed.")
        return None



def get_eventbrite_venue(venue_id):
    """
    TODO
    """

    payload = {"token" : EVENTBRITE_KEY}
    response = requests.get(EVENTBRITE_VENUE_URL + venue_id, params=payload)

    if response.status_code == 200:
        return json.loads(response.text)
    else:
        return None



def build_event(info):
    """
    TODO
    """
    # Active Events: 108, 107, 109, 111, 119
    # Non-active Events: 113, 105, 115

    address_data = get_eventbrite_venue(info["venue_id"])
    if (address_data is None):
        return

    event = {
        "id": info["id"],
        "type": "eventbrite",
        "url": info["url"],
        "name": info["name"]['text'],
        "description": info["description"]['html'],
        "latitude": address_data["latitude"],
        "longitude": address_data["longitude"],
        "location": address_data["address"]["localized_address_display"],
        "is_active": True if info["category_id"] is 108 or 107 or 109 or 111 or 119 else False,
        "is_free": info["is_free"],
        "image_1": info["logo"]["url"] if "logo" in info else None,
        "image_2": None,
        "image_3": None,
        "image_4": None,
        "designation": None,
        "weather": None,
        "directions": None,
        "date": info["end"],
    }



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
    eventbrite_data = get_all_eventbrites()
    for event in eventbrite_data:
        build_event(event)
    print("Events seeded!")

    # Meetup


if __name__ == "__main__":
    main()
