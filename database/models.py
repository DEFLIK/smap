from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Person(db.Model):
    id_person = db.Column(db.Integer, primary_key=True)
    person_full_name = db.Column(db.String(128), nullable=False)
    award_receiving = db.relationship("AwardReceiving", back_populates="person")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_person)


class AwardReceiving(db.Model):
    id_award_receiving = db.Column(db.Integer, primary_key=True)
    id_person = db.Column(db.Integer, db.ForeignKey('person.id_person'), nullable=False)
    id_award = db.Column(db.Integer, db.ForeignKey('award.id_award'), nullable=False)
    id_organization = db.Column(db.Integer, db.ForeignKey('organization.id_organization'), nullable=False)
    person = db.relationship("Person", back_populates="award_receiving")
    award = db.relationship("Award", back_populates="award_receiving")
    organization = db.relationship("Organization", back_populates="award_receiving")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_award_receiving)


class Award(db.Model):
    id_award = db.Column(db.Integer, primary_key=True)
    id_award_name = db.Column(db.Integer, db.ForeignKey('award_name.id_award_name'), nullable=False)
    award_rank = db.Column(db.Integer, nullable=True)
    id_award_year = db.Column(db.Integer, db.ForeignKey("award_year.id_award_year"), nullable=False)
    award_achievement = db.Column(db.String(512), nullable=True)
    id_knowledge_field = db.Column(db.Integer, db.ForeignKey('knowledge_field.id_knowledge_field'), nullable=False)
    award_receiving = db.relationship("AwardReceiving", back_populates="award")
    award_name = db.relationship("AwardName", back_populates="award")
    award_year = db.relationship("AwardYear", back_populates="award")
    knowledge_field = db.relationship("KnowledgeField", back_populates="award")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_award)


class AwardName(db.Model):
    id_award_name = db.Column(db.Integer, primary_key=True)
    award_name = db.Column(db.String(64), nullable=False)
    award = db.relationship("Award", back_populates="award_name")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_award_name)


class AwardYear(db.Model):
    id_award_year = db.Column(db.Integer, primary_key=True)
    award_year = db.Column(db.Integer, nullable=False)
    award = db.relationship("Award", back_populates="award_year")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_award_year)


class KnowledgeField(db.Model):
    id_knowledge_field = db.Column(db.Integer, primary_key=True)
    knowledge_field_name = db.Column(db.String(64), nullable=False)
    award = db.relationship("Award", back_populates="knowledge_field")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_knowledge_field)


class Organization(db.Model):
    id_organization = db.Column(db.Integer, primary_key=True)
    organization_name = db.Column(db.String(128), nullable=False)
    id_address = db.Column(db.Integer, db.ForeignKey('address.id_address'), nullable=False)
    award_receiving = db.relationship("AwardReceiving", back_populates="organization")
    address = db.relationship("Address", back_populates="organization")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_organization)


class Address(db.Model):
    id_address = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.DECIMAL(8, 6), nullable=False)
    longitude = db.Column(db.DECIMAL(8, 6), nullable=False)
    city_name = db.Column(db.String(64), nullable=False)
    region_name = db.Column(db.String(128), nullable=True)
    organization = db.relationship("Organization", back_populates="address")

    def __repr__(self):
        return '<%r %r>' % (self.__class__.__name__, self.id_address)
