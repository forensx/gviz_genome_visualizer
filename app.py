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
        first_name = str(request.get_json()['first_name'])
        last_name = str(request.get_json()['last_name'])
        email = str(request.get_json()['email'])
        password = bcrypt.generate_password_hash(
            str(request.get_json()['password'])).decode('utf-8')
        created = datetime.utcnow()

        user_id = users.insert({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "created": created
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

    for field in projects.find():
        result.append(
            {'_id': str(field['_id']),
             'projectTitle': field['projectTitle'],
             "projectAnnotations": field['projectAnnotations'],
             "experiments": field['experiments']
             })

    return jsonify(result)


@app.route('/api/<user_id>/project', methods=['POST'])
def add_project(user_id):

    # GET USERS COLLECTION TO QUERY FROM
    users = mongo.db.users
    # FIND PROJECTS ONLY FOR USER, IF EXIST
    


    projects = mongo.db.projects
    project_Title = request.get_json()['projectTitle']
    project_Annotations = request.get_json()['projectAnnotations']
    project_Owner = request.get_json()['projectOwner']

    project_id = projects.insert_one({
        'projectOwner': project_Owner,
        'projectTitle': project_Title,
        "projectAnnotations": project_Annotations,
        "experiments": []
    })

    new_project = projects.find_one({'_id': project_id})

    result = {'projectTitle': new_project['projectTitle'],
              'projectAnnotations': new_project['projectAnnotations'],
              'experiments': new_project['experiments'],
              }

    return jsonify({'result': result})


@app.route('/api/project/<id>', methods=['PUT'])
def update_project(id):
    projects = mongo.db.projects
    title = request.get_json()['projectTitle']

    projects.find_one_and_update({'_id': ObjectId(id)}, {
                                 "$set": {"title": title}},
                                 upsert=False)
    new_project = projects.find_one({'_id': ObjectId(id)})

    result = {'title': new_project['title']}

    return jsonify({"result": result})


@app.route('/api/project/<id>', methods=['DELETE'])
def delete_project(id):
    projects = mongo.db.projects

    response = projects.delete_one({'_id': ObjectId(id)})

    if response.deleted_count == 1:
        result = {'message': 'Project deleted successfully'}
    else:
        result = {'message': 'No project found'}

    return jsonify({'result': result})


@app.route('/api/project/<id>/experiment', methods=['PUT'])
def add_experiment(id):
    projects = mongo.db.projects
    experimentTitle = request.get_json()['experimentTitle']
    experimentAnnotations = request.get_json()['experimentAnnotations']

    projects.update_one({'_id': ObjectId(id)}, {
        "$push": {
            "experiments":
            {
                "experimentTitle": experimentTitle,
                "experimentAnnotations": experimentAnnotations
            }
        }}, upsert=False)

    result = {'experimentTitle': experimentTitle}

    return jsonify({"result": result})


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
