import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


import Navbar from '../components/Navbar';

class Profile extends Component {

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