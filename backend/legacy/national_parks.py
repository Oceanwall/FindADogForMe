import os
import json
import requests
import pprint
from dotenv import load_dotenv

pp = pprint.PrettyPrinter(indent=2)

PARKS_KEY = os.getenv("NATIONAL_PARKS_API_KEY")
API_URL = "https://api.nps.gov/api/v1/parks?stateCode=TX&fields="


def print_park_info(state):
    "Prints basic information about each park located in a specific state"

    payload = {"stateCode" : state, "fields" : "images", "api_key" : PARKS_KEY}
    response = requests.get(API_URL + "parks?", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        response_data = response_obj["data"]
        for elem in response_data:
            print("-------------------------------------------------")
            print("Park name: " + elem["fullName"])
            print("URL: " + elem["url"])
            print("Designation: " + elem["designation"])
            print("State: " + elem["states"])
            print("Description: " + elem["description"])
            print("Directions Info: " + elem["directionsInfo"])
            print("Weather Info: " + elem["weatherInfo"])

            for image in elem["images"]:
                print("Photo URL: " + image['url'])

            get_park_events(elem['parkCode'])
            print("-------------------------------------------------")
            print()

def get_park_events(park_code):
    """
    Prints out relevant event info for each national park (if they exist)
    park_code - string
    """

    payload = {"parkCode" : park_code, "api_key" : PARKS_KEY}
    response = requests.get(API_URL + "events?", params=payload)

    if response.status_code == 200:
        response_obj = json.loads(response.text)
        response_data = response_obj["data"]

        if response_obj["total"] > 1:
            for elem in response_data:
                print("EVENT INFO")
                print(" Description: " + elem["description"])
                print(" Start date: " + elem["dateStart"])
                print(" Fee Info: " + elem["feeInfo"])
                print(" Dates:" + elem["dates"])

print_park_info("TX")
