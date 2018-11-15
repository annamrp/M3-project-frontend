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
    alert: '',
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
      admin,
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

  
  render() {
    const { isLoading, userMission, numberOfSurvivors, alert } = this.state;
    return (
      <div> {isLoading? <h1>...Loading</h1>
        : <div>
            {/* <h3 className="survivors-heading">Survivors</h3> */}
            <div className="survivors">
              <h3 className="survivors-num">{numberOfSurvivors} </h3>
              <p className="subheading">Survivors</p>
            </div>
            { alert ? <p className="ok-alert">{ alert }</p> : null}
            <div className="mission-card">
              <p className="target-mission capitalize"><span className="bold">Target:</span><span className="bigger target"> {userMission.target}</span></p>
              <p className="target-mission"><span className="bold">Mission:</span><span className="bigger spotlight"> {userMission.mission}</span></p>
              <div className="kill-btn">
                <Button handleButton={this.handleKill} state={this.state} props={this.props}>Kill</Button>
              </div>
            </div>

         </div>
      }
      </div>  
    )
  }
}

export default withAuth(withRouter(Mission));
