import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import userServer from '../lib/userServer';
import MyGames from '../components/MyGames';
import Button from '../components/Button';
import Form from '../components/Form';
import EditImage from '../components/EditImage';
import Navbar from '../components/Navbar';
import HowToplay from '../components/HowToplay';


class Profile extends Component {

  state = {
    user: '',
    games: [],
    isLoading: true,
    quote:'',
    file:'',
    showEditForm: false,
    id:'',
    showEditImage: false,
    prueba: false,
  }

  joinGameLink = () => {
    this.props.history.push('/game/join')
  }

  createNewGameLink = () => {
    this.props.history.push('/game/create')
  }

  handleSubmit = (quote) => {
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
        game={game}
        admin={false}/>  
    })  
  }

  renderAdminGames() {
    const { games, id } = this.state;
    const adminGames = games.filter(game => {
      return (!game.startedStatus && game.admin === id);
    })
    return adminGames.map((game) => {
      return <MyGames 
        key={game.roomName}
        game={game}
        admin={true}/>  
    }) 
  }
  
 toggleEditForm = () => {
   const { showEditForm } = this.state;
   this.setState({
     showEditForm: !showEditForm,
   }) 
 }

  toggleEditImage = () => {
    const { showEditImage } = this.state
    this.setState({
      showEditImage: !showEditImage
    })
  }

  submitImage = (file) => {
    this.setState({
      file,
    })
    this.toggleEditImage();
    this.update();
  }

  render() {

    const { id, quote, showEditForm,isLoading, image, showEditImage} = this.state;
    
    return (
      <div className="profile">
        {isLoading ? <h1>Loading... </h1> : <div>
          <Navbar  />
          <HowToplay/>
          <div className="user-info">
            <div className="img-container">
              <img className="profile-img" src={ image } alt="User" onClick={this.toggleEditImage }/>                
              {showEditImage ? <EditImage handleSubmit={ this.submitImage } imageinfo={image}/> : null}
            </div>
            <div className="quote">
              {showEditForm ? <Form profileInfo={ id } quote={ quote } handleSubmit={ this.handleSubmit }/> : <div> {!quote ? <h3>'Kill sentence'</h3> : <h3>{ quote }</h3>} </div>} 
              {showEditForm ? null :<div>               
                <img className="icon" src='img/Edit-icon.png' alt='edit quote' onClick={ this.toggleEditForm }/>
              </div>  }            
            </div>            
          </div>
          <div className="profile-btns">
            <Button handleButton={ this.createNewGameLink }>New Game</Button>
            <Button handleButton={ this.joinGameLink }>Join Game</Button>
          </div>
          <div className="info-container">
            <div className="games">
              <h5>My Games:</h5>
                { this.renderGames() }
            </div>
            <div className="games">
              <h5>Admin Games:</h5>
                { this.renderAdminGames() }
            </div>        
          </div>

      </div>}
      </div>
    )
  }
}
export default withAuth(Profile);