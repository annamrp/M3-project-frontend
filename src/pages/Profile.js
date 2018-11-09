import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

class Profile extends Component {

  // createAGame = () => {
  //   this.props.history.push('/game/create')
  // }

  // joinAGame = () => {
  //   this.props.history.push('/game/join')
  // }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(Profile);