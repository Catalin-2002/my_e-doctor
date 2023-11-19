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



# Define your Flask endpoint for POST requests
@app.route('/api/data', methods=['POST'])
def add_data():
    try:
        # Assuming the incoming data is in JSON format
        data = request.get_json()

        # Insert the data into MongoDB
        collection = mongo_conn.db['your_collection_name']
        result = collection.insert_one(data)

        # Optionally, you can return the inserted document ID as a response
        response = {'message': 'Data inserted successfully', 'inserted_id': str(result.inserted_id)}
        return jsonify(response), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
