import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      clickedIcon: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    return (
      <nav className= {this.props.location.pathname === '/events' ? 'navbar home' : 'navbar is-dark'}>
        <div className="container">
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              onClick={this.toggleIcon} to="/events"
            >
              <strong className="is-size-4">
              Bee Social <span> <img src="../../assets/images/BeeLogo.png"/> </span>
              </strong>
            </Link>
            <a
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-item has-dropdown is-hoverable navbar-start">
              <a
                className="navbar-link">
                Browse
              </a>
              <div className="navbar-dropdown">
                <Link to="/events" className="navbar-item has-text-black">
                 Events
                </Link>
                <hr className="navbar-divider" />
                <Link to="/clubs" className="navbar-item has-text-black">
                 Clubs
                </Link>
              </div>
            </div>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() &&
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                   Organise
                  </a>
                  <div className="navbar-dropdown">
                    <Link to="/events/new" className="navbar-item">
                     Events
                    </Link>
                    <hr className="navbar-divider" />
                    <Link to="/clubs/new" className="navbar-item">
                     Clubs
                    </Link>
                  </div>
                </div>}
              {Auth.isAuthenticated() &&<Link to={`/users/${Auth.getUserId()}`} className="navbar-item">
              Your events
              </Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Sign Up</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
