class Activity(db.Model):
    """
    Represents information about an activity.
    id
    type
    url
    name
    description
    latitude
    longitude
    location
    is_active
    image_1
    image_2
    image_3
    image_4
    ~~~~~~~~~~~(National Parks Only)~~~~~~~~~~~
    designation
    weather
    directions
    ~~~~~~~~~~~((Meetup / Eventbrite Only)~~~~~~~~~~~
    date
    """

class Breed(db.Model):
    """
    Represents information about a breed.
    name (string)
    group (string)
    min_height (number)
    max_height (number)
    min_lifespan (number)
    max_lifespan (number)
    temperament (string)
    min_weight (number)
    max_weight (number)
    image_1 (string)
    image_2 (string)
    image_3 (string)
    image_4 (string)
    is_active (boolean)
    """

class Dog(db.Model):
    """
    Represents information about a dog.
    id
    shelter_id
    name
    breed
    age
    size
    sex
    description
    image_1
    image_2
    image_3
    image_4
    """

class Shelter(db.Model):
    """
    Represents information about a shelter.
    id
    name
    latitude
    longitude
    city
    state
    zipcode
    phone
    address
    """
