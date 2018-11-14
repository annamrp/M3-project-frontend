import React, { Component } from 'react'

class DeleteEmail extends Component {
 
  render() {
    const { emails, index, onDelete } = this.props;

    return (
      <li>
        {emails}
        <button onClick={() => {onDelete(index)}}>delete</button>
      </li>
    )
  }
}

export default DeleteEmail;