import React from "react";
import Navbar from "./Navbar";

export default function AboutUs() {
  return (
    <div className="container">
      <Navbar />
      <div className="section">
        <div className="row">
          <div className="col-md-8">
            <div className="content-section">
              <div className="title">
                <h1>
                  <u>About Us:</u>
                </h1>
                <p className="AboutUs">
                 
                  JOB HUNT is a global online employment solution for people
                  seeking jobs and the employers who need great people. and have expanded from
                  our roots as a "job board" to a global provider of a full
                  array of job seeking, career management, recruitment and
                  talent management products and services. At the heart of our
                  success and our future is innovation: We are changing the way
                  people think about work, and we're helping them actively
                  improve their lives and their workforce performance with new
                  technology, tools and practices
                </p>
              </div>
              <div className="content about_content">
                <h3>How JOB HUNT works:</h3>
                <p className="AboutUs">
                  Firstly user comes Job Hunt web application and register
                  themselves if User registers oneself as a job Seeker, then
                  after login one can look up for all kind of job. One can
                  search job according to their skills, experience and profile
                  after searching the job one can apply for by simply one click
                  of a button and it’ll change one’s job status to applied On
                  the other hand, if one registers oneself as a job provider,
                  then after login one can post a job online and also one can
                  look up for all kind of applicants. One can search applicant
                  according to their skills, experience and profile and one also
                  receives a notification if any applicant has applied for the
                  job. According to the job profile, one can change applicant’s
                  job status to shortlisted/accepted /rejected. And setup a date
                  for an interview
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image-section">
              <img src="/aboutus.png" alt="AboutUS" width="400" height="400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
