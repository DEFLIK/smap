from database.requestInfo import RequestInfo
from database.models import Award, AwardYear, AwardName, AwardReceiving, Address, Organization, Person, KnowledgeField
from sqlalchemy import and_


class DataBaseManager:
    def get_full_info(id_award_receiving: int, app):
        with app.app_context():
            data = AwardReceiving.query.get(id_award_receiving)
            team = []
            for record in AwardReceiving.query.filter(AwardReceiving.id_award == data.id_award):
                team.append({"person": record.person.person_full_name})
            return {"organization": Organization.query.get(data.id_organization).organization_name,
                    "rank": Award.query.get(data.id_award).award_rank,
                    "achievement": Award.query.get(data.id_award).award_achievement,
                    "team": team}

    def get_person(request_info: RequestInfo, app, db):
        with app.app_context():
            answer = []
            for data in db.session.query(AwardReceiving).join(
                    db.session.query(Organization).join(Address).filter(
                        DataBaseManager.get_city_filter(request_info.city, request_info.organization))).join(
                db.session.query(Award).join(KnowledgeField).join(AwardName).join(AwardYear).filter(and_(
                    DataBaseManager.get_area_filter(request_info.area),
                    DataBaseManager.get_year_filter(request_info.start_year, request_info.end_year),
                    DataBaseManager.get_rank_filter(request_info.rank)))):
                answer.append({"id_award_receiving": data.id_award_receiving,
                               "person_full_name": Person.query.get(data.id_person).person_full_name,
                               "award_year": Award.query.get(data.id_award).award_year.award_year,
                               "award_name": Award.query.get(data.id_award).award_name.award_name,
                               "area": Award.query.get(data.id_award).knowledge_field.knowledge_field_name})
            return answer

    def get_cities_info(request_info: RequestInfo, app, db):
        with app.app_context():
            if request_info.city != "all":
                count = db.session.query(AwardReceiving).join(
                    db.session.query(Organization).join(Address).filter(
                        DataBaseManager.get_city_filter(request_info.city, request_info.organization))).join(
                    db.session.query(Award).join(KnowledgeField).join(AwardName).join(AwardYear).filter(and_(
                        DataBaseManager.get_area_filter(request_info.area),
                        DataBaseManager.get_year_filter(request_info.start_year, request_info.end_year),
                        DataBaseManager.get_rank_filter(request_info.rank)))).count()
                address = Address.query.filter(Address.city_name == request_info.city).first()
                answer = {"id_address": address.id_address,
                          "city": request_info.city,
                          "latitude": address.latitude,
                          "longitude": address.longitude,
                          "count": count}
                return answer
            answer = []
            for city, in db.session.query(Address.city_name):
                count = db.session.query(AwardReceiving).join(
                    db.session.query(Organization).join(Address).filter(
                        DataBaseManager.get_city_filter(city, request_info.organization))).join(
                    db.session.query(Award).join(KnowledgeField).join(AwardName).join(AwardYear).filter(and_(
                        DataBaseManager.get_area_filter(request_info.area),
                        DataBaseManager.get_year_filter(request_info.start_year, request_info.end_year),
                        DataBaseManager.get_rank_filter(request_info.rank)))).count()
                address = Address.query.filter(Address.city_name == city).first()
                answer.append({"id_address": address.id_address,
                               "city": city,
                               "latitude": address.latitude,
                               "longitude": address.longitude,
                               "count": count})
            return answer

    def get_city_filter(city, org):
        if org == "all":
            if city == "all":
                return Address.city_name != city
            return Address.city_name == city
        return and_(Address.city_name == city, Organization.organization_name == org)

    def get_year_filter(start, end):
        if start == "all":
            return and_(AwardYear.award_year >= 0)
        return and_(AwardYear.award_year >= start, AwardYear.award_year <= end)

    def get_area_filter(area):
        if area == "all":
            return KnowledgeField.knowledge_field_name != ""
        return KnowledgeField.knowledge_field_name == area

    def get_rank_filter(rank):
        if rank == "all":
            return Award.award_rank >= 0
        return Award.award_rank == rank

    def get_person_filter(username):
        pass
