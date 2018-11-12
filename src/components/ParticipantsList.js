import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class ParticipantsList extends Component {

  render() {

    const { participant } = this.props;

    return (
      <ul>
        <li>{participant}</li>
      </ul>
    )
  }
}

export default withAuth(ParticipantsList);