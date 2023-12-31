import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("auth_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  login(token) {
    localStorage.setItem("auth_token", token);
  }

  logout() {
    localStorage.removeItem("auth_token");
    window.location.assign("/");
  }
}

export default new AuthService();
