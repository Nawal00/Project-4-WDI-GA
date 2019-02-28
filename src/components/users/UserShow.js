import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import { Link } from 'react-router-dom'

class UserShow extends React.Component {
  constructor(){
    super()

    this.state = {
      user: null
    }

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
          <div className="container columns">
            <div className="column is-4">
            </div>
            <div className="column is-4">
              <h3 className="title is-3 has-text-primary"> {this.state.user.username} </h3>
              <h4 className="title is-4 has-text-primary">  Clubs: </h4>
            </div>
            <div className="column is-4">
              <h4 className="title is-4 has-text-primary">  Attending </h4>
            </div>
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
            <div className="columns is-multiline">
              <div className="column is-12 ">
                <h4 className="title is-4 has-text-primary">  Upcoming Events {(this.state.user.events_attending).length} </h4>
                <div className="columns is-multiline">
                  {this.state.user.events_attending.map(attending =>
                    Date.parse(attending.date) >= new Date() && (
                      <div key={attending.id} className="column is-4">
                        <Link to={`/events/${attending.id}`}>
                          <div>
                            <h6 className="title is-6">Date: {attending.date} </h6>
                            <h6 className="title is-6">Name: {attending.name} </h6>
                            <h6 className="title is-6">Time: {attending.time} </h6>
                            <h6 className="title is-6">Club: {attending.club.name} </h6>

                          </div>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="column is-12 is-multiline">
                <h4 className="title is-4 has-text-primary">  Past Events </h4>
                <div className="columns is-multiline">
                  {this.state.user.events_attending.map(attending =>
                    Date.parse(attending.date) <= new Date() && (
                      <div key={attending.id} className="column is-2">
                        <Link to={`/events/${attending.id}`}>
                          <div>
                            <h6 className="title is-6">Name: {attending.name} </h6>
                            <h6 className="title is-6">Category: {attending.category} </h6>

                          </div>
                        </Link>
                      </div>
                    )
                  )}
                </div>
                <div className="column columns is-4">
                </div>
              </div>

            </div>

            <h3 className="title is-3 has-text-primary is-title-light">  Clubs </h3>
            <hr/>
            <div className="columns is-multiline">
              {this.state.user.clubs_following.map(follow =>
                <div key={follow.id} className="column is-2">
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

            <h3 className="title is-3 has-text-primary is-title-light">  Manage Your Events & Clubs </h3>
            <hr/>
            <div className="columns">
              <div className="column is-6 is-multiline">
                <h4 className="title is-4 has-text-primary">  Events </h4>
                <div className="columns is-multiline">
                  {this.state.user.events_created.map(created =>
                    <div  key={created.id} className="column is-4">
                      <Link  to={`/events/${created.id}`}>
                        <div className="isImage">
                          <figure className="image is-4by3">
                            <img src={created.image} alt={created.name}  className="gemImage"/>
                            <div className="middle">
                              <div className="text">{created.name}</div>
                              <div className="text">{created.category}</div>
                              <div className="text">{created.date}</div>
                            </div>
                          </figure>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

              </div>
              <div className="column is-6 is-multiline">
                <h4 className="title is-4 has-text-primary">  Clubs </h4>
                <div className="columns is-multiline">
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
                </div>
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
