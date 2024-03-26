import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import userimg from "../../assets/user.png";
import designimg from "../../assets/design.png";
import mastersimg from "../../assets/masters.png";
import assignmentimg from "../../assets/assignment.png";
import chatboximg from "../../assets/chatbox.png";
import loginzimg from "../../assets/loginz.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import BasicDetailModal from "../BasicDetails/BasicDetailModal";
import AssignToModal from "../AssignToModal/AssignToModal";
import CreateCustomisation from "../CreateCustomisation/CreateCustomisation";
import ProductCustomisation from "../ProductCustomisation/ProductCustomisation";
import CentalHub from "../CentalHub/CentalHub";
import UploadFile from "../UploadFile/UploadFile";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  const location = useLocation();
  return (
    <div>
      <div
        className={`Sidebar_Parent ${
          sidebarExpanded ? "expanded" : "collapsed"
        }`}
      >
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="Sidebar_Links">
          {sidebarExpanded ? (
            <>
              {/* <AssignmentModal />
              <BasicDetailModal />
              <AssignToModal />
              <CreateCustomisation />
              <ProductCustomisation />
              <CentalHub />
              <UploadFile /> */}

              <div className="Links">
                <img src={userimg} alt="" />
                <p>Users</p>
              </div>
              <div className="Links">
                <img src={designimg} alt="" />
                <p>Design pool</p>
              </div>
              <div className="Links">
                <img src={mastersimg} alt="" />
                <p>Masters</p>
              </div>
              <div className="Links">
                <img src={assignmentimg} alt="" />
                <p>Assignment panel</p>
              </div>
              <div className="Links">
                <img src={chatboximg} alt="" />
                <p>Chat box</p>
              </div>
              <div className="Links">
                <img src={loginzimg} alt="" />
                <p>Other logins</p>
              </div>
            </>
          ) : (
            <>
              <div className="Links2">
                <img src={userimg} alt="" />
              </div>
              <div className="Links2">
                <img src={designimg} alt="" />
              </div>
              <div className="Links2">
                <img src={mastersimg} alt="" />
              </div>
              <div className="Links2">
                <img src={assignmentimg} alt="" />
              </div>
              <div className="Links2">
                <img src={chatboximg} alt="" />
              </div>
              <div className="Links2">
                <img src={loginzimg} alt="" />
              </div>
            </>
          )}
        </div>
        <div className="Arrow" onClick={toggleSidebar}>
          {sidebarExpanded ? (
            <MdKeyboardArrowLeft className="ArrowIcon1" />
          ) : (
            <MdKeyboardArrowRight className="ArrowIcon2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
