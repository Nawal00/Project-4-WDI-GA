import React from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import EventsSearchForm from './EventsSearchForm'

class EventsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      events: [],
      category: 'All',
      location: ''
      // userLocation: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }))

    // also get the user location...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('LOCATION FOUND')
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  filteredEvents() {
    const re = new RegExp(this.state.location, 'i')
    if(!this.state.category && !this.state.location) return this.state.events
    return this.state.events.filter(event => {
      return re.test(event.address) && (this.state.category === 'All' || event.category === this.state.category)
    })
  }

  render() {

    if(!this.state.events.length === 0){
      return(
        <section className="section">
          <div className="container">
            <h4 className="title is-4">Loading...</h4>
          </div>
        </section>
      )
    }
    return (

      <section className="section">
        <div className="container">
          <section className="section">
            <h2 className="title has-text-centered is-title-light is-size-2">The Events</h2>
          </section>
          <hr />
          <EventsSearchForm handleChange={this.handleChange} />
          <div className="columns is-multiline">
            {this.filteredEvents().map(event =>
              <div key={event.id} className="column is-one-quarter">
                <EventCard {...event} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default EventsIndex
