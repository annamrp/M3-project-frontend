import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';


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
        My Profile!
        <CreateForm  onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default withAuth(Profile);