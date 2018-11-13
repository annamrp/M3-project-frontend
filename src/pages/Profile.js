import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import CreateForm from '../components/CreateForm';
import userServer from '../lib/userServer';
import Navbar from '../components/Navbar';
import MyGames from '../components/MyGames';
import Button from '../components/Button';
import Form from '../components/Form';
import EditImage from '../components/EditImage';


class Profile extends Component {

  state = {
    user: '',
    games: [],
    isLoading: true,
    showCreateForm: false,
    quote:'',
    file:'',
    showEditForm: false,
    id:'',
    showEditImage: false,
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  handleSubmit = (quote) => {
    console.log(quote)
   this.setState({
     quote,
   })
   this.toggleEditForm();
   this.update();
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

  toggleEditImage = () => {
    const { showEditImage } = this.state
    this.setState({
      showEditImage: !showEditImage
    })
  }

  submitImage = (file) => {
    console.log(file)
    this.setState({
      file
    })
    this.toggleEditImage();
  }

  render() {

    const { id, user, quote, showEditForm, showCreateForm, isLoading, image, showEditImage} = this.state;
    
    return (
      <div className="profile">
        {isLoading ? <h1>Loading... </h1> : <div>
          <Navbar />
          <div className="user-info">
            <h2>{ user }'s profile</h2>           
            <img src={ image } alt="User"/> 
            {showEditImage ? <EditImage handleSubmit={ this.submitImage } imageinfo={image}/> : null}
            <div className="icons"> 
              <div>
                <img className="icon" src='img/image-edit.png' alt='edit form' onClick={this.toggleEditImage }/>
              </div>
              <div>            
                <img className="icon" src='img/Edit-icon.png' alt='edit quote' onClick={ this.toggleEditForm }/>
              </div>
            </div>
            <div className="quote">
              {showEditForm ? <Form profileInfo={ id } handleSubmit={ this.handleSubmit }/> : <div> {!quote ? <h3>'Kill sentence'</h3> : <h3>{ quote }</h3>} </div>} 
            </div>
            <div className="info-container">
            <h4 className="bold">My Games:</h4>
              { this.renderGames() }
            </div>
          </div>
          <div className="profile-btns">
          <Button handleButton={ this.toggleCreateForm }>New Game</Button>
          <Button handleButton={ this.joinGameLink }>Join Game</Button>
          { showCreateForm ? <CreateForm  onSubmit={ this.handleSubmit } /> : null } 
        </div>
      </div>}
      </div>
    )
  }
}
export default withAuth(Profile);