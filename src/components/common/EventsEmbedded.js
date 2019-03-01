import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const EventsEmbedded = ({ events, currentEventsActive, handleToggle }) => {
  return (
    <div className="section">
      <h4 className="title is-4">Events</h4>
      <hr />
      <div className="tabs is-boxed">
        <ul>
          <li className={currentEventsActive ? 'is-active': ''} onClick={handleToggle}>
            <a>
              <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>Future Events</span>
            </a>
          </li>
          <li className={currentEventsActive ? '' : 'is-active'}  onClick={handleToggle}>
            <a>
              <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
              <span>Past Events</span>
            </a>
          </li>

        </ul>
      </div>
      <div className="columns ">
        {currentEventsActive && (
          events.map(event =>
            Date.parse(event.date) >= new Date() && (
              <div key={event.id} className="column is-6 ">
                <Link to={`/events/${event.id}`}>
                  <h6 className="title is-6 has-text-info">{moment(event.date, 'YYYYMMDD').fromNow()} </h6>
                  <div className="columns event-card">

                    <div className="column is-3 date-icon">

                      <h6 className="title is-6">{moment(event.date).format('MMMM')} </h6>
                      <h1 className="title is-1">{moment(event.date).format('DD')} </h1>

                    </div>
                    <div className="column is-9">
                      <h6 className="title is-6 has-text-dark">{event.name.toUpperCase()} - {event.time.substring(0, event.time.length - 3)} </h6>
                      <h6 className="title is-6">Attendees: {event.attendees.length} - <span className="has-text-danger">Only {event.max_attendees - event.attendees.length} spots left! </span> </h6>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
      <div className="columns">
        {!currentEventsActive &&(
          events.map(event =>
            Date.parse(event.date) <= new Date() && (
              <div key={event.id} className="column is-4">
                <Link to={`/events/${event.id}`}>
                  <div className="column is-12 date-icon">
                    <h6 className="title is-6">{event.name} </h6>
                    <h4 className="title is-4">{moment(event.date).format('MMMM Do YYYY')} </h4>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

export default EventsEmbedded