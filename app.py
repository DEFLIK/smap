from flask import Flask, jsonify, request, render_template
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

test_data = [
    {
        'title': 'test 1',
        'description': 'GET, POST routes'
    },
    {
        'title': 'test 2',
        'description': 'PUT DELETE routes'
    }
]


@app.route('/', methods=['GET'])
def get_cords():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def add_cords():
    test_data.append(request.json)
    return jsonify(test_data)


if __name__ == '__main__':
    app.run()




