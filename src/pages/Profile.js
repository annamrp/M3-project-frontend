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
    games: [],
    isLoading: true
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  handleSubmit = (roomName) => {
   
    // this.toggleForm();

  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.update()
  }

  update() {  
    const userId = this.props.user._id
    userServer.getUser(userId)
    .then(data => {
      this.setState({
        user: data.user,
        games: data.games,
        isLoading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  renderGames() {
    const { games } = this.state;
    return games.map((game) => {
      return <MyGames 
        key={game._id}
        game={game}/>  
    })  
  }
 
  render() {

    const { username, quote, image } = this.state.user
    const { isLoading } = this.state;
    
    return ( 
      <div>
        {isLoading ? <h1>Loading... </h1> : <div>
          <Navbar />
          <div className="profile">
            <h2>{ username }'s profile</h2>
            <img href={image}  alt="user icon" />
            <h5>Kill Sentence: { quote }</h5>
          </div>
          <h4>My Games:</h4>
          {this.renderGames()}
          My Profile!
          <CreateForm  onSubmit={this.handleSubmit} />
          <Button handleButton={this.joinGameLink}>Join A Game</Button>
        </div>
        }
      </div>
    )
  }
}

export default withAuth(Profile);