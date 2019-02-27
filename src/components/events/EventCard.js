import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ id, name, image, location, date }) => {
  return (
    <Link to={`/events/${id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image} alt={name}  className="eventImage"/>
          </figure>

          <div className="card-content">
            <div className="media"></div>
            <div className="media-left"></div>
            <figure className="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
            </figure>
          </div>`
          <div className="media-content">
            <h6 className="title is-6">{name}</h6>
            <p className="subtitle is-6">{date}</p>
            <p className="subtitle is-6">{location}</p>
          </div>

        </div>
      </div>

    </Link>
  )
}

export default EventCard
