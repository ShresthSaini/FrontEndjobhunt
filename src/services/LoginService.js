import http from "./http-common";

class LoginService {
  login(login) {
    return http.put(`/login`, login );
  }
  logout(logout){
    return http.put(`/logout`,logout);
  }
  getRecruiter() {
    return http.get("/responseRecruiter", { withCredentials: true }); // User
  }
  getApplicant() {
    return http.get("/responseApplicant", { withCredentials: true }); // User
  }
  getAdmin() {
    return http.get("/responseAdmin", { withCredentials: true }); // User
  }

  forgetPassword(email){
    return http.get(`/forgetPassword/${email}`)
  }
  
}
export default new LoginService();