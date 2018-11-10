import axios from 'axios';

class ProfileServer {

  constructor() {

    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getUser(userId) {
    return this.profile.get('/user')
    .then(({ data }) => data);
  }
}
const profileServer = new ProfileServer();

export default profileServer;