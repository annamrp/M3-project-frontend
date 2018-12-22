import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import profileServer from '../lib/userServer';
import { withRouter } from 'react-router-dom';

class EditImage extends Component {
  
  state = {
    image: ''
  }

  fileUpload =  event  => {
    const file = event.target.value;
    this.setState({
      image: file
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //const formData = new FormData();
    const file = this.state.image;
    //formData.append("picture", file)
    profileServer.editPicture(file, this.props.user._id)
    .then(user => {
      console.log(user.image);
      this.props.setUser(user)
      this.setState({
        image: user.image
      })
      this.props.handleSubmit(file);
    })
   
  }

  render() {  
    const {image} = this.state;
  
    return (
      <form onSubmit={this.handleSubmit}>
       <input type="text" name="image" onChange={this.fileUpload} value={image}/>
       <input className="edit-btn" type="submit" value="Edit"/>
      </form>
      
    )
  }
}

export default withAuth(withRouter(EditImage));