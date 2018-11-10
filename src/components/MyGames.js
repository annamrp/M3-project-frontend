import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class MyGames extends Component {
  render() {
    return (
      <div className="my-games">
        <h5>Aquí va la sala que sea</h5>
        <p>Alive/Dead/Pending</p> 
      </div>
    )
  }
}

export default withAuth(MyGames);