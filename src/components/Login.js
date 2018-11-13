import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
    alert: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
      this.props.history.push('/profile'); 
    })
    .catch( error => {
      const { data } = error.response;
      switch(data.error){
        case 'User or password invalid':
          this.setState({
            alert: 'invalid username'
          });
          break;
        case 'not-found':
          this.setState({
            alert: 'invalid password'
          });
          break;
        case 'validation':
          this.setState({
            alert: 'username or password can´t be empty'
          });
          break;
        default:
          this.setState({
            alert: ''
          })
      }   
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSignup = () => {
    this.props.handleSignup()
  }

  render() {
    const { username, password, alert } = this.state;
    return (
      <div className="login log-sign-container">
        <form onSubmit={ this.handleFormSubmit } >
          <div className="input"> 
            <label className="log-sign-label">Username:</label>
            <input type="text" name="username" value={ username } onChange={ this.handleChange }/>
          </div>
          <div className="input">
            <label className="log-sign-label">Password:</label>
            <input type="password" name="password" value={ password } onChange={ this.handleChange } />
          </div>
          { alert ? <p className="warning">{ alert }</p> :  null}
          <div className="input-submit">
            <input className="log-signup-btn btn" type="submit" value="Login" />
          </div>
          <p className="log-sign">Don't you have an acount? <span className="toggle-sign-log" onClick={ this.handleSignup }>SignUp</span></p>
        </form>
      </div>
    )
  }
}

export default withAuth(withRouter(Login));