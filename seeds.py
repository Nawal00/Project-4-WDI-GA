from app import app, db
from models.user import UserSchema
from models.club import Club, ClubComment
from models.event import Event

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    Mark, errors = user_schema.load({
        'username': 'mark',
        'email':'mark@gmail.com',
        'image': 'nawal.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Mark.save()

    Wendy, errors = user_schema.load({
        'username': 'wendy',
        'email':'wendy@gmail.com',
        'image': 'wendy.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Wendy.save()

    Dwight, errors = user_schema.load({
        'username': 'Dwight',
        'email':'Dwight@gmail.com',
        'image': 'Dwight.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Dwight.save()

    Nawal, errors = user_schema.load({
        'username': 'nawal',
        'email':'nawal@gmail.com',
        'image': 'https://tinyurl.com/y3n62bu6',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Nawal.save()

    Jody, errors = user_schema.load({
        'username': 'jody',
        'email':'jody@gmail.com',
        'image': 'jody.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Jody.save()

    Ed, errors = user_schema.load({
        'username': 'ed',
        'email':'ed@gmail.com',
        'image': 'ed.png',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Ed.save()

    badminton_north_london = Club(
        name='North London Badminton Club',
        image='https://tinyurl.com/y2zjeusz',
        owner=Nawal,
        followed_by=[Ed, Nawal],
        location='Finsbury Park',
        lat=51.534969,
        lng=-0.103750,
        description='Friendly club to play weekly badminton on a Wednesday',
        category='Sports'
    )
    badminton_north_london.save()

    mums_club_stokeontrent = Club(
        name='Mums Meetup Club',
        image='http://tinyurl.com/y5oj22bz',
        owner=Wendy,
        followed_by=[Ed, Nawal],
        location='Stoke On Trent',
        lat=53.0219186,
        lng=-2.2297829,
        description='A great environment for Mums & Mums to be to connect and let their hair down',
        category='Mums'
    )
    mums_club_stokeontrent.save()

    chess_club_islington = Club(
        name='Chess Club Islington',
        image='https://tinyurl.com/yx8o8rff',
        owner=Ed,
        followed_by=[Ed, Nawal],
        location='Islington',
        lat=51.534969,
        lng=-0.103750,
        description='Begineers chess club in Islington North London',
        category='Sports'
    )
    chess_club_islington.save()

    south_londoner_gamer = Club(
        name='South London Gamers',
        image='https://tinyurl.com/y3gc763z',
        owner=Ed,
        followed_by=[Ed, Nawal],
        location='Croydon',
        lat=51.376163,
        lng=-0.098234,
        description='Computers games club for those in and around Croydon',
        category='Computer Games'
    )
    south_londoner_gamer.save()

    london_photography = Club(
        name='London Photography Group',
        image='https://tinyurl.com/j2lwsjz',
        owner=Ed,
        followed_by=[Ed, Wendy, Mark],
        location='London',
        lat=51.376163,
        lng=-0.098234,
        description='Monthly group to capture areas of the city',
        category='Photography'
    )
    london_photography.save()

    surrey_walkers = Club(
        name='Surrey Walkers',
        image='https://tinyurl.com/yxehbrk8',
        owner=Ed,
        followed_by=[Ed, Nawal, Jody, Dwight],
        location='Teddington',
        lat=51.376163,
        lng=-0.098234,
        description='Lovely walks around the surrey countryside',
        category='Sports'
    )
    surrey_walkers.save()

    east_london_five = Club(
        name='East London Five-a-Side',
        image='https://tinyurl.com/y5s8wns5',
        owner=Ed,
        followed_by=[Ed, Mark, Jody],
        location='Shoreditch',
        lat=51.515617,
        lng=-0.070839,
        description='Computers games club for those in and around Croydon',
        category='Sports'
    )
    east_london_five.save()

    football = Club(
        name='Football Club',
        image='https://tinyurl.com/yxq3hdqc',
        owner=Nawal,
        followed_by=[Ed, Nawal],
        location='London',
        lat=51.515617,
        lng=-0.070839,
        description='Footy club',
        category='Sports'
    )
    football.save()

    club_comment_1 = ClubComment(
        content='Has anyone can any ideas for the next group meeting?',
        club=london_photography,
        creator=Ed
    )
    club_comment_1.save()

    club_comment_2 = ClubComment(
        content='I was in Greenwich last weekend and thought that was quite a lot of potential spots there',
        club=london_photography,
        creator=Nawal
    )
    club_comment_2.save()

    club_comment_3 = ClubComment(
        content='Also the Thames Barrier is well worth a visit whilst in that area',
        club=london_photography,
        creator=Nawal
    )
    club_comment_3.save()

    club_comment_4 = ClubComment(
        content='I would be up for a trip there',
        club=london_photography,
        creator=Jody
    )
    club_comment_4.save()

    club_comment_5 = ClubComment(
        content='Think that would be a good call, especially this time of year',
        club=london_photography,
        creator=Ed
    )
    club_comment_5.save()

    club_comment_6 = ClubComment(
        content='I will set up an event for January',
        club=london_photography,
        creator=Ed
    )
    club_comment_6.save()

    badminton_day = Event(
        name='Badminton Club',
        image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F55930430%2F3256470838%2F1%2Foriginal.jpg?w=800&auto=compress&rect=258%2C0%2C2180%2C1090&s=dff8d8034e2a483f7524662d89f5e58f',
        owner=Ed,
        max_attendees=20,
        date='2019-02-11',
        time='14:00:00',
        duration=300,
        club=badminton_north_london,
        attendees=[Nawal, Jody, Dwight, Wendy, Mark],
        lat=51.5564869,
        lng=-0.1172063,
        description='Team tournement followed by a BBQ and party',
        category='Sports',
        address='Park Road, LINCOLN'
    )
    badminton_day.save()

    badminton_doubles = Event(
        name='Badminton Doubles',
        image='https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        owner=Ed,
        max_attendees=4,
        date='2019-03-10',
        time='19:00:00',
        duration=60,
        club=badminton_north_london,
        attendees=[Nawal],
        lat=51.5564869,
        lng=-0.1172063,
        description='Friendly game of doubles for anyone who fancies it',
        category='Sports',
        address='183 New Street, Preston'
    )
    badminton_doubles.save()

    greenwich_photo_tour = Event(
        name='Greenwich Photography Trip',
        image='https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        owner=Nawal,
        max_attendees=6,
        date='2019-03-15',
        time='14:00:00',
        duration=120,
        club=london_photography,
        attendees=[Jody, Ed],
        lat=51.4874009,
        lng=-0.012965,
        description='Lovely club',
        category='Photography',
        address='411 George Street, East London'
    )
    greenwich_photo_tour.save()

    city_photo_tour = Event(
        name='The City Photography Trip',
        image='https://images.unsplash.com/photo-1507055298038-7e3f88856986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        owner=Jody,
        max_attendees=6,
        date='2019-03-01',
        time='16:00:00',
        duration=120,
        club=london_photography,
        attendees=[Ed],
        lat=51.5150422,
        lng=-0.1107947,
        description='Little trip around the square mile',
        category='Photography',
        address='796 Chester Road, Norwich'
    )
    city_photo_tour.save()

    feb_five_a_side = Event(
        name='February Five-a-Side',
        image='https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        owner=Mark,
        max_attendees=10,
        date='2019-03-15',
        time='14:00:00',
        duration=120,
        club=east_london_five,
        attendees=[Jody, Ed],
        lat=51.4963099,
        lng=-0.1203346,
        description='The February issue of our monthly five-a-side',
        category='Sports',
        address='8 North Road, Preston'
    )
    feb_five_a_side.save()

    jan_five_a_side = Event(
        name='January Five-a-Side',
        image='https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        owner=Mark,
        max_attendees=10,
        date='2019-03-18',
        time='14:00:00',
        duration=120,
        club=east_london_five,
        attendees=[Jody, Ed],
        lat=51.4963099,
        lng=-0.1203346,
        description='The January issue of our monthly five-a-side',
        category='Sports',
        address='58 The Drive, Luton'
    )
    jan_five_a_side.save()

    champions_chess = Event(
        name='Champions Chess Tournement',
        image='https://images.unsplash.com/photo-1505461296292-7d67beed10a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80g',
        owner=Nawal,
        max_attendees=6,
        date='2019-03-20',
        time='18:00:00',
        duration=120,
        club=chess_club_islington,
        attendees=[Jody, Ed],
        lat=51.5343973,
        lng=-0.1054455,
        description='It is that time of the year again!',
        category='Sports',
        address='The Hoodland, Liverpool'
    )
    champions_chess.save()

    richmond_park = Event(
        name='March Richmond Park Walk',
        image='https://images.unsplash.com/photo-1514218802252-3112865be60d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1933&q=80',
        owner=Nawal,
        max_attendees=6,
        date='2019-03-15',
        time='14:00:00',
        duration=120,
        club=surrey_walkers,
        attendees=[Jody, Ed],
        lat=51.4463869,
        lng=-0.2779614,
        description='Great walk around Richmond Park',
        category='Sports',
        address='58 The Drive, Greenwich'
    )
    richmond_park.save()

    mums_breakfast = Event(
        name='Mums BreakFast Stoke On Trent',
        image='http://tinyurl.com/y6ayg466',
        owner=Wendy,
        max_attendees=6,
        date='2019-05-30',
        time='10:00:00',
        duration=120,
        club=mums_club_stokeontrent,
        attendees=[Jody, Ed],
        lat=53.0219186,
        lng=-2.2297829,
        description='A great environment for Mums & Mums to be to connect and let their hair down',
        category='Mums',
        address='4 City Rd, Stoke-on-Trent'
    )
    mums_breakfast.save()
