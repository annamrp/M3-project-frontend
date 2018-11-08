import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';

class Join extends Component {
  render() {
    return (
      <div>
        Join a Game
      </div>
    )
  }
}

export default withAuth(Join);