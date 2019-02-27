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
    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }

  render(){
    console.log(this.state)
    if(!this.state.user) return null
    const { username } = this.state.user
    return (
      <div>
        <section className="section has-background-dark user-header">
          <div className="container">
            <hr/>
            <div className="columns is-centered">
              <div className="column is-vcentered is-4">
                <h1 className="title has-text-centered is-vcentered is-1 is-title-light has-text-white">
                H1</h1>
              </div>
              <div className="column is-4 is-flex is-horizontial-center">

                <figure className="image is-128x128">
                  <img className="is-rounded"
                    src={this.state.user.image}
                    alt={this.state.user.name}/>
                </figure>

                <h2 className="title has-text-centered is-vcentered is-2 has-text-white"> {username} {Auth.hasFollowed(this.state.user._id, this.state.user.follows) && <i className="fas fa-check-circle"></i> }</h2>

              </div>
              <div className="column is-4">
                <h1 className="title is-1 is-title-light has-text-white has-text-centered"> There was a Trips Length</h1>
                <h1 className="title has-text-centered is-vcentered is-1 is-title-light has-text-white"><i className="fas fa-map-signs is-large"></i></h1>
              </div>
            </div>
            <hr/>
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
            <h3 className="title is-3 has-text-primary is-title-light"> {Auth.ownUserPage(this.state.user._id) && 'Your'} Clubs </h3>
            <hr/>

            <h3 className="title is-3 has-text-primary is-title-light"> {Auth.ownUserPage(this.state.user._id) && 'Your'} Events </h3>
            <hr/>
            <div className="columns is-multiline">
              <h2>  H2 </h2>
            </div>
            <h3 className="title is-3 has-text-primary is-title-light"> Clubs Following</h3>
            <hr/>

          </div>
        </section>
      </div>
    )
  }
}

export default UserShow
