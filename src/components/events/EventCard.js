import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ id, name, image, location, date }) => {
  return (
    <Link to={`/events/${id}`}>
      <div className="card eventsCard">
        <div className="card-image">
          <figure className="image">
            <img src={image} alt={name}  className="eventImage"/>
          </figure>

          <div className="card-content is-flex">
            <div className="media"></div>
            <div className="media-left">
              <p> MAR </p>
              <p> 18 </p>
            </div>

            <div className="media-right">
              <h6 className="title is-6">{name}</h6>
              <p className="subtitle is-6">{date}</p>
              <p className="subtitle is-6">{location}</p>
            </div>
          </div>

        </div>
      </div>

    </Link>
  )
}

export default EventCard
