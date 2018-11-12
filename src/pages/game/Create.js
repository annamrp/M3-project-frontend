import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import { withRouter } from 'react-router-dom';
import gameServer from '../../lib/gameServer';
import Button from '../../components/Button';

class Create extends Component {

  state = {
    admin:'',
    roomName:'',
    participants:[], 
    gameId:'',
}

componentDidMount() {
  const gameId = this.props.match.params.id;
  gameServer.getGameInfo(gameId)
  .then( game => {
    this.setState({
      admin: game.admin.username,
      roomName: game.roomName,
      participants: game.participants,
      gameId,
    })
  })
}

handleStartClick(state, props) {
  console.log(this.props);
  const { gameId } = this.state;
  gameServer.startGame(gameId)
  .then( game => {
    const gameId = game._id;
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
        <Button handleButton={this.handleStartClick} state={this.state} props={this.props}>Start Game</Button>
          {/*tenemos que cambiar el boton por un form para incluir cuanto quiere el admin que dure el juego*/}
        </h3>  

      </div>
    )
  }
}

export default withAuth(withRouter(Create));