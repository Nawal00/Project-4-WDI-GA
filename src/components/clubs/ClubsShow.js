import React from 'react'
import axios from 'axios'

// import Auth from '../../lib/Auth'
// import Comments from '../common/Comments'

import {Link} from 'react-router-dom'

class ClubsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      club: null,
      clubs: null,
      userLocation: null
    }
  }

  componentDidMount() {
    axios.get(`/api/clubs/${this.props.match.params.id}`)
      .then(res => this.setState({ club: res.data }))
  }

  render(){
    if(!this.state.club) return null
    const { id, name, image, category, description, user, location, events } = this.state.club
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
                <h4 className="title is-4">Events</h4>
                {events.map((event) => {
                  return <Link to={`/events/${event.id}`} className="button pill is-rounded" key={event.id}> {event.name} </Link>
                })}
                <hr/>

              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr />

        </div>
      </section>
    )
  }
}

export default ClubsShow
