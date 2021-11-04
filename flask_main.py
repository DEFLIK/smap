from flask import Flask, url_for, request, render_template
import jyserver.Flask as jsf
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

@jsf.use(app)
class JSConnectedApp:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
        self.js.document.getElementById("count").innerHTML = self.count


@app.route('/')
def main():
    return render_template('index.html')
