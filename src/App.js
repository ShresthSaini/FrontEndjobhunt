import Login from "./components/Login";
import Home from "./components/Home";
import ApplicantRegisteration from "./components/ApplicantRegisteration";
import RecruiterRegisteration from "./components/RecruiterRegisteration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BadGateway from "./components/BadGateway";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import RecruiterDash from "./components/RecruiterDash/RecruiterDash";
import PersonalDetails from "./components/RecruiterDash/PersonalDetails";
import GetApplicants from "./components/RecruiterDash/GetApplicants";
import AdminDash from "./components/AdminDash/AdminDash";
import PostJob from "./components/RecruiterDash/PostJob";
import ViewDetails from "./components/RecruiterDash/ViewDetails";
import GetPostedJobs from "./components/RecruiterDash/GetPostedJobs";
import CallForInterview from "./components/RecruiterDash/CallForInterview";
import RecContactUs from "./components/RecruiterDash/RecContactUs";
import RecDeleteAccount from "./components/RecruiterDash/RecDeleteAccount";
import ApplicantDash from "./components/ApplicantDash/ApplicantDash";
import AppPersonalDetails from "./components/ApplicantDash/AppPersonalDetails";
import AppContactUs from "./components/ApplicantDash/AppContactUs";
import AppDeleteAccount from "./components/ApplicantDash/AppDeleteAccount";

import AvailJobs from "./components/ApplicantDash/AvailJobs";
import AppliedJobsAndStatus from "./components/ApplicantDash/AppliedJobsAndStatus";
import "./App.css";
import AdminApplicants from "./components/AdminDash/AdminApplicants";
import AdminRecruiters from "./components/AdminDash/AdminRecruiters";
import AdminMesgs from "./components/AdminDash/AdminMesgs";
import AdminHome from "./components/AdminDash/AdminHome";
import AddAdmin from "./components/AdminDash/AddAdmin";
import RecruiterHome from "./components/RecruiterDash/RecruiterHome";
import ApplicantHome from "./components/ApplicantDash/ApplicantHome";
import AdminPersonalDetails from "./components/AdminDash/AdminPersonalDetails";
import AdminDelete from "./components/AdminDash/AdminDelete";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/ApplicantRegisteration"
            element={<ApplicantRegisteration />}
          />
          <Route
            path="/RecruiterRegisteration"
            element={<RecruiterRegisteration />}
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />

          <Route path="*" element={<BadGateway />} />
          <Route path="/ApplicantDash" element={<ApplicantHome />} />
          <Route
            path="/ApplicantDash/AppPersonalDetails"
            element={<AppPersonalDetails />}
          />
          <Route path="/ApplicantDash/AvailJobs" element={<AvailJobs />} />
          <Route
            path="/ApplicantDash/AppliedJobsAndStatus"
            element={<AppliedJobsAndStatus />}
          />
          <Route
            path="/ApplicantDash/AppContactUs"
            element={<AppContactUs />}
          />
          <Route
            path="/ApplicantDash/AppDeleteAccount"
            element={<AppDeleteAccount />}
          />
          <Route
            path="/ApplicantDash/AppHome"
            element={<ApplicantHome />}
          />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/AdminDash/AdminHome" element={<AdminHome />} />
          <Route path="/AdminDash/Applicants" element={<AdminApplicants />} />
          <Route path="/AdminDash/Recruiters" element={<AdminRecruiters />} />
          {/* <Route path="/AdminDash/Messages" element={<AdminMesgs />} /> */}
          <Route path="/AdminDash/AddAdmin" element={<AddAdmin />} />
          <Route path="/AdminDash/DeleteAdmin" element={<AdminDelete />} />
          <Route path="/AdminDash/AdminPersonalDetails" element={<AdminPersonalDetails />} />

          <Route path="/RecruiterDash" element={<RecruiterHome />} />
          <Route
            path="/RecruiterDash/PersonalDetails"
            element={<PersonalDetails />}
          />
          <Route
            path="/RecruiterDash/GetApplicants"
            element={<GetApplicants />}
          />
          <Route path="/RecruiterDash/PostJob" element={<PostJob />} />
          <Route
            path="/RecruiterDash/GetPostedJobs"
            element={<GetPostedJobs />}
          />
          <Route
            path="/RecruiterDash/GetPostedJobs/ViewDetails"
            element={<ViewDetails />}
          />
          <Route
            path="/RecruiterDash/CallForInterview"
            element={<CallForInterview />}
          />
          <Route
            path="/RecruiterDash/RecContactUs"
            element={<RecContactUs />}
          />
          <Route
            path="/RecruiterDash/RecHome"
            element={<RecruiterHome />}
          />

          <Route
            path="/RecruiterDash/RecDeleteAccount"
            element={<RecDeleteAccount />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
