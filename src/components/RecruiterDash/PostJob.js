import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RecruiterDash from "./RecruiterDash";
import RecruiterService from "../../services/RecruiterService";

export default function PostJob() {
  const [skill, setSkill] = useState("");
  const location = useLocation();
  const [preferableSkills, setPreferableSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [msg, setMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isShow, setIsShow] = useState(false);
  const [skillMsg, setSkillMsg] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const [rEmail, setREmail] = useState();
  const [myJob, setMyJob] = useState({
    jobTitle: "",
    maxApplicants: 0,
    maxPositions: 0,
    dateOfPosting:new Date().toISOString().slice(0, 10),
    lastDateToApply: Date,

    requiredExp: 0,
  });

  const changeHandle = (e) => {
    setMyJob({
      ...myJob,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setREmail(location.state.recruiterEmail);

    return () => {};
  }, [rEmail]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newJob = { ...myJob, preferableSkills };

    if (myJob.dateOfPosting >  newJob.lastDateToApply) {
      setShowError(true)
      setErrorMsg("last date of Apply must be greater")
      setTimeout(() => {
        setShowError(false)
      }, 2000);
    } else {
      var data = RecruiterService.addJob(rEmail, newJob)
        .then((response) => {
          setShow(true);
          setMsg(response.data);
          setTimeout(() => {
            setShow(false);
          }, 3500);
        })
        .catch((error) => {
          setShow(true);
          console.log(error.response.data);
          setMsg(error.response.data);
          setTimeout(() => {
            setShow(false);
          }, 2500);
        });
    }
  };

  const handleSkill = () => {
    if (skill) {
      setPreferableSkills((sk) => [...sk, skill]);

      setSkill("");
      setIsShow(true);
      setSkillMsg(
        `${skill} Successfully Added: \n Either add another skill or click on post to add a job`
      );
      setTimeout(() => {
        setIsShow(false);
      }, 4500);
    }
  };

  return (
    <>
      <RecruiterDash />
      <div
        className="card-body"
        style={{ padding: "1rem 5rem", marginLeft: "75px" }}
      >
        <div className="form my-4">
          <div className="note">
            <p>Post a Job</p>
          </div>
          <div className="form-content ">
            <form onSubmit={handleSubmit}>
              <fieldset className="scheduler-border">
                <legend className="scheduler-border">Job Details</legend>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="jobtitle">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="jobtitle"
                      placeholder="Job Ttile"
                      name="jobTitle"
                      required
                      pattern="[a-zA-Z'-'\s]*"
                      value={myJob.jobTitle}
                      onChange={changeHandle}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="maxPositions"> Vacant positions</label>
                    <input
                      type="number"
                      id="maxPositions"
                      name="maxPositions"
                      value={myJob.maxPositions}
                      onChange={changeHandle}
                      className="form-control"
                      min="1"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mt-2 mb-3">
                      <label htmlFor="requiredExp">
                        {" "}
                        Experience,If required
                      </label>
                      <input
                        type="number"
                        name="requiredExp"
                        value={myJob.requiredExp}
                        onChange={changeHandle}
                        className="form-control"
                        id="requiredExp"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {<> </>}
                  <div className="col-sm-6">
                    <label htmlFor="dateOfPosting">Date of Posting</label>
                    <input
                      type="Date"
                      name="dateOfPosting"
                      value={myJob.dateOfPosting}
                      onChange={changeHandle}
                      className="form-control "
                      id="dateOfPosting"
                      required
                      disabled
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="LastDateOfPosting">
                      Last Date to Apply
                    </label>
                    <input
                      type="Date"
                      name="lastDateToApply"
                      className="form-control"
                      id="lastDateOfApply"
                      value={myJob.lastDateToApply}
                      onChange={changeHandle}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="preferableSkills">Perferabale Skills</label>
                    <input
                      type="text"
                      name="preferableSkills"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      placeholder="Enter your skill and click on add"
                      className="form-control"
                      id="preferableSkills"
                   
                    />
                  </div>
                  <div className="col-sm-4 mb-3" id="addButton">
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={handleSkill}
                    >
                      Add
                    </button>
                  </div>
                  &nbsp; &nbsp;{" "}
                  {isShow && <h6 className="mt-3"> {skillMsg} </h6>}
                </div>
              </fieldset>

              <div className="center my-6">
                <br />
                <button
                  type="submit"
                  className="btn btn-primary col-4 mx-4"
                  value="submit"
                >
                  Post
                </button>
                <Link to="/RecruiterDash">
                  <button
                    type="cancel"
                    className="btn btn-danger col-4  "
                    value="cancel"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
            {show && <h6 className="text-center mt-4"> {msg} </h6>}
          </div>
        </div>
      </div>
    </>
  );
}
