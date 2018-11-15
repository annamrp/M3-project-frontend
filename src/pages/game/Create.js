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
  const { gameId , roomName, participants} = this.state;
  const emails = participants.map(participant => {
    return participant.email;
  })
  
  const message = `Your game in Paranoia room: ${roomName} has started, watch your back!!`
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
        <div className="create-game">
          <h2 className="game-header log-title capitalize">{ roomName }</h2>
          <div className="admin-name">
            <h4>Admin:</h4>
            <h4 className="spotlight bigger">{admin}</h4>
          </div>
          <div className="part-names">
            <h4> Participants: 
            
              { participants ? <CreateParticipantList participants={participants}/> : null }</h4>
          </div>          
          <div className="start-btn">
            <Button handleButton={this.handleStartClick} state={this.state} props={this.props}>Start Game</Button>
          </div>                  
        </div>
      </div>
    )
  }
}

export default withAuth(withRouter(Create));