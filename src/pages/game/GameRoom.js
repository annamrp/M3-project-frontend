import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';
import { withRouter } from 'react-router-dom';
import ParticipantsList from '../../components/ParticipantsList';
import Mission from '../../components/Mission';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

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
    userStatus: null,
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
        game.killLog = this.populateKillLog(game);
        const { username } = this.props.user;
        const userDead = game.killLog.find(killEvent => {
          return (killEvent.target === username);
        });
        let userStatus = userDead? 'dead' : 'alive';
        this.setState({
          username:username,
          admin: game.admin.username,
          roomName: game.roomName,
          participants: game.participants,
          missions: game.missions,
          numberOfSurvivors: game.numberOfSurvivors,
          killLog: game.killLog,
          isLoading: false,
          gameId,
          userStatus,
          userDead,
        })
      })
    .catch(err => {
      this.props.history.push('../../components/PageNotFound.js');
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

  populateKillLog = (game) => {
    const killLog = game.killLog.map(killEvent => {
       for (let i = 0; i <game.participants.length; i++) {
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
    return killLog;
  }

  handleReSort = (state, props) => {
    this.setState({
      isLoading: true
    })
    const gameId = this.state.gameId;
    gameServer.reSortGame(gameId)
    .then( game => {
      game.missions = this.populateMissions(game)
      this.setState({
        isLoading: false,
        missions: game.missions,
      })
    })
    .catch()
  }

  render() {
    const { username, admin, roomName, participants, missions, isLoading, userStatus, userDead } = this.state;
    const userMission = missions.find( mission => {
      return mission.killer === username;
    });
    const isUserAdmin = admin === username;
    return (
       <div> 
          {isLoading ? <h1>...isLoading</h1>
            : <div >
                <Navbar  />
                <div className="game-room">
                  <h2 className="game-header  log-title capitalize">{roomName}</h2>
                  {(userStatus === 'alive')? <Mission userMission={userMission} state={this.state}>
                    </Mission>
                    : <div className="killed">
                        <h3>You've been killed by: <p className="bigger-text capitalize">{userDead.killer}</p></h3>
                        <h3>for: <p className="bigger-text">{userDead.mission}</p></h3>
                      </div>
                  }  
                  <div className="users-info">
                    <div className="participants-features">
                      <h4 className="game-subheading">Participants</h4>
                      <ul className="participants-list">                       
                        {participants.map(participant => {
                            return <ParticipantsList key={participant.username} participant={participant} participants={participants} state={this.state}/>
                            })
                          }
                      </ul>
                    </div>
                    <div className="admin-features">
                      <h4 className="game-subheading">Admin: <span className="spotlight">{admin}</span></h4>
                        <div className="re-sort-btn">
                          { isUserAdmin? <Button handleButton={this.handleReSort} 
                              state={this.state} props={this.props}>Re-Sort</Button>
                              : null
                          }
                        </div>
                    </div>
                  </div>
                </div>
              </div>   
          }
          </div>  
    )
  }
}

export default withAuth(withRouter(GameRoom));