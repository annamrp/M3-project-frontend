import React, { Component } from 'react';
import Button from '../components/Button';
import gameServer from '../lib/gameServer';

export default class Mission extends Component {

  state = {
    username: '',
    userMission: {},
    isLoading: true,
  }

  componentDidMount = () => {
    const { username, gameId } = this.props.state;
    this.setState({
      username: username,
      userMission: this.props.userMission,
      isLoading: false,
      gameId: gameId,
    })  
  }

  handleKill = (state, props) => {
    this.setState({
      isLoading: true
    })
    const gameId = this.state.gameId;
    gameServer.killUser(gameId)
    .then( game => {
      this.setState(

      )
    })

  }
  
  render() {
    const { isLoading, userMission } = this.state;
    return (
      <div> {isLoading? <h1>...Loading</h1>
        : <div>
            <p>Your Target: {userMission.target}</p>
            <p>Mission: {userMission.mission}</p>
            <Button handleButton={this.handleKill} state={this.state} props={this.props}>Kill</Button>
         </div>
      }
      </div>  
    )
  }
}
