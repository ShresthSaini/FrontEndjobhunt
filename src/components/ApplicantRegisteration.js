import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import applicantService from "../services/ApplicantService";
import "./Reg.css";
import Select from "react-select";
import { Spinner } from "react-bootstrap";

export default function ApplicantRegisteration() {
  const skillsList = [
    { label: "Troubleshooting", value: "Troubleshooting" },
    { label: "Testing", value: "Testing" },
    { label: "Prototyping", value: "Prototyping" },
    { label: "Design", value: "Design" },
    { label: "CAD", value: "CAD" },
    { label: "CSS", value: "CSS" },
    { label: "BootStrap", value: "Bootstrap" },
    { label: "kotlin", value: "Kotlin" },
    { label: "SpringBoot", value: "SpringBoot" },
    { label: "ReactJs", value: "ReactJs" },
    { label: "Java", value: "Java" },
    { label: "CPP/C++", value: "CPP" },
    { label: "C-Language", value: "C" },
    { label: "python", value: "python" },
    { label: "Django", value: "Django" },
    { label: "Accounting", value: "Accounting" },
    { label: "Agile Development ", value: "Agile Development " },
    { label: "Cloud Management", value: "Cloud Management " },
    { label: "Front-End Development", value: "Front-End  development" },
    { label: "Back-End Development", value: "Back-End Development" },
    { label: "UX/UI", value: "UX/UI" },
    { label: "Debugging", value: "Debugging" },
    { label: "Machine Learning", value: "Machine Learning" },
    { label: "Web Security", value: "Web Security" },
    { label: "Java Script", value: "Java Script" },
    { label: "Open-Source Experience", value: "Open-Source Experience" },
    { label: "Data Structures", value: "Data Structures" },
    { label: "Web Development", value: "Web Development" },
    { label: "others", value: "others" },
  ];

  const courses = [
    { label: "B.A", value: "BA" },
    { label: "BE", value: "BE" },
    { label: "BBA", value: "BBA" },
    { label: "B.Tech", value: "BTech" },
    { label: "BCA", value: "BCA" },
    { label: "BFA", value: "BFA" },
    { label: "B.ed", value: "Bed" },
    { label: "BDS", value: "BDS" },
    { label: "B.Sc", value: "Bsc" },
    { label: "Bcom", value: "Bcom" },
    { label: "B.Pharma", value: "Bpharma" },
    { label: "B.Architecture", value: "BArch" },
    { label: "CA", value: "CA" },
    { label: "CFA", value: "CFA" },
    { label: "CS", value: "CS" },
    { label: "MBA", value: "MBA" },
    { label: "MCA", value: "MCA" },
    { label: "Msc", value: "Msc" },
    { label: "M.Tech", value: "Mtech" },
    { label: "M.Ed", value: "MEd" },
    { label: "M.Pharma", value: "M.Pharma" },
    { label: "MBBS", value: "MBBS" },
    { label: "UG-other", value: "otherUG" },
    { label: "PG-other", value: "otherPG" },
  ];
  document.title = "Applicant Registration ";

  const [education, setEducation] = useState("");
  const [resume, setResume] = useState();
  const [instituteName, setInstituteName] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [spin, setSpin] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ label: "", value: "" });
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [isShowPro, setIsShowPro] = useState(false);
  const [isShowOthers, setIsShowOther] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [skillMsg, setSkillMsg] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [newInputs, setNewInputs] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    applicantEmail: "",
    password: "",
    type: "Applicant",
    phoneNumber: "",
    gender: "",
    instituteName: "",
    startYear: Date,
    endYear: Date,
    jobProfile: "",
    numOfExp: Number,
  });

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setEducation(selectedValue.value);
    setNewInputs({ ...inputs, education, skills });

    // setIsShow(true);
  };

  const handleSkill = () => {
    if (skill) {
      setSkills((sk) => [...sk, skill]);
      setSkill("");
      setIsShow(true);
      setSkillMsg(
        `${skill} Successfully Added: \n Either add another skill or click on submit`
      );
      setTimeout(() => {
        setIsShow(false);
      }, 4500);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(newInputs));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setSpin(true);
      applicantService
        .create(newInputs)
        .then((response) => {
          setSpin(false);
          setShow(true);
          setMsg(response.data);
          setInputs.name("");
          setInputs.applicantEmail("");
          setInputs.password("");
          setInputs.type("Applicant");
          setInputs.phoneNumber("");
          setInputs.gender("");
          setInputs.education("");
          setInputs.instituteName("");
          setInputs.startYear("");
          setInputs.endYear("");
          setInputs.numOfExp("");
        })
        .catch((error) => {
          setSpin(false);
          setShow(true);
          setMsg(error.response.data);
        });
      // alert(`The name you entered was: ${JSON.stringify(newInputs)}`);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.education) {
      errors.education = "Education is mandatory Field";
    }

    if (values.endYear < values.startYear) {
      errors.endYear = " *End year must be greater";
    }

    return errors;
  };

  return (
    <>
      <div className="container register-form ">
        <Navbar />
        <div className="form my-4">
          <div className="note">
            <p>Applicant Registeration</p>
          </div>
          <div className="form-content bk">
            <h5 className="p-1">
              {" "}
              Note:
              <li className="fs-5">
                Password must be 8 to 12 characters of Alphanumeric.
              </li>
              {/* <li className="fs-5">Resume size must be less than 2 MB</li> */}
              <br />
            </h5>
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* <fieldset className="scheduler-border">
              <legend className="scheduler-border">Upload Your Resume</legend>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="file"
                    name="resume"
                    id=" resume"
                    placeholder="Click to upload your resume"
                    accept="application/pdf"

                    required
                  />
                </div>
              </div>
            </fieldset> */}
              <fieldset className="scheduler-border">
                <legend className="scheduler-border">
                  Personal Information
                  <h6>
                    {formErrors.gender}
                    {formErrors.name} {formErrors.applicantEmail}
                    {formErrors.password} {formErrors.phoneNumber}
                  </h6>
                </legend>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="lname">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="FullName"
                      name="name"
                      required
                      pattern="[a-zA-Z'-'\s]*"
                      value={inputs.name}
                      onChange={changeHandle}
                      autoComplete="off"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="xyz@xyz.com"
                      name="applicantEmail"
                      value={inputs.applicantEmail}
                      required
                      onChange={changeHandle}
                      pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}"
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={inputs.password}
                      onChange={changeHandle}
                      className="form-control"
                      autoComplete="off"
                      placeholder="Strong Password "
                      title="At least 1 Uppercase
                       1 Lowercase
                       1 Number
                       1 Special Character 
                        8 to 12 characters required"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={inputs.phoneNumber}
                      onChange={changeHandle}
                      className="form-control "
                      id="PhoneNumber"
                      required
                      placeholder="Enter your 10 digit phone number"
                      min="0"
                      title=" only 10 digits of your number"
                      pattern="[789][0-9]{9}"
                    />
                  </div>
                  <div className="col-sm-6">
                    <div className="form-check form-check-inline">
                      <h6 className="mb-2 pb-1 fw-bold">Gender: </h6>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="femaleGender"
                        value="female"
                        checked={inputs.gender === "female"}
                        onChange={changeHandle}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="femaleGender"
                      >
                        Female
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="maleGender"
                        value="male"
                        checked={inputs.gender === "male"}
                        onChange={changeHandle}
                        required
                      />
                      <label className="form-check-label" htmlFor="maleGender">
                        Male
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="scheduler-border">
                <legend className="scheduler-border">
                  Educational Qualification
                </legend>
                <div className="row mb-4">
                  <div className="col-sm-6">
                    <label className="form-label" htmlFor="firstName">
                      Education
                    </label>
                    <div className="form-outline">
                      <Select
                        options={courses}
                        isSearchable
                        placeholder="Select your UG/PG course"
                        onChange={setSelectedValue}
                      />
                    </div>
                    <h6 className="text-center text-danger fw-bolder">
                      {formErrors.education}
                    </h6>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label" htmlFor="InstituteName">
                      Institute name
                    </label>
                    <div className="form-outline">
                      {/* <Select 
                        options={collegeList}
                        isSearchable
                        placeholder="Select your institute Name"
                        onChange={setSelectedInstValue}
                      /> */}
                      <input
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        value={inputs.instituteName}
                        onChange={changeHandle}
                        placeholder="Enter your institute Name"
                        className="form-control "
                        required
                        title="Enter your institute name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-6">
                    <label className="form-label" htmlFor="firstName">
                      Start Date
                    </label>
                    <input
                      type="Date"
                      id="start-year"
                      name="startYear"
                      value={inputs.startYear}
                      onChange={changeHandle}
                      className="form-control "
                      required
                      title="Enter your Start year"
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label" htmlFor="firstName">
                      End Date
                    </label>
                    <input
                      type="Date"
                      id="last-year"
                      name="endYear"
                      value={inputs.endYear}
                      onChange={changeHandle}
                      className="form-control "
                      required
                      title="Enter your end year"
                    />
                    <h6 className="text-center text-danger fw-bolder">
                      {formErrors.endYear}
                      {formErrors.startYear}
                    </h6>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  {error && <h6> Select one the following </h6>}
                  <label className="form-label"> *Are you a: </label>
                  <select
                    name="select"
                    className="form-select"
                    required
                    onChange={(e) => {
                      if (e.target.value === "fresher") {
                        setIsShowPro(false);
                      } else if (e.target.value === " ") {
                        setError(true);
                      } else {
                        setIsShowPro(true);
                      }
                    }}
                    defaultValue=" "
                  >
                    <option value=" " disabled>
                      {" "}
                      Fresher/Working Professional{" "}
                    </option>
                    <option value="fresher">Fresher</option>
                    <option value="Professional">Working Professional</option>
                  </select>
                </div>
              </fieldset>

              {isShowPro && (
                <fieldset className="scheduler-border">
                  <legend className="scheduler-border">
                    <p className="small-danger fw-bold"> {formErrors.skills}</p>
                    Professional Details
                  </legend>
                  <div className="row ">
                    <div className="col-sm-4 ">
                      <label htmlFor="form-label" className="form-label">
                        Job profile
                      </label>
                      <input
                        type="text"
                        name="jobProfile"
                        value={inputs.jobProfile}
                        onChange={changeHandle}
                        className="form-control"
                        placeholder="Designation"
                        required
                        id="JobProfile"
                      />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="form-label" className="form-label">
                        Experience,if any
                      </label>
                      <input
                        type="number"
                        name="numOfExp"
                        value={inputs.numOfExp}
                        onChange={changeHandle}
                        className="form-control "
                        id="numOfExp"
                        title="Numbers only"
                        pattern="[0-9]"
                        placeholder="Number of years only"
                        min="0"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <label className="form-label" htmlFor="skills">
                          Skills
                        </label>
                        <input
                          type="text"
                          id="skills"
                          name="skills"
                          value={skill}
                          onChange={(e) => setSkill(e.target.value)}
                          className="form-control "
                          placeholder="Enter your skill and click on Add"
                          title="Enter skills"
                        />
                      </div>
                      <div className="col-sm-2 " id="addButton">
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
                  </div>
                </fieldset>
              )}

              <div className="btn toolbar d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success "
                  value="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            {spin ? (
              <div className="text-center mt-2">
                <Spinner animation="border" />
              </div>
            ) : (
              show && <h6 className=" text-center mt-4"> {msg} </h6>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
