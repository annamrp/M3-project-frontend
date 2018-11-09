import React, { Component } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';


class HomePage extends Component {

  state = {
    showLogin: false,
    showSignup: true
  }

  handleLogin = () => {
    this.setState({
      showSignup: false
    })
  }

  handleSignup = () => {
    this.setState({
      showSignup: true
    })
  }

  render() {
    const {showSignup} = this.state
    return (
      <div className="home-page">
      {showSignup ? <Signup handleLogin={this.handleLogin}/> : <Login handleSignup={this.handleSignup}/>}
        
        
      </div>
    )
  }
}

export default HomePage;