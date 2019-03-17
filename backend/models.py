class Activity(db.Model):
    """
    Represents information about an activity.
    id (lowercase string)
    type (lowercase string)
    url (string)
    name (string)
    description (string)
    latitude (number)
    longitude (number)
    location (string)
    is_active (boolean)
    is_free (boolean)
    cost(number)
    image_1 (string)
    image_2 (string)
    image_3 (string)
    image_4 (string)
    ~~~~~~~~~~~(National Parks Only)~~~~~~~~~~~
    designation (string)
    weather (string)
    directions (string)
    ~~~~~~~~~~~((Meetup / Eventbrite Only)~~~~~~~~~~~
    date (string)
    """

class Breed(db.Model):
    """
    Represents information about a breed.
    name (lowercase string)
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
    id (number)
    shelter_id (string)
    name (string)
    breed (lowercase string)
    age (number)
    size (string)
    sex (string)
    description (string)
    image_1 (string)
    image_2 (string)
    image_3 (string)
    image_4 (string)
    """

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
