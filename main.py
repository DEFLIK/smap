from flask import Flask, request, jsonify, render_template

from DBManager import DataBaseManager
from database.requestInfo import RequestInfo
from database.models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/laureates.db'
db.init_app(app)
app.config['JSON_AS_ASCII'] = False

"?city=all&s_year=1967&e_year=1967&area=Наука&org=all&rank=all&award=all&username=ty"


def get_request_info():
    return RequestInfo(city=request.args.get("city"),
                       s_year=request.args.get("s_year"),
                       e_year=request.args.get("e_year"),
                       area=request.args.get("area").split(','),
                       org=request.args.get("org"),
                       rank=request.args.get("rank").split(','),
                       award=request.args.get("award").split(','),
                       username=request.args.get("username"))


def check_request_info(request_info: RequestInfo):
    if not request_info.city:
        return "Ошибка в url(city)"
    elif not request_info.start_year:
        return "Ошибка в url(s_year)"
    elif not request_info.end_year:
        return "Ошибка в url(e_year)"
    elif not request_info.area:
        return "Ошибка в url(area)"
    elif not request_info.organization:
        return "Ошибка в url(organization)"
    elif not request_info.rank:
        return "Ошибка в url(rank)"
    elif not request_info.award:
        return "Ошибка в url(award)"
    elif not request_info.username:
        return "Ошибка в url(username)"
    return "OK"


@app.route('/', methods=['GET'])
def get_template():
    return render_template('index.html')


@app.route("/smap-api/v1.0/getNumberOfPeopleInCities", methods=['GET'])
def get_cities():
    request_info = get_request_info()
    check = check_request_info(request_info)
    if check != "OK":
        return jsonify({"message": check}), 404
    result = DataBaseManager.get_cities_info(request_info, app=app, db=db)
    if not result:
        return jsonify({"message": "Ошибка в названии города. Возможно, неправильное значение для параметра или "
                                   "что-то другое"}), 404
    return jsonify(result), 200


@app.route("/smap-api/v1.0/getPeople", methods=['GET'])
def get_people():
    request_info = get_request_info()
    check = check_request_info(request_info)
    if check != "OK":
        return jsonify({"message": check}), 404
    return jsonify(DataBaseManager.get_people(request_info, app, db)), 200


@app.route("/smap-api/v1.0/getPieceOfPeople", methods=['GET'])
def get_piece_of_people():
    request_info = get_request_info()
    if not request.args['start_index']:
        return jsonify({"message": "Ошибка в url(start_index)"}), 404
    start_index = int(request.args['start_index'])
    check = check_request_info(request_info)
    if check != "OK":
        return jsonify({"message": check}), 404
    return jsonify(DataBaseManager.get_piece_of_people(request_info, app, db, start_index)), 200


@app.route("/smap-api/v1.0/getMoreInfoAboutPerson", methods=['GET'])
def get_more_info_about_person():
    id_award_receiving = request.args.get("id_award_receiving")
    if not id_award_receiving:
        return jsonify({"message": "Ошибка в url(id_award_receiving). Возможно, забыл задать значение "
                                   "id_award_receiving или ошибка в названии переменной.  Возможно ещё что-то"}), 404
    result = DataBaseManager.get_full_info(id_award_receiving, app)
    if not result:
        return jsonify({"message": "Ошибка в значении id_award_receiving. Возможно превышает количество записей или "
                                   "неправильное значение для параметра. Возможно ещё что-то"}), 404
    return jsonify(DataBaseManager.get_full_info(id_award_receiving, app)), 200


@app.route("/smap-api/v1.0/getUsernamesForFilter", methods=['GET'])
def get_usernames_for_filter():
    return jsonify(DataBaseManager.get_usernames_for_filter(app=app, db=db)), 200


@app.route("/smap-api/v1.0/getYearsForFilter", methods=['GET'])
def get_years_for_filter():
    return jsonify(DataBaseManager.get_years_for_filter(app=app, db=db)), 200


@app.route("/smap-api/v1.0/getRanksForFilter", methods=['GET'])
def get_ranks_for_filter():
    return jsonify(DataBaseManager.get_ranks_for_filter(app=app, db=db)), 200


@app.route("/smap-api/v1.0/getKnowledgeAreasForFilter", methods=['GET'])
def get_knowledge_areas_for_filter():
    return jsonify(DataBaseManager.get_knowledge_areas_for_filter(app=app, db=db)), 200


@app.route("/smap-api/v1.0/getAwardsNamesForFilter", methods=['GET'])
def get_awards_names_for_filter():
    return jsonify(DataBaseManager.get_awards_names_for_filter(app=app, db=db)), 200


@app.route("/smap-api/v1.0/getOrganizationsNamesForFilter", methods=['GET'])
def get_organizations_names_for_filter():
    return jsonify(DataBaseManager.get_organizations_names_for_filter(app=app, db=db)), 200


if __name__ == "__main__":
    app.run()
