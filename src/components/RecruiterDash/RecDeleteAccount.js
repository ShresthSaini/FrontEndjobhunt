import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterService from "../../services/RecruiterService";
import RecruiterDash from "./RecruiterDash";

export default function AppDeleteAccount() {
  const nav = useNavigate();
  const [recEmail, setRecEmail] = useState("vab2@gmcom");
  const [isShow, setIsShow] = useState(false);
  const [msg, setMsg] = useState("");



  const deleteAccount = () => {
    setMsg("Account deleted Sccuessfully")
    setIsShow(true);
    setTimeout(() => {  
      nav("/Login");
    },1500);

    // RecruiterService.delete(recEmail)
    //   .then((response) => {
    //     setMsg(response.data);
    //     setIsShow(true);
    //     setTimeout(() => {
          
    //     },1000);
    //     nav("/Login");
    //   })
    //   .catch((error) => {
    //     setMsg(error.response.data);
    //     setIsShow(true);
    //   });
  };

  return (
    <div>
      <RecruiterDash />
      <div className="container">
        <div className="card-body border ">
          <h2 className="p-1">Delete your account</h2>
          <h6 className="p-1">Delete or Close your account permanently.</h6>
          <div className="border mt-3 p-4">
            <h3 className="text-danger">Warning</h3>
            <h6 className="text-secondary">
              If you Delete your account, you will be deleting all your details
              permanently
            </h6>
            <button
              type="button"
              onClick={deleteAccount}
              className="btn btn-outline-warning mt-3"
            >
              Delete My Account
            </button>
            {isShow && <h6 className="mt-2">{msg}</h6>}
          </div>
        </div>
      </div>
    </div>
  );
}
