from flask import Blueprint, jsonify, request, g
from models.user import UserSchema, User
from lib.secure_route import secure_route

api = Blueprint('users', __name__)

user_schema = UserSchema()

@api.route('/users/<int:user_id>', methods=['GET'])
@secure_route
def message_show(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)
