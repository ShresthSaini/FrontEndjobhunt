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
  getJobStatus(statusId){
    return http.get(`/Applicant/getJobStatus${statusId}`);
  }

  getResume(email){
    return http.get(`/Applicant/getResume/${email}`)
  }

  applyForJob(applicantEmail,getJob){
    return http.post(`/Applicant/applyForJob/${applicantEmail}`,getJob)
  }

  update(email, applicant) {
    return http.put(`/Applicant/update${email}`, applicant);
  }
  
  delete(email)
  {
    return http.delete(`/Applicant/delete${email}`);

  }

}
export default new ApplicantService();
