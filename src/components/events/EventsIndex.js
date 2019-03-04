import React from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import EventsSearchForm from './EventsSearchForm'
import EventsShow from './EventsShow'
import Carousels from './Carousel'

class EventsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      events: [],
      category: 'All',
      location: '',
      date: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }))
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
    console.log(this.state.events)
    console.log(this.state.date)

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

      <div>
        <Carousels />
        <section className="section">
          <div className="container">
            <EventsSearchForm handleChange={this.handleChange} />
          </div>
        </section>

        <div className="box has-background-white-ter">
          <section className="section">
            <div className="container">
              <div className="columns is-multiline">
                {this.filteredEvents().map(event =>
                  <div key={event.id} className="column is-4">
                    <EventCard {...event} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default EventsIndex
