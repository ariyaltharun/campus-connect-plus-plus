from neomodel import config, db
import os
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

def get_database_instance():
    config.DATABASE_URL = os.environ.get('DATABASE_URL')
    return db


def get_mongodb_instance(collection_name):
    MONGODB_URL = os.environ.get('MONGODB_URL')
    client = MongoClient(MONGODB_URL)
    db = client.get_default_database()[collection_name]
    return db
