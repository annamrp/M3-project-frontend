import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class MyGames extends Component {

  render() {
    return (
      <div className="my-games">
        <h5>Juegos activos</h5>
        <p>Alive/Dead/Pending</p> 
      </div>
    )
  }
}

export default withAuth(MyGames);