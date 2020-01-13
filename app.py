from flask import Flask, flash, request, redirect, url_for, session, jsonify, json
from flask_restplus import Resource, Api
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from datetime import datetime

import logging
import os

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['.zip'])

app = Flask(__name__)
api = Api(app)
app.config['MONGO_DBNAME'] = 'gviz'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/gviz'
app.config['JWT_SECRET_KEY'] = 'p92UY62Irdc9eFnfSmMiHE5oMPjWiznF'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, expose_headers='Authorization')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@api.route('/register')
class Register(Resource):
    def post(self):
        users = mongo.db.users
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        #admin = request.get_json()['admin']
        password = bcrypt.generate_password_hash(
            request.get_json()['password']).decode('utf-8')
        created = datetime.utcnow()

        user_id = users.insert_one({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
            # 'admin': admin,
            'created': created
        })

        new_user = users.find_one({'_id': user_id})

        result = {'email': new_user['email'] + ' registered'}

        return jsonify({'result': result})


@api.route('/login')
class Login(Resource):
    def post(self):
        users = mongo.db.users
        email = request.get_json()['email']
        password = request.get_json()['password']
        result = ""

        response = users.find_one({'email': email})

        if response:
            if bcrypt.check_password_hash(response['password'], password):
                access_token = create_access_token(identity={
                    'first_name': response['first_name'],
                    'last_name': response['last_name'],
                    'email': response['email']
                })
                result = jsonify({'token': access_token})
            else:
                result = jsonify({"error": "Invalid username and password"})
        else:
            result = jsonify({"result": "No results found"})

        return result
    
@app.route('/api/projects', methods=['GET'])
def get_all_projects():
    projects = mongo.db.projects

    result = []

    for field in projects.find():
        result.append({'_id': str(field['_id']), 'title': field['title']})
    return jsonify(result)


@app.route('/api/project', methods=['POST'])
def add_task():
    projects = mongo.db.projects
    title = request.get_json()['title']

    project_id = projects.insert({'title': title})
    new_project = projects.find_one({'_id': project_id})

    result = {'title': new_project['title']}

    return jsonify({'result': result})


@app.route('/api/project/<id>', methods=['PUT'])
def update_task(id):
    projects = mongo.db.projects
    title = request.get_json()['title']

    projects.find_one_and_update({'_id': ObjectId(id)}, {
                                 "$set": {"title": title}}, upsert=False)
    new_project = projects.find_one({'_id': ObjectId(id)})

    result = {'title': new_project['title']}

    return jsonify({"result": result})


@app.route('/api/project/<id>', methods=['DELETE'])
def delete_task(id):
    projects = mongo.db.projects

    response = projects.delete_one({'_id': ObjectId(id)})

    if response.deleted_count == 1:
        result = {'message': 'Project deleted successfully'}
    else:
        result = {'message': 'No project found'}

    return jsonify({'result': result})

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)    