from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)  # Enable CORS for all routes

# Dummy database for demonstration purposes
users = []

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')

        # Check if username already exists
        if any(user['username'] == username for user in users):
            return {'message': 'Username already exists'}, 400

        # Create new user
        new_user = {'username': username, 'password': password, 'role': role}
        users.append(new_user)

        return {'message': 'User registered successfully'}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Find user by username
        user = next((user for user in users if user['username'] == username), None)

        if user is None or user['password'] != password:
            return {'message': 'Invalid username or password'}, 401

        return {'message': 'Login successful', 'role': user['role']}, 200

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
