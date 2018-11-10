import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';

class Navbar extends Component {
  render() {  
    
    return (
      <div>
          <p>#Hello {this.props.user.username}!</p>
          <p onClick={this.props.logout}>Logout</p>
      </div> 
    )
  }
}

export default withAuth(Navbar);