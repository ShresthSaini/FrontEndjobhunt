import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "./AppDash.css";
import LoginService from "../../services/LoginService";
import { useCookies } from "react-cookie";
import ApplicantService from "../../services/ApplicantService";

export default function ApplicantDash() {
  document.title = "Applicant";
  const [cookie, setCookie, removeCookie] = useCookies();
  const [applicantV, setApplicantV] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [aplcntEmail, setAplcntEmail] = useState();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    function parseJwt(token) {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }

  try {

    const data = ApplicantService.get(parseJwt(localStorage.getItem('Applicant'), { decrypt: true}).iss)
      .then((response) => {

        setApplicantV(response.data);
      })
      .catch((error) => {
        setShow(true);
        setErrorMsg(error.response.data);

        navigate("/login");
      });
  }catch{
    navigate("/login")
  }
    return () => {};
  }, []);

  const goToPersonalDetails = () => {
    navigate("/ApplicantDash/AppPersonalDetails", {
      state: {
        role: applicantV.role,
        name: applicantV.name,
        applicantEmail: applicantV.applicantEmail,
        phoneNumber: applicantV.phoneNumber,
        gender: applicantV.gender,
        type: applicantV.type,
        password: applicantV.password,
        instituteName: applicantV.instituteName,
        startYear: applicantV.startYear,
        endYear: applicantV.endYear,
        numOfExp: applicantV.numOfExp,
        education: applicantV.education,
        jobProfile:applicantV.jobProfile,
        skills:applicantV.skills
      },
    });
  };

  const goToAvailJobs = () => {
    navigate("/ApplicantDash/AvailJobs", {
      state: { applicantEmail: applicantV.applicantEmail },
    });
  };
  const goToAppliedJobsAndStatus = () => {
    navigate("/ApplicantDash/AppliedJobsAndStatus", {
      state: { applicantEmail: applicantV.applicantEmail },
    });
  };

  const goToContactUs = () => {
    navigate("/ApplicantDash/AppContactUs", {
      state: { applicantEmail: applicantV.applicantEmail },
    });
  };

  const goToDeleteAccount = () => {
    navigate("/ApplicantDash/AppDeleteAccount", {
      state: { applicantEmail: applicantV.applicantEmail },
    });
  };

  const logout = () => {
    const logoutDTO = {
      email: applicantV.applicantEmail,
      type: "Applicant",
    };
    LoginService.logout(logoutDTO).then((response) => {
      // removeCookie(logoutDTO.type);
      localStorage.removeItem("token");
      navigate("/login");
    });
  };
  const goToHome = () => {
    navigate("/ApplicantDash/AppHome");
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
              Welcome Applicant:&nbsp; {applicantV.name}{" "}
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
              <a onClick={goToAvailJobs} className="nav-text">
                <FaIcons.FaUsers />
                <span>All Available jobs </span>
              </a>
            </li>
            <li>
              <a onClick={goToAppliedJobsAndStatus} className="nav-text">
                <AiIcons.AiTwotoneSnippets />
                <span>Application Status </span>
              </a>
            </li>
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
      {show && (
        <div className="container border">
          <h6 className="text-center text-alert"> {errorMsg} </h6>
        </div>
      )}
    </div>
  );
}
