import requests
from flask import Blueprint, request, jsonify, g
from models.event import Event, EventSchema
from models.club import Club, ClubSchema
from lib.secure_route import secure_route
from config.environment import city_mapper_key

api = Blueprint('events', __name__)

events_schema = EventSchema(
    many=True,
    exclude=('club', 'attendees', 'owner', 'description', 'max_attendees')
)
event_schema = EventSchema()

@api.route('/events', methods=['GET'])
def index():
    events = Event.query.all()
    return events_schema.jsonify(events)

@api.route('/events/<int:event_id>/traveltime', methods=['GET'])
def travel_time(event_id):
    event = Event.query.get(event_id)
    lat = request.headers.get('lat')
    lng = request.headers.get('lng')
    response = requests.get(f"https://developer.citymapper.com/api/1/traveltime/?startcoord={lat}%2C{lng}&endcoord={event.lat}%2C{event.lng}&key={city_mapper_key}")
    print(type(response))
    return jsonify(response.json())

@api.route('/events/<int:event_id>/', methods=['GET'])
def show(event_id):
    event = Event.query.get(event_id)
    # response = requests.get(f"https://developer.citymapper.com/api/1/traveltime/?startcoord={event.lat}%2C{event.lng}&endcoord=51.4243877%2C-0.3474953&key={city_mapper_key}")
    # print(response.json())
    # event.travel_time = response.json()["travel_time_minutes"]
    #
    # event.save()
    return event_schema.jsonify(event)

@api.route('/events', methods=['POST'])
@secure_route
def create():
    event, errors = event_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    event.owner = g.current_user

    event.attendees.append(g.current_user)

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

@api.route('/events/<int:event_id>/attend', methods=['GET'])
@secure_route
def event_attend(event_id):

    event = Event.query.get(event_id)

    event.attendees.append(g.current_user)

    event.save()

    return event_schema.jsonify(event)
