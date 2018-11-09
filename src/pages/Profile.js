import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


import Navbar from '../components/Navbar';
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
        My Profile!
        <CreateForm  onSubmit={this.handleSubmit} />
       
      </div>
    )
  }
}

export default withAuth(Profile);