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
    user: '',
    games: [],
    isLoading: true,
    showCreateForm: false,
    quote:'',
    image:'',
    showEditForm: false,
    id:'',
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
    this.setState({
      isLoading: true
    })
    this.update()
  }

  update() {  
    const userId = this.props.user._id;
    userServer.getUser(userId)
    .then(data => {
      this.setState({
        user: data.user.username,
        image: data.user.image,
        games: data.games,
        isLoading: false,
        quote: data.user.quote,
        id: data.user._id,
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
  
  editProfile = () => {
    
 };

 toggleEditForm = () => {
   const { showEditForm } = this.state;
   this.setState({
     showEditForm: !showEditForm,
   })
 }

 toggleCreateForm = () => {
    const { showCreateForm } = this.state;
    this.setState({
      showCreateForm: !showCreateForm,
    })
  }

  render() {

    const { user, quote, showEditForm, showCreateForm, isLoading, image} = this.state;
    
    return (
      <div className="profile">
        {isLoading ? <h1>Loading... </h1> : <div>
          <Navbar />
          <h2>{ user }'s profile</h2>
          <img src={ image } alt="User"></img>
          <h5>Kill Sentence: { quote }</h5>
          <Button handleButton={ this.toggleEditForm }>Edit profile</Button>
          { showEditForm ? <Form onClick={ this.editProfile } profileInfo={ this.state.id } handleSubmit={ this.handleSubmit }/>
            : null
          }
          <h4>My Games:</h4>
          { this.renderGames() }
          <Button handleButton={ this.toggleCreateForm }>Create Game</Button>
          { showCreateForm ? <CreateForm  onSubmit={ this.handleSubmit } /> : null }
          <Button handleButton={ this.joinGameLink }>Join Game</Button>
         </div> 
        }
      </div>
    )
  }
}

export default withAuth(Profile);