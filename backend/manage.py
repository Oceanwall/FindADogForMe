from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from application import application, db
from application.models import Activity, Breed, Dog, Shelter

"""
Handles SQLAlchemy database migrations.
"""

migrate = Migrate(application, db)
manager = Manager(application)

manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    manager.run()
