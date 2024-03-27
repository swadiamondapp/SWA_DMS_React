import React from "react";
import "./Header.css";
import searchimg from "../../assets/search.png";
import profileimg from "../../assets/profile.png";
import { IoChevronDown } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div>
      <div className="Parent_Section">
        <div className="Header_Section">
          <div className="Left_User_Section">
            {location.pathname === "/users" && <h3>Users</h3>}
            {location.pathname === "/designpool" && <h3>Design pool</h3>}
            {location.pathname === "/assignmentpanel" && (
              <h3>Assignment Panel</h3>
            )}
            {location.pathname === "/otherlogin" && <h3>Other Login</h3>}
          </div>
          <div className="Right_User_Section">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search Users" />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Profile_Admin">
              <img src={profileimg} alt="" />
              <div className="Name_Sub">
                <p>Nidhin PR</p>
                <p className="Name_Sub_admin">Admin</p>
              </div>
              <IoChevronDown style={{ color: "#1AA1A1" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
