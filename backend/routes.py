import os
from flask import Flask, jsonify, request
from application import db, application
from application.models import Activity, Breed, Dog, Shelter
from flask_restless import APIManager
from utilities import control_pagination, page_number_error

# Sort types
ALPHABETICAL = "alphabetical"
REVERSE_ALPHABETICAL = "reverse_alphabetical"
DATE = "date"
REVERSE_DATE ="reverse_date"
ZIPCODE = "zipcode"
REVERSE_ZIPCODE = "reverse_zipcode"
SIZE = "size"
REVERSE_SIZE = "reverse_size"
GROUP = "group"
REVERSE_GROUP = "reverse_group"

"""
Sets up Flask Restless API Manager.
Also provides routing for the index page, 404 errors, and search / sort / filter queries.
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


# Activity Search / Sort / Filter Query
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
        return page_number_error()

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

    if sort_param == DATE:
        valid_items = valid_items.filter(Activity.date != None).order_by(Activity.date)
    elif sort_param == REVERSE_DATE:
        valid_items = valid_items.filter(Activity.date != None).order_by(Activity.date.desc())

    valid_items = valid_items.all();
    search_items = valid_items;

    if search_param is not None:
        search_items = []
        for object in valid_items:
            item = object.serialize()
            if ((item["name"] is not None and search_param in item["name"].lower()) or
               (item["date"] is not None and search_param in item["date"].lower()) or
               (item["designation"] is not None and search_param in item["designation"].lower()) or
               (item["is_free_string"] is not None and search_param in item["is_free_string"].lower()) or
               (item["location"] is not None and search_param in item["location"].lower()) or
               (item["type"] is not None and search_param in item["type"].lower())):
                search_items.append(object)

    return control_pagination(search_items, page_num, 12)


# Breed Search / Sort / Filter Query
@application.route("/api/breed/query")
def breed_query():
    # TODO: Reject invalid lifespan and height parameters?
    group_filter = request.args.get("group")
    lifespan_filter = request.args.get("lifespan")
    height_filter = request.args.get("height")
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
        return page_number_error()

    valid_items = Breed.query

    if group_filter is not None:
        valid_items = valid_items.filter_by(group=group_filter)

    if lifespan_filter is not None:
        lifespan_filter = float(lifespan_filter)
        valid_items = valid_items.filter(Breed.min_lifespan <= lifespan_filter).filter(Breed.max_lifespan >= lifespan_filter)

    if height_filter is not None:
        height_filter = float(height_filter)
        valid_items = valid_items.filter(Breed.min_height <= height_filter).filter(Breed.max_height >= height_filter)

    if sort_param == ALPHABETICAL:
        valid_items = valid_items.order_by(Breed.name)
    elif sort_param == REVERSE_ALPHABETICAL:
        valid_items = valid_items.order_by(Breed.name.desc())
    elif sort_param == GROUP:
        valid_items = valid_items.order_by(Breed.group)
    elif sort_param == REVERSE_GROUP:
        valid_items = valid_items.order_by(Breed.group.desc())

    valid_items = valid_items.all();
    search_items = valid_items;

    if search_param is not None:
        search_items = []
        for object in valid_items:
            item = object.serialize()
            if ((item["name"] is not None and search_param in item["name"].lower()) or
               (item["group"] is not None and search_param in item["group"].lower()) or
               (item["temperament"] is not None and search_param in item["temperament"].lower()) or
               (item["min_lifespan"] is not None and search_param in str(item["min_lifespan"])) or
               (item["max_lifespan"] is not None and search_param in str(item["max_lifespan"])) or
               (item["min_height"] is not None and search_param in str(item["min_height"])) or
               (item["max_height"] is not None and search_param in str(item["max_height"]))):
                search_items.append(object)

    return control_pagination(search_items, page_num, 20)


# Dog Search / Sort / Filter Query
@application.route("/api/dog/query")
def dog_query():
    breed_filter = request.args.get("breed")
    age_filter = request.args.get("age")
    size_filter = request.args.get("size")
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
        return page_number_error()

    valid_items = Dog.query

    if breed_filter is not None:
        valid_items = valid_items.filter_by(breed=breed_filter)

    if age_filter is not None:
        valid_items = valid_items.filter_by(age=age_filter)

    if size_filter is not None:
        valid_items = valid_items.filter_by(size=size_filter)

    if sort_param == ALPHABETICAL:
        valid_items = valid_items.order_by(Dog.name)
    elif sort_param == REVERSE_ALPHABETICAL:
        valid_items = valid_items.order_by(Dog.name.desc())
    # Inversion here is intended so that it goes (ascending) S M L (XL).
    elif sort_param == SIZE:
        valid_items = valid_items.order_by(Dog.size.desc())
    elif sort_param == REVERSE_SIZE:
        valid_items = valid_items.order_by(Dog.size)

    valid_items = valid_items.all();
    search_items = valid_items;

    if search_param is not None:
        search_items = []
        for object in valid_items:
            item = object.serialize()
            if ((item["name"] is not None and search_param in item["name"].lower()) or
               (item["shelter_name"] is not None and search_param in item["shelter_name"].lower()) or
               (item["breed"] is not None and search_param in item["breed"].lower()) or
               (item["age"] is not None and search_param in item["age"].lower()) or
               (item["size"] is not None and search_param in item["size"].lower())):
                search_items.append(object)

    return control_pagination(search_items, page_num, 20)


# Shelter Search / Sort / Filter Query
@application.route("/api/shelter/query")
def shelter_query():
    city_filter = request.args.get("city")
    zipcode_filter = request.args.get("zipcode")
    phone_filter = request.args.get("phone")
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
        return page_number_error()

    valid_items = Shelter.query

    if city_filter is not None:
        valid_items = valid_items.filter_by(city=city_filter)

    if zipcode_filter is not None:
        valid_items = valid_items.filter_by(zipcode=zipcode_filter)

    if phone_filter is not None:
        valid_items = valid_items.filter(Shelter.phone.startswith(phone_filter))

    if sort_param == ALPHABETICAL:
        valid_items = valid_items.order_by(Shelter.name)
    elif sort_param == REVERSE_ALPHABETICAL:
        valid_items = valid_items.order_by(Shelter.name.desc())
    if sort_param == ZIPCODE:
        valid_items = valid_items.order_by(Shelter.zipcode)
    elif sort_param == REVERSE_ZIPCODE:
        valid_items = valid_items.order_by(Shelter.zipcode.desc())

    valid_items = valid_items.all();
    search_items = valid_items;

    if search_param is not None:
        search_items = []
        for object in valid_items:
            item = object.serialize()
            if ((item["name"] is not None and search_param in item["name"].lower()) or
               (item["city"] is not None and search_param in item["city"].lower()) or
               (item["zipcode"] is not None and search_param in str(item["zipcode"])) or
               (item["phone"] is not None and search_param in str(item["phone"])) or
               (item["address"] is not None and search_param in item["address"].lower())):
                search_items.append(object)

    return control_pagination(search_items, page_num, 12)


@application.route("/api/breed/shelter")
def breed_shelters():
    breed = request.args.get("breed")
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
