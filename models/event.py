from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Event(db.Model, BaseModel):

    __tablename__ = 'events'

    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    category = db.Column(db.String(80), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(80), nullable=True)
    max_attendees = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User')
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    club = db.relationship('Club', backref='events')



class EventSchema(ma.ModelSchema, BaseSchema):

    owner = fields.Nested('UserSchema', only=('id', 'username'))
    club = fields.Nested('ClubSchema', only=('id', 'name'))

    class Meta:
        model = Event
