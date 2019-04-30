from application.models import Activity, Breed, Dog, Shelter
from flask import Flask, jsonify, request

"""
Utility functions used by the API routes in routes.py.
Allows for code reuse and reduction of code redundancy.
"""


def control_pagination(search_items, page_num, items_per_page):
    """
    Given a desired page and a list of all model instances to respond with, provides pagination of the instances.
    """
    num_pages = len(search_items) // items_per_page
    if len(search_items) % items_per_page != 0:
        num_pages += 1

    if page_num > num_pages:
        page_items = []
    elif page_num == num_pages:
        page_items = search_items[((page_num - 1) * items_per_page) :]
    else:
        page_items = search_items[
            (page_num - 1) * items_per_page : page_num * items_per_page
        ]

    message = {
        "status": 200,
        "num_results": len(search_items),
        "objects": [item.serialize() for item in page_items],
        "total_pages": num_pages,
        "page": page_num,
    }
    response = jsonify(message)
    response.status_code = 200

    return response


def page_number_error():
    """
    Produces an error response if the provided page number is negative.
    """
    message = {"status": 400, "note": "The page number must be positive."}
    response = jsonify(message)
    response.status_code = 400
    return response


def extract_website_search_param(request):
    """
    Gets the search parameter from the query, and standardizes it.
    """
    search_param = request.args.get("search")

    if search_param is not None:
        search_param = search_param.lower()

    return search_param


def search_param_in_item(search_param, item):
    """
    Given a search parameter and a model instance, returns whether or not
    the search parameter is present in any of the model instance's attributes.
    """
    return (
        (
            "name" in item
            and item["name"] is not None
            and search_param in item["name"].lower()
        )
        or (
            "type" in item
            and item["type"] is not None
            and search_param in item["type"].lower()
        )
        or (
            "url" in item
            and item["url"] is not None
            and search_param in item["url"].lower()
        )
        or (
            "description" in item
            and item["description"] is not None
            and search_param in item["description"].lower()
        )
        or (
            "location" in item
            and item["location"] is not None
            and search_param in item["location"].lower()
        )
        or (
            "is_free_string" in item
            and item["is_free_string"] is not None
            and search_param in item["is_free_string"].lower()
        )
        or (
            "designation" in item
            and item["designation"] is not None
            and search_param in item["designation"].lower()
        )
        or (
            "date" in item
            and item["date"] is not None
            and search_param in item["date"].lower()
        )
        or (
            "group" in item
            and item["group"] is not None
            and search_param in item["group"].lower()
        )
        or (
            "min_lifespan" in item
            and item["min_lifespan"] is not None
            and search_param in str(item["min_lifespan"]).lower()
        )
        or (
            "max_lifespan" in item
            and item["max_lifespan"] is not None
            and search_param in str(item["max_lifespan"]).lower()
        )
        or (
            "min_height" in item
            and item["min_height"] is not None
            and search_param in str(item["min_height"]).lower()
        )
        or (
            "max_height" in item
            and item["max_height"] is not None
            and search_param in str(item["max_height"]).lower()
        )
        or (
            "temperament" in item
            and item["temperament"] is not None
            and search_param in item["temperament"].lower()
        )
        or (
            "shelter_name" in item
            and item["shelter_name"] is not None
            and search_param in item["shelter_name"].lower()
        )
        or (
            "breed" in item
            and item["breed"] is not None
            and search_param in item["breed"].lower()
        )
        or (
            "age" in item
            and item["age"] is not None
            and search_param in item["age"].lower()
        )
        or (
            "size" in item
            and item["size"] is not None
            and search_param in item["size"].lower()
        )
        or (
            "zipcode" in item
            and item["zipcode"] is not None
            and search_param in str(item["zipcode"]).lower()
        )
        or (
            "phone" in item
            and item["phone"] is not None
            and search_param in item["phone"].lower()
        )
        or (
            "address" in item
            and item["address"] is not None
            and search_param in item["address"].lower()
        )
        or (
            "city" in item
            and item["city"] is not None
            and search_param in item["city"].lower()
        )
    )
