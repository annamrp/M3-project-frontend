import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class ParticipantsList extends Component {

  render() {

    const { participants } = this.props;

    return (
      <ul>
      {participants.map(participant => {
        return <li key={participant.username}> {participant.username} </li> 
        })
      }
      </ul>
    )
  }
}

export default withAuth(ParticipantsList);