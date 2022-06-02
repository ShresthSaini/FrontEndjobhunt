import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "../ApplicantDash/AppDash.css";
import { useCookies } from "react-cookie";
import LoginService from "../../services/LoginService";
import RecruiterService from "../../services/RecruiterService"

export default function RecruiterDash() {
  document.title = "Recruiter";
  const [cookie, setCookie, removeCookie] = useCookies();
  const [recruiterV, setRecruiterV] = useState({
    role: "",
    name: "",
    recruiterEmail: "",
    type: "",
    password: "",
    phoneNumber: "",
    gender: "",
    companyName: "",
    companyContactNumber: "",
    companyAddress: "",
    jobPosted: [],
  });

  const navigate = useNavigate();
  const location = useLocation();
  // const [rEmail, setREmail] = useState(location.state.email);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect( () => {
    function parseJwt(token) {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }
  try{

    const data = RecruiterService.get(parseJwt(localStorage.getItem('Recruiter'), { decrypt: true}).iss)
      .then((response) => {
        setRecruiterV({
          role: response.data["role"],
          name: response.data["name"],
          recruiterEmail: response.data["recruiterEmail"],
          type: response.data["type"],
          password: response.data["password"],
          phoneNumber: response.data["phoneNumber"],
          gender: response.data["gender"],
          companyName: response.data["companyName"],
          companyContactNumber: response.data["companyContactNumber"],
          companyAddress: response.data["companyAddress"],
          jobPosted: response.data["jobPosted"],
        });
      })
      .catch((error) => {
        
        navigate("/login");
      });
  }
  catch(error){
    navigate("/login")
  }
    return () => {};
  }, []);

  const goToPersonalDetails = () => {
    //Sender
    navigate("/RecruiterDash/PersonalDetails", {
      state: {
        role: recruiterV.role,
        name: recruiterV.name,
        recruiterEmail: recruiterV.recruiterEmail,
        phoneNumber: recruiterV.phoneNumber,
        password: recruiterV.password,
        type: recruiterV.type,
        gender: recruiterV.gender,
        companyName: recruiterV.companyName,
        companyAddress: recruiterV.companyAddress,
        companyContactNumber: recruiterV.companyContactNumber,
      },
    });
  };
  const goToAllApplicants = () => {
    navigate("/RecruiterDash/GetApplicants");
  };
  const goToGetPostedJobs = () => {
    navigate("/RecruiterDash/GetPostedJobs", {
      state: { recruiterEmail: recruiterV.recruiterEmail },
    });
  };
  const goToPostJob = () => {
    navigate("/RecruiterDash/PostJob", {
      state: { recruiterEmail: recruiterV.recruiterEmail },
    });
  };
  // const goToCallForInterview = () => {
  //   navigate("/RecruiterDash/CallForInterview", {
  //     state: {
  //       recruiterName: recruiterV.name,
  //       recruiterEmail: recruiterV.recruiterEmail,
  //       companyName: recruiterV.companyName,
  //       companyAddress: recruiterV.companyAddress,
  //       companyContactNumber: recruiterV.companyContactNumber
  //     },
  //   });
  // };

  const goToContactUs = () => {
    navigate("/RecruiterDash/RecContactUs", {
      state: { recruiterEmail: recruiterV.recruiterEmail },
    });
  };

  const goToDeleteAccount = () => {
    navigate("/RecruiterDash/RecDeleteAccount", {
      state: { recruiterEmail: recruiterV.recruiterEmail },
    });
  };

  const goToHome = () => {
    navigate("/RecruiterDash/RecHome");
  };

  const logout = () => {
    const logoutDTO = {
      email: recruiterV.recruiterEmail,
      type: "Recruiter",
    };
    LoginService.logout(logoutDTO).then((response) => {
      // removeCookie(logoutDTO.type);
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <div className="navbar-nav mx-auto">
            <h5 className="nav-item">
              {" "}
              Welcome Recruiter: &nbsp;
              {recruiterV.name}{" "}
            </h5>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="close-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              <a onClick={goToHome} className="nav-text">
                <AiIcons.AiOutlineHome />
                <span>Home </span>
              </a>
            </li>
            <li>
              <a onClick={goToPersonalDetails} className="nav-text">
                <FaIcons.FaUserAlt />
                <span>Perosnal Details </span>
              </a>
            </li>
            <li>
              <a onClick={goToAllApplicants} className="nav-text">
                <FaIcons.FaUsers />
                <span>All applicants </span>
              </a>
            </li>
            <li>
              <a onClick={goToPostJob} className="nav-text">
                <AiIcons.AiTwotoneSnippets />
                <span>Post a job </span>
              </a>
            </li>
            <li>
              <a onClick={goToGetPostedJobs} className="nav-text">
                <AiIcons.AiFillRead />
                <span>All Jobs posted </span>
              </a>
            </li>
            {/* <li>
              <a onClick={goToCallForInterview} className="nav-text">
                <AiIcons.AiTwotoneMail />
                <span>Call for Interview </span>
              </a>
            </li> */}

            {/* <li>
              <a onClick={goToContactUs} className="nav-text">
                <AiIcons.AiOutlineContacts />
                <span>Contact-Us </span>
              </a>
            </li>
            <li>
              <a onClick={goToDeleteAccount} className="nav-text">
                <AiIcons.AiOutlineDelete />
                <span>Delete Account </span>
              </a>
            </li> */}

            <li>
              <a onClick={logout} className="nav-text">
                <AiIcons.AiOutlineLogout />
                <span>Logout </span>
              </a>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}
