import os
from flask import Flask, jsonify, request
from application import db, application
from application.models import Activity, Breed, Dog, Shelter
from flask_restless import APIManager

# Sort types
ALPHABETICAL = "alphabetical"
REVERSE_ALPHABETICAL = "reverse_alphabetical"
ZIPCODE = "zipcode"
REVERSE_ZIPCODE = "reverse_zipcode"
SIZE = "size"
REVERSE_SIZE = "reverse_size"
LIFESPAN = "lifespan"
REVERSE_LIFESPAN = "reverse_lifespan"


"""
Sets up Flask Restless API Manager.
Also provides routing for the index page and 404 errors.
"""

@application.route("/")
def index():
    message = {
        "status": 200,
        "message": "Welcome to FindADogForMe's API! If you need help, check out the Postman Documentation: https://documenter.getpostman.com/view/6754951/S11KQJxc",
    }
    response = jsonify(message)
    response.status_code = 200

    return response


@application.route("/api/activity/query")
def activity_query():
    activity_filter = request.args.get("active")
    free_filter = request.args.get("free")
    type_filter = request.args.get("type")
    search_param = request.args.get("search")
    sort_param = request.args.get("sort")
    page_num = request.args.get("page")

    if page_num is None:
        page_num = 1
    else:
        page_num = int(page_num)

    if search_param is not None:
        search_param = search_param.lower()

    if int(page_num) < 1:
        message = {"status": 400, "note": "The page number must be positive."}
        response = jsonify(message)
        response.status_code = 400
        return response

    valid_items = Activity.query

    if activity_filter is not None:
        valid_items = valid_items.filter_by(is_active=activity_filter)

    if free_filter is not None:
        valid_items = valid_items.filter_by(is_free=free_filter)

    if type_filter is not None:
        valid_items = valid_items.filter_by(type=type_filter)

    if sort_param == ALPHABETICAL:
        valid_items = valid_items.order_by(Activity.name)
    elif sort_param == REVERSE_ALPHABETICAL:
        valid_items = valid_items.order_by(Activity.name.desc())

    valid_items = valid_items.all();
    search_items = valid_items;

    if search_param is not None:
        search_items = []
        for object in valid_items:
            item = object.serialize()
            # TODO: Account for fact that "free vs not free" is generated via frontend?
            # TODO: Make all database string entries lowercase?
            if ((item["name"] is not None and search_param in item["name"].lower()) or
               (item["date"] is not None and search_param in item["date"].lower()) or
               (item["location"] is not None and search_param in item["location"].lower()) or
               (item["type"] is not None and search_param in item["type"].lower())):
                search_items.append(object)

    num_pages = len(search_items) // 12
    if len(search_items) % 12 != 0:
        num_pages += 1

    if page_num > num_pages:
        page_items = []
    elif page_num == num_pages:
        page_items = search_items[((page_num - 1) * 12):]
    else:
        page_items = search_items[(page_num - 1) * 12: page_num * 12]

    message = {
        "status": 200,
        "num_results": len(search_items),
        "objects": [item.serialize() for item in page_items],
        "total_pages": num_pages,
        "page": page_num
    }
    response = jsonify(message)
    response.status_code = 200

    return response


@application.route("/api/breed/query")
def breed_query():
    group_filter = request.args.get("group")
    lifespan_filter = request.args.get("lifespan")
    height_filter = request.args.get("height")
    search_param = request.args.get("search")
    sort_param = request.args.get("sort")
    page_num = request.args.get("page")

    response = jsonify("hook em")
    response.status_code = 200

    return response


@application.route("/api/dog/query")
def dog_query():
    breed_filter = request.args.get("breed")
    age_filter = request.args.get("age")
    size_filter = request.args.get("size")
    search_param = request.args.get("search")
    sort_param = request.args.get("sort")
    page_num = request.args.get("page")

    response = jsonify("hook em")
    response.status_code = 200

    return response

@application.route("/api/shelter/query")
def shelter_query():
    city_filter = request.args.get("city")
    zipcode_filter = request.args.get("zipcode")
    phone_filter = request.args.get("phone")
    search_param = request.args.get("search")
    sort_param = request.args.get("sort")
    page_num = request.args.get("page")

    response = jsonify("hook em")
    response.status_code = 200

    return response


@application.route("/api/breed/shelter")
def breed_shelters():
    breed = request.args.get("breed")
    # TODO: Abstract into its own method.
    if breed is None or breed == "":
        message = {"status": 400, "note": "The breed parameter is required."}
        response = jsonify(message)
        response.status_code = 400

        return response

    good_shelters = []
    shelters = Shelter.query.limit(100).all()
    dogs = []
    for shelter in shelters:
        dogs += Dog.query.filter_by(shelter_id=shelter.id).limit(20).all()
        for dog in dogs:
            if dog.breed == breed:
                good_shelters.append(shelter)
                break
        if len(good_shelters) >= 6:
            break

    message = {
        "status": 200,
        "num_results": len(good_shelters),
        "objects": [s.serialize() for s in good_shelters],
    }
    response = jsonify(message)
    response.status_code = 200

    return response


manager = APIManager(application, flask_sqlalchemy_db=db)
manager.create_api(Activity, methods=["Get"], results_per_page=12)
manager.create_api(Breed, methods=["Get"], results_per_page=0)
manager.create_api(Dog, methods=["Get"], results_per_page=20)
manager.create_api(Shelter, methods=["Get"], results_per_page=12)


@application.errorhandler(404)
def page_not_found(e):
    message = {"status": 404, "message": "API request not found"}
    response = jsonify(message)
    response.status_code = 404

    return response
