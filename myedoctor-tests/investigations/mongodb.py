from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

class MongoDBConnection:
    def __init__(self, host='localhost', port=27017, database_name='mye-doctor'):
        self.host = host
        self.port = port
        self.database_name = database_name
        self.client = None
        self.db = None

    def connect(self):
        try:
            self.client = MongoClient(self.host, self.port)
            self.db = self.client[self.database_name]
            print(f"Connected to MongoDB: {self.host}:{self.port}/{self.database_name}")
        except Exception as e:
            print(f"Error: Unable to connect to MongoDB - {e}")

    def disconnect(self):
        if self.client:
            self.client.close()
            print("Disconnected from MongoDB")
