import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RecruiterService from "../../services/RecruiterService";
import RecruiterDash from "./RecruiterDash";


export default function PersonalDetails() {
  const navigate = useNavigate();
  const [show,setShow] = useState(false);
  const [msg,setMsg] = useState();
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const [rEmail, setREmail] = useState();

  const [personalDetails, setPersonalDetails] = useState({
    role:"",
    name: "",
    recruiterEmail: "",
    password: "",
    type:"",
    password:"",
    phoneNumber: "",
    gender: "",
    companyName: "",
    companyContactNumber: "",
    companyAddress: "",
  });

  const changeHandle = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

      //  alert(`The name you entered was: ${JSON.stringify(personalDetails)}`);

    const data = RecruiterService.update(personalDetails.recruiterEmail, personalDetails)
      .then((response) => {
        setShow(true)
        setMsg(response.data);
      })
      .catch((error) => {
        setShow(true)
        setMsg(error.response.data);
      });
  };

  useEffect(() => {    //Receving end
    setREmail(location.state.email)
      setPersonalDetails({
        role:location.state.role,
        name:location.state.name,
        recruiterEmail:location.state.recruiterEmail,
        phoneNumber:location.state.phoneNumber,
        type:location.state.type,
        password:location.state.password,
        gender:location.state.gender,
        companyName:location.state.companyName,
        companyAddress:location.state.companyAddress,
        companyContactNumber:location.state.companyContactNumber

      })
    
  }, []);

  return (
    <div>
      <RecruiterDash />
      <div className="container">
        <div className="card-bodies">
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
                            name="recruiterEmail"
                            id="recruiterEmail"
                            disabled
                            value={personalDetails.recruiterEmail}
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
                          <option selected disabled>Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companyName"
                        className="cols-sm-2 control-label"
                      >
                        Company-Name
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
                            name="companyName"
                            id="companyName"
                            pattern="[a-zA-Z'-'\s]*"
                            value={personalDetails.companyName}
                            onChange={changeHandle}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companyphonenumber"
                        className="cols-sm-2 control-label"
                      >
                        Company Phone-Number
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
                            name="companyContactNumber"
                            value={personalDetails.companyContactNumber}
                            id="companyContactNumber"
                            onChange={changeHandle}
                            title="Phone Number must have 10 digits"
                            required
                     
                            pattern="[789][0-9]{9}"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companyAddress"
                        className="cols-sm-2 control-label"
                      >
                        Company Address
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="companyAddress"
                            id="companyAddress"
                            value={personalDetails.companyAddress}
                            onChange={changeHandle}
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
                      <Link to="/RecruiterDash/RecHome">
                        <button
                          type="cancel"
                          className="btn btn-danger col-4  "
                          value="cancel"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                    {show && <h6 className="text-center fw-bolder mt-3"> {msg} </h6>}
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
