# Project-4-WDI-GA

# General Assembly Project 4 : Paired Project

## Goal: To create a full-stack app with React.js,  Python and SQL database

### Timeframe
7 days

## Technologies used

* JavaScript (ES6), React, Python
* HTML5, SCSS, Bulma
* MySQL, Flask, SQLAlchemy, Marshmallow
* APIs - MapBox, City Mapper, Dark Sky, FileStack
* Yarn, Babel, Webpack, JWT
* Heroku, GitHub/Git

## Contributors
This was a pair project with one other developer. The project was managed using Trello and daily stand-ups.

## Installation

1. Set up a project repo by a git master
2. Clone the repo
3. Created all the back-end and front-end files
4. Set up Package.json Webpack, Pipenv and installed all the dependencies packages
5. Set up and run the server
6. Open the `index.html` on the browser
7.
8. Deployed on Heroku

## App - Social Bee


<img width="348" alt="Screenshot 2019-03-10 at 12 42 48" src="https://user-images.githubusercontent.com/42609274/55078894-0cff8e00-5093-11e9-841f-15b7e1cdec9c.png">


You can find a hosted version here https://social-bee.herokuapp.com/

### App overview

Social Bee is an app that allows users to create activity clubs and organise events. This web app is targeted towards local communities to help them find common interest and do it together.

The app utilises the Dark Skies API to give real time weather reports for the date and location of the event and City Mapper to give direction and estimated journey time from user's location to the event.


### App Instructions
Home Page - the home page will display set of carousel images that portray our app/brand messages, followed by search bars and list of upcoming events ordered by the date.

<img width="1268" alt="Screenshot 2019-03-27 at 13 45 45" src="https://user-images.githubusercontent.com/42609274/55080973-ee02fb00-5096-11e9-9ee6-0bbbfc3210db.png">
<img width="1262" alt="Screenshot 2019-03-27 at 13 46 36" src="https://user-images.githubusercontent.com/42609274/55082083-ec3a3700-5098-11e9-87c3-1bcb0fca054a.png">


Event Show - The event show page will show date of the event, weather on the date, estimated journey time from user current location and city mapper or google maps directions to the event.

<img width="974" alt="Screenshot 2019-03-27 at 14 10 53" src="https://user-images.githubusercontent.com/42609274/55082850-51daf300-509a-11e9-8f96-229c0e60827b.png">

<img width="974" alt="Screenshot 2019-03-27 at 14 12 01" src="https://user-images.githubusercontent.com/42609274/55082851-530c2000-509a-11e9-83c5-7c40de918500.png">


Club Index - The clubs index page is a list of specific clubs i.e. badminton club, mums breakfast club, gamers club.

<img width="1093" alt="Screenshot 2019-03-27 at 14 24 51" src="https://user-images.githubusercontent.com/42609274/55083860-1b9e7300-509c-11e9-9be0-05659eb80de1.png">

Club Show - The clubs show page includes the club's upcoming events, past events, members and if the user follows the club then the chat feature will also be accessible.

<img width="951" alt="Screenshot 2019-03-27 at 14 29 39" src="https://user-images.githubusercontent.com/42609274/55084311-e6deeb80-509c-11e9-83d7-31d5714caf04.png">
<img width="951" alt="Screenshot 2019-03-27 at 14 30 17" src="https://user-images.githubusercontent.com/42609274/55084299-e2b2ce00-509c-11e9-950e-6a17be06c9c9.png">

User Page - The user pages shows future and past events that the user is attending as well as the clubs they follow and events they've created.

<img width="1009" alt="Screenshot 2019-03-27 at 14 37 52" src="https://user-images.githubusercontent.com/42609274/55085460-9ec0c880-509e-11e9-9422-6daf584d2b19.png">
<img width="993" alt="Screenshot 2019-03-27 at 14 55 27" src="https://user-images.githubusercontent.com/42609274/55086486-5e624a00-50a0-11e9-92ae-5ae81d8a98c4.png">


## Process
First step for the project was to work on how to structure and create relationship on MySQL database. Once we finalised the data structure we moved on to wireframe and basic structure of the frontend.

This was a paired project with one other developer and we managed our workload by running sprint session every morning and at the end of the day. We used Trello to prioritise and delegate work, keep a track of our progress and Slack to communicate while working remotely. Features were prioritised using the MoSCoW method. Features were created on separate git branches before being merged into the development branch.


### Challenges
The main challenge on this project was to build follow, comment features and to create relationships between models/tables in MySQL Database. SQL database was new to us and the therefore creating and managing the database took a lot of time planning and figuring out as we were trying to make it work.

### Wins



## Future features
Some extra features that I would’ve loved on the app is a calendar and push notification when users receive a message.
