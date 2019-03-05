import os
import json
import requests
import pprint
from dotenv import load_dotenv

pp = pprint.PrettyPrinter(indent=2)

EVENTS_KEY = "NLDWVAJZZ4UGYRN3Z6G5"
EVENT_URL = "https://www.eventbriteapi.com/v3/events/search"

def get_events_near_area(query, address, range):
    '''
    query: keyword(s) to search for
    location: dict with location querying information
        location.address:   Address of location to search for events around
        location.within:    Distance to search around (int followed by "mi" or "km")
        (OR (to discuss; use address, or latitude / longitude?))
        location.latitude:
        location.longitude:
        (You can substitute use of addess with latitude / longitude).

    '''
    payload = {"q" : query,
               "sort_by": "best",
               "location.address": address,
               "location.within": range,
               "categories": "113,105,108,107,109,111,115,119",
               "include_all_series_instances": False,
               "token" : EVENTS_KEY
               }
    response = requests.get(EVENT_URL, params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        activity_data = []

        for event in response_obj["events"]:
            activity_datum = {
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

        pp.pprint(activity_data)
        return activity_data

    else:
        pp.pprint("request failed")



get_events_near_area("dog-friendly, pet-friendly", "austin", "100mi")
