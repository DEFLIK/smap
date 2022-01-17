import sqlalchemy

from database.requestInfo import RequestInfo
from database.models import Award, AwardYear, AwardName, AwardReceiving, Address, Organization, Person, KnowledgeField
from sqlalchemy import and_, or_


class DataBaseManager:
    def get_data(request_info: RequestInfo, db):
        return db.session.query(AwardReceiving).join(
            db.session.query(Organization).join(Address).filter(and_(
                DataBaseManager.get_organization_filter(request_info.organization),
                DataBaseManager.get_city_filter(request_info.city))
            )).join(
            db.session.query(Person).filter(
                DataBaseManager.get_username_filter(request_info.username))).join(
            db.session.query(Award).join(KnowledgeField).join(AwardName).join(AwardYear).filter(and_(
                DataBaseManager.get_award_name_filter(request_info.award),
                DataBaseManager.get_area_filter(request_info.area),
                DataBaseManager.get_year_filter(request_info.start_year, request_info.end_year),
                DataBaseManager.get_rank_filter(request_info.rank)))).order_by(
            db.session.query(AwardYear.award_year).join(Award).filter(Award.id_award == AwardReceiving.id_award))

    def check_rank(rank):
        if not rank:
            return ""
        return rank

    def get_full_info(id_award_receiving: int, app):
        with app.app_context():
            data = AwardReceiving.query.get(id_award_receiving)
            if not data:
                return None
            team = []
            for record in AwardReceiving.query.filter(AwardReceiving.id_award == data.id_award):
                team.append({"person": record.person.person_full_name})
            return {"organization": Organization.query.get(data.id_organization).organization_name,
                    "rank": DataBaseManager.check_rank(Award.query.get(data.id_award).award_rank),
                    "achievement": Award.query.get(data.id_award).award_achievement,
                    "team": team}

    def get_people(request_info: RequestInfo, app, db):
        with app.app_context():
            answer = []
            for data in DataBaseManager.get_data(request_info, db):
                print(data)
                answer.append({"id_award_receiving": data.id_award_receiving,
                               "person_full_name": Person.query.get(data.id_person).person_full_name,
                               "award_year": Award.query.get(data.id_award).award_year.award_year,
                               "award_name": Award.query.get(data.id_award).award_name.award_name,
                               "area": Award.query.get(data.id_award).knowledge_field.knowledge_field_name})
            return answer

    def get_piece_of_people(request_info: RequestInfo, app, db, start_index):
        with app.app_context():
            answer = []
            i = 0
            for data in DataBaseManager.get_data(request_info, db):
                if i >= start_index and i < start_index + 100:
                    answer.append({"id_award_receiving": data.id_award_receiving,
                                   "person_full_name": Person.query.get(data.id_person).person_full_name,
                                   "award_year": Award.query.get(data.id_award).award_year.award_year,
                                   "award_name": Award.query.get(data.id_award).award_name.award_name,
                                   "area": Award.query.get(data.id_award).knowledge_field.knowledge_field_name})
                i += 1
                if i == start_index + 100:
                    break
            return answer

    def get_cities_info(request_info: RequestInfo, app, db):
        with app.app_context():
            if request_info.city != "all":
                count = DataBaseManager.get_data(request_info, db).count()
                address = db.session.query(Address).filter(Address.city_name == request_info.city).first()
                if not address:
                    return None
                answer = {"id_address": address.id_address,
                          "city": request_info.city,
                          "latitude": address.latitude,
                          "longitude": address.longitude,
                          "count": count}
                return answer
            answer = []

            for city, in db.session.query(Address.city_name):
                request_info.city = city
                count = DataBaseManager.get_data(request_info, db).count()
                if count == 0:
                    continue
                address = db.session.query(Address).filter(Address.city_name == request_info.city).first()
                answer.append({"id_address": address.id_address,
                               "city": city,
                               "latitude": address.latitude,
                               "longitude": address.longitude,
                               "count": count})
            return answer

    def get_usernames_for_filter(app, db):
        with app.app_context():
            result = {"usernames": []}
            for person, in db.session.query(Person.person_full_name).filter(
                    sqlalchemy.not_((Person.person_full_name.contains('нет данных')))):
                result['usernames'].append(person)

            return result

    def get_years_for_filter(app, db):
        with app.app_context():
            result = {"years": []}
            for year, in db.session.query(AwardYear.award_year).filter(
                    AwardYear.award_year != -1):
                result['years'].append(year)

            return result

    def get_ranks_for_filter(app, db):
        with app.app_context():
            set_ = set()
            result = {"ranks": []}
            for rank, in db.session.query(Award.award_rank).filter(
                    Award.award_rank != None):
                if rank not in set_:
                    set_.add(rank)
                    result['ranks'].append(rank)

            return result

    def get_knowledge_areas_for_filter(app, db):
        with app.app_context():
            result = {"knowledge_areas": []}
            for knowledge_area, in db.session.query(KnowledgeField.knowledge_field_name).filter(
                    sqlalchemy.not_(KnowledgeField.knowledge_field_name.contains('Нет данных'))):
                result['knowledge_areas'].append(knowledge_area)

            return result

    def get_awards_names_for_filter(app, db):
        with app.app_context():
            result = {"awards_names": []}
            for award_name, in db.session.query(AwardName.award_name):
                result['awards_names'].append(award_name)

            return result

    def get_organizations_names_for_filter(app, db):
        with app.app_context():
            result = {"organizations_names": []}
            for organization_name, in db.session.query(Organization.organization_name).filter(
                    sqlalchemy.not_(Organization.organization_name.contains('Нет данных'))):
                result['organizations_names'].append(organization_name)

            return result

    def get_city_filter(city):
        if city == "all":
            return Address.city_name != city
        return Address.city_name == city

    def get_organization_filter(org):
        if org == "all":
            return Organization.organization_name != org
        return Organization.organization_name.like("%{}%".format(org))

    def get_year_filter(start, end):
        if start == "all":
            return AwardYear.award_year >= 0
        return and_(AwardYear.award_year >= start, AwardYear.award_year <= end)

    def get_award_name_filter(awards_names):
        if awards_names[0] == 'all':
            return AwardName.award_name != 'all'
        return AwardName.award_name.in_(awards_names)

    def get_area_filter(areas):
        if areas[0] == "all":
            return KnowledgeField.knowledge_field_name != ""
        return KnowledgeField.knowledge_field_name.in_(areas)

    def get_rank_filter(ranks):
        if ranks[0] == "all":
            return or_(Award.award_rank >= 0, Award.award_rank == None)
        for i in range(len(ranks)):
            if ranks[i] == 'null':
                return or_(Award.award_rank.in_(ranks), Award.award_rank == None)
        return Award.award_rank.in_(ranks)

    def get_username_filter(username):
        if username != "all":
            return Person.person_full_name.like("%{}%".format(username))
        return Person.person_full_name != username
