import React, { Component } from 'react';
import auth from '../lib/auth-service';

class Logout extends Component {

  handleLogout = () => {
    auth.logout()
      .then(() => {
        this.props.logout()
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default Logout;