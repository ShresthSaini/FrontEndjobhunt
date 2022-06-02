import http from "./http-common";

class AdminService {

  sendMesg(details) {
    return http.post("/admin/contactUs", details);
  }

}
export default new AdminService();
