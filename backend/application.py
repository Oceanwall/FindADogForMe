import os
from flask import Flask, jsonify
from application import db, application
from application.models import Activity, Breed, Dog, Shelter
from flask_restless import APIManager

manager = APIManager(application, flask_sqlalchemy_db=db)
manager.create_api(Activity, methods=["Get"], results_per_page=12)
manager.create_api(Breed, methods=["Get"])
manager.create_api(Dog, methods=["Get"], results_per_page=12)
manager.create_api(Shelter, methods=["Get"], results_per_page=12)


@application.route("/")
def hello():
    message = {
        "status": 200,
        "message": "Welcome to FindADogForMe's API! If you need help, check out the Postman Documentation: https://documenter.getpostman.com/view/6754951/S11KQJxc",
    }
    response = jsonify(message)
    response.status_code = 200

    return response


@application.errorhandler(404)
def page_not_found(e):
    message = {"status": 404, "message": "API request not found"}
    response = jsonify(message)
    response.status_code = 404

    return response


if __name__ == "__main__":
    application.run(host="0.0.0.0")
