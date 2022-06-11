import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RecruiterService from "../../services/RecruiterService";
import RecruiterDash from "./RecruiterDash";
import Spinner from "../Spinner";

export default function CallForInterview() {
  
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const location = useLocation();
  const [details, setDetails] = useState({
    applicantName: "",
    applicantEmail: "",
    recruiterName: "",
    recruiterEmail: "",
    jobTitle: "string",
    timeAndDate: Date,
    companyName: "",
    companyNumber: 0,
    companyAddress: "",
  });

  const changeHandle = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    setDetails({
      applicantName: location.state.applicantName,
      applicantEmail: location.state.applicantEmail,
      jobTitle:location.state.jobTitle,
      recruiterName: location.state.recruiterName,
      recruiterEmail: location.state.recruiterEmail,
      companyName: location.state.companyName,
      companyAddress: location.state.companyAddress,
      companyNumber: location.state.companyContactNumber

    })
  
    return () => {
   
    }
  }, [])
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const data = RecruiterService.callForInterview(details)
    .then((response) => {
      setLoading(false)
      setMsg(response.data);
      setShow(true)
    })
    .catch((error) => {
      setLoading(false)
        setShow(true)
        setShow(error.response.data)
      });
  };
  return (
    <div>
      <RecruiterDash />
      {loading && <Spinner/>}
      {!loading && <div className="container border">
        
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Setup Interview date and time</div>
                <div className="card-body">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        htmlFor="applicantName"
                        className="cols-sm-2 control-label"
                      >
                        Applicant Name
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="applicantName"
                            id="applicantName"
                            pattern="[a-zA-Z'-'\s]*"
                            value={details.applicantName}
                            onChange={changeHandle}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="applicantEmail"
                        className="cols-sm-2 control-label"
                      >
                        Applicant Email
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
                            onChange={changeHandle}
                            value={details.applicantEmail}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="recruiterName"
                        className="cols-sm-2 control-label"
                      >
                        recruiter Name
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="recruiterName"
                            id="recruiterName"
                            pattern="[a-zA-Z'-'\s]*"
                            value={details.recruiterName}
                            onChange={changeHandle}
                            required
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="recruiterEmail"
                        className="cols-sm-2 control-label"
                      >
                        Recruiter Email
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
                            value={details.recruiterEmail}
                            required
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="jobTitle"
                        className="cols-sm-2 control-label"
                      >
                        Job Title
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            id="jobTitle"
                            pattern="[a-zA-Z'-'\s]*"
                            value={details.jobTitle}
                            onChange={changeHandle}
                            required
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="timeAndDate"
                        className="cols-sm-2 control-label"
                      >
                        Date and time
                      </label>
                      <div className="cols-sm-10">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-user fa" aria-hidden="true"></i>
                          </span>
                          <input
                            type="datetime-local"
                            className="form-control"
                            name="timeAndDate"
                            id="timeAndDate"
                        
                            value={details.timeAndDate}
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
                            value={details.companyName}
                            onChange={changeHandle}
                            required
                            disabled
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
                            value={details.companyNumber}
                            id="companyContactNumber"
                            onChange={changeHandle}
                            title="Phone Number must have 10 digits"
                            required
                            disabled
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
                            value={details.companyAddress}
                            onChange={changeHandle}
                            required
                            disabled
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
                        Send
                      </button>
   
                    </div>
                    {show && <h6 className="text-center mt-3"> {msg} </h6>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
   
  );
}
