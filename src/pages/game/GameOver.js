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
              <h1 className="winner">winner: {winner} </h1>
               <h3 className="log-title">Kill Log</h3>
              <div className="card-container"> { killLog.map(killEvent => {
                return (
                  <div className="kill-log" key={killEvent.mission}>
                    <div className="killer-target">
                      <p><span className="bold">Killer:</span> <span className="spotlight">{killEvent.killer}</span></p>
                      <p><span className="bold">Target:</span> <span className="spotlight">{killEvent.target}</span></p>
                    </div>
                    <div className="murder">
                      <p><span className="bold shadow">Mission:</span> <span className="lower">{killEvent.mission}</span></p>
                      <p><span className="bold shadow">Date of death:</span> <span className="lower">{killEvent.date}</span></p>
                    </div>
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