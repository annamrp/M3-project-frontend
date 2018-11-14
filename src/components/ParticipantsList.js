import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class ParticipantsList extends Component {

  state = {
    killedByUser: [],
    crossedClass: '',
    isLoading: false,
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true,
    })
    this.killedByUser(this.scrachParticipant);
    this.setState({
      isLoading: false,
    })
  }


  killedByUser = (callback) => {
    const { participants, participant } = this.props;
    const { killLog, username } = this.props.state;
    const killedByUser = participants.filter(player => {
      const killedBU = killLog.find(killEvent => {
         return ((killEvent.killer === username) && (killEvent.target === player.username));
      })
      return killedBU;
    })
    if (killedByUser) {
      this.setState({
        killedByUser: killedByUser,
      },() => {
        callback(participant);
      })
      
    }
  }

  scrachParticipant = (participant) => {
    const { killedByUser } = this.state;
    const participantKilledByUser = killedByUser.find(killedUser => {
       return killedUser.username === participant.username;
    })
    if (participantKilledByUser){
      this.setState({
        crossedClass: 'crossed',
      })
    }
  }

  render() {
    const { participant } = this.props;
    const { crossedClass, isLoading } = this.state;

    return (
          <li className="participant-li" key={participant.username}>
            {isLoading? <h3>...Loading</h3>
              :<span className={crossedClass}> {participant.username} </span> 
            }  
          </li>
         
    )
  }
}

export default withAuth(ParticipantsList);