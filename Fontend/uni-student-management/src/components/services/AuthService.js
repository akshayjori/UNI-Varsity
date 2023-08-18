import axios from "axios";
import { API_URL, EMAIL_ID, G_IMAGE_URL, JWT_TOKEN } from "../../constants";

class AuthService {
  executeJwtAuthenticationService(userId, password) {
    return axios.post(`${API_URL}/authenticate`, {
      username: userId,
      password: password,
    });
  }

  createJwtAuthToken(token) {
    const jwtAuthToken = "Bearer " + token;
    return jwtAuthToken;
  }

  registerSuccessfulLogin(token, email) {
    localStorage.setItem(JWT_TOKEN, this.createJwtAuthToken(token));
    localStorage.setItem(EMAIL_ID, email);
  }

  logout() {
    // remove localStorage variables
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(G_IMAGE_URL);
    localStorage.removeItem(EMAIL_ID);
  }

  isUserLoggedIn() {
    let token = localStorage.getItem(JWT_TOKEN);
    if (token !== null) return true;
    return false;
  }
}

export default new AuthService();
