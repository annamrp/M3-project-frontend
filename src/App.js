import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './lib/authContext';
import AnonRoute from './components/AnonRoute';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import GameRoom from './pages/game/GameRoom';
import Create from './pages/game/Create';
import Join from './pages/game/Join';
import GameOver from './pages/game/GameOver';
import './styles.css'



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
