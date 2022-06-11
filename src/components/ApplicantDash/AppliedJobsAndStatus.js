import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApplicantDash from "./ApplicantDash";
import ApplicantService from "../../services/ApplicantService";

export default function AppliedJobsAndStatus() {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [aplcntEmail, setAplcntEmail] = useState();
  const [gstatus, setGStatus] = useState("");
  const [job, setJob] = useState([
    {
      jobId:"",
      jobTitle: "",
      companyName: "",
      companyAddress: "",
      recruiterEmail: "",
      dateOfPosting: "Date",
      lastDateToApply: "Date",
      preferableSkills: [],
      requiredExp: 0,
      status: "",
      dateOfApply:Date,
      statusId:""
    },
  ]);

  useEffect(() => {
    const data = ApplicantService.getAppliedJobs(location.state.applicantEmail)
      .then((response) => {
        if (response.data.length === 0) {
          setShow(true);
          setMsg("You haven't applied for a job yet");
        }
        setJob(response.data);
     
      })
      .catch((error) => {
        setShow(true);
        setMsg(error.response.data);
      });
  }, []);

  const getJobStatus = async (job) => {
    const data2 = await ApplicantService.getJobStatus(
      job.statusId
      
    )
      .then((response) => {
       
        if (response.data === "accepted") {
          setGStatus(response.data);
     
          setStatusMsg(
            `Congratulations! You have been shortlisted for the Interview for the job: ${job.jobTitle}. Please Check your email for your interview details `
          );
        } else if (response.data === "rejected") {
          setGStatus(response.data);
          setStatusMsg(
            `Dear Applicant! Thank you for taking the time to show interest in the Job: ${job.jobTitle}.I am afraid, you have been rejected. and Best of luck with your job search. Please Check your email for more details `
          );
        } else if (response.data === "applied"){
          setGStatus(response.data);
          setStatusMsg(
            `Dear Applicant! Thank you for taking the time to show interest in the Job: ${job.jobTitle}. Let's wait till recruiter goes through your application `
          );
        }
      })
      .catch((error) => {
        setGStatus(error.response.data);
        setStatusMsg(error.response.data)
      });
  };

  return (
    <div>
      <ApplicantDash />
      <div className="container">
        <div
          className="card-body"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Application Status
            </h2>
       
            {show && <h5 className="text-center"> *{msg}</h5>}
          </section>
          <div className="d-flex justify-content-evenly">
            {job.map((job, key) => (
              <div
                className="card text-dark bg-light mb-3 "
                style={{ width: "19rem" }}
              >
                <div className="card-body" key={key}>
                  <h5 className="card-title">{job.jobTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.jobProfile} <b> Exp:</b> {job.requiredExp}{" "}
                  </h6>
                  <div className="card-text">
                    <ul className="list-group list-group-flush" key={key}>
                      <li className="list-group-item">
                        {" "}
                        <b> Company: </b> {job.companyName}{" "}
                      </li>
                      <li className="list-group-item">
                        {" "}
                        <b> Date of Apply: </b> {job.dateOfApply}{" "}
                      </li>
                    </ul>
               
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="button "
                    className="btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => getJobStatus(job)}
                  >
                    Get Status
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Job Status
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      id="textAreaExample1"
                      rows="6"
                      readOnly
                      value={statusMsg}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
