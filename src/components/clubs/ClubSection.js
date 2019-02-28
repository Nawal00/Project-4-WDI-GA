import React from 'react'
import { Link } from 'react-router-dom'

const ClubSection = ({ id, name, image, location, date }) => {
  return (
    <Link to={`/clubs/${id}`}>


      <div className="hero clubHero">
        <div className="hero-body">
          <figure className="image is-128x128">
            <img className="is-rounded" src={image} alt={name} />
          </figure>
        </div>
      </div>


    </Link>
  )
}

export default ClubSection
