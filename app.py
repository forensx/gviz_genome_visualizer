from flask import Flask, flash, request, redirect, url_for, session
from flask_restplus import Resource, Api
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import os

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('Flask File Uploader:')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['.zip'])

app = Flask(__name__)
api = Api(app)
CORS(app, expose_headers='Authorization')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@api.route('/upload')
class Upload(Resource):
    def post(self):
        target = os.path.join(UPLOAD_FOLDER, 'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload`")
        file = request.files['file']
        filename = secure_filename(file.filename)
        destination = "\\".join([target, filename]) # unicode formatted escape character
        file.save(destination)
        session['uploadFilePath'] = destination
        print(session['uploadFilePath'])
        response = "Whatever you wish too return"
        return {"response": response, "file_url": session['uploadFilePath']}


@api.route('/overlaps')
class Overlaps(Resource):
    def post(self):
        #file_url = request.form['file_url'] # get form from React API call to overlaps
        # return overlaps data with BEDtools (external file)
        return {"response": "Under construction!"}


@api.route('/manhattan')
class Overlaps(Resource):
    def post(self):
        #file_url = request.form['file_url'] # get form from React API call to overlaps
        return {"response": "Under construction!"}


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
