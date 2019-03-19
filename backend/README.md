To re-seed database:
```
make seed
```
OR
```
python3 activity_seeding.py
python3 breeds_seeding.py
python3 pets_seeding.py
python3 shelter_seeding.py
```

To update table schema after changing model:
```
make schema_update
```
OR
```
python3 manage.py db migrate
python3 manage.py db upgrade
```
