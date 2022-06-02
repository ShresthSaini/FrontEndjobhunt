import React from "react";
import AdminDash from "./AdminDash";

export default function AdminHome() {
  return (
    <div>
        <AdminDash/>
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
            {" "}
            You can view all applicants and recruiters present{" "}
          </li>
          <li className="fs-5">
            {" "}
            You are responsible for maintaining, and troubleshooting Web
            Application{" "}
          </li>
          <li className="fs-5">
            {" "}
            You are responsible for implementing security protocols, creating
            backups, sorting out software issues and user complaints{" "}
          </li>
        </div>
      </div>
    </div>
  );
}
