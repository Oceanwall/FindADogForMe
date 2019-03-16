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
    name
    group
    height
    lifespan
    temperament
    weight
    image_1
    image_2
    image_3
    image_4
    is_active
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
