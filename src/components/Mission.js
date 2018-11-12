import React, { Component } from 'react'

export default class Mission extends Component {
  
  render() {
    const { userMission } = this.props;
    return (
      <div>
          <p>Your Target: {userMission.target}</p>
          <p>Mission: {userMission.mission}</p>
      </div>
    )
  }
}
