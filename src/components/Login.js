import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";
import Navbar from "./Navbar";
import "./Login.css";
// import { useCookies } from "react-cookie";
import Spinner from "./Spinner"

export default function Login() {
  document.title = "Login";

  // const [cookie, setCookie] = useCookies();
  const [failureMsg, setFailureMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState();
  const [loginFailure, setLoginFailure] = useState(false);
  const nav = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`you entered values: ${JSON.stringify(inputs)}`);
    setLoading(true)

    var data = LoginService.login(inputs)
    .then((response) => {
      setLoginFailure(false);
      setLoading(false)

      if (response.data[0] === "Applicant" && response.data[1] === true) {
        // setCookie(response.data[0], response.data[2]);
        localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
        
        nav("/ApplicantDash/AppHome", { state: { email: inputs.email } });
      } else if (
        response.data[0] === "Recruiter" &&
        response.data[1] === true
        ) {
          // setCookie(response.data[0], response.data[2]);
          localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
          nav("/RecruiterDash/RecHome", { state: { email: inputs.email } });
        } else if (response.data[0] === "Admin" && response.data[1] === true) {
          // setCookie(response.data[0], response.data[2]);
          localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
          nav("/AdminDash/AdminHome", { state: { email: inputs.email } });
        } else setLoginFailure(true);
        setFailureMsg("Login Failed");
      })
      .catch((error) => {
        setLoginFailure(true);
        setLoading(false)
        setFailureMsg("Login Failed");

      });
    };
    
    const forgetPassword = (event) => {
      event.preventDefault();
      const data = LoginService.forgetPassword(email)
      .then((response) => {
        setMsg(response.data);
        setShow(true);
      })
      .catch((error) => {
        setMsg(error.response.data);
        setShow(true);
      });
  };

  return (
    <>
      <div>
        <section className="vh-100">
          <div className="container">
            <Navbar />
            {loading && <Spinner/>}
           { !loading && <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="/login.jpg" className="img-fluid" alt="Sample" />
              </div>

              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="center">
                  {loginFailure && (
                    <h5 className="text-center text-danger">{failureMsg}</h5>
                  )}
                </div>
                <h2>Welcome to Job Hunt</h2>
                <div className="col-md-8 col-lg-8 "></div>

                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      value={inputs.email}
                      onChange={changeHandle}
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      required
                      title="Enter valid email address"
                      pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      name="password"
                      value={inputs.password}
                      onChange={changeHandle}
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      required
                      title="Enter your password"
                      autoComplete="off"
                    />
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Login
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      type="button"
                      className=" btn btn-sm btn-link text-danger"
                      style={{ fontFamily: "cursive" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  
                </form>
                <form onSubmit={forgetPassword}>
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
                              Forgot Password?
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            required
                            pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          {show && <h6 className="text-center mt-2">{msg} </h6>}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>}
          </div>
        </section>
      </div>
    </>
  );
}
