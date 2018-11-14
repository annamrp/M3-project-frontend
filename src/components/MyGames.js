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
      return <Link className="decoration-none" to={`/game/${ game._id }/over`}>
        <p className="game-list">{ game.roomName } <span className="finished">finished</span></p>
      </Link>
    } 
    else if (game.startedStatus) {
    return <Link className="decoration-none"  to={`/game/${ game._id }`}>
        <p className="game-list">{ game.roomName } <span className="active">active</span></p>
      </Link>
    }

    return <p className="game-list">{ game.roomName } <span className="pending">pending</span></p>
  }

  render() {

    const { game, admin } = this.props; 
    //const { gameStatus } = game;

    return (
      <div className="my-games">
       { admin ? <Link className="decoration-none" to={`/game/${ game._id }/create`}><p className="game-list">{ game.roomName }</p></Link>
        : this.renderGameRoomDetail() 
      }
      </div>
    )
  }
}

export default withAuth(MyGames);