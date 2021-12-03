from flask import Flask, request, jsonify, render_template

from database.DbManager import DataBaseManager
from database.requestInfo import RequestInfo
from database.models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/laureates.db'
db.init_app(app)
app.config['JSON_AS_ASCII'] = False

"?city=all&s_year=1967&e_year=1967&area=Наука&org=all&rank=all&award=all&uesrname=ty"


@app.route('/', methods=['GET'])
def get_template():
    return render_template('index.html')


@app.route("/smapapi/v1.0/getCities", methods=['GET'])
def get_cities():
    city = request.args.get("city")
    start_year = request.args.get("s_year")
    end_year = request.args.get("e_year")
    know = request.args.get("area")
    org = request.args.get("org")
    rank = request.args.get("rank")
    award = request.args.get("award")
    user_name = request.args.get("username")
    request_info = RequestInfo(city, start_year, end_year, know, org, rank, award, user_name)
    print(DataBaseManager.get_cities_info(request_info, app=app, db=db))

    return jsonify(DataBaseManager.get_cities_info(request_info, app=app, db=db)), 200


@app.route("/smap-api/v1.0/getPersons", methods=['GET'])
def get_persons():
    city = request.args.get("city")
    start_year = request.args.get("s_year")
    end_year = request.args.get("e_year")
    know = request.args.get("area")
    org = request.args.get("org")
    rank = request.args.get("rank")
    award = request.args.get("award")
    user_name = request.args.get("username")
    request_info = RequestInfo(city, start_year, end_year, know, org, rank, award, user_name)
    return jsonify(DataBaseManager.get_person(request_info, app, db))


@app.route("/smap-api/v1.0/getFullInfo", methods=['GET'])
def get_full_info_about_person():
    id_award_receiving = request.args.get("id_award_receiving")
    return jsonify(DataBaseManager.get_full_info(id_award_receiving, app))


if __name__ == "__main__":
    app.run()
