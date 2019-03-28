"""
This module should test backend code (database seeding code)
"""

# Some of the seeding methods have a parameter indicating if they should
# commit their created objects to a database.
# By default, this parameter is set to False.

from unittest import main, TestCase
from seeding.activity_seeding import (
    get_all_parks,
    build_park,
    get_all_eventbrites,
    get_eventbrite_venue,
    build_event,
    get_all_meetups,
    build_meetup,
)
from seeding.breeds_seeding import get_all_breeds, get_breed_images, build_breed
from seeding.dogs_seeding import get_shelters, build_shelter, get_dogs, build_dog
from application.models import Activity, Breed, Dog, Shelter


class TestBackend(TestCase):
    def test1(self):
        assert True

    # Begin testing dog seeding scripts
    def test2(self):
        result = get_shelters(count=10)
        assert len(result) == 10

    def test3(self):
        result = get_shelters()
        assert len(result) == 500

    def test4(self):
        shelter_list = get_shelters()
        shelter_ids = set()
        for shelter in shelter_list:
            result = build_shelter(shelter, shelter_ids)
            if result != None:
                assert result.id != None
                assert result.name != None
                assert result.latitude != None
                assert result.longitude != None
                assert result.city != None
                assert result.state != None

    def test5(self):
        shelter_list = get_shelters()
        shelter_ids = set()
        for shelter in shelter_list:
            result = build_shelter(shelter, shelter_ids)
            if result != None:
                assert type(result.id) == str
                assert type(result.name) == str
                assert type(result.latitude) == float
                assert type(result.longitude) == float
                assert type(result.city) == str
                assert type(result.state) == str

    def test6(self):
        result = get_dogs("TX1399", count=10)
        assert len(result) == 10

    def test7(self):
        result = get_dogs("TX1399")
        assert len(result) == 20

    def test8(self):
        dog_list = get_dogs("TX1399")
        for dog in dog_list:
            result = build_dog(dog)
            if result != None:
                assert result.id != None
                assert result.shelter_id != None
                assert result.breed != None
                assert result.age != None
                assert result.size != None
                assert result.name != None
                assert result.sex != None

    def test9(self):
        dog_list = get_dogs("TX1399")
        for dog in dog_list:
            result = build_dog(dog)
            if result != None:
                assert type(result.id) == str
                assert type(result.shelter_id) == str
                assert type(result.breed) == str
                assert type(result.age) == str
                assert type(result.size) == str
                assert type(result.name) == str
                assert type(result.sex) == str

    # Begin tests for breeds_seeding
    def test10(self):
        breed_images = get_breed_images("labrador")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0 
    
    def test11(self):
        breed_list = get_all_breeds()
        breed_one = breed_list[0]
        assert breed_list != []
        assert len(breed_list) > 0 
        assert breed_one != None

    def test12(self):
        breed_list = get_all_breeds()
        test_breed = build_breed(breed_list[0])
        
        assert test_breed.name != None
        assert test_breed.min_height != None
        assert test_breed.max_height != None
        assert test_breed.min_lifespan != None
        assert test_breed.max_lifespan != None
        assert test_breed.temperament != None
        assert test_breed.min_weight != None
        assert test_breed.is_active != None

if __name__ == "__main__":
    main()
