from flask import Blueprint, request, jsonify, g
from models.club import Club, ClubSchema, ClubComment, ClubCommentSchema
from lib.secure_route import secure_route

api = Blueprint('clubs', __name__)

clubs_schema = ClubSchema(many=True, exclude=('events', 'followed_by', 'owner', 'description', 'club_comments'))
club_comment_schema = ClubCommentSchema(exclude=('club',))
club_comments_schema = ClubCommentSchema(exclude=('club',), many=True)
club_schema = ClubSchema()

@api.route('/clubs', methods=['GET'])
def index():
    clubs = Club.query.all()
    return clubs_schema.jsonify(clubs)

@api.route('/clubs/<int:club_id>', methods=['GET'])
def show(club_id):
    club = Club.query.get(club_id)
    return club_schema.jsonify(club)

@api.route('/clubs', methods=['POST'])
@secure_route
def create():
    club, errors = club_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    club.owner = g.current_user

    club.save()

    return club_schema.jsonify(club)

@api.route('/clubs/<int:club_id>', methods=['PUT'])
@secure_route
def update(club_id):

    club = Club.query.get(club_id)

    if club.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    club, errors = club_schema.load(request.get_json(), instance=club)

    if errors:
        return jsonify(errors), 422

    club.save()

    return club_schema.jsonify(club)

@api.route('/clubs/<int:club_id>', methods=['DELETE'])
@secure_route
def delete(club_id):

    club = Club.query.get(club_id)

    if club.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    club.remove()

    return '', 204

@api.route('/clubs/<int:club_id>/follow', methods=['GET'])
@secure_route
def club_follow(club_id):

    club = Club.query.get(club_id)

    club.followed_by.append(g.current_user)

    club.save()

    return club_schema.jsonify(club)

@api.route('/clubs/<int:club_id>/comment', methods=['POST'])
@secure_route
def club_comment(club_id):

    club = Club.query.get(club_id)

    comment, errors = club_comment_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    comment.creator = g.current_user
    comment.club = club

    comment.save()

    comments = ClubComment.query.filter_by(club_id=club_id).all()

    return club_schema.jsonify(club)
