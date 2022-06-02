import React from "react";
import RecruiterDash from "./RecruiterDash";

export default function RecruiterHome() {
  return (
    <div>
      <RecruiterDash />
      <div className="container">
        <div
          className="card-body border"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <h2 className="text-center fw-bodler"> Welcome to Job hunt </h2>

              {" "}
              <b> Note: </b> You can use sidebar to naviagte between
              functionalities{" "}
        
          <h4 className="fw-bolder mt-3 "> Responsibilities </h4>
          <li className="fs-5"> You are responsible forConducting interviews and filtering candidates for open positions </li>
          <li className="fs-5">
            {" "}
            You are responsible for Introducing new hires to the company and walk them through the hiring
            and training process{" "}
          </li>
          <li className="fs-5">
            {" "}
            You are responsible for Complete all new-hire paperwork with
            candidates who meet the expectation of the job{" "}
          </li>
        </div>
      </div>
    </div>
  );
}
