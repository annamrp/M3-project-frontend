import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import Navbar from '../components/Navbar';

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        My Profile!
      </div>
    )
  }
}

export default withAuth(Profile);