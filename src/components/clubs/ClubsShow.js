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
    const { name, image, category, description, user, location, events, followed_by, club_comments} = this.state.club
    return (
      <div className="container">
        <div className="section box clubBox">

          <div className="wrapper">
            <div className="hero clubHero is-medium is-bold parent">
              <div className="hero-body child" style={{ backgroundImage: `url(${image})`}}>
                <h1 className="title has-text-white">{name}</h1>
                <button className="button is-info" onClick={this.handleFolllow}> Follow  </button>

                <p className="subtitle has-text-white is-6">in {location}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-4">
              <h6 className="title is-6">Category: {category}</h6>
              <h6 className="title is-6">Description</h6>
            </div>
            <div className="column is-4">
              <h6 className="title is-6">About the Club</h6>
              <p> {description}</p>
            </div>

            <div className="column is-4">
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

        {/*<div className="section">
          <h4 className="title is-4">Events</h4>
          <hr />
          <div className="tabs is-boxed">
            <ul>
              <li className={this.state.currentEventsActive ? 'is-active': ''} onClick={this.handleToggle}>
                <a>
                  <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                  <span>Future Events</span>
                </a>
              </li>
              <li className={this.state.currentEventsActive ? '' : 'is-active'}  onClick={this.handleToggle}>
                <a>
                  <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                  <span>Past Events</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="columns ">
            {this.state.currentEventsActive && (
              events.map(event =>
                Date.parse(event.date) >= new Date() && (
                  <div key={event.id} className="column is-6 ">
                    <Link to={`/events/${event.id}`}>
                      <h6 className="title is-6 has-text-info">{moment(event.date, 'YYYYMMDD').fromNow()} </h6>
                      <div className="columns event-card">

                        <div className="column is-3 date-icon">

                          <h6 className="title is-6">{moment(event.date).format('MMMM')} </h6>
                          <h1 className="title is-1">{moment(event.date).format('DD')} </h1>

                        </div>
                        <div className="column is-9">
                          <h6 className="title is-6 has-text-dark">{event.name.toUpperCase()} - {event.time.substring(0, event.time.length - 3)} </h6>
                          <h6 className="title is-6">Attendees: {event.attendees.length} - <span className="has-text-danger">Only {event.max_attendees - event.attendees.length} spots left! </span> </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              )
            )}
          </div>
          <div className="columns">
            {!this.state.currentEventsActive &&(
              events.map(event =>
                Date.parse(event.date) <= new Date() && (
                  <div key={event.id} className="column is-4">
                    <Link to={`/events/${event.id}`}>
                      <div className="column is-12 date-icon">
                        <h6 className="title is-6">{event.name} </h6>
                        <h4 className="title is-4">{moment(event.date).format('MMMM Do YYYY')} </h4>
                      </div>
                    </Link>
                  </div>
                )
              )
            )}
          </div>
        </div>
        */}

        <EventsEmbedded
          events={events}
          currentEventsActive={this.state.currentEventsActive}
          handleToggle={this.handleToggle}
        />
        <ClubsChat
          handleMessageChange={this.handleMessageChange}
          handleMessageSubmit={this.handleMessageSubmit}
          messageContent={this.state.data.content}
          club_comments={club_comments}
        />

        {/* <div className="section">
          <h4 className="title is-4">Chat</h4>
          <hr />
          <div className="message-area">
            <div className="messages-show">
              {club_comments.map(comment => {
                return (
                  <div className="club-message" key={comment.id}>
                    <h6 className="title is-6"> {comment.creator.username}: </h6>
                    <h6 className="conversation">{comment.content}</h6>
                  </div>
                )
              }
              )}
              <div ref={this.messagesEnd} />
            </div>
            <div className="messages-input">
              <form>
                <input
                  placeholder="Message..."
                  maxLength="250"
                  onChange={this.handleMessageChange}
                  value={this.state.data.content}
                >
                </input>
                <button className="button is-dark is-small is-rounded" onClick={this.handleMessageSubmit}> Send </button>
              </form>
            </div>
          </div>
        </div>
        */}

      </div>
    )
  }
}

export default ClubsShow
