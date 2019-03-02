import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const MoreClubs = ({ id, name, time, date, eventLink }) => {
  return (

    <Link to={`/events/${id}`} onClick={eventLink}>

      <div className="columns box more-col-box is-centered">
        <div className="column is-half is-2">
          <span>{moment(date).format('MMM')} </span>
          <span>{moment(date).format('DD')} </span>
        </div>

        <div className="column is-2 date-icon">
          {time}
        </div>

        <div className="column is-3">
          <h6> {name}</h6>
        </div>

      </div>

    </Link>
  )
}

export default MoreClubs
