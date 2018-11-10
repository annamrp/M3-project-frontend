import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class MyGames extends Component {

  render() {

    const { game } = this.props; 

    return (
      <div className="my-games">
        <p>{game.roomName}</p>
        {/* <p>Alive/Dead/Pending</p>  */}
      </div>
    )
  }
}

export default withAuth(MyGames);