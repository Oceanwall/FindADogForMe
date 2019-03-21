import os
import sys
import json
import requests
from dotenv import load_dotenv
load_dotenv()

sys.path.append("../")
from application import db
from application.models import Activity

PARKS_KEY = os.getenv("NATIONAL_PARKS_API_KEY")
EVENTBRITE_KEY = os.getenv("EVENTBRITE_API_KEY")
MEETUP_KEY = os.getenv("MEETUP_API_KEY")

API_URL = "https://api.nps.gov/api/v1/parks?"
EVENTBRITE_URL = "https://www.eventbriteapi.com/v3/events/search"
EVENTBRITE_VENUE_URL = "https://www.eventbriteapi.com/v3/venues/"
MEETUP_URL = "https://api.meetup.com/find/upcoming_events"

# Used by Meetup API
# Amarillo, El Paso, Lubbock, San Antonio, Austin, Fort Worth, Dallas,
# Houston, Waco, Corpus Christi
TEXAS_CITIES = [(35.222, -101.831), (31.7619, -106.485), (33.5779, -101.8552),
                (29.4241, -98.4936), (30.2672, -97.7431), (32.7555, -97.3308),
                (32.7767, -96.7970), (29.7604, -95.3698), (31.5493, -97.1467),
                (27.8006, -97.3964)]

def delete_activities():
    """
    TODO
    """
    Activity.query.delete()
    db.session.commit()


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

    park = Activity(
        id = "park" + info["id"],
        type = "park",
        url = info["url"],
        name = info["name"],
        description = info["description"],
        latitude = location[0],
        longitude = location[1],
        location = main_address["line3"] + ", " + main_address["city"] + ", " + main_address["stateCode"],
        is_active = True,
        is_free = True if info["entranceFees"][0]["cost"] == 0 else False,
        # "cost": info["entranceFees"][0]["cost"],
        image_1 = info["images"][0]["url"],
        image_2 = info["images"][1]["url"],
        image_3 = info["images"][2]["url"],
        image_4 = info["images"][3]["url"],
        designation = info["designation"],
        weather = info["weatherInfo"],
        directions = info["directionsInfo"],
        date = None
        )

    db.session.add(park)
    db.session.commit()



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

    event = Activity(
        id = "eventbrite" + info["id"],
        type = "eventbrite",
        url = info["url"],
        name = info["name"]['text'],
        description = info["description"]['html'],
        latitude = address_data["latitude"],
        longitude = address_data["longitude"],
        location = address_data["address"]["localized_address_display"],
        is_active = True if info["category_id"] is 108 or 107 or 109 or 111 or 119 else False,
        is_free = info["is_free"],
        image_1 = info["logo"]["url"] if "logo" in info else None,
        image_2 = None,
        image_3 = None,
        image_4 = None,
        designation = None,
        weather = None,
        directions = None,
        # UTC date is also an option
        date = info["end"]["local"]
        )


    db.session.add(event)
    db.session.commit()


def get_all_meetups():
    """
    TODO
    """
    meetup_ids = set()
    meetups = []

    for city in TEXAS_CITIES:
        payload = {
            "text": "dog-friendly",
            "lat" : city[0],
            "long": city[1],
            "radius": "smart",
            "topic_category": "15046,15892,638,242,1998,25375,933,15672",
            "excluded_groups": "31296393,1584246,29397646,9548332,1789287",
            "page": 100,
            "fields": "featured_photo",
            "key": MEETUP_KEY
            }
        response = requests.get(MEETUP_URL, params=payload)
        if response.status_code == 200:
            response_obj = json.loads(response.text)
            for meetup in response_obj["events"]:
                if meetup["id"] not in meetup_ids:
                    meetup_ids.add(meetup["id"])
                    meetups.append(meetup)

    if (len(meetups) == 0):
        print("No meetups found, possible error?")
    return meetups



def build_meetup(info):
    """
    TODO
    """

    # Active Categories: 15046, 15892, 638, 242, 1998, 25375, 933, 15672
    # No way to discern categories in returned data, so only requesting active categories.

    # TODO: Figure out a better way to tell if a meetup is free (most meetups only
    # provide cost information in their description).

    if "description" not in info:
        return

    meetup = Activity(
        id = "meetup" + info["id"],
        type = "meetup",
        url = info["link"],
        name = info["name"],
        description = info["description"],
        latitude = info["group"]["lat"],
        longitude = info["group"]["lon"],
        location = info["group"]["localized_location"],
        is_active = True,
        is_free = False,
        image_1 = info["featured_photo"]["photo_link"] if "featured_photo" in info else None,
        image_2 = None,
        image_3 = None,
        image_4 = None,
        designation = None,
        weather = None,
        directions = None,
        date = info["local_date"]
    )

    db.session.add(meetup)
    db.session.commit()


def main():
    """
    Seeds database with information on activities (national parks, eventbrite, meetup).
    """
    delete_activities()
    print("Previous activities deleted from database!")

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
    meetup_data = get_all_meetups()
    for meetup in meetup_data:
        build_meetup(meetup)
    print("Meetups seeded!")


if __name__ == "__main__":
    main()
