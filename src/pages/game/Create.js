import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import { withRouter } from 'react-router-dom';
import gameServer from '../../lib/gameServer';
import Button from '../../components/Button';
import CreateParticipantList from '../../components/CreateParticipantList';
import Navbar from '../../components/Navbar';

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
        <Navbar  />
        <h1>Room Name: {roomName} </h1>
        <h3>Admin: {admin} </h3>
        <h3> Participants: 
         
          { participants ? <CreateParticipantList participants={participants}/> : null }
          <Button handleButton={this.handleStartClick} state={this.state} props={this.props}>Start Game</Button>
                
          {/*tenemos que cambiar el boton por un form para incluir cuanto quiere el admin que dure el juego*/}
        </h3>  
      </div>
    )
  }
}

export default withAuth(withRouter(Create));