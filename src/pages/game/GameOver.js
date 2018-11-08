import React, { Component } from 'react';
import { withAuth } from '../../lib/authContext';

class GameOver extends Component {
  render() {
    return (
      <div>
        Game Over
      </div>
    )
  }
}

export default withAuth(GameOver);