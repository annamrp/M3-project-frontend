import React, { Component } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login'

class HomePage extends Component {
  render() {
    return (
      <div>
        HomePage
        <Signup />
        <Login />
      </div>
    )
  }
}

export default HomePage;