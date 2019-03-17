import os
import json
import requests
import pprint
from dotenv import load_dotenv
load_dotenv()

pp = pprint.PrettyPrinter(indent=2)

# TODO: Combine these two methods?

EVENTBRITE_KEY = os.getenv("EVENTBRITE_API_KEY")
EVENTBRITE_URL = "https://www.eventbriteapi.com/v3/events/search"

MEETUP_KEY = os.getenv("MEETUP_API_KEY")
MEETUP_URL = "https://api.meetup.com/find/upcoming_events"

def get_events_near_area(query, address, range):
    '''
    query: keyword(s) to search for
    address:   Address of location to search for events around
    range:     Distance to search around (int followed by "mi" or "km")
    (You can substitute use of addess with latitude / longitude).

    '''
    payload = {"q" : query,
               "sort_by": "best",
               "location.address": address,
               "location.within": range,
               "categories": "113,105,108,107,109,111,115,119",
               "include_all_series_instances": False,
               "token" : EVENTBRITE_KEY
               }
    response = requests.get(EVENTBRITE_URL, params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        # print(response_obj)
        activity_data = []

        for event in response_obj["events"]:
            activity_datum = {
                # EVENTBRITE DOES NOT PROVIDE ADDRESS DATA???
                "type": "eventbrite",
                "name": event["name"],
                # Option: Can also select pre-formatted HTML
                "description": event["description"]["text"],
                "id": event["id"],
                "url": event["url"],
                "free": event["is_free"],
                # Start and End times are calculted in utc
                "start": event["start"]["utc"],
                "end": event["end"]["utc"],
                "logo": event["logo"]["url"]
            }

            activity_data.append(activity_datum)

        # pp.pprint(activity_data)
        return activity_data

    else:
        pp.pprint("request failed")

# Personally, I consider this the better event API...
def get_meetups_near_area(query, latitude, longitude, range):
    '''
    query: keyword(s) to search for
    latitude:
    longitude (location around which to center search for )
    range:     Distance to search around. Int, max is 100.
    (You can substitute use of addess with latitude / longitude).
    '''
    payload = {
        "text": query,
        "lat" : latitude,
        "long": longitude,
        "radius": range,
        "topic_category": "1, 4, 6, 9, 14, 17, 23, 25, 26, 31",
        "key": MEETUP_KEY
        }

    response = requests.get(MEETUP_URL, params=payload)
    # print(response.status_code)


    if response.status_code == 200:
        response_obj = json.loads(response.text)
        # print(response_obj)
        activity_data = []

        for event in response_obj["events"]:
            activity_datum = {
                "type": "meetup",
                "name": event["name"],
                "id": event["id"],
                "url": event["link"],
                "date": event["local_date"],
                "time": event["local_time"],
                "location": event["group"]["localized_location"],
            }

            if "venue" in event:
                activity_datum["venue_name"] = event["venue"]["name"]
            if "description" in event:
                activity_datum["description"] = event["description"]

            activity_data.append(activity_datum)

        pp.pprint(activity_data)
        return activity_data

    else:
        pp.pprint("request failed")


# get_meetups_near_area("dog-friendly, pet-friendly", 30.2672, 97.7431, 100)
get_events_near_area("dog-friendly, pet-friendly", "austin", "100mi")
