import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class CreateParticipantList extends Component {

  render() {

    const { participants } = this.props;

    return (
      <ul>
      {participants.map(participant => {
        return <li className="create-participants-list"key={participant.username}>
                  <span className="spotlight" > {participant.username} </span> 
               </li>
        })
      }
      </ul>
    )
  }
}

export default withAuth(CreateParticipantList);