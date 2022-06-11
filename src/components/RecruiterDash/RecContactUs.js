import React, { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import RecruiterDash from "./RecruiterDash";
import AdminService from "../../services/AdminService";

export default function AppContactUs() {
  document.title = "ContactUs";

  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  
  const [msg, setMsg] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setInputs({email:location.state.recruiterEmail})
  
    return () => {
      
    }
  }, [])
  

  const handleSubmit = (event) => {
    event.preventDefault();
    AdminService.sendMesg(inputs)
      .then((response) => {
        setMsg(response.data);
        setIsShow(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  return (
    <div>
      <RecruiterDash />
      <div className="container">
        <div className="card-bodies">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us
          </h2>

          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>
          <div className="row">
            <div className="col-md-9 mb-md-0 mb-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="userName" className="">
                      <strong>Name:</strong>
                    </label>
                    <div className="md-form mb-2">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={inputs.userName}
                        onChange={changeHandle}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="userEmail" className="">
                      <strong>Email:</strong>
                    </label>
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={inputs.email}
                        disabled
                        required
                        pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="subject" className="">
                      <strong>Subject:</strong>
                    </label>
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={inputs.subject}
                        onChange={changeHandle}
                        required
                        placeholder="Example: How to post a job? "
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <strong>
                      <label htmlFor="body"> Your message:</label>
                    </strong>
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        value={inputs.body}
                        onChange={changeHandle}
                        required
                        className="form-control md-textarea"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="text-center text-md-left my-3 ">
                  <button type="submit" className="btn btn-primary ">
                    Send
                  </button>
                  {isShow && ( 
                    <h6 className="mt-2"> 
                      {msg}
                    </h6>
                  )}
                </div>
              </form>
              <div className="status"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
