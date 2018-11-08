import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class Profile extends Component {
  render() {
    return (
      <div>
        My Profile!
      </div>
    )
  }
}

export default withAuth(Profile);