import React from 'react'

class ClubsChat extends React.Component{
  constructor(){
    super()

    this.state = {
    }
    this.scrollToBottom = this.scrollToBottom.bind(this)

  }

  messagesEnd = React.createRef()

  componentDidMount() {
    this.scrollToBottom()

  }
  componentDidUpdate() {
    this.scrollToBottom()

  }

  scrollToBottom() {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }


  render(){
    const {club_comments, handleMessageChange, messageContent, handleMessageSubmit} = this.props
    return (
      <div className="section">
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
                onChange={handleMessageChange}
                value={messageContent}
              >
              </input>
              <button className="button is-dark is-small is-rounded" onClick={handleMessageSubmit}> Send </button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default ClubsChat
