import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {  
    const { username, image } = this.props.user
    return (
      <div className="nav-bar">
        <Link className="decoration-none" to={'/profile'}>
          <div className="nav-container">
            <div>
              <img className="nav-img" src={ image } alt="user icon"/>       
            </div>
            <p className="hello-user">Hello {username}!</p>
          </div>
        </Link>
        <p className="logout"onClick={this.props.logout}>Logout</p>
      </div> 
    )
  }
}

export default withAuth(Navbar);