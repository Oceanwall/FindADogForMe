from app import db

# class Activity(db.Model):
#     """
#     Represents information about an activity.
#     id (lowercase string)
#     type (lowercase string)
#     url (string)
#     name (string)
#     description (string)
#     latitude (number)
#     longitude (number)
#     location (string)
#     is_active (boolean)
#     is_free (boolean)
#     image_1 (string)
#     image_2 (string)
#     image_3 (string)
#     image_4 (string)
#     ~~~~~~~~~~~(National Parks Only)~~~~~~~~~~~
#     designation (string)
#     weather (string)
#     directions (string)
#     ~~~~~~~~~~~((Meetup / Eventbrite Only)~~~~~~~~~~~
#     date (string)
#     """
#
# class Breed(db.Model):
#     """
#     Represents information about a breed.
#     name (lowercase string)
#     group (string)
#     min_height (number)
#     max_height (number)
#     min_lifespan (number)
#     max_lifespan (number)
#     temperament (string)
#     min_weight (number)
#     max_weight (number)
#     image_1 (string)
#     image_2 (string)
#     image_3 (string)
#     image_4 (string)
#     is_active (boolean)
#     """
#
# class Dog(db.Model):
#     """
#     Represents information about a dog.
#     id (number)
#     shelter_id (string)
#     name (string)
#     breed (lowercase string)
#     age (string)
#     size (string)
#     sex (string)
#     description (string)
#     image_1 (string)
#     image_2 (string)
#     image_3 (string)
#     image_4 (string)
#     """

class Shelter(db.Model):
    """
    Represents information about a shelter.
    id (string)
    name (string)
    latitude (number)
    longitude (number)
    city (string)
    state (string)
    zipcode (number)
    phone (string)
    address (string)
    """

    __tablename__ = "shelter"
    id = db.Column(db.String(25), primary_key=True, nullable=False)
    name = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    city = db.Column(db.String(255))
    state = db.Column(db.String(50))
    zipcode = db.Column(db.Integer)
    phone = db.Column(db.String(50))
    address = db.Column(db.String(255))

    def __init__(self, id, name, latitude, longitude, city, state, zipcode, phone, address):
        self.id = id
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.phone = phone
        self.address = address

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "phone": self.phone,
            "address": self.address
        }
