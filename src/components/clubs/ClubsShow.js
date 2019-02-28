import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Auth from '../../lib/Auth'
// import Comments from '../common/Comments'

import {Link} from 'react-router-dom'

class ClubsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      club: null,
      clubs: null,
      userLocation: null,
      currentEventsActive: true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleFolllow = this.handleFolllow.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/clubs/${this.props.match.params.id}`)
      .then(res => this.setState({ club: res.data }))
  }

  handleToggle(e) {
    if(e.currentTarget.textContent === 'Future Events' && this.state.currentEventsActive){
      return
    }
    if(e.currentTarget.textContent === 'Past Events' && !this.state.currentEventsActive){
      return
    }
    this.setState({currentEventsActive: !this.state.currentEventsActive})
  }

  handleFolllow(e){
    e.preventDefault()
    axios.get(`/api/clubs/${this.state.club.id}/follow`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({club: res.data}))
  }

  render(){
    if(!this.state.club) return null
    const { id, name, image, category, description, user, location, events, followed_by } = this.state.club
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1 is-title-light"> {name} </h1>
          <hr />
          <div className="columns is-variable is-5">
            <div className="column">
              <figure className="image is-4by2">
                <img src={image} alt={name} />
              </figure>

            </div>
            <div className="column">
              <div className="content">
                <h4 className="title is-4">Category: {category}</h4>
                <h4 className="title is-4">Description</h4>
                <p> {description}</p>
                <h4 className="title is-4">Members ({followed_by.length})</h4>
                {followed_by.map((follower) => {
                  return <Link to={`/users/${follower.id}`} className="button pill is-rounded" key={follower.id}> {follower.username} </Link>
                })}

                <hr/>
              </div>
              <button className="button is-info" onClick={this.handleFolllow}> Follow  </button>
            </div>
          </div>

        </div>

        <div className="container">
          <h4 className="title is-4">Events</h4>
          <hr />
          <div className="tabs is-boxed">
            <ul>
              <li className={this.state.currentEventsActive ? 'is-active': ''} onClick={this.handleToggle}>
                <a>
                  <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                  <span>Future Events</span>
                </a>
              </li>
              <li className={this.state.currentEventsActive ? '' : 'is-active'}  onClick={this.handleToggle}>
                <a>
                  <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                  <span>Past Events</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="columns">
            {this.state.currentEventsActive && (
              events.map(event =>
                Date.parse(event.date) >= new Date() && (
                  <div key={event.id} className="column is-6 ">
                    <Link to={`/events/${event.id}`}>
                      <h6 className="title is-6">{moment(event.date, 'YYYYMMDD').fromNow()} </h6>
                      <div className="columns event-card">

                        <div className="column is-3 date-icon">

                          <h6 className="title is-6">{moment(event.date).format('MMMM')} </h6>
                          <h1 className="title is-1">{moment(event.date).format('DD')} </h1>

                        </div>
                        <div className="column is-9">
                          <h6 className="title is-6">{event.name.toUpperCase()} - {event.time.substring(0, event.time.length - 3)} </h6>
                          <h6 className="title is-6">Attendees: {event.attendees.length} </h6>
                          <h6 className="title is-6">Spaces Left: {event.max_attendees - event.attendees.length} </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              )
            )}
          </div>
          <div className="columns">
            {!this.state.currentEventsActive &&(
              events.map(event =>
                Date.parse(event.date) <= new Date() && (
                  <div key={event.id} className="column is-4">
                    <Link to={`/events/${event.id}`}>
                      <div>
                        <h6 className="title is-6">Date: {event.date} </h6>
                        <h6 className="title is-6">Name: {event.name} </h6>
                        <h6 className="title is-6">Time: {event.time} </h6>

                      </div>
                    </Link>
                  </div>
                )
              )
            )}
          </div>
        </div>

      </section>
    )
  }
}

export default ClubsShow
