import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import userimg from "../../assets/user.png";
import designimg from "../../assets/design.png";
import mastersimg from "../../assets/masters.png";
import assignmentimg from "../../assets/assignment.png";
import chatboximg from "../../assets/chatbox.png";
import loginzimg from "../../assets/loginz.png";

const Sidebar = () => {
  return (
    <div>
      <div className="Sidebar_Parent">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="Sidebar_Links">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
