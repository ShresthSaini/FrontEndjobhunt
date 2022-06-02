import React, { useState, useEffect } from "react";
import AdminService from "../../services/AdminService";
import AdminDash from "./AdminDash";

export default function AdminMesgs() {
  document.title = "Admin";
  const [myMessages, setMyMessages] = useState([]);
  const [errorMesg, setErrorMesg] = useState();

  useEffect(() => {
    AdminService.getAllMesgs()
      .then((response) => {
        setMyMessages(response.data);
      })
      .catch((error) => {
        setErrorMesg(error.response.data);
      });

    return () => {};
  }, []);

  const onRevert = () =>{

  }

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
              Messages
            </h2>
          </section>
          {errorMesg}
          {myMessages.map((mesg, key) => (
            <div className="alert alert-secondary" role="alert">
              <h5 className="alert-heading">{mesg.subject}</h5>
              <p>{mesg.message}</p>
              <hr />

              <p className="me-3"> <b> Name: &nbsp;  </b> {mesg.name} 
              &nbsp; &nbsp; &nbsp; &nbsp;<b> Email: &nbsp; &nbsp; </b> {mesg.email} </p>
              <button type="button" className="btn btn-primary" onClick={onRevert(mesg)}> Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
