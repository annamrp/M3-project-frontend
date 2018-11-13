import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';

class PageNotFound extends Component {
  render() {
    return (
        <div>
         <h4>404 Error<br />Sorry, page not found... Try again!</h4>
        </div>
    )
  }
}

export default withAuth(PageNotFound);