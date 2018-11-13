import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import profileServer from '../lib/userServer';
import { withRouter } from 'react-router-dom';

class EditImage extends Component {
  
  state = {
    image: ''
  }

  fileUpload =  event  => {
    const file = event.target.files[0]
    this.setState({
      image: file
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
   const {image} = this.state
    profileServer.editProfile(image)
    .then( game => {
      this.props.handleSubmit(image);
    })
   
  }

  render() {  
  
    return (
      <form onSubmit={this.handleSubmit}>
       <input type="file" name="image" onChange={this.fileUpload}/>
       <input className="edit-btn" type="submit" value="Edit"/>
      </form>
      
    )
  }
}

export default withAuth(withRouter(EditImage));