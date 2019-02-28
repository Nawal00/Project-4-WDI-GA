from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

event_attendees = db.Table(
    'event_attendees',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class Event(db.Model, BaseModel):

    __tablename__ = 'events'

    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    category = db.Column(db.String(80), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(80), nullable=True)
    max_attendees = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', backref='events_created')
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    club = db.relationship('Club', backref='events')
    attendees = db.relationship('User', secondary=event_attendees, backref='events_attending')




class EventSchema(ma.ModelSchema, BaseSchema):

    owner = fields.Nested('UserSchema', only=('id', 'username'))
    club = fields.Nested('ClubSchema', only=('id', 'name'))
    attendees = fields.Nested('UserSchema', only=('id', 'username'), many=True)


    class Meta:
        model = Event