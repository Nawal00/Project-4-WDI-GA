from flask import Blueprint, request, jsonify, g
from models.event import Event, EventSchema
from lib.secure_route import secure_route

api = Blueprint('events', __name__)

events_schema = EventSchema(many=True)
event_schema = EventSchema()

@api.route('/events', methods=['GET'])
def index():
    events = Event.query.all()
    return events_schema.jsonify(events)

@api.route('/events/<int:event_id>', methods=['GET'])
def show(event_id):
    event = Event.query.get(event_id)
    return event_schema.jsonify(event)

@api.route('/events', methods=['POST'])
@secure_route
def create():
    event, errors = event_schema.load(request.get_json())
    event.owner = g.current_user

    if errors:
        return jsonify(errors), 422

    event.save()

    return event_schema.jsonify(event)

@api.route('/events/<int:event_id>', methods=['PUT'])
@secure_route
def update(event_id):

    event = Event.query.get(event_id)

    if event.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    event, errors = event_schema.load(request.get_json(), instance=event)

    if errors:
        return jsonify(errors), 422

    event.save()

    return event_schema.jsonify(event)

@api.route('/events/<int:event_id>', methods=['DELETE'])
@secure_route
def delete(event_id):

    event = Event.query.get(event_id)

    if event.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    event.remove()

    return '', 204
