seed:
	python3 activity_seeding.py
	python3 dogs_seeding.py
	python3 breeds_seeding.py

reseed_activities:
	python3 activity_seeding.py

schema_update:
	python3 manage.py db migrate
	python3 manage.py db upgrade

# black may affect the usability of the seeding scripts.
format:
	black application.py
	black manage.py
	black tests.py
	# black seeding/activity_seeding.py
	# black seeding/breeds_seeding.py
	# black seeding/dogs_seeding.py
	black application/__init__.py
	black application/models.py
