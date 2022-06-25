import React, { useState, useEffect } from "react";
import recruiterService from "../services/RecruiterService";
import "./Reg.css";
import Navbar from "./Navbar";
import { Spinner } from "react-bootstrap";

export default function RecruiterRegistration() {
  document.title = "Recruiter Registration";
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [spin, setSpin] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [inputs, setInputs] = useState({
    name: "",
    recruiterEmail: "",
    password: "",
    type: "Recruiter",
    phoneNumber: "",
    gender: "",
    companyName: "",
    companyContactNumber: "",
    companyAddress: "",
  });

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setSpin(true)
      recruiterService
        .create(inputs)
        .then((response) => {
          setSpin(false);
          setShow(true);
          setMsg(response.data);
        })
        .catch((error) => {
          setSpin(false);
          setShow(true);
          setMsg(error.response.data);
        });
    }
    // alert(`The name you entered was: ${JSON.stringify(inputs)}`);
  }, [formErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(inputs));
    setIsSubmit(true);

  };

  const validate = (values) => {
    const errors = {};
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneFormat = /^\d{10}$/;

    if (!values.name) {
      errors.name = " * Your name is mandatory ";
    }
    if (!values.recruiterEmail) {
      errors.recruiterEmail = "Email is Mandatory";
    } else if (!email.test(values.recruiterEmail)) {
      errors.recruiterEmail = "*Enetr a valid email format";
    }
    if (!values.password) {
      errors.password = " *Password is mandatory ";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = " *Phone number is Mandatory";
    } else if (!phoneFormat.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone-Number must have  10 digits";
    }
    if (!values.gender) {
      errors.gender = " *Gender is mandatory ";
    }

    if (!values.companyName) {
      errors.companyName = " *Company name is Mandatory";
    }
    if (!values.companyContactNumber) {
      errors.companyContactNumber = "*Company Contact number is mandatory";
    }
    if (!values.companyAddress) {
      errors.companyAddress = "*Company Address is mandatory";
    }

    return errors;
  };

  return (
    <>
      <div className="container register-form ">
        <Navbar />
        <div className="form my-4">
          <div className="note">
            <p>Recruiter Registeration</p>
          </div>
          <div className="form-content bk">
            <h5 className="p-1">
              {" "}
              Note: Password must be 8 to 12 characters of Alphanumeric.
              <br />
            </h5>
            <form onSubmit={handleSubmit} autoComplete="off">
              <fieldset className="scheduler-border">
                <legend className="scheduler-border">
                  <h6>
                    <p> {formErrors.password}</p>
                    <p> {formErrors.recruiterEmail}</p>

                    <p> {formErrors.gender}</p>
                    <p> {formErrors.name}</p>
                  </h6>
                  Personal Information
                </legend>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="lname">Enter your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      name="name"
                      required
                      pattern="[a-zA-Z'-'\s]*"
                      value={inputs.name}
                      title="letters only"
                      onChange={changeHandle}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="xyz@xyz.com"
                      name="recruiterEmail"
                      value={inputs.recruiterEmail}
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
                      title=" only 10 digits of your number"
                      pattern="[789][0-9]{9}"
                    />
                    <b> {formErrors.phoneNumber}</b>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-check form-check-inline">
                      <h6 className="mb-2 pb-1">Gender: </h6>
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
                  Professional Details
                  <h6>
                    <p> {formErrors.companyName}</p>
                    <p> {formErrors.companyContactNumber}</p>
                    <p> {formErrors.companyAddress}</p>
                  </h6>
                </legend>
                <div className="row">
                  <div className="col-sm-6">
                    <label className="form-label">Company Name</label>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={inputs.companyName}
                        onChange={changeHandle}
                        className="form-control "
                        required
                        title="Enter your company Name"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label" htmlFor="firstName">
                      Contact Number
                    </label>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="companyContactNumber"
                        name="companyContactNumber"
                        value={inputs.companyContactNumber}
                        onChange={changeHandle}
                        className="form-control "
                        required
                        pattern="[789][0-9]{9}"
                        title=" Numbers only, enter company's Contact Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-6">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      id="companyAddress"
                      name="companyAddress"
                      value={inputs.companyAddress}
                      onChange={changeHandle}
                      className="form-control "
                      required
                      placeholder="Enter complete address "
                      title="Enter your company address"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="d-flex justify-content-center mt-3">
                <div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    value="submit"
                  >
                    Submit
                  </button>
                </div>
                <br />
              </div>
              {spin ? (
                <div className="text-center mt-2">
                  <Spinner animation="border" />
                </div>
              ) : (
                show && <h6 className=" text-center mt-4"> {msg} </h6>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
