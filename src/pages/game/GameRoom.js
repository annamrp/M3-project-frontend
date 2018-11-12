import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';

class GameRoom extends Component {

  state = {
    username:'',
    admin:'',
    roomName:'',
    participants:[],
    missions: [],
    endingDate: '',
    numberOfSurvivors: null,
    killLog:[],
    startedStatus: false, 
}


  componentDidMount() {
    const gameId = this.props.match.params.id;
    gameServer.getGameInfo(gameId)
    .then( game => {
      this.setState({
        username:this.props.user.username,
        admin: game.admin.username,
        roomName: game.roomName,
        participants: game.participants,
        missions: game.missions,
        //numberOfSurvivors: game.numberOfSurvivors, adecuar el BE para servir.
        killLog: game.killLog,
        // startedStatus: game.startedStatus, idem
      })
      console.log(this.state);
    })
  }

  render() {
    const { username, admin, roomName, participants, missions } = this.state;
    const userMission = missions.find( mission => {
      return mission.username === username;
    });


    return (
      <div>
         <h1>Game: {roomName}</h1>
         <h3>Admin: {admin}</h3>
         <p> participants:</p>
      </div>
    )
  }
}

export default withAuth(withRouter(GameRoom));