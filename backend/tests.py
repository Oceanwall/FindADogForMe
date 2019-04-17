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
            result = build_shelter(shelter, shelter_ids, {})
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
            result = build_shelter(shelter, shelter_ids, {})
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
        assert len(result) == 30

    def test8(self):
        dog_list = get_dogs("TX1399")
        for dog in dog_list:
            result = build_dog(dog, {"TX1399": "Mutts & Meows Rescue"})
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
            result = build_dog(dog, {"TX1399": "Mutts & Meows Rescue"})
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

    # Begin tests for activity_seeding
    def test13(self):
        parks = get_all_parks()
        assert parks != None
        assert parks != []
        assert len(parks) > 0

    def test14(self):
        parks = get_all_parks()
        for park in parks:
            test_park = build_park(park)
            if test_park != None:
                assert test_park.id != None
                assert test_park.type != None
                assert test_park.url != None
                assert test_park.name != None
                assert test_park.description != None
                assert test_park.latitude != None
                assert test_park.longitude != None
                assert test_park.location != None
                assert test_park.is_active != None
                assert test_park.is_free != None
                assert test_park.image_1 != None
                assert test_park.image_2 != None
                assert test_park.image_3 != None
                assert test_park.image_4 != None
                assert test_park.designation != None
                assert test_park.weather != None
                assert test_park.directions != None

    def test15(self):
        eventbrites = get_all_eventbrites()
        assert eventbrites != None

    def test16(self):
        eventbrites = get_all_eventbrites()
        eventbrite_venue = get_eventbrite_venue(eventbrites[0]["venue_id"])
        assert eventbrite_venue != None

    def test17(self):
        eventbrites = get_all_eventbrites()
        test_event = eventbrites[0]
        result = build_event(test_event)
        assert result.id != None
        assert result.type != None
        assert result.url != None
        assert result.name != None
        assert result.description != None
        assert result.latitude != None
        assert result.longitude != None
        assert result.is_active != None
        assert result.is_free != None
        assert result.date != None

    def test18(self):
        meetups = get_all_meetups()
        assert type(meetups) == type([])
        assert len(meetups) > 0

    def test19(self):
        meetups = get_all_meetups()
        test_meetup = meetups[0]
        result = build_meetup(test_meetup)
        assert result.id != None
        assert result.type != None
        assert result.url != None
        assert result.name != None
        assert result.description != None
        assert result.latitude != None
        assert result.longitude != None
        assert result.location != None
        assert result.is_active != None
        assert result.is_free != None
        assert result.date != None

    def test20(self):
        result = get_shelters(count=20)
        assert len(result) == 20

    def test21(self):
        result = get_dogs("TX1399", count=20)
        assert len(result) == 20

    def test22(self):
        result = get_dogs("TX1399", count=25)
        assert len(result) == 25

    def test23(self):
        result = get_dogs("TX1399")
        assert len(result) == 30

    def test24(self):
        breed_images = get_breed_images("border collie")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test25(self):
        breed_images = get_breed_images("bull terrier")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test26(self):
        breed_images = get_breed_images("afghan hound")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test27(self):
        breed_images = get_breed_images("akita")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test28(self):
        breed_images = get_breed_images("american bulldog")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test29(self):
        breed_images = get_breed_images("basenji")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0

    def test30(self):
        breed_images = get_breed_images("beagle")
        assert type(breed_images) == type([])
        assert len(breed_images) > 0


if __name__ == "__main__":
    main()
