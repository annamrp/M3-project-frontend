import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    alert: '',
    email: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email }  = this.state;

    auth.signup({ username, password, email })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
            email: ""
        });
        this.props.setUser(user);
        this.props.history.push('/profile');        
      })
      .catch( error => {
        const { data } = error.response;
        switch(data.error){
          case 'empty':
            this.setState({
              alert: 'username or password can´t be empty'
            });
            break;
          case 'username-not-unique':
            this.setState({
              alert: 'username already in use'
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

  handleLogin = () => {
    this.props.handleLogin()
  }
  render() {
    const { username, password, alert, email } = this.state;
    return (
      <div className="signup log-sign-container">
        { alert ? <p className="warning">{alert}</p> :  null}
        <form onSubmit={this.handleFormSubmit}>
          <div className="input">
            <label className="log-sign-label">Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div className="input">
            <label className="log-sign-label">Email:</label>
            <input type="text" name="email" value={email} onChange={this.handleChange}/>
          </div>
          <div className="input">
            <label className="log-sign-label">Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="input-submit">
            <input className="log-signup-btn btn" type="submit" value="SignUp" />
          </div>
        </form>
          <p className="log-sign">Already have an account? <span className="toggle-sign-log" onClick={this.handleLogin}>Login</span></p>
      </div>
    )
  }
}

export default withAuth(withRouter(Signup));