import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="profile">
          <img src={process.env.PUBLIC_URL + '/public/img/Ester foto de perfil.jpg'} alt="ester" />
          <h5>Esto será la quote</h5>
        </div>
        <h4>My Games:</h4>
        <MyGames />
        <button>será un componente</button>
      </div>
    )
  }
}

export default withAuth(Profile);