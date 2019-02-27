import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import { Link } from 'react-router-dom'

class UserShow extends React.Component {
  constructor(){
    super()

    this.state = {}

    // this.handleFollow = this.handleFollow.bind(this)
    // this.handleFollow = this.handleFollow.bind(this)
  }

  // handleFollow(){
  //   axios.post(`/api/user/${this.props.match.params.id}/follow/${Auth.getUserId()}`)
  //     .then(res => this.setState({ user: res.data }))
  // }

  componentDidMount() {
    this.userRequest()
  }

  userRequest(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }


  render(){
    if(!this.state.user) return null
    return (
      <div>
        <section className="section has-background-dark user-header">
          <div className="container">

          </div>
        </section>
        <div className="columns is-vcentered has-background-dark">
          <div className="column is-12 is-vcentered">
            <h2> h2 </h2>
          </div>
          <div className="column is-12">
          </div>
        </div>
        <section className="section">
          <div className="container">
            <h3 className="title is-3 has-text-primary is-title-light">  Events </h3>
            <hr/>
            <div className="columns">
              <div className="column columns is-6 is-multiline">
                <h4 className="title is-4 has-text-primary">  Attending </h4>
                {this.state.user.events_attending.map(attending =>
                  <div key={attending.id} className="column is-4">
                    <Link to={`/events/${attending.id}`}>
                      <div>
                        <h6 className="title is-6">Name: {attending.name} </h6>
                        <h6 className="title is-6">Location: {attending.location} </h6>
                        <h6 className="title is-6">Category: {attending.category} </h6>

                      </div>
                    </Link>
                  </div>
                )}
                <div className="column columns is-4">
                </div>
              </div>
              <div className="column columns is-6 is-multiline">
                <h4 className="title is-4 has-text-primary">  Created </h4>
                {this.state.user.events_created.map(created =>
                  <div key={created.id} className="column is-4">
                    <Link to={`/events/${created.id}`}>
                      <div>
                        <h6 className="title is-6">Name: {created.name} </h6>
                        <h6 className="title is-6">Location: {created.location} </h6>
                        <h6 className="title is-6">Category: {created.category} </h6>

                      </div>
                    </Link>
                  </div>
                )}
                <div className="column columns is-4">
                </div>
              </div>
            </div>

            <h3 className="title is-3 has-text-primary is-title-light">  Clubs </h3>
            <hr/>
            <div className="columns">
              <div className="column columns is-6 is-multiline">

                {this.state.user.clubs_following.map(follow =>
                  <div key={follow.id} className="column is-4">
                    <Link to={`/clubs/${follow.id}`}>
                      <div>
                        <h6 className="title is-6">Name: {follow.name} </h6>
                        <h6 className="title is-6">Location: {follow.location} </h6>
                        <h6 className="title is-6">Category: {follow.category} </h6>

                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className="column columns is-6 is-multiline">
                <h4 className="title is-4 has-text-primary">  Created </h4>
                {this.state.user.clubs_created.map(created =>
                  <div key={created.id} className="column is-4">
                    <Link to={`/clubs/${created.id}`}>
                      <div>
                        <h6 className="title is-6">Name: {created.name} </h6>
                        <h6 className="title is-6">Location: {created.location} </h6>
                        <h6 className="title is-6">Category: {created.category} </h6>

                      </div>
                    </Link>
                  </div>
                )}
                <div className="column columns is-4">
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    )
  }
}

export default UserShow
