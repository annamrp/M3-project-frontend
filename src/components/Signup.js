import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
        this.props.setUser(user);
        this.props.history.push('/profile');
        
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleLogin = () => {
    this.props.handleLogin()
  }
  render() {
    const { username, password } = this.state;
    return (
      <div className="signup">
        <form onSubmit={this.handleFormSubmit}>
          <div className="input">
            <label className="log-sign-label">Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div className="input">
            <label className="log-sign-label">Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="input-submit">
            <input className="log-signup-btn" type="submit" value="SignUp" />
          </div>
        </form>
          <p className="log-sign">Already have an account? <span className="toggle-sign-log" onClick={this.handleLogin}>Login</span></p>
      </div>
    )
  }
}

export default withAuth(withRouter(Signup));