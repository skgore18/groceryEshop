import axios from "axios";

const API_URL = "http://localhost:9090/eshop/user";

class AuthService {
  login(userDetail) {
    return  axios
      .post(API_URL + "/login", userDetail)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

//   register(username, email, password) {
//     return axios.post(API_URL + "/register", {
//       username,
//       email,
//       password
//     });
//   }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
