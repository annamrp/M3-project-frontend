import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import profileServer from '../lib/userServer';
import { withRouter } from 'react-router-dom';

class Form extends Component {

  state = {
    changeQuote: false,
    changeImage: false,
    quote: this.props.quote,
    image: '',
  }

  handleEdit = event => {
    this.setState({
      quote: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userId = this.props.profileInfo;
    const userInfo = {
      quote: this.state.quote,
    }
    
    profileServer.editProfile(userInfo, userId)
    .then( game => {
      this.props.handleSubmit(game.quote);
    })
   
  }

  render() {  

    const { quote } = this.state;
    
    return (
      <form className="quote-form" onSubmit={this.handleSubmit}>
        <input className="input is-success" maxLength="30" autoFocus={ true } placeholder={ quote } type="text" name="Kill Sentence" value={ quote } onChange={ this.handleEdit }/>
        <input className="icon" type="image" src='img/ok.png' alt="icon submit"/>
     </form> 
    )
  }
}

export default withAuth(withRouter(Form));