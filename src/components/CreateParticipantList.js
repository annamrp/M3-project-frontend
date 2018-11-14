import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class CreateParticipantList extends Component {

  render() {

    const { participants } = this.props;

    return (
      <ul>
      {participants.map(participant => {
        return <li key={participant.username}>
                  <span > {participant.username} </span> 
               </li>
        })
      }
      </ul>
    )
  }
}

export default withAuth(CreateParticipantList);