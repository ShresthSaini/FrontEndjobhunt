import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "../ApplicantDash/AppDash.css";
import LoginService from "../../services/LoginService";
import { useCookies } from "react-cookie";

export default function AdminDash() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [adminV, setAdminV] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [adminEmail, setAdminEmail] = useState();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const data = LoginService.getAdmin()
      .then((response) => {
        setAdminV(response.data);
        if (response.data.adminEmail === "admin@jobhunt.com") {
          document.title = "MasterAdmin";
          setShowUpdate(false);
          setShowAddAdmin(true);
        } else {
          document.title = "Admin";
          setShowUpdate(true);
          setShowAddAdmin(false);
        }
      })
      .catch((error) => {
        setShow(true);
        
        setErrorMsg(error.response.data);
        navigate("/login")
      });

    return () => {};
  }, []);

  const goToApplicants = () => {
    navigate("/AdminDash/Applicants");
  };
  const goToHome = () => {
    navigate("/AdminDash/AdminHome");
  };

  const goToPersonalDetails = () => {
    navigate("/AdminDash/AdminPersonalDetails", {
      state: {
        name:adminV.name,
        adminEmail:adminV.adminEmail,
        password:adminV.password,
        adminAddress:adminV.adminAddress
      },
    });
  };

  const goToRecruiters = () => {
    navigate("/AdminDash/Recruiters");
  };
  const goToMessages = () => {
    navigate("/AdminDash/Messages");
  };

  const createNewAdmin = () => {
    navigate("/AdminDash/AddAdmin");
  };
  const deleteAdmin = () => {
    navigate("/AdminDash/DeleteAdmin");
  };

  const logout = () => {
    const logoutDTO = {
      email: adminV.adminEmail,
      type: "Admin",
    };
    LoginService.logout(logoutDTO).then((response) => {
      removeCookie(logoutDTO.type);
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
            <h5 className="nav-item"> Welcome {adminV.name} </h5>
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
              <a onClick={goToApplicants} className="nav-text">
                <FaIcons.FaUsers />
                <span>Applicants </span>
              </a>
            </li>
            <li>
              <a onClick={goToRecruiters} className="nav-text">
                <FaIcons.FaUsers />
                <span>Recruiters </span>
              </a>
            </li>
            {showUpdate && (
              <li>
                <a onClick={goToPersonalDetails} className="nav-text">
                  <FaIcons.FaUserAlt />
                  <span>Perosnal Details </span>
                </a>
              </li>
            )}
            {showAddAdmin && (
              <>
              
            <li>
              <a onClick={createNewAdmin} className="nav-text">
                <FaIcons.FaUserAlt />
                <span> New Admin </span>
              </a>
            </li>
            <li>
              <a onClick={deleteAdmin} className="nav-text">
                <AiIcons.AiOutlineDelete />
                <span> Delete Admin </span>
              </a>
            </li>
            </>
            )}
            {/* 
            <li>
              <a onClick= {goToMessages} className="nav-text">
                <AiIcons.AiOutlineContacts />
                <span>Messages </span>
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
