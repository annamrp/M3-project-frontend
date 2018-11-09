import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import { withRouter } from 'react-router-dom';
import gameServer from '../../lib/gameServer';
import Button from '../../components/Button';

class Create extends Component {

  state = {
    admin:'',
    roomName:'',
    participants:[], 
}

componentDidMount() {
  const gameId = this.props.match.params.id;
  gameServer.getGameInfo(gameId)
  .then( game => {
    this.setState({
      admin: game.admin.username,
      roomName: game.roomName,
      participants: game.participants,
    })
  })
}

handleStartClick() {
  const gameId = this.props.match.params.id;
  gameServer.startGame(gameId)
  .then( game => {
    this.props.history.push(`/game/${gameId}`);
  })
}

  render() {
    const { admin, roomName, participants } = this.state;

    return (
      <div>
        <h1>Room Name: {roomName} </h1>
        <h3>Admin: {admin} </h3>
        <h3> Participants: 
          { participants? participants.map(participant => {
                return <span key={participant.username}> {participant.username}</span>
              })
              : null
          }
        <Button onClick={this.handleStartClick}>Start Game</Button>
          
        </h3>  

      </div>
    )
  }
}

export default withAuth(withRouter(Create));