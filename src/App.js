import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';
// import Signup from './components/Signup';
// import Login from './components/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import PersonalRoom from './pages/PersonalRoom';
import Create from './pages/Create';
import Join from './pages/Join';
import GameOver from './pages/GameOver';

import AuthContext from './lib/authContext';

class App extends Component {
  render() {
    return (
      <AuthContext>
        <div className="container">
          <div>
            <h1>P A R A N O I A</h1>
            <h2>Trust No One</h2>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              {/* <PrivateRoute path="/signup" component={Signup} />
              <PrivateRoute path="/login" component={Login} />              */}
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/game/id" component={PersonalRoom} />
              <PrivateRoute path="/game/create" component={Create} />
              <PrivateRoute path="/game/join" component={Join} />
              <PrivateRoute path="/game/over" component={GameOver} />
          </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
