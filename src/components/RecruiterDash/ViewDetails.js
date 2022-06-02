import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RecruiterService from "../../services/RecruiterService";
import RecruiterDash from "./RecruiterDash";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import * as FcIcons from "react-icons/fc";

export default function ViewDetails() {
  
  const [isShow, setIsShow] = useState(false);
  const [acceptShow, setAcceptShow] = useState(false);
  const [show, setShow] = useState(true);
  const [showMesg, setShowMesg] = useState({});
  const [message, setMessage] = useState("")
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [myApplicants, setMyApplicants] = useState([]);
  const [recruiter, setRecruiter] = useState()
  const [recruiterEmail , setRecuiterEmail] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [jobId, setJobId] = useState();
  

  useEffect(() => {
    setJobTitle(location.state.jobTitle);
    setRecuiterEmail(location.state.recruiterEmail)
    setJobId(location.state.jobId)
    RecruiterService.getAppliedApplicants(location.state.jobId)
      .then((response) => {
        if (response.data.length===0){
          setIsShow(true);
          setMsg("Applicant has not applied for this job")
        }
        
        setMyApplicants(response.data);
       
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsShow(true);
        setMsg(error.response.data);
      });

      RecruiterService.get(location.state.recruiterEmail).then((response)=>{
     
        setRecruiter(response.data)
      }).catch((error)=>{
        console.log(error.response.data)
      })
    return () => {};
  }, []);

  const onAccept = (applicant) =>{
    let status = "accepted"
      RecruiterService.setStatus(recruiterEmail,jobId,status,applicant).then((response)=>{
        setShow(false)
        setShowMesg(true)
        setMessage("You have Scuccessfully Accepeted the Candidate,click on setup Interview ")
        setAcceptShow(true)
      }).catch((error)=>{
        setShow(false)
        setShowMesg(true)
        setMessage(error.response.data)
        setAcceptShow(false)  
      })
      
    }
    const onReject = (applicant) =>{
      let status = "rejected"
      RecruiterService.setStatus(recruiterEmail,jobId,status,applicant).then((response)=>{
      setShow(false)
      setShowMesg(true)
      setMessage("Rejected, Check with  another candidate   NOTE: An automated email has been sent to applicant")
    }).catch((error)=>{
      setShowMesg(true)
      setMessage(error.response.data)
    })
  }


    const onCallForInterview = (applicant) => {
      navigate("/RecruiterDash/CallForInterview", {
        state: {applicantName : applicant.name,
          applicantEmail:applicant.applicantEmail,
          jobTitle:jobTitle,
          recruiterName:recruiter.name,
          recruiterEmail:recruiter.recruiterEmail,
          companyName:recruiter.companyName,
          companyAddress:recruiter.companyAddress,
          companyContactNumber:recruiter.companyContactNumber
        },
      });
    }
  return (
    <div>
      <RecruiterDash />
      <div className="container">
        <div
          className="card-body"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-4">
            <h5 className="h1-responsive font-weight-bold text-center my-4">
              <b> Manage Job Application: {jobTitle} </b>
            </h5>
          </section>

          {isShow && <h6 className="text-center"> * {msg} * </h6>}

          {myApplicants.map((applicant, key) => {
            return (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<FcIcons.FcExpand />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="Accordian"
                >
                  <Typography>
                    <div className="d-flex p-1">
                      <div className="p-1">
                        <b> Name: </b> {applicant.name}
                      </div>

                      <div className="p-2"></div>

                      <div className="p-1">
                        <b> Job Profile: </b> {applicant.jobProfile}
                      </div>
                      <div className="p-2"></div>
                      <div className="p-1">
                        <b> Experience: </b> {applicant.numOfExp}
                      </div>
                      <div className="p-2"></div>
                      <div className="p-1">
                        <b> Education: </b> {applicant.education}
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <b> Name </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.name} </td>
                        </tr>
                        <tr>
                          <td>
                            <b> jobProfile </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.jobProfile} </td>
                        </tr>
                        <tr>
                          <td>
                            <b> Experience </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.numOfExp} </td>
                        </tr>
                        <tr>
                          <td>
                            <b> Education </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.education} </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <b> Institute </b>{" "}
                          </td>
                          <td> : </td>
                          <td> {applicant.instituteName} </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <b> Start Year </b>{" "}
                          </td>
                          <td> : </td>
                          <td> {applicant.startYear} </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <b> End Year </b>{" "}
                          </td>
                          <td> : </td>
                          <td> {applicant.endYear} </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <b> Skills </b>{" "}
                          </td>
                          <td> : </td>
                          <td>
                            <table className="table table-condensed w-auto table-borderless table-hover">
                              {applicant.skills.map((S, index1) => {
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
                          <td>
                            <b> Email </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.applicantEmail} </td>
                        </tr>
                        <tr>
                          <td>
                            <b> Contact Number </b>
                          </td>
                          <td> : </td>
                          <td> {applicant.phoneNumber} </td>
                        </tr>
                      </tbody>
                    </table>
                    {show && (
                      <div className="btn-toolbar mt-3">
                        <button
                            type="button"
                            className="btn btn-primary me-3"
                            onClick={() => onAccept(applicant,key)}
                          >
                            Accept
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary me-3"
                            onClick={() => onReject(applicant,key)}
                          >
                            Reject
                        </button>
                      </div>
                     )} 
                     {showMesg && ( <><h6> {message}</h6><br /></>)}
                     {acceptShow && ( <>      <button
                            type="button"
                            className="btn btn-primary me-3"
                            onClick={() => onCallForInterview(applicant)}
                          >
                            Setup Interview
                        </button>  </>)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}
