import React from "react";
import ApplicantDash from "./ApplicantDash";

export default function ApplicantHome() {
  return (
    <div>
      <ApplicantDash />
      <div className="container">
        <div
          className="card-body border"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <h2 className="text-center fw-bodler"> Welcome to Job hunt </h2>

          <ul className="list-group">
            <li className="list-group-item mt-4">
              {" "}
              <b> Note: </b> You can use sidebar to naviagte between
              functionalities{" "}
            </li>
          </ul>
          <h4 className="fw-bolder mt-3 "> Responsibilities </h4>
          <li className="fs-5">
            Keen understanding of business etiquette
            <li className="fs-5"> Attention to detail</li>
            <li className="fs-5"> Strong active listening abilities</li>
            <li className="fs-5">
              {" "}
              Excellent written and verbal communication skills
            </li>
          </li>
        </div>
      </div>
    </div>
  );
}
