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
        <div className="game-list">
          <p className="game-room">{ game.roomName }</p>
          <p className="finished">finished</p>
        </div>
      </Link>
    } 
    else if (game.startedStatus) {
    return <Link className="decoration-none"  to={`/game/${ game._id }`}>
        <div className="game-list">
          <p className="game-room">{ game.roomName }</p> 
          <p className="active">active</p>
        </div>
      </Link>
    }

    return <div className="game-list">
        <p className="game-room">{ game.roomName }</p> 
        <p className="pending">pending</p>
      </div>
  }

  render() {

    const { game, admin } = this.props; 
    //const { gameStatus } = game;

    return (
      <div className="my-games">
       { admin ? <Link className="decoration-none" to={`/game/${ game._id }/create`}><p className="game-list admin">{ game.roomName }</p></Link>
        : this.renderGameRoomDetail() 
      }
      </div>
    )
  }
}

export default withAuth(MyGames);