import axios from 'axios';

class ProfileServer {

  constructor() {

    this.user = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getUser(userId) {
    return this.user.get('/user')
    .then(({ data }) => data);
  }


  editProfile(userInfo, userId, image) {
    return this.user.patch(`/user/${userId}/edit`, {userInfo, image})
    .then(({ data }) => data);
  }

  editPicture(picURL, userId) {
    return this.user.patch(`/user/${userId}/picture`, 
      picURL
    )
    .then(({ data }) => data);
  }
}
const profileServer = new ProfileServer();

export default profileServer;