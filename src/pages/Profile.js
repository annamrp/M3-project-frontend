import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';
import userServer from '../lib/userServer';
import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';
import Button from '../components/Button';
import Form from '../components/Form';

class Profile extends Component {

  state = {
    user: {},
    isLoading: true,
    showJoinForm: false,
    quote:'',
    image:'',
    showEditForm: false,
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  handleSubmit = (quote) => {
   
   this.setState({
     quote,
   })
   this.toggleEditForm();
  }

  componentDidMount() {
    this.update()
  }

  update() {
    this.setState({
      isLoading: true
    })
    const userId = this.props.user._id;
    userServer.getUser(userId)
    .then(user => {
      this.setState({
        user: user,
        isLoading: false,
        quote: user.quote,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  editProfile = () => {
    
 };

 toggleEditForm = () => {
   const { showEditForm } = this.state;
   this.setState({
     showEditForm: !showEditForm,
   })
 }

  render() {

    const { user, quote, image, showEditForm} = this.state;
    return (
      <div>
        <Navbar />
        <h2>{ user.username }'s profile</h2>
        <img src={image} alt="User"></img>
        <h5>Kill Sentence: {quote}</h5>
        <Button handleButton={this.toggleEditForm}/>
        {showEditForm ? <Form onClick={this.editProfile} profileInfo={this.state} handleSubmit={this.handleSubmit}/>
          : null
         }
        <h4>My Games:</h4>
        <MyGames />
        My Profile!
        <CreateForm  onSubmit={this.handleSubmit} />
        <Button handleButton={this.joinGameLink}>Join A Game</Button>
      </div>
    )
  }
}

export default withAuth(Profile);