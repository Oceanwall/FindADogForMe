import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

if __name__ == '__main__':
    # DO NOT MOVE THIS IMPORT STATEMENT; otherwise, causes circular dependency.
    from models import Activity, Breed, Dog, Shelter

    manager = APIManager(app, flask_sqlalchemy_db=db)

    manager.create_api(Activity,
                       methods=["Get"],
                       results_per_page=12
                       )

    manager.create_api(Breed,
                       methods=["Get"],
                       )

    manager.create_api(Dog,
                       methods=["Get"],
                       results_per_page=12
                       )

    manager.create_api(Shelter,
                       methods=["Get"],
                       results_per_page=12
                       )

    # TODO: Provide example list of endpoints?
    @app.route("/")
    def hello():
        return "Hello World!"

    @app.errorhandler(404)
    def page_not_found(e):
        message = {
            'status': 404,
            'message': 'API request not found',
        }
        response = jsonify(message)
        response.status_code = 404

        return response



    app.run()
