import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import EventsIndex from './components/events/EventsIndex'
// import EventsNew from './components/events/EventsNew'
// import EventsEdit from './components/events/EventsEdit'
// import EventsShow from './components/events/EventsShow'
//
// import ClubsIndex from './components/clubs/ClubsIndex'
// import ClubsNew from './components/clubs/ClubsNew'
// import ClubsEdit from './components/clubs/ClubsEdit'
// import ClubsShow from './components/clubs/ClubsShow'
//
// import SecureRoute from './components/common/SecureRoute'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
// import UserShow from './components/user/UserShow'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import FlashMessages from './components/common/FlashMessages'

class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <Switch>
            <Route path="/events" component={EventsIndex} />

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
