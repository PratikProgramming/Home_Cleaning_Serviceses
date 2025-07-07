import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

class UserService {
  saveUser(user) {
    return axios.post(API_URL, user);
  }
}

export default new UserService();
