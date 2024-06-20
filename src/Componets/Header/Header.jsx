import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import searchimg from "../../assets/search.png";
import profileimg from "../../assets/profile.png";
import { IoChevronDown } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeLocalstorage } from "../../Pages/Utils/Common";
import { useParams } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { wareHouseuserId, customizationsku } = location.state || {};
  const {cadFolderName,cadId } = location.state || {};
  const query = new URLSearchParams(location.search);
  const folderName = query.get("name");
  const folderNamec = query.get("folderNamec");
  console.log("header===>FolderName", folderName);
  const [isLogoutDropdown, setIsLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutDropdown(!isLogoutDropdown);
  };



  const { id } = useParams();
  // const folderName = location.state?.name || "Unknown Folder";
  // console.log(folderName,'folderName in Header==>')
  console.log(id, "folderId in Header==>");
  console.log(folderName, "folderName====oii>");
  const userType = localStorage.getItem("Usertype");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userPhoneNumber = localStorage.getItem("phone_number");
  const userImage = localStorage.getItem("Loginimage");
  const dropdownRef = useRef(null);
  console.log(userImage, "userImage");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown, so close it
        setIsLogoutDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {location.pathname === "/votorspanal" && <h3>Votors panel</h3>}
            {location.pathname === "/gallery" && <h3>Gallery</h3>}
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
            {location.pathname === "/votorscustomization" && (
              <h3>Customization</h3>
            )}
            {location.pathname === `/designerassignview/${id}` && (
              <h3>{folderName}</h3>
            )}
            {location.pathname === `/CadAssignment` && <h3>Assigments</h3>}
            {location.pathname === "/designerassign" && (
              <h3>Assignment panel</h3>
            )}
            {location.pathname === "/designdashboard" && <h3>Dashboard</h3>}
            {location.pathname === "/Customizedorder" && (
              <h3>Customized Order</h3>
            )}
            {location.pathname === "/chat" && <h3>Chat</h3>}
            {location.pathname === "/" && <h3>Users</h3>}
            {location.pathname === `/assignmentpaneldetailsview/${id}` && (
              <h3>{folderName}</h3>
            )}
              {location.pathname === `/warehouseDetails` && (
              <h3>ID : { customizationsku }</h3>
            )}
             {location.pathname === `/CadAssignmentcard` && (
              <h3>{cadFolderName}</h3>
            )}
             {location.pathname === `/FinishedProduct` && (
              <h3>Finished Project</h3>
            )}
             {location.pathname === "/centralDashboard" && (
              <h3>Dashboard</h3>
            )}
              {location.pathname === "/slot" && (
              <h3>Slot</h3>
            )}

          </div>
          <div className="Right_User_Section">
            {location.pathname !== "/assignmentpanel" &&
              location.pathname !== "/designdashboard" &&
              location.pathname !== "/votorscustomization" &&
              location.pathname !== "/gallery" &&
              location.pathname !== "/CadAssignment" &&
              location.pathname !== "/renderCard" &&
              location.pathname !== "/votorspanal" &&
              location.pathname !== "/centralDashboard" &&
              location.pathname !== "/slot" &&
              location.pathname !== `/designerassignview/${id}` &&
              location.pathname !== "/designerassign" &&
              location.pathname !== "/warehouseDetails" &&
              location.pathname !== `/CadAssignmentcard` &&
              location.pathname !== "/customRequestTable" &&

              
              (
                <div className="Search_Admin">
                  <div className="Search_User">
                    <input type="text" placeholder="Search Users" />
                    <img src={searchimg} alt="" />
                  </div>
                </div>
              )}

            <div className="Profile_Admin" onClick={handleLogout}>
              {userImage === "http://dmstestapi.zinfog.in/media/default.png" ? (
                <>
                  <img src={profileimg} />
                </>
              ) : (
                <>
                  <img src={userImage} />
                </>
              )}

              <div className="Name_Sub">
                <p style={{ fontSize: "15px" }}>{userName}</p>
                <p className="Name_Sub_admin">
                  {userType.charAt(0).toUpperCase() +
                    userType.slice(1).toLowerCase()}
                </p>
              </div>
              <IoChevronDown style={{ color: "#1AA1A1" }} />
              {isLogoutDropdown && (
                <div
                  className="log_out__btns"
                  ref={dropdownRef}
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
