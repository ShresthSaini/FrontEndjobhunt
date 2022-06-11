import http from "./http-common";

class RecruiterService {
  create(Recruiter) {
    return http.post("/Recruiter/addRecruiter", Recruiter);
  }

  get(id) {
    return http.get(`/Recruiter/getById/${id}`);
  }

  getAllApplicants() {
    return http.get(`/Recruiter/getAllApplicants`);
  }

  getAcceptedApplicants(id) {
    return http.get(`/Recruiter/acceptedApplicants/${id}`);
  }

  getAppliedApplicants(id) {
    return http.get(`/Recruiter/getAppliedApplicants/${id}`);
  }

  update(email, recruiter) {
    return http.put(`/Recruiter/update/${email}`, recruiter);
  }

  updateJob(jobTitle,job){
    return http.put(`/Recruiter/updateJob/${jobTitle}`,job)
  }

  setStatus(recruiterEmail,jobTitle,status,applicant){
    return http.put(`/Recruiter/setStatus/${recruiterEmail}/${jobTitle}/${status}`,applicant)
  }

  deleteJob(jobTitle){
    return http.delete(`/Recruiter/deleteJob/${jobTitle}`)
  }

  addJob(email, job) {
    return http.post(`/Recruiter/addJob/${email}`, job);
  }

  getJobPosted(email) {
    return http.get(`/Recruiter/getJobPosted/${email}`);
  }

  getStatus(jobTitle) {
    return http.get(`/Recruiter/getAppliedApplicants/${jobTitle}`);
  }

  callForInterview(details) {
    return http.post(`/Recruiter/interviewCall`, details);
  }
}
export default new RecruiterService();
