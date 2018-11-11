import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import GameRoom from './pages/game/GameRoom';
import Create from './pages/game/Create';
import Join from './pages/game/Join';
import GameOver from './pages/game/GameOver';
import './styles.css'

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
              <PrivateRoute path="/login" component={Login} /> */}
              <Route exact path="/" component={HomePage} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/game/join" component={Join} />
              <PrivateRoute path="/game/:id/create" component={Create} />
              <PrivateRoute path="/game/:id" component={GameRoom} />
              <PrivateRoute path="/game/over" component={GameOver} />
          </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
