import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Auth from '../../lib/Auth'
import EventsForm from './EventsForm'

class EventsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        image: '',
        description: '',
        club: {},
        address: '',
        hours: 'Hours',
        minutes: 'Minutes',
        date: '',
        lat: '',
        lng: ''
      },
      errors: '',
      clubs: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClubChange = this.handleClubChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  handleChange({ target: { name, value } }) {

    const data = {...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data })
  }

  handleClubChange({ target }) {
    const valueArray = target.value.split(',')
    const data = {
      ...this.state.data,
      club: {
        id: valueArray[0],
        name: valueArray[1]
      }
    }
    const errors = { ...this.state.errors, club_id: '' }
    this.setState({ data, errors })
  }

  suggestionSelect(result, lat, lng) {
    const data = {...this.state.data,
      lat: lat,
      lng: lng,
      address: result
    }
    const errors = { ...this.state.errors, address: '' }

    this.setState({data, errors})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/events', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/events'))
      .catch((err) => {
        return this.setState({errors: err.response.data})
      })
  }

  componentDidMount() {
    axios.get('/api/clubs')
      .then(res => {
        console.log(res)
        const clubs = res.data.map(club => {
          return {'value': club.id, 'label': club.name, 'owner': club.owner.id}
        })
        this.setState({ clubs })
      })
  }

  render() {
    return(
      <div className="section">
        <EventsForm
          data={this.state.data}
          clubs={this.state.clubs}
          errors={this.state.errors}
          newform={true}
          handleChange={this.handleChange}
          handleClubChange={this.handleClubChange}
          handleSubmit={this.handleSubmit}
          suggestionSelect={this.suggestionSelect}
        />
      </div>
    )
  }
}

export default EventsNew
