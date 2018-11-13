import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './lib/authContext';
import AnonRoute from './components/AnonRoute';
import PageNotFound from './components/PageNotFound';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import GameRoom from './pages/game/GameRoom';
import Create from './pages/game/Create';
import Join from './pages/game/Join';
import CreateForm from './pages/game/CreateForm';
import GameOver from './pages/game/GameOver';
import './styles.css'



class App extends Component {

  state = {
    user: '',
    games: [],
    isLoading: true,
    showCreateForm: false,
    quote:'',
    image:'',
    showEditForm: false,
    id:'',
    showEditImage: false,
  }

  render() {
    return (
      <AuthContext>
        <div className="container">
          <div>
            <Switch>
              <AnonRoute exact path="/" component={HomePage} />
              {/* <Route exact path="/" component={HomePage} /> */}
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute  exact path="/game/join" component={Join} />
              <PrivateRoute  exact path="/game/create" component={CreateForm} />
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
