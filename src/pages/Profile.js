import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


import Navbar from '../components/Navbar';
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
        <h2>{this.props.user.username}'s Profile</h2>
        <CreateForm  onSubmit={this.handleSubmit} />
        <Button handleButton={this.joinGameLink}>Join A Game</Button>
       
      </div>
    )
  }
}

export default withAuth(Profile);