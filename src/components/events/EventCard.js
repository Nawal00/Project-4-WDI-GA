import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const EventCard = ({ id, name, image, address, date, hours, minutes }) => {
  return (
    <Link to={`/events/${id}`}>
      <div className="card card-equal-height">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image} alt={name}  className="eventImage"/>
          </figure>

          <div className="card-content is-flex">

            <div className="media-left">
              <p> {moment(date).format('MMM').toUpperCase()}</p>
              <p> {moment(date).format('DD')} </p>
            </div>

            <div className="media-right">
              <h6><strong>{name}</strong></h6>
              <span className="index-span">{moment(date).format('ddd, MMMM D')}</span>
              <span className="index-span"> at {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}</span>
              <p className="index-span-p">{address}</p>
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default EventCard
