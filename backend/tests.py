"""
This module should test backend code (database seeding code)
"""

# Some of the seeding methods have a parameter indicating if they should
# commit their created objects to a database.
# By default, this parameter is set to False.

from unittest import main, TestCase
from seeding.activity_seeding import get_all_parks, build_park, get_all_eventbrites, get_eventbrite_venue, build_event, get_all_meetups, build_meetup
from seeding.breeds_seeding import get_all_breeds, get_breed_images, build_breed
from seeding.dogs_seeding import get_shelters, build_shelter, get_dogs, build_dog
# from application.models import Activity, Breed, Dog, Shelter

class TestBackend(TestCase):
    def test1(self):
        assert(True)


if __name__ == "__main__":
    main()
