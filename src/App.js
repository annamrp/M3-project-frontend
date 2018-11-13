import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './lib/authContext';
import AnonRoute from './components/AnonRoute';
import PageNotFound from './components/PageNotFound';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import GameRoom from './pages/game/GameRoom';
import Create from './pages/game/Create';
import Join from './pages/game/Join';
import GameOver from './pages/game/GameOver';
import Navbar from './components/Navbar';
import './styles.css'



class App extends Component {
  render() {
    return (
      <AuthContext>
        <div className="container">
          <div>
            <Navbar />
            <Switch>
              <AnonRoute exact path="/" component={HomePage} />
              {/* <PrivateRoute path="/signup" component={Signup} />
              <PrivateRoute path="/login" component={Login} /> */}
              <Route exact path="/" component={HomePage} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute  exact path="/game/join" component={Join} />
              <PrivateRoute path="/game/:id/create" component={Create} />
              <PrivateRoute exact path="/game/:id" component={GameRoom} />
              <PrivateRoute exact path="/game/:id/over" component={GameOver} />
              <PrivateRoute path="/*" component={PageNotFound} />
          </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
