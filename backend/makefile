seed:
	python3 activity_seeding.py
	python3 dogs_seeding.py
	python3 breeds_seeding.py

reseed_activities:
	python3 activity_seeding.py

schema_update:
	python3 manage.py db migrate
	python3 manage.py db upgrade

format:
	black application
	black migrations
	black seeding
	black application.py
	black manage.py
	black routes.py
	black tests.py
	black utilities.py
