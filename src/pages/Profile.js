import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';
import userServer from '../lib/userServer';
import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';
import Button from '../components/Button';

class Profile extends Component {

  state = {
    user: {},
    isLoading: true,
    showJoinForm: false
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  handleSubmit = (roomName) => {
   
    // this.toggleForm();

  }

  componentDidMount() {
    this.update()
  }

  update() {
    this.setState({
      isLoading: true
    })
    const userId = this.props.user._id
    userServer.getUser(userId)
    .then(user => {
      this.setState({
        user: user,
        isLoading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {

    const { username, quote, image} = this.state.user

    return (
      <div>
        <Navbar />
        <div className="profile">
          <h2>{ username }'s profile</h2>
          <img href={image}  alt="user icon" />
          <h5>Kill Sentence: { quote }</h5>
        </div>
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