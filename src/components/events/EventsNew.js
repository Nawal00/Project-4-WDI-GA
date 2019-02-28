import React from 'react'
import axios from 'axios'

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
        address: '',
        lat: '',
        lng: ''
      },
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
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

  render() {
    return(
      <div className="section">
        <EventsForm
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          suggestionSelect={this.suggestionSelect}
        />
      </div>
    )
  }
}

export default EventsNew
