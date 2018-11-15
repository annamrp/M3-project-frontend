import React, { Component } from 'react'

class DeleteEmail extends Component {
 
  render() {
    const { emails, index, onDelete } = this.props;

    return (
      <li className="email-li">
        {emails}
        {/* <button onClick={() => {onDelete(index)}}>delete</button> */}
        <div>
          <img className="icon delete" alt="delete" src="/img/delete.png"  onClick={() => {onDelete(index)}}/>
        </div>

      </li>
    )
  }
}

export default DeleteEmail;