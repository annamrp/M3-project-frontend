import axios from 'axios';

class GameServer {

  constructor() {

    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  createGame(roomName, mission) {
    return this.auth.post('/game/' , { roomName, mission })
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
}

const gameServer = new GameServer();

export default gameServer;