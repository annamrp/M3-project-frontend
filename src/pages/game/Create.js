import React, { Component } from 'react'
import { withAuth } from '../../lib/authContext';
import gameServer from '../../lib/gameServer';

class Create extends Component {

  state = {
    admin:'',
    roomName:'', 
}

componentDidMount() {
  const gameId = this.props.match.params.id;
  gameServer.getGameInfo(gameId)
  .then( game => {
    console.log(game);
    this.setState({
      admin: game.admin.username,
      roomName: game.roomName,
    })
  })
}

  render() {
    const { admin, roomName } = this.state;

    return (
      <div>
        <h1>Room Name: {roomName} </h1>
        <h3>Admin: {admin} </h3>
      </div>
    )
  }
}

export default withAuth(Create);