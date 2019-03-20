import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# DO NOT MOVE THIS IMPORT STATEMENT; otherwise, causes circular dependency.
import models

manager = APIManager(app, flask_sqlalchemy_db=db)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run()
