from neomodel import config, db
import os
from dotenv import load_dotenv


load_dotenv()

def get_database_instance():
    config.DATABASE_URL = os.environ.get('DATABASE_URL')
    return db
