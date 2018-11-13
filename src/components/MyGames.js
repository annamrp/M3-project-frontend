import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';

class MyGames extends Component {

  state = {
    startedStatus: null,
    gameFinished: null,
  }

  renderGameRoomDetail () {
    const { game } = this.props; 
    const { gameFinished } = game;
    if (gameFinished) {
      return <Link to={`/game/${game._id}/over`}><p>{game.roomName} finished</p></Link>
    } 
    else if (game.startedStatus) {
    return <Link to={`/game/${game._id}`}><p>{game.roomName}</p></Link>
    }

    return <p>{ game.roomName } pending</p>
  }

  render() {

    const { game, admin } = this.props; 
    //const { gameStatus } = game;

    return (
      <div className="my-games">
       { admin ? <Link to={`/game/${game._id}/create`}><span>{game.roomName}</span></Link>
        : this.renderGameRoomDetail() 
      }
        {/* <p>Alive/Dead/Pending</p>  */}
      </div>
    )
  }
}

export default withAuth(MyGames);