from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
application.config.from_object('config')
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
