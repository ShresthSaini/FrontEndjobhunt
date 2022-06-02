import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminService from "../../services/AdminService";
import AdminDash from "./AdminDash";

export default function AdminDelete() {
  const [adminDetails, setAdminDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();

  useEffect(() => {
    const data = AdminService.getAllAdmins()
      .then((response) => {
     
        setAdminDetails(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });

    return () => {};
  }, [adminDetails]);

//   useEffect(() => {
   
//     return () => {
   
//     }
//   }, [adminDetails])
  

  const onDelete = (admin) => {
    const data = AdminService.delete(admin)
      .then((response) => {
        setShow(true);
        setMsg(response.data);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      })
      .catch((error) => {
        setShow(true);
        setMsg(error.response.data);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
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
              Admins
            </h2>
          </section>
          {show && (<h6 className="text-center"> {msg} </h6>)}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {adminDetails.slice(1).map((admin, key) => (
              <>
                <tbody key={key}>
                  <tr>
                    <td>{key + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.adminEmail}</td>
                    <td>{admin.adminAddress}</td>
                    <td>
                    
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(admin.adminEmail)}
                      >
                     
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
