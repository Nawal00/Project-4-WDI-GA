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

    club_comment_1 = ClubComment(
        content='Lovely',
        club=badminton,
        creator=ed
    )
    club_comment_1.save()

    badminton_day = Event(
        name='Badminton Game',
        image='badminton.png',
        owner=ed,
        max_attendees=4,
        date='2019-02-11',
        time='14:00:00',
        duration=60,
        club=badminton,
        attendees=[ed],
        location='Essex',
        description='Lovely club',
        category='Sports'
    )
    badminton_day.save()
