import http from "./http-common";

class LoginService {
  login(email, password) {
    return http.put(`/login/${email}/${password}`);
  }
  logout(email){
    return http.put(`/logout/${email}`);
  }
 
}
export default new LoginService();