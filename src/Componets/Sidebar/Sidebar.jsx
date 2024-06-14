import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import userimg from "../../assets/user.png";
import designimg from "../../assets/design.png";
import mastersimg from "../../assets/masters.png";
import assignmentimg from "../../assets/assignment.png";
import chatboximg from "../../assets/chatbox.png";
import customeimg from "../../assets/custome.png";
import galleryimg from "../../assets/gallery.png";
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
import SlotView from "../SlotVIew/SlotView";
import SlotCreation from "../SlotCreation/SlotCreation";
import CustomiseRequest from "../CustomiseRequest/CustomiseRequiest";
import DesignPools from "../DesignPoolExtended/DesignPools";

const Sidebar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const usertype = localStorage.getItem("Usertype");
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  const location = useLocation();
  const renderLinks = () => {
    if (usertype === "ADMIN") {
      return (
        <>
          {/* Admin Panel */}

          <Link to="/">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>Users</p>}
            </div>
          </Link>
          <Link to="/designpool">
            <div className="Links">
              <img src={designimg} alt="" />
              {sidebarExpanded && <p>Design pool</p>}
            </div>
          </Link>
          <div className="Links">
            <img src={mastersimg} alt="" />
            {sidebarExpanded && <p>Masters</p>}
          </div>
          <Link to="/assignmentpanel">
            <div className="Links">
              <img src={assignmentimg} alt="" />
              {sidebarExpanded && <p>Assignment panel</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/otherlogin">
            <div className="Links">
              <img src={loginzimg} alt="" />
              {sidebarExpanded && <p>Other logins</p>}
            </div>
          </Link>
          {/* Admin Panel */}
        </>
      );
    } else if (usertype === "DESIGNER") {
      return (
        <>
          {/* For Designer Module */}
          <Link to="/designdashboard">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>Dashboard</p>}
            </div>
          </Link>
          <Link to="/designerassign">
            <div className="Links">
              <img src={assignmentimg} alt="" />
              {sidebarExpanded && <p>Assign</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/Customizedorder">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Customized Order</p>}
            </div>
          </Link>
          {/* For Designer Module */}
        </>
      );
    } else if (usertype === "VOTERS") {
      return (
        <>
          {/* For Votors Panel */}
          <Link to="/votorspanal">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>votors panel</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/votorscustomization">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Customization</p>}
            </div>
          </Link>
          <Link to="/gallery">
            <div className="Links">
              <img src={galleryimg} alt="" />
              {sidebarExpanded && <p>Gallery</p>}
            </div>
          </Link>
          {/* For Votors Panel */}
        </>
      );
    } else if (usertype === "CAD") {
      return (
        <>
          {/* CAD PANEL SIDEBAR */}
          <Link to="/CadAssignment">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>Assignments</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/FinishedProduct">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Finished project</p>}
            </div>
          </Link>
          {/* CAD PANEL SIDEBAR */}
        </>
      );
    } else if (usertype === "CENTRAL HUB") {
      return (
        <>
          {" "}
          {/* CENTRAL HUB SIDEBAR */}
          <Link to="/centralDashboard">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>Dashboard</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/slot">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Slot</p>}
            </div>
          </Link>
          {/* CENTRAL HUB SIDEBAR */}
        </>
      );
    } else if (usertype === "RENDERS") {
      return (
        <>
          {/* RENDERS PANEL SIDEVAR */}
          <Link to="/renderCard">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>Render</p>}
            </div>
          </Link>
          <Link to="/finishedProject">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Finished project</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>

          {/* RENDERS PANEL SIDEVAR */}
        </>
      );
    } else if (usertype === "WAREHOUSE") {
      return (
        <>
          {/* WAREHOUSE PANEL SIDEBAR */}
          <Link to="/wareHouse">
            <div className="Links">
              <img src={userimg} alt="" />
              {sidebarExpanded && <p>votors panel</p>}
            </div>
          </Link>
          <Link to="/chat">
            <div className="Links">
              <img src={chatboximg} alt="" />
              {sidebarExpanded && <p>Chat box</p>}
            </div>
          </Link>
          <Link to="/customRequestTable">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Customize Request </p>}
            </div>
          </Link>
          <Link to="/wareHouseDetails">
            <div className="Links">
              <img src={customeimg} alt="" />
              {sidebarExpanded && <p>Confirmed orders</p>}
            </div>
          </Link>

          {/* WAREHOUSE PANEL SIDEBAR */}
        </>
      );
    }
  };
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
        <div className="Sidebar_Links">{renderLinks()}</div>
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
