import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class Create extends Component {
  render() {
    return (
      <div>
        Create new Game
      </div>
    )
  }
}

export default withAuth(Create);