import React, { Component } from 'react';
import Button from '../components/Button';
import gameServer from '../lib/gameServer';

export default class Mission extends Component {

  state = {
    username: '',
    userMission: {},
    isLoading: true,
    numberOfSurvivors: null,
  }

  componentDidMount = () => {
    const { username, gameId, numberOfSurvivors } = this.props.state;
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
    })
  }

  
  render() {
    const { isLoading, userMission, numberOfSurvivors, alert } = this.state;
    return (
      <div> {isLoading? <h1>...Loading</h1>
        : <div>
            <h3>Number of Survivors: {numberOfSurvivors}</h3>
            <p>Your Target: {userMission.target}</p>
            <p>Mission: {userMission.mission}</p>
            <Button handleButton={this.handleKill} state={this.state} props={this.props}>Kill</Button>
            { alert ? <p className="ok-alert">{ alert }</p> : null}
         </div>
      }
      </div>  
    )
  }
}
