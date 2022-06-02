import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminService from "../../services/AdminService";
import AdminDash from "./AdminDash";

export default function AdminPersonalDetails() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const location = useLocation();
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    adminEmail: "",
    password: "",
    adminAddress: "",
  });

  const changeHandle = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`The name you entered was: ${JSON.stringify(personalDetails)}`);
    const data = AdminService.updateAdmin(personalDetails).then((response)=>{
        setShow(true)
        setMsg("Admin Successfully Updated")
    }).catch((error)=>{
        setShow(true)
        setMsg("Error While updating")
    })
  };

  useEffect(() => {
    setPersonalDetails({
      name: location.state.name,
      adminEmail: location.state.adminEmail,
      password: location.state.password,
      adminAddress: location.state.adminAddress,
    });

    return () => {};
  }, []);

  return (
    <div>
      <AdminDash />
      <div className="container-border">
      <div
          className="card-body "
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-5 ">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
             Personal Details
            </h2>
          </section>

           <div className="center " style={{marginLeft:"285px"}}>
        <form  onSubmit={handleSubmit} className="center">
          <div className="form-group">
            <label htmlFor="name" >
                
              Your Name
            </label>
            <div className="col-sm-4">
           
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

          <div className="form-group">
            <label htmlFor="email" >
              Email
            </label>
            <div className="col-sm-4">
              
                <input
                  type="email"
                  className="form-control"
                  name="adminEmail"
                  id="adminEmail"
                  disabled
                  value={personalDetails.adminEmail}
                  required
                />
        
            </div>
          </div>

        
            <label htmlFor="adminAddress">
              Address:
            </label>
            <div className="col-sm-4">
             
                <input
                  type="text"
                  className="form-control"
                  name="adminAddress"
                  id="adminAddress"
                  value={personalDetails.adminAddress}
                  onChange={changeHandle}
                  required
                />
           
        
          </div>
          <div className="center my-6">
            <br />
            <button
              type="submit"
              className="btn btn-primary  mx-4"
              value="submit"
            >
              Update
            </button>
          </div>
          {show && <h6 className="text-center fw-bolder mt-3"> {msg} </h6>}
        </form>
        </div>
      </div>
      </div>
    </div>
  );
}
