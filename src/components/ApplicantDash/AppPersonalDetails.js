import React, { useState, useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import ApplicantDash from "./ApplicantDash";
import ApplicantService from "../../services/ApplicantService";

export default function AppPersonalDetails() {

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const [aEmail, setAEmail] = useState();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();

  const [personalDetails, setPersonalDetails] = useState({
    role: "",
    name: "",
    applicantEmail: "",
    password: "",
    phoneNumber: "",
    gender: "",
    type: "",
    education: "",
    instituteName: "",
    startYear: "",
    endYear: "",
    skills: [],

    numOfExp: 0,
  });

  const changeHandle = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(personalDetails));
    setIsSubmit(true);
    //  alert(`The name you entered was: ${JSON.stringify(personalDetails)}`);
  };
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit){
      
          const data = ApplicantService.update(aEmail, personalDetails)
            .then((response) => {
              setShow(true);
              setMsg(response.data);
            })
            .catch((error) => {
              setShow(true);
              setMsg(error.response.data);
            });
      
    }
  
    return () => {
     
    }
  }, [formErrors])
  

  useEffect(() => {
    setAEmail(location.state.applicantEmail);

    setPersonalDetails({
      role: location.state.role,
      name: location.state.name,
      applicantEmail: location.state.applicantEmail,
      phoneNumber: location.state.phoneNumber,
      gender: location.state.gender,
      type: location.state.type,
      password: location.state.password,
      instituteName: location.state.instituteName,
      startYear: location.state.startYear,
      endYear: location.state.endYear,
      numOfExp: location.state.numOfExp,
      education: location.state.education,
      jobProfile: location.state.jobProfile,
      skills:location.state.skills

    });

    
    
  }, []);
  
  const validate = (values) => {
    const errors = {};
    
    
    if (values.endYear < values.startYear) {
      errors.endYear = " *End year must be greater";
    }

    return errors;
  };
  
 
  return (
    <div>
      <ApplicantDash />
      <div className="container">
        <div
          className="card-body"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Personal Details</div>
                <div className="card-body">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="cols-sm-2 control-label">
                        Your Name
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            pattern="[a-zA-Z'-'\s]*"
                            value={personalDetails.name}
                            onChange={changeHandle}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="cols-sm-2 control-label"
                      >
                        Email
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i
                              className="fa fa-lock fa-lg"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            name="applicantEmail"
                            id="applicantEmail"
                            disabled
                            value={personalDetails.applicantEmail}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="phonenumber"
                        className="cols-sm-2 control-label"
                      >
                        Phone-Number
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i
                              className="fa fa-users fa"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={personalDetails.phoneNumber}
                            onChange={changeHandle}
                            title=" only 10 digits of your number"
                            pattern="[789][0-9]{9}"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="gender"
                        className="cols-sm-2 control-label"
                      >
                        Gender
                      </label>
                      <div className="cols-sm-10">
                        <select
                          name="gender"
                          className="form-select"
                          aria-label="Default select example"
                          onChange={changeHandle}
                          value={personalDetails.gender}
                          required
                        >
                          <option selected disabled>
                            Select gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="education"
                        className="cols-sm-2 control-label"
                      >
                        Education
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i
                              className="fa fa-user fa"
                              aria-hidden="false"
                            ></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="education"
                            id="education"
                            pattern="[a-zA-Z'-'\s]*"
                            value={personalDetails.education}
                            onChange={changeHandle}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companyName"
                        className="cols-sm-2 control-label"
                      >
                        Institute-Name
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i
                              className="fa fa-user fa"
                              aria-hidden="false"
                            ></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="instituteName"
                            id="instituteName"
                            value={personalDetails.instituteName}
                            onChange={changeHandle}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <b>
                      {formErrors.endYear}
                      {formErrors.startYear}
                    </b>
                    <div className="form-group">
                      <div className="col-sm-10">
                        <label className="form-label" htmlFor="firstName">
                          Start year
                        </label>
                        <input
                          type="Date"
                          id="startyear"
                          name="startYear"
                          value={personalDetails.startYear}
                          onChange={changeHandle}
                          className="form-control "
                          required
                          title="Enter your Start year"
                        />
                      </div>
                    </div>

                    <div className="col-sm-10">
                      <label className="form-label" htmlFor="end year">
                        End year
                      </label>
                      <input
                        type="Date"
                        id="last-year"
                        name="endYear"
                        value={personalDetails.endYear}
                        onChange={changeHandle}
                        className="form-control "
                        required
                        title="Enter your end year"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companyphonenumber"
                        className="cols-sm-2 control-label"
                      >
                        Experience if any
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i
                              className="fa fa-users fa"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="numOfExp"
                            value={personalDetails.numOfExp}
                            id="NumberOfExperience"
                            onChange={changeHandle}
                            title="Numbers only"
                            pattern="[0-9]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="center my-6">
                      <br />
                      <button
                        type="submit"
                        className="btn btn-primary col-4 mx-4"
                        value="submit"
                      >
                        Update
                      </button>
                      <Link to="/ApplicantDash">
                        <button
                          type="cancel"
                          className="btn btn-danger col-4  "
                          value="cancel"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                    {show && (
                      <h6 className="text-center fw-bolder mt-3"> {msg} </h6>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
