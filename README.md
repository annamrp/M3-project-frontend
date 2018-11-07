# PARANOIA (Trust No One)

## Description

Paranoia is a manager that will allow you to organize game rooms with ease to mount games between your friends and play the game Paranoia.

The game consists of a series of participants, who will have to be eliminated anonymously, through tests. The goal is that only one person remains alive at the end of the game.

## User Stories

-  **404:** As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **500** As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
-  **Signup:** As an anon I can sign up in the platform so that I can see my profile and join a game
-  **Login:** As a user I can login to the platform so that I can see my profile and join a game
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create game** As a user I can add a new game so that I can invite new participants
-  **Join game** As a user I can join a game I've been invited to
-  **Edit profile** As a user I can edit my profile so that I can add a photo or change my killer sentence
-  **Delete game** As a user (admin game) I can delete the game so that I can finished the game

## Backlog

Messenger service
- Send anonymous messages to other participants

QR code
- Generate a QR code so that participants can be added to a game through the code

Mails
- Send email to participants for invite them

Random missions
- Generate random missions

Alerts
- Show alerts when the creator of the game wants to return to distribute missions or want to end the game

# Client

## Routes

- / - Homepage
- /profile - Profile
- /game/id - Personal Room page
- /game/create - To create a new game
- /game/join - To join new game
- /game/over - Game Over Page

## Pages

- Home Page 
- My Profile Page
- Room Game Personal Page
- Game Create Page
- Game Join Page
- Game Over Page 
- 404 Page
- 500 page 

## Components (state? props?)

Home Page
- How to play
- Sign Up
- Login
 
Profile Page
- Navbar
- My Games

Room Game Personal Page
- Navbar
- Mission
- Participants List

Game Create Page
Game Join Page
Game Over Page 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)   

  ## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/s2J2Vdcr/proyecto-modulo-3) 

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

