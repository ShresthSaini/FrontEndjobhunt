import React, { useState } from "react";
import Navbar from "./Navbar";
import AdminService from "../services/AdminService";

export default function ContactUs() {
  document.title = "ContactUs";

  return (
    <div className="container">
      <Navbar />
      <>
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>

        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>
        <h4 className="text-center fw-bolder">QUICK FAQ About this website</h4>
        <div className="row d-flex">
          <div className="float-container">
            <div className="float-child">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      I don’t have the required experience. Should I apply for
                      the job?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        If you think you can pull off the job requirements well,
                        you should definitely apply to the job. If you do not
                        have the required number of years or miss any hard
                        skill, it does not rule you out as an applicant. If
                        you’re the best candidate, years of experience won’t
                        matter in the end.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What are some key ways to make an impact on the hiring
                      manager?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        <ul>
                          <li>Practice mock interviews</li>
                          <li> Research about the company</li>
                          <li>Know as much as you can about the job </li>
                          <li>Keep a check on your body posture</li>
                        </ul>
                      </strong>
                      .
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      What is the most important thing to include in a resume?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        Other than your personal details and contact
                        information, your resume should have information about
                        your work history, educational qualifications and
                        related skills. For every job applications, these needs
                        to be tailored. Add professional recognitions and
                        accomplishments to stand out.
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How long should I wait before following up?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        If you do not get a response right away, wait till the
                        interviewer’s deadline has passed. If you still do not
                        hear anything, send a brief follow up note and remind
                        the interviewer that how you fit the position well and
                        your interest in the role. You should follow-up 2 more
                        times with an interval of 7-10 days each. If you still
                        do not get a response, you should move on.
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
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
                      value={inputs.userEmail}
                      onChange={changeHandle}
                      required
                      placeholder="xyz@domain.com"
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
                      placeholder="Example: How can recruiter post a job"
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

              <div className="text-center text-md-left ">
                <button type="submit" className="btn btn-primary ">
                  Send
                </button>
              </div>
            </form>
            <div className="status"></div>
          </div>*/}

            <div className="float-child2 d-inline-flex">
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="material-icons">map</i>
                  <a href="https://t.ly/GR4h">
                    <p>Model Town,Karnal,132001 Haryana, India</p>
                  </a>
                </li>

                <li>
                  <i className="material-icons">call</i>
                  <p>+91 9466070716</p>
                </li>

                <li>
                  <i className="material-icons">email</i>
                  <p>Job.Hunt034@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
