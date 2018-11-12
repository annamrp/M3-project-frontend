import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';

class MyGames extends Component {

  render() {

    const { game } = this.props; 

    return (
      <div className="my-games">
        <Link to={`/game/${game._id}`}><p>{game.roomName}</p></Link>
        {/* <p>Alive/Dead/Pending</p>  */}
      </div>
    )
  }
}

export default withAuth(MyGames);