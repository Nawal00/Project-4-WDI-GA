from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Club(db.Model, BaseModel):

    __tablename__ = 'clubs'

    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    category = db.Column(db.String(80), nullable=True)
    location = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(80), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', backref='clubs_created')



class ClubSchema(ma.ModelSchema, BaseSchema):

    owner = fields.Nested('UserSchema', only=('id', 'username'))

    class Meta:
        model = Club
