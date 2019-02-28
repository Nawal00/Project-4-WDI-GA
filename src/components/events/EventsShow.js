import React from 'react'
import axios from 'axios'

import Map from '../common/Map'
import Auth from '../../lib/Auth'
import {Link} from 'react-router-dom'

class EventsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      event: null,
      userLocation: null
    }

    this.handleAttendee = this.handleAttendee.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))

    // also get the user location...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }

  handleAttendee(e){
    e.preventDefault()
    axios.get(`/api/events/${this.state.event.id}/attend`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res.data))
  }

  render(){
    if(!this.state.event) return null
    console.log(this.state)
    const { id, name, owner, date, image, duration, description, lat, lng, time, attendees, max_attendees, club } = this.state.event
    return (
      <div className="container">
        <div className="box eventsBox">

          <div className="columns is-variable is-8">
            <div className="column">
              <figure className="image is-4by2">
                <img src={image} alt={name} />
              </figure>

            </div>
            <div className="column">
              <div className="content">
                <h4 className="title is-3 is-title-light"> {name} </h4>
                <h4 className="title is-4">Date: {date}</h4>
                <p className="is-subtitle"> Created by: {owner.username}</p>
                <p>Attendees: {attendees.length}</p>
              </div>
            </div>
          </div>
          <hr/>

          <div className="has-text-right">
            <button className="button is-info" onClick={this.handleAttendee}> Attend  </button>
          </div>

          <hr/>
          <div className="columns is-variable is-8">
            <div className="column">
              <div className="content">
                <h4>Description</h4>
                <p> {description}</p>
              </div>
            </div>

            <div className="column">
              <div className="content">
                <p> Date And Time </p>
                <p>{date}</p>
                <p>{time}</p>
                <p>Duration: {duration}</p>
                <p>Max attendees: {max_attendees}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="columns is-centered">
            <div className="column is-half has-text-centered">
              <div className="is-flex image-cropper is-horizontal-center">
                <figure className="image profile-pic">
                  <img className="eventClubImg" src={club.image} alt={club.name} />
                </figure>
              </div>
              <h4> {club.name} </h4>
              <p> Organiser of {name} </p>
              <p> {club.description} </p>
            </div>
          </div>

          <Map
            lat={lat}
            lng={lng}
            userLocation={this.state.userLocation}
            events={[this.state.event]}
            type= "event"
          />
        </div>


      </div>
    )
  }
}

export default EventsShow
