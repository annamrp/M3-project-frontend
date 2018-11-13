import React, { Component } from 'react';
import gameServer from '../lib/gameServer';
import { withAuth } from '../lib/authContext';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';

class Mission extends Component {

  state = {
    username: '',
    userMission: {},
    isLoading: true,
    numberOfSurvivors: null,
    admin: '',
    gameId:'',
  }

  componentDidMount = () => {
    const { username, gameId, numberOfSurvivors, admin } = this.props.state;
    this.setState({
      username: username,
      userMission: this.props.userMission,
      isLoading: false,
      gameId: gameId,
      numberOfSurvivors: numberOfSurvivors,
      alert: '',
    })  
  }

  handleKill = (state, props) => {
    this.setState({
      isLoading: true
    })
    const gameId = this.state.gameId;
    gameServer.killUser(gameId)
    .then( game => {
      if (game.numberOfSurvivors <= 1) {
        this.props.history.push(`/game/${gameId}/over`);
      } else {
      const user = game.participants.find(participant => {
        return participant.username === this.state.username;
      });
      const userId = user._id;
      let userMission = game.missions.find(mission => {
        return mission.killer === userId;
      })
      if (userMission) {
        const userTarget = game.participants.find(participant => {
          return participant._id === userMission.target;
        })
        userMission.target = userTarget.username;
      } else {
        userMission = {target: 'no more players', mission: 'no more missions'}
      }
      this.setState({
        userMission,
        isLoading: false,
        numberOfSurvivors: game.numberOfSurvivors,
        alert: 'Congratulations, you killed your target!',
      })
      }
    })
    .catch()
  }

<<<<<<< HEAD
  
  render() {
    const { isLoading, userMission, numberOfSurvivors, alert } = this.state;
=======

    render() {
    const { isLoading, userMission, numberOfSurvivors } = this.state;
   

>>>>>>> cc5864d429775b7549976a8cb73006d356d7ac66
    return (
      <div> {isLoading? <h1>...Loading</h1>
        : <div>
            <h3>Number of Survivors: {numberOfSurvivors}</h3>
            <p>Your Target: {userMission.target}</p>
            <p>Mission: {userMission.mission}</p>
            <Button handleButton={this.handleKill} state={this.state} props={this.props}>Kill</Button>
<<<<<<< HEAD
            { alert ? <p className="ok-alert">{ alert }</p> : null}
=======
            
>>>>>>> cc5864d429775b7549976a8cb73006d356d7ac66
         </div>
      }
      </div>  
    )
  }
}

export default withAuth(withRouter(Mission));
