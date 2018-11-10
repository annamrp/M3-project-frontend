import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';
import Button from '../components/Button';

class Profile extends Component {

  state = {
    userName: '',
    showJoinForm: false
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  handleSubmit = (roomName) => {
   
    // this.toggleForm();
   

  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="profile-info">
        <img src={process.env.PUBLIC_URL + '/img/ester-perfil.jpg'} alt="foto de perfil" onClick="" onSubmit="" />
          <h5>Esto será la quote</h5>
        </div>
        <h4>My Games:</h4>
        <MyGames />
        <button>será un componente</button>
        <CreateForm  onSubmit={this.handleSubmit} />
        <Button handleButton={this.joinGameLink}>Join A Game</Button>
       
      </div>
    )
  }
}

export default withAuth(Profile);