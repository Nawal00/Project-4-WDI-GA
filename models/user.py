from datetime import datetime, timedelta
import jwt
from config.environment import secret
from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields, validate
from .base import BaseModel, BaseSchema

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, unique=True)
    image = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(128), nullable=True, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token


class UserSchema(ma.ModelSchema, BaseSchema):

    @validates_schema
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    password = fields.String(
        required=True,
        validate=[validate.Length(min=8, max=15)]
    )
    password_confirmation = fields.String(required=True)

    clubs_created = fields.Nested(
        'ClubSchema',
        many=True,
        only=('category', 'name', 'id', 'image')
    )

    clubs_following = fields.Nested(
        'ClubSchema',
        many=True,
        only=('category', 'name', 'id', 'image')
    )

    events_created = fields.Nested(
        'EventSchema',
        many=True,
        only=('category', 'name', 'id', 'image', 'date', 'time')
    )

    events_attending = fields.Nested(
        'EventSchema',
        many=True,
        only=(
            'category',
            'name',
            'id',
            'image',
            'date',
            'time',
            'club',
            'attendees',
            'max_attendees'
        )
    )

    class Meta:
        model = User
        exclude = ('password_hash', 'updated_at')
        load_only = ('password', 'password_confirmation')
