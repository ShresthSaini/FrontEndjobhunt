import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApplicantDash from "./ApplicantDash";
import ApplicantService from "../services/ApplicantService";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import * as FcIcons from "react-icons/fc";

export default function AvailJobs() {
  const location = useLocation();
  const [aplcntEmail, setAplcntEmail] = useState(); //change to aplcntemail
  const [isShow, setIsShow] = useState({});
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [showJobs, setShowJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [status, setStatus] = useState("applied");
  const [msg, setMsg] = useState();
  const [job, setJob] = useState([
    {
      jobTitle: "",
      dateOfPosting: Date,
      lastDateToApply: new Date().toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      preferableSkills: [],
      requiredExp: 0,
      recruiterEmail: "",
      companyName: "",
      companyAddress: "",
    },
  ]);

  useEffect(() => {
    setAplcntEmail(location.state.applicantEmail);
    const data = ApplicantService.getAllJobs()
      .then((response) => {
        if (response.data.length === 0) {
          setShow(true);
          setErrorMsg("Recruiter has not posted a job yet ");

        }
        setJob(response.data);
        setShowJobs(true);
      })
      .catch((error) => {
        setShow(true);
        setErrorMsg(error.response.data);
      });
  }, []);

  const onApplyButton = (Job, key) => {
    const newJob = { ...Job, status };
    
    const data2 = ApplicantService.applyForJob(aplcntEmail, newJob)
      .then((response) => {
        setMsg(response.data);
        // setJob({mesg:response.data})
        // setMsg({[key] : response.data})
      })
      .catch((error) => {
        setMsg(error.response.data);
        // setJob({mesg:error.response.data})
        // setMsg({[key]:error.response.data});
      })
      .finally(() => {
        setIsShow((isShow) => ({ ...isShow, [key]: true }));
        setTimeout(() => {
          setIsShow(false)
        }, 1800);
      });
  };
  return (
    <div>
      <ApplicantDash />
      <div className="container bg-light">
        <div
          className="card-body"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              All Available jobs
            </h2>
            <h6 className="text-secondary"> Note: You can Search Job Either by entering Job Title Or Company Name </h6>
            <input type="text" placeholder="Search job" onChange={(event)=>setSearchTerm(event.target.value)} name="searchBar" className="form-control mt-2 mb-2" />
            {show && <h5 className="text-center"> *{errorMsg}</h5>}
          </section>

          <div className="container">
            {showJobs &&
              job.filter((job)=>{
                if(searchTerm == ""){
                  return job
                }else if(job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())){
                  return job
                }else if(job.companyName.toLowerCase().includes(searchTerm.toLowerCase())){
                  return job
                }
                // }else{
                //   return job
                // }
              }).map((job, key) => (
                <>
                  <Accordion key={key}>
                    <AccordionSummary
                      expandIcon={<FcIcons.FcExpand />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="Accordian"
                    >
                      <Typography>
                        <div className="d-flex p-1 justify-content-evenly">
                          <div className="p-1">
                            <b> Job: </b> {job.jobTitle}
                          </div>
                          <div className="p-2"></div>
                          <div className="p-1">
                            <b> Company: </b> {job.companyName}
                          </div>
                          <div className="p-2"></div>
                          <div className="p-1">
                            <b> Last Date: </b> {job.lastDateToApply}
                          </div>
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="container">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td>JOB TITLE</td>
                                <td>:</td>
                                <td>
                                  <b>{job.jobTitle}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Company</td>
                                <td>:</td>
                                <td>
                                  <b>{job.companyName}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>
                                  <b>{job.companyAddress}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Last Date to Apply</td>
                                <td>:</td>
                                <td>
                                  <b>{job.lastDateToApply}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Experience</td>
                                <td>:</td>
                                <td>
                                  <b>{job.requiredExp}</b>
                                </td>
                              </tr>
                              <tr>
                                <td> Skills </td>
                                <td>:</td>
                                <td>
                                  <table className="table table-condensed w-auto table-borderless table-hover">
                                    {job.preferableSkills.map((S, index1) => {
                                      return (
                                        <tbody key={index1}>
                                          <td scope="col">
                                            {index1 + 1}.<b>{S}</b>
                                          </td>
                                        </tbody>
                                      );
                                    })}
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => onApplyButton(job, key)}
                                  >
                                    Apply for the job{" "}
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>{isShow[key] && <> {msg}</>}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
