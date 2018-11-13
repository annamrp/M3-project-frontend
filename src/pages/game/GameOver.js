import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';
import  gameServer  from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

class GameOver extends Component {

  state = {
    username: '',
    missions: {},
    winner:'',
    isLoading: true,
    roomName:'',
    killLog:[],
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true
    })
    const gameId = this.props.match.params.id;
    gameServer.getGameInfo(gameId)
    .then( game => {
      game.missions = this.populateMissions(game)
      game.killLog = this.populateKillLog(game)
      this.setState({
        username:this.props.user.username,
        admin: game.admin.username,
        roomName: game.roomName,
        participants: game.participants,
        missions: game.missions,
        killLog: game.killLog,
        isLoading: false,
        winner: game.missions[0].killer,
        gameId,
        // startedStatus: game.startedStatus, idem
      })
    })
  }

  populateKillLog = (game) => {
    const populatedkillLog = game.killLog.map(killEvent => {
      for (let i = 0; i<game.participants.length; i++) {
        if (killEvent.killer === game.participants[i]._id) {
          killEvent.killer = game.participants[i].username;
        }
      }
      for (let i = 0; i <game.participants.length; i++) {
        if (killEvent.target === game.participants[i]._id) {
          killEvent.target = game.participants[i].username;
        }
      }
      return killEvent;
    })
    return populatedkillLog;
  }

  populateMissions = (game) => {
    const missions = game.missions.map(mission => {
       for (let i = 0; i <game.participants.length; i++) {
          if (mission.killer === game.participants[i]._id) {
            mission.killer = game.participants[i].username;
          }
       }
       for (let i = 0; i <game.participants.length; i++) {
        if (mission.target === game.participants[i]._id) {
          mission.target = game.participants[i].username;
        }  
     }
     return mission;
    })
    return missions;
  }

  render() {

    const { winner, isLoading, killLog } = this.state;
    return (
      <div>
        {isLoading? <h1>...Loading</h1>
         : <div> 
              <Navbar  />
              <h1>winner: {winner} </h1>
               <p>Kill Log</p>
              <div> { killLog.map(killEvent => {
                return (
                  <div key={killEvent.mission}>
                    <p>Killer: {killEvent.killer}</p>
                    <p>Target: {killEvent.target}</p>
                    <p>Mission: {killEvent.mission}</p>
                    <p>Date of death: {killEvent.date}</p>
                  </div>
                )
              }) } </div>
           </div>
        }
      </div>
    )
  }
}

export default withAuth(withRouter(GameOver));