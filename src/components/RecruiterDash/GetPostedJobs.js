import { useNavigate, useLocation } from "react-router-dom";
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
import AcceptedCand from "./AcceptedCand";

export default function GetPostedJobs() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [rEmail, setREmail] = useState();
  //   const [acceptedCandidates, setAcceptedCandidates] = useState();
  //   const [preferableSkills, setPreferableSkills] = useState();
  const [newJob, setNewJob] = useState([]);
  const [job, setJob] = useState([
    {
      jobId:"",
      jobTitle: "",
      maxApplicants: 0,
      maxPositions: 0,
      activeApplications: 0,
      dateOfPosting: Date,
      lastDateToApply: Date,
      acceptedCandidates: [],
      preferableSkills: [],
      requiredExp: 0,
    },
  ]);
  const [jobDetails, setJobDetails] = useState([
    {
      jobId:"",
      jobTitle: "",
      maxApplicants: 0,
      maxPositions: 0,
      activeApplications: 0,
      dateOfPosting: Date,
      lastDateToApply: Date,
      acceptedCandidates: [],
      preferableSkills: [],
      requiredExp: 0,
    },
  ]);

  const changeHandleJobDetails = (e) => {
    setJobDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitJobDetails = (event) => {
    event.preventDefault();
    const data2 = RecruiterService.updateJob(jobDetails.jobId, jobDetails)
      .then((response) => {
        setSuccess(true);
        setFailure(false);
      })
      .catch((error) => {
        setSuccess(false);
        setFailure(true);
        setFailureMsg(error.response.data);
      });
  };

  useEffect(() => {
    setREmail(location.state.recruiterEmail)
    const data = RecruiterService.getJobPosted(location.state.recruiterEmail)
      .then((response) => {
        if (response.data.length === 0) {
          setShow(true);
          setMsg("You haven't posted a job yet");
        }
        setJob(response.data);
      })
      .catch((error) => {
        setShow(true);
        setMsg("You haven't posted a job yet");
      });
    return () => {};
  }, []);

  const onViewButton = (item) => {
    navigate("/RecruiterDash/GetPostedJobs/ViewDetails", {
      state: {jobId:item.jobId, jobTitle: item.jobTitle, recruiterEmail: rEmail },
    });
  };

  const onAcceptCandButton = (item) => {
      navigate("/RecruiterDash/GetPostedJobs/AcceptedCand", {
      state: {jobId:item.jobId, jobTitle: item.jobTitle, recruiterEmail: rEmail },
    });

    // return <AcceptedCand jobTitle = {item.jobTitle}/>
  };

  const onEditButton = (item) => {
    setJobDetails(item);
  };

  const onDeleteButton = (item) => {
    console.log(item)
    RecruiterService.deleteJob(location.state.recruiterEmail,jobTitle)
      .then((response) => {
        setShow(true);
        setMsg(response.data);
      })
      .catch((error) => {
        setShow(true);
        setMsg(error.response.data);
      });
  };



  return (
    <>
      <div>
        <RecruiterDash />
        <div className="container">
          <div
            className="card-body"
            style={{ padding: "1rem 5rem", marginLeft: "65px" }}
          >
            <section className="mb-4">
              <h3 className="h1-responsive font-weight-bold text-center my-4">
                Jobs posted
              </h3>

              {show && <h5 className="text-center"> *{msg}</h5>}
            </section>
            {job.map((item, key) => (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FcIcons.FcExpand />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="Accordian"
                  >
                    <Typography>
                      <div className="d-flex p-1">
                        <div className="p-1">
                          <b> Job: </b> {item.jobTitle}
                        </div>

                        <div className="p-2"> </div>
                        <div className="p-1 me-5">
                          <b> Posted Date: </b> {item.dateOfPosting}
                        </div>
                      </div>
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>
                      <div className="btn-toolbar mt-3">
                        <button
                          type="button"
                          className="btn btn-primary me-3"
                          onClick={() => onViewButton(item)}
                        >
                          Manage Applications
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => onEditButton(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary me-3"
                          onClick={() => onAcceptCandButton(item)}
                          // onClick={() => <AcceptedCand jobTitle = {item.jobTitle}/>}
                        >
                          Accepted Candidates
                        </button>
                        {/* <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => setJobTitle(item.jobTitle)}
                        >
                          Delete
                        </button> */}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
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
                    Edit job details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="d-flex  flex-column">
                      <div className="row mt-2 align-items-center">
                        <div className="col-auto me-5">
                          <label htmlFor="jobTitle" className="col-form-label">
                            {" "}
                            Job title:
                          </label>
                        </div>
                        <div className="col-sm-8 ">
                          <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            id="jobTitle"
                            value={jobDetails.jobTitle}
                            onChange={changeHandleJobDetails}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mt-4 align-items-center">
                        <div className="col-auto me-4">
                          <label htmlFor="dateOfPosting" className="form-label">
                            {" "}
                            Posted Date:{" "}
                          </label>
                        </div>
                        <div className="col-sm-8 ">
                          <input
                            type="Date"
                            name="dateOfPosting"
                            className="form-control"
                            id="dateOfPosting"
                            disabled
                            value={jobDetails.dateOfPosting}
                            onChange={changeHandleJobDetails}
                          />
                        </div>
                      </div>
                      <div className="row mt-4 align-items-center">
                        <div className="col-auto me-0">
                          <label htmlFor="maxPositions" className="form-label">
                            {" "}
                            Vacant Positions:{" "}
                          </label>
                        </div>
                        <div className="col-sm-8 ">
                          <input
                            type="number"
                            className="form-control"
                            name="maxPositions"
                            id="maxPositions"
                            value={jobDetails.maxPositions}
                            onChange={changeHandleJobDetails}
                          />
                        </div>
                      </div>
                      <div className="row mt-4 align-items-center">
                        <div className="col-auto me-5">
                          <label
                            htmlFor="lastDatetoApply"
                            className="form-label"
                          >
                            {" "}
                            Last date :{" "}
                          </label>
                        </div>
                        <div className="col-sm-8 ">
                          <input
                            type="Date"
                            className="form-control"
                            name="lastDateToApply"
                            id="lastDatetoApply"
                            value={jobDetails.lastDateToApply}
                            onChange={changeHandleJobDetails}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mt-4 align-items-center">
                        <div className="col-auto me-4">
                          <label htmlFor="requiredExp" className="form-label">
                            {" "}
                            Experience :
                          </label>
                        </div>
                        <div className="col-sm-8 ">
                          <input
                            type="number"
                            className="form-control"
                            name="requiredExp"
                            id="requiredExp"
                            value={jobDetails.requiredExp}
                            onChange={changeHandleJobDetails}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="text-center">
                    {success && (
                      <p className="text-center text-success">
                        Job is successfully updated
                      </p>
                    )}
                    {failure && (
                      <p className="text-center text-danger">{failureMsg}</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary "
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmitJobDetails}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title text-dark"
                    id="staticBackdropLabel"
                  >
                    {jobTitle}:
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h6 className="text-center text-danger">
                    {" "}
                    Do you really want to delete this job {jobTitle}? This
                    process cannot be undone.
                  </h6>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteButton(jobTitle)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
