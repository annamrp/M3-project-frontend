import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';
import Button from '../components/Button';

class Profile extends Component {

  // createAGame = () => {
  //   this.props.history.push('/game/create')
  // }

  // joinAGame = () => {
  //   this.props.history.push('/game/join')
  // }
  state = {
    userName: '',
  }

  handleSubmit = (roomName) => {
   
    // this.toggleForm();
   

  }

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
        My Profile!
        <CreateForm  onSubmit={this.handleSubmit} />
       
      </div>
    )
  }
}

export default withAuth(Profile);