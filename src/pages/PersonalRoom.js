import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class PersonalRoom extends Component {
  render() {
    return (
      <div>
        Personal Room Page
      </div>
    )
  }
}

export default withAuth(PersonalRoom);