import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const EventCard = ({ id, name, image, address, date, hours, minutes }) => {
  return (
    <Link to={`/events/${id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image} alt={name}  className="eventImage"/>
          </figure>
        </div>

        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <div className="media-content">
                <p> {moment(date).format('MMM').toUpperCase()}</p>
                <p> {moment(date).format('DD')} </p>
              </div>
            </div>

            <div className="media-right">
              <div className="media-content">
                <h6><strong>{name}</strong></h6>
                <p className="index-span">{moment(date).format('ddd, MMMM D')}</p>
                <p className="index-span"> at {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}</p>
                <p className="index-span-p">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default EventCard
