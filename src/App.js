import React, { Component } from 'react';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import PersonalRoom from './pages/PersonalRoom';
import Create from './pages/game/Create';
import Join from './pages/game/Join';
import GameOver from './pages/game/GameOver';

import AuthContext from './lib/authContext';

class App extends Component {
  render() {
    return (
      <AuthContext>
        <div className="container">
          <div>
            <Switch>
              <AnonRoute exact path="/" component={HomePage} />
              {/* <PrivateRoute path="/signup" component={Signup} />
              <PrivateRoute path="/login" component={Login} />              */}
              <Route exact path="/" component={HomePage} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/game/:id/create" component={Create} />
              <PrivateRoute path="/game/join" component={Join} />
              <PrivateRoute path="/game/over" component={GameOver} />
              <PrivateRoute path="/game/:id" component={PersonalRoom} />
          </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
