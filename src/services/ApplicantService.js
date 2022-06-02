import http from "./http-common";

class ApplicantService {
  create(Applicant) {
    return http.post("/Applicant/addApplicant", Applicant);
  }
  get(id) {
    return http.get(`/Applicant/getById${id}`);
  }

  getAllJobs() {
    return http.get(`/Applicant/getAllJobs`);
  }

  getAppliedJobs(email){
    return http.get(`/Applicant/getAppliedJobs${email}`);
  }
  getJobStatus(email,jobTitle){
    return http.get(`/Applicant/getJobStatus${email}/${jobTitle}`);
  }

  update(email, applicant) {
    return http.put(`/Applicant/update${email}`, applicant);
  }


}
export default new ApplicantService();
