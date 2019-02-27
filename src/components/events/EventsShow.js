import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import {Link} from 'react-router-dom'

class EventsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))
  }

  render(){
    if(!this.state.event) return null
    console.log(this.state.event)
    const { id, name, image, category, description } = this.state.event
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

                <hr/>

              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default EventsShow
