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

              {/* <SlotView />
              <SlotCreation />
              <CustomiseRequest />
              <DesignPools /> */}
              {/* Admin Panel */}
              <Link to="/users">
                <div className="Links">
                  <img src={userimg} alt="" />
                  <p>Users</p>
                </div>
              </Link>
              <Link to="/designpool">
                <div className="Links">
                  <img src={designimg} alt="" />
                  <p>Design pool</p>
                </div>
              </Link>
              <div className="Links">
                <img src={mastersimg} alt="" />
                <p>Masters</p>
              </div>
              <Link to="/assignmentpanel">
                <div className="Links">
                  <img src={assignmentimg} alt="" />
                  <p>Assignment panel</p>
                </div>
              </Link>
              <Link to="/chat">
                <div className="Links">
                  <img src={chatboximg} alt="" />
                  <p>Chat box</p>
                </div>
              </Link>
              <Link to="/otherlogin">
                <div className="Links">
                  <img src={loginzimg} alt="" />
                  <p>Other logins</p>
                </div>
              </Link>
              {/* Admin Panel */}
              {/* For Designer Module */}
              {/* <Link to="/designdashboard">
                <div className="Links">
                  <img src={userimg} alt="" />
                  <p>Dashboard</p>
                </div>
              </Link>
              <Link to="/designerassign">
                <div className="Links">
                  <img src={assignmentimg} alt="" />
                  <p>Assign</p>
                </div>
              </Link>
              <Link to="/chat">
                <div className="Links">
                  <img src={chatboximg} alt="" />
                  <p>Chat box</p>
                </div>
              </Link>
              <Link to="/Customizedorder">
                <div className="Links">
                  <img src={customeimg} alt="" />
                  <p>Customized Order</p>
                </div>
              </Link> */}
              {/* For Designer Module */}
              {/* For Votors Panel */}
              <Link to="/votorspanal">
                <div className="Links">
                  <img src={userimg} alt="" />
                  <p>votors panel</p>
                </div>
              </Link>
              <Link to="/chat">
                <div className="Links">
                  <img src={chatboximg} alt="" />
                  <p>Chat box</p>
                </div>
              </Link>
              <Link to="/votorscustomization">
                <div className="Links">
                  <img src={customeimg} alt="" />
                  <p>Customization</p>
                </div>
              </Link>
              <Link to="/gallery">
                <div className="Links">
                  <img src={galleryimg} alt="" />
                  <p>Gallery</p>
                </div>
              </Link>
              {/* For Votors Panel */}
            </>
          ) : (
            <>
              {/* Admin Panel */}
              {/* <div className="Links2">
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
              </div> */}
              {/* Admin Panel */}
              {/* For Designer Panel */}
              <div className="Links2">
                <img src={userimg} alt="" />
              </div>
              <div className="Links2">
                <img src={assignmentimg} alt="" />
              </div>
              <div className="Links2">
                <img src={chatboximg} alt="" />
              </div>
              <div className="Links2">
                <img src={customeimg} alt="" />
              </div>

              {/* For Designer Panel */}
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
