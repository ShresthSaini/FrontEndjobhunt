import http from "./http-common";

class AdminService {

  sendMesg(details) {
    return http.post("/admin/contactUs", details);
  }

  getAllRecruiters(){
    return http.get("/admin/getAllRecruiters")
  }

  getAllMesgs(){
    return http.get("/admin/getMesgReceived")
  }

  get(id){
    return http.get(`/admin/${id}`)
  }

  updateAdmin(admin){
    return http.put("/admin/updateAdmin",admin)
  }

  addAdmin(admin){
    return http.post("admin/addAdmin",admin)
  }

  getAllAdmins(){
    return http.get("/admin/getAllAdmins")
  }

  delete(id){
    return http.delete(`/admin/${id}`)
  }

}
export default new AdminService();
