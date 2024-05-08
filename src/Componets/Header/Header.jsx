import React, { useState } from "react";
import "./Header.css";
import searchimg from "../../assets/search.png";
import profileimg from "../../assets/profile.png";
import { IoChevronDown } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeLocalstorage } from "../../Pages/Utils/Common";

const Header = () => {
  const location = useLocation();
  const [isLogoutDropdown, setIsLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutDropdown(!isLogoutDropdown);
  };

  return (
    <div>
      <div className="Parent_Section">
        <div className="Header_Section">
          <div className="Left_User_Section">
            {location.pathname === "/users" && <h3>Users</h3>}
            {location.pathname === "/designpool" && <h3>Design pool</h3>}
            {location.pathname === "/customRequestTable" && (
              <h3>Customize Request</h3>
            )}
            {location.pathname === "/wareHouse" && <h3>Votors panel</h3>}
            {location.pathname === "/finishedProject" && (
              <h3>Finished project</h3>
            )}
            {location.pathname === "/renderCard" && <h3>SWAD3456</h3>}
            {location.pathname === "/wareHouseDetails" && (
              <h3> ID : SWAD3456</h3>
            )}
            {location.pathname === "/finished" && <h3>SWAD3456</h3>}

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
            <div className="Profile_Admin" onClick={handleLogout}>
              <img src={profileimg} alt="" />
              <div className="Name_Sub">
                <p>Nidhin PR</p>
                <p className="Name_Sub_admin">Admin</p>
              </div>
              <IoChevronDown style={{ color: "#1AA1A1" }} />
              {isLogoutDropdown && (
                <div
                  className="log_out__btns"
                  onClick={() => {
                    removeLocalstorage(navigate);
                  }}
                >
                  <button>
                    <MdOutlineLogout /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
