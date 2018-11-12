import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class Button extends Component {

  handleButton = () => {
    this.props.onClick();
  }

  render() {
    return (
      <button className="btn" onClick={this.handleButton}>{this.props.children}</button>
    )
  }
}

export default withAuth(Button);
