import axios from 'axios';

class GameServer {

  constructor() {

    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  createGame(roomName, mission, email, message) {
    return this.auth.post('/game/' , { roomName, mission, email, message })
    .then(({ data }) => data);
  }

  getGameInfo(gameId) {
    return this.auth.get(`/game/${gameId}`)
    .then(({ data }) => data);
  }

  joinGame(roomName, mission) {
    return this.auth.post('/game/join', { roomName, mission })
    .then(({ data }) => data);
  }

  startGame(gameId) {
    return this.auth.get(`/game/${gameId}/start`)
    .then(({ data }) => data);
  }

  killUser(gameId, userName) {
    return this.auth.post(`/game/${gameId}/kill`, { userName })
    .then(({ data }) => data);
  }

  reSortGame(gameId) {
    return this.auth.get(`/game/${gameId}/sort`)
    .then(({ data }) => data);
  }

}



const gameServer = new GameServer();

export default gameServer;