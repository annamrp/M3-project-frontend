import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';

class Create extends Component {

  state = {
    roomName:'', 
    calories:'',
    image:''
}

  render() {
    const { state } = this.state;

    return (
      <div></div>
    )
  }
}

export default withAuth(Create);