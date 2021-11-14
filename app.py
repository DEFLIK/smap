from flask import Flask, jsonify, request, render_template, redirect, url_for
from database.models import *
import csv
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/laureates.db'
db.init_app(app)


@app.route('/', methods=['GET'])
def get_template():
    if request.content_type == 'application/json':
        res = []
        with open('db.csv', newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='|')
            first = True
            for row in reader:
                if first:
                    first = False
                    continue
                res.append({
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [row[1], row[2]]
                    },
                    'options': {
                        'preset': 'islands#redIcon'
                    },
                    'properties': {
                        'iconCaption': row[3]
                    },
                    'id': row[0]})

        return jsonify(res)
    return render_template('index.html')


@app.route('/', methods=['POST'])
def add_cords():
    js = request.json
    res = []
    with open('db.csv', 'a', newline='') as csvfile:
        file = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        file.writerow([js['cordId'], js['cordX'], js['cordY'], js['cordYear'], js['dataInfo']])
    with open('db.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        first = True
        for row in reader:
            if first:
                first = False
                continue
            res.append({
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [row[1], row[2]]
                },
                'options': {
                    'preset': 'islands#redIcon'
                },
                'properties': {
                    'iconCaption': row[3]
                },
                'id': row[0]})
    return jsonify(res)


@app.route('/<id>', methods=['GET'])
def get_info(id: str):
    res = ''
    with open('db.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            if row[0] == id:
                res = row[4]

    return jsonify({'info': res})


if __name__ == '__main__':
    app.run()




