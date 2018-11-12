import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';

class Navbar extends Component {
  render() {  
    
    return (
      <div className="nav-bar">
          <p className="hello-user">#Hello {this.props.user.username}!</p>
          <p onClick={this.props.logout}>Logout</p>
      </div> 
    )
  }
}

export default withAuth(Navbar);