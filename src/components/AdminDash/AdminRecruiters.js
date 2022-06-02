import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../../services/AdminService";
import AdminDash from "./AdminDash";

export default function AdminRecruiters() {
  document.title = "Admin"
  const [myRecruiters, setMyRecruiters] = useState([]);
  const navigate = useNavigate();
  const [recruitersView, setRecruitersView ] = useState([]);
  
useEffect(() => {
  AdminService.getAllRecruiters()
  .then((response) => {
    setMyRecruiters(response.data);
  })
  .catch((error) => {
    alert(error.response.data)
    navigate("/login")
  });

  return () => {
  
  }
}, [])

const changeHandleAppDetails = (e) => {
  setRecruitersView((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
  }));
};

const viewDetails = (recruiter) => {
  setRecruitersView(recruiter);
};

  return (
    <div>
      <AdminDash />
      <div className="container border">
        <div
          className="card-body "
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-5 ">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
               Recruiters
            </h2>
          </section>
       
        <div className="d-flex justify-content-evenly">
            {myRecruiters.map((recruiter, key) => (
              <div
                className="card text-dark bg-light mb-3 "
                style={{ width: "20rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{recruiter.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {recruiter.companyName} 
                  </h6>
                  <div className="card-text">
                    <ul className="list-group list-group-flush" key={key}>
                      <li className="list-group-item ">
                        {" "}
                        <b> Email: </b> {recruiter.recruiterEmail}{" "}
                      </li>
                      <li className="list-group-item ">
                        {" "}
                        <b> Contact Number: </b> {recruiter.companyContactNumber}{" "}
                      </li>
                      
                    
                    </ul>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => viewDetails(recruiter)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Recruiter full details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row align-items-center">
                    <div className="col-auto me-2">
                      <label htmlFor="name"> Name: </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="borderless"
                        
                        name="name"
                        id="name"
                        value={recruitersView.name}
                        onChange={changeHandleAppDetails}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-2">
                      <label htmlFor="applicantEmail"> Email: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="recruiterEmail"
                        id="applicantEmail"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.recruiterEmail}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="phoneNumber">  Number: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.phoneNumber}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto me-1">
                      <label htmlFor="gender"> Gender: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="gender"
                        id="gender"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.gender}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="education"> Company Name: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="companyName"
                        id="education"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.companyName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto ">
                      <label htmlFor="instituteName"> Company Contact: </label>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="borderless"
                        
                        name="companyContactNumber"
                        id="instituteName"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.companyContactNumber}
                        readOnly
                      />
                    </div>
                  </div>
            
        
                  <div className="row mt-2 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="jobProfile"> Company Address: </label>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="borderless"
                        
                        name="companyAddress"
                        id="jobProfile"
                        onChange={changeHandleAppDetails}
                        value={recruitersView.companyAddress}
                        readOnly
                      />
                    </div>
                  </div>
               
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
