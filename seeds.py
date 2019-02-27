from app import app, db
from models.user import UserSchema
from models.club import Club, ClubComment
from models.event import Event

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    nawal, errors = user_schema.load({
        'username': 'nawal',
        'email':'nawal@gmail.com',
        'image': 'nawal.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    nawal.save()

    ed, errors = user_schema.load({
        'username': 'ed',
        'email':'ed@gmail.com',
        'image': 'ed.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    ed.save()

    badminton = Club(
        name='Badminton Club',
        image='badminton.png',
        owner=ed,
        followed_by=[ed, nawal],
        location='Essex',
        description='Lovely club',
        category='Sports'
    )
    badminton.save()

    football = Club(
        name='Football Club',
        image='https://tinyurl.com/yxffo78s',
        owner=nawal,
        followed_by=[ed, nawal],
        location='London',
        description='Footy club',
        category='Sports'
    )
    badminton.save()

    club_comment_1 = ClubComment(
        content='Lovely',
        club=badminton
    )
    club_comment_1.save()

    badminton_day = Event(
        name='Badminton Club',
        image='https://tinyurl.com/ydgt7qmu',
        owner=ed,
        max_attendees=4,
        date='2019-02-11',
        time='14:00:00',
        club=badminton,
        attendees=[ed],
        location='Essex',
        description='Lovely club',
        category='Sports'
    )
    badminton_day.save()

    football_day = Event(
        name='Football Club',
        image='https://tinyurl.com/y3oyvtx9',
        owner=nawal,
        max_attendees=5,
        date='2019-05-12',
        time='16:00:00',
        club=football,
        attendees=[ed],
        location='London',
        description='Footy club',
        category='Sports'
    )
    football_day.save()
