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

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('Flask File Uploader:')

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


@api.route('/upload')
class Upload(Resource):
    def post(self):
        target = os.path.join(UPLOAD_FOLDER, 'test_docs')

        if not os.path.isdir(target):
            os.mkdir(target)

        logger.info("welcome to upload`")

        file = request.files['file']
        filename = secure_filename(file.filename)
        # unicode formatted escape character
        destination = "\\".join([target, filename])
        file.save(destination)
        session['uploadFilePath'] = destination

        print(session['uploadFilePath'])
        response = "Whatever you wish too return"

        return {"response": response, "file_url": session['uploadFilePath']}


@api.route('/api/projects')
class Projects(Resource):
    def get(self):
        projects = mongo.db.projects

        result = []

        for field in projects.find():
            result.append({
                "_id": str(field['_id']),
                "title": field['title']
            })

        return jsonify(result)

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
