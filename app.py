from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/klimm/Desktop/smap/test.db'
# db = SQLAlchemy(app)
#
#
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#
#     def __repr__(self):
#         return '<User %r>' % self.username
#
#
# db.create_all()

features = [
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [55.75244503863624, 37.62483958203125]
        },
        'options': {
            'preset': 'islands#redIcon'
        },
        'properties': {
            'iconCaption': 1980
        },
        'id': 'flex'
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [56.11645027501593, 47.451569300863646]
        },
        'options': {
            'preset': 'islands#redIcon'
        },
        'properties': {
            'iconCaption': 222
        },
        'id': 'kek'
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [56.13971149429552, 47.260143579860504]
        },
        'options': {
            'preset': 'islands#redIcon'
        },
        'properties': {
            'iconCaption': 1940
        },
        'id': 'bruh'
    }
]

data = {
    'kek': 'Очень умный и крутой чел',
    'bruh': 'Немного брух чел',
    'flex': 'Чрезмерно крутой чел'
}


@app.route('/', methods=['GET'])
def get_template():
    if request.content_type == 'application/json':
        return jsonify(features)
    return render_template('index.html', cords=features)


@app.route('/', methods=['POST'])
def add_cords():
    js = request.json
    new_feature = {
        'type': 'Feature',
        'geometry': {
            'id': f'{len(features)}',
            'type': 'Point',
            'coordinates': [int(js['cordX']), int(js['cordY'])]
        },
        'options': {
            'preset': 'islands#redIcon'
        },
        'properties': {
            'iconCaption': int(js['cordYear'])
        },
        'id': js['cordId']
    }
    features.append(new_feature)
    data[js['cordId']] = js['dataInfo']
    return jsonify(features)


@app.route('/<id>', methods=['GET'])
def get_info(id: str):
    return jsonify({'info': data[id]})


if __name__ == '__main__':
    app.run()




