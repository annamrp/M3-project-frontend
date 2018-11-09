import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class Button extends Component {

  handleLink = () => {
    this.props.handleLink();
  }

  render() {
    return (
      <button className="btn" onClick={this.handleLink}>{this.props.children}</button>
    )
  }
}

export default withAuth(Button);
