import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import ParticipantsList from '../../components/ParticipantsList';
import Mission from '../../components/Mission';
import Button from '../../components/Button';

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
    isLoading: true,
    gameId:'',
}

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    const gameId = this.props.match.params.id;
    gameServer.getGameInfo(gameId)
    .then( game => {
      game.missions = this.populateMissions(game)
      this.setState({
        username:this.props.user.username,
        admin: game.admin.username,
        roomName: game.roomName,
        participants: game.participants,
        missions: game.missions,
        numberOfSurvivors: game.numberOfSurvivors,
        killLog: game.killLog,
        isLoading: false,
        gameId,
        // startedStatus: game.startedStatus, idem
      })
    })
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

  handleReSort = (state, props) => {
    this.setState({
      isLoading: true
    })
    const gameId = this.state.gameId;
    gameServer.reSortGame(gameId)
    .then( game => {
      game.missions = this.populateMissions(game)
      console.log(game.missions);
      this.setState({
        isLoading: false,
        missions: game.missions,
      })
    })
    .catch()
  }

  render() {
    const { username, admin, roomName, participants, missions, isLoading } = this.state;
    const userMission = missions.find( mission => {
      return mission.killer === username;
    });
    const isUserAdmin = admin === username;
    return (
      <div>
       {isLoading ? <h1>...isLoading</h1>
        : <div>
            <h1>Game: {roomName}</h1>
            <h3>Admin: {admin}</h3>
            <h3>User: {username}</h3>
            <Mission userMission={userMission} state={this.state}/>
            <ParticipantsList participants={participants} state={this.state}/>
            { isUserAdmin? <Button handleButton={this.handleReSort} 
                state={this.state} props={this.props}> Re-Sort Game </Button>
                : null
            }
          </div>   
       }
       </div>
       
    )
  }
}

export default withAuth(withRouter(GameRoom));