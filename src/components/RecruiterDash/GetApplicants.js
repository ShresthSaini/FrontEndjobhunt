import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterService from "../../services/RecruiterService";
import RecruiterDash from "./RecruiterDash";


export default function GetApplicants() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [myApplicants, setMyApplicants] = useState([
    {
      name: "",
      applicantEmail: "",
      phoneNumber: "",
      gender: "",
      education: "",
      instituteName: "",
      startYear: Date,
      endYear: Date,
      skills: [],
      jobProfile: "",
      numOfExp: 0,
    },
  ]);
  const [myApplicantsView, setMyApplicantsView] = useState([
    {
      name: "",
      applicantEmail: "",
      phoneNumber: "",
      gender: "",
      education: "",
      instituteName: "",
      startYear: Date,
      endYear: Date,
      skills: [],
      jobProfile: "",
      numOfExp: 0,
    },
  ]);

  const changeHandleAppDetails = (e) => {
    setMyApplicantsView((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    RecruiterService.getAllApplicants()
      .then((response) => {
        setMyApplicants(response.data);
      })
      .catch((error) => {
        navigate("/login")
      });
    return () => {};
  }, []);

  const viewDetails = (applicant) => {
    setMyApplicantsView(applicant);
  };

  return (
    <div>
      <RecruiterDash />
      <div className="container border">
        <div
          className="card-body "
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-5 ">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              All Applicants
            </h2>
          </section>

          <div className="d-flex justify-content-evenly">
            {myApplicants.map((applicant, key) => (
              <div
                className="card text-dark bg-light mb-3 "
                style={{ width: "19rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{applicant.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {applicant.jobProfile} <b> Exp:</b> {applicant.numOfExp}{" "}
                  </h6>
                  <div className="card-text">
                    <ul className="list-group list-group-flush" key={key}>
                      <li className="list-group-item">
                        {" "}
                        <b> Education: </b> &nbsp;  {applicant.education}{" "}
                      </li>
                      <li className="list-group-item" style={{fontSize:"14px"}}>
                        {" "}
                        <b> Institute: </b> &nbsp; {applicant.instituteName}{" "}
                      </li>
                      <li className="list-group-item">
                        {" "}
                        <b> End Year: </b> &nbsp; {applicant.endYear}{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => viewDetails(applicant)}
                    >
                      View Details
                    </button>
                  </div>
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
                    Applicant full details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row align-items-center">
                    <div className="col-auto me-2">
                      <label htmlFor="name"> Name: </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="borderless"
                        name="name"
                        id="name"
                        value={myApplicantsView.name}
                        onChange={changeHandleAppDetails}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-2">
                      <label htmlFor="applicantEmail"> Email: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        name="applicantEmail"
                        id="applicantEmail"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.applicantEmail}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="phoneNumber">  Number: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.phoneNumber}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-1">
                      <label htmlFor="gender"> Gender: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="gender"
                        id="gender"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.gender}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="education"> Education: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="education"
                        id="education"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.education}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-2">
                      <label htmlFor="instituteName"> Institute: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="instituteName"
                        id="instituteName"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.instituteName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="startYear"> Start Year: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        name="startYear"
                        id="startYear"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.startYear}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-1">
                      <label htmlFor="endYear"> End Year: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="endYear"
                        id="endYear"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.endYear}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="jobProfile"> Job profile: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="jobProfile"
                        id="jobProfile"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.jobProfile}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="experience"> Experience: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="numOfExp"
                        id="experience"
                        onChange={changeHandleAppDetails}
                        value={myApplicantsView.numOfExp}
                        readOnly
                      />
                    </div>
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
