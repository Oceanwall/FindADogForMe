from application import application
from routes import (
    index,
    breed_shelters,
    page_not_found,
    activity_query,
    breed_query,
    dog_query,
    shelter_query,
    search_website
)

"""
Runs application
"""

if __name__ == "__main__":
    application.run(host="0.0.0.0")
