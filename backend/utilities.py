from application.models import Activity, Breed, Dog, Shelter
from flask import Flask, jsonify, request


def control_pagination(search_items, page_num, items_per_page):
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
    message = {"status": 400, "note": "The page number must be positive."}
    response = jsonify(message)
    response.status_code = 400
    return response
