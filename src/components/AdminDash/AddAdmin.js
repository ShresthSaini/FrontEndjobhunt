import { React, useState } from "react";
import { set } from "react-hook-form";
import AdminService from "../../services/AdminService";
import AdminDash from "./AdminDash";

export default function AddAdmin() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    adminEmail: "",
    password: "",
    adminAddress: "",
  });

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = AdminService.addAdmin(inputs).then((response)=>{
      setShow(true)
      setMsg(response.data)
    }).catch((error)=>{
      setShow(true)
      setMsg(error.response.data)

    })
  };

  return (
    <div>
      <AdminDash />
      <div className="container">
        <div
          className="card-body"
          style={{ padding: "1rem 5rem", marginLeft: "65px" }}
        >
          <section className="mb-5 ">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Add New Admin
            </h2>
          </section>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={changeHandle}
                  pattern="[a-zA-Z'-'\s]*"
                  value={inputs.name}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="adminEmail">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="adminEmail"
                  id="email"
                  placeholder="xyz@xyz.com"
                  required
                  onChange={changeHandle}
                  pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}"
                  value={inputs.adminEmail}
                />
              </div>
              <div className="row mt-2">
                <div className="col-sm-4">
                  <label htmlFor="passqword">Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={changeHandle}
                    value={inputs.password}
                    placeholder="Strong Password "
                    title="At least 1 Uppercase
                       1 Lowercase
                       1 Number
                       1 Special Character 
                        8 to 12 characters required"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                  />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="address">Address:</label>
                  <input
                    className="form-control"
                    name="adminAddress"
                    type="text"
                    id="address"
                    required
                    onChange={changeHandle}
                    placeholder="enter your address"
                    value={inputs.adminAddress}
                  />
                </div>
              </div>
            </div>
            <div className=" justify-content-center mt-3">
              <div>
                <button
                  type="submit"
                  className="btn btn-success"
                  value="submit"
                >
                  Register
                </button>
              </div>
            </div>
            {show && <h6 className=" text-center mt-4"> {msg} </h6>}
          </form>
        </div>
      </div>
    </div>
  );
}
