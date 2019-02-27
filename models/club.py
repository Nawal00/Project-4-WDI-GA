from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

club_followers = db.Table(
    'club_followers',
    db.Column('club_id', db.Integer, db.ForeignKey('clubs.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class Club(db.Model, BaseModel):

    __tablename__ = 'clubs'

    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    category = db.Column(db.String(80), nullable=True)
    location = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(80), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', backref='clubs_created')
    followed_by = db.relationship('User', secondary=club_followers, backref='clubs_following')


class ClubSchema(ma.ModelSchema, BaseSchema):

    owner = fields.Nested('UserSchema', only=('id', 'username'))
    events = fields.Nested('EventSchema', only=('id', 'name'), many=True)
    followed_by = fields.Nested('UserSchema', only=('id', 'username'), many=True)

    class Meta:
        model = Club
