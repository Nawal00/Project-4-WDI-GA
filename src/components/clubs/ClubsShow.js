import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Auth from '../../lib/Auth'
import ClubsChat from './ClubsChat'
import EventsEmbedded from '../common/EventsEmbedded'
// import Comments from '../common/Comments'

import {Link} from 'react-router-dom'

class ClubsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      club: null,
      clubs: null,
      userLocation: null,
      currentEventsActive: true
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.handleFolllow = this.handleFolllow.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    // this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  // messagesEnd = React.createRef()

  componentDidMount() {
    // this.scrollToBottom()
    axios.get(`/api/clubs/${this.props.match.params.id}`)
      .then(res => this.setState({ club: res.data }))
  }

  // scrollToBottom() {
  //   this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  // }

  handleToggle(e) {
    if(e.currentTarget.textContent === 'Future Events' && this.state.currentEventsActive){
      return
    }
    if(e.currentTarget.textContent === 'Past Events' && !this.state.currentEventsActive){
      return
    }
    this.setState({currentEventsActive: !this.state.currentEventsActive})
  }

  handleMessageChange(e) {
    const data = {...this.state.data, content: e.target.value }
    const error = null
    this.setState({ data, error })
  }

  handleMessageSubmit(e){
    e.preventDefault()
    axios
      .post(`/api/clubs/${this.state.club.id}/comment`,
        this.state.data,
        {headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
      .then((res) => {
        this.setState({...this.state, club: res.data, data: {content: ''} })
      })
      .then(() => this.props.history.push(`/clubs/${this.state.club.id}`))
      .catch(() => this.setState({ errors: 'An error occured' }))
  }

  handleFolllow(e){
    e.preventDefault()
    axios.get(`/api/clubs/${this.state.club.id}/follow`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({club: res.data}))
  }

  render(){
    if(!this.state.club) return null
    const { id, name, image, category, description, user, location, events,owner, followed_by, club_comments} = this.state.club
    return (
      <div className="container">
        <div className="section box clubBox">
          <div className="wrapper">
            <div className="hero clubHero is-medium is-bold parent">
              <div className="hero-body child" style={{ backgroundImage: `url(${image})`}}>
                <h1 className="title has-text-white">{name}</h1>
                <p className="subtitle has-text-white is-6">in {location}</p>
                {Auth.isAuthenticated() && !Auth.doesFollow(followed_by) &&(
                  <button className="button is-info" onClick={this.handleFolllow}> Follow  </button>
                )}
                {Auth.isAuthenticated() && Auth.doesFollow(followed_by) &&(
                  <button className="button is-info"  > Following  </button>
                )}

              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-3 club-col">
              <h6 className="title is-6">Category: {category}</h6>
              {Auth.isAuthenticated() && Auth.isOwner(owner.id) && (
                <Link to={`/clubs/${id}/edit`} className="button is-info"> Edit </Link>
              )}
            </div>
            <div className="column is-3 club-col">
              <h6 className="title is-6">About the Club</h6>
              <p> {description}</p>
            </div>
            <div className="column is-3 club-col">
              <h6 className="title is-6">Members ({followed_by.length})</h6>
              <div className="members-area">
                {followed_by.map((follower) => {
                  return <Link to={`/users/${follower.id}`}key={follower.id}>
                    <div className="image-cropper">
                      <img src="../../assets/images/BeeLogo.png" alt="avatar" className="profile-pic"/>
                    </div>
                  </Link>
                })}
              </div>
            </div>
          </div>
        </div>
        <EventsEmbedded
          events={events}
          currentEventsActive={this.state.currentEventsActive}
          handleToggle={this.handleToggle}
        />
        {Auth.isAuthenticated() && Auth.doesFollow(followed_by) && (
          <ClubsChat
            handleMessageChange={this.handleMessageChange}
            handleMessageSubmit={this.handleMessageSubmit}
            messageContent={this.state.data.content}
            club_comments={club_comments}
          />
        )}
      </div>
    )
  }
}

export default ClubsShow
