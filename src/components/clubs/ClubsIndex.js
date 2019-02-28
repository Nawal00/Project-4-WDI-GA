import React from 'react'
import axios from 'axios'
import ClubSection from './ClubSection'
import ClubsSearchForm from './ClubsSearchForm'

class ClubsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      clubs: [],
      category: 'All',
      location: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/clubs')
      .then(res => this.setState({ clubs: res.data }))
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  filteredClubs() {
    const re = new RegExp(this.state.location, 'i')
    if(!this.state.category && !this.state.location) return this.state.clubs
    return this.state.clubs.filter(club => {
      return re.test(club.address) && (this.state.category === 'All' || club.category === this.state.category)
    })
  }

  render() {

    if(!this.state.clubs.length === 0){
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
            <h2 className="title has-text-centered is-title-light is-size-2">The Clubs</h2>
          </section>
          <hr />

          <ClubsSearchForm handleChange={this.handleChange} />
          <div>
            {this.filteredClubs().map(club =>
              <div key={club.id}>
                <ClubSection{...club} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default ClubsIndex
