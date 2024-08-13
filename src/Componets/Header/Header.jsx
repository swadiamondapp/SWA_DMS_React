import React, { useState, useEffect, useRef, useContext } from "react";
import "./Header.css";
import searchimg from "../../assets/search.png";
import profileimg from "../../assets/profile.png";
import { IoChevronDown } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeLocalstorage } from "../../Pages/Utils/Common";
import { useParams } from "react-router-dom";

const Header = ({
  centralId,
  designCodesCentralHub,
  leftHeader,
  basicDetails,
  folderDetails,
  designListData,
  sidebarExpanded,
  setSearchWithName,
  searchListId,
  handleInputChange,
  headerDetails,
  // handleSearchDesignPoool
}) => {
  const location = useLocation();
  const { nameCentral } = useParams();
  const { wareHouseuserId, customizationsku } = location.state || {};
  const { cadFolderName, cadId } = location.state || {};
  const query = new URLSearchParams(location.search);
  const folderNamec = query.get("folderNamec");

  const [isLogoutDropdown, setIsLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutDropdown(!isLogoutDropdown);
  };

  const { id } = useParams();
  // const folderName = location.state?.name || "Unknown Folder";
  // console.log(folderName,'folderName in Header==>')
  console.log(id, "folderId in Header==>");
  const userType = localStorage.getItem("Usertype");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userPhoneNumber = localStorage.getItem("phone_number");
  const userImage = localStorage.getItem("Loginimage");
  const dropdownRef = useRef(null);

  const { assignmentId, folderNameAssignmentView } = location.state || {};
  const { assignmentFolderName } = location.state || {};
  const { folderName } = location.state || {};
  console.log("header===>FolderName", folderName);

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
console.log(userImage,"userImagge")
  const handleSearchWithName = (event) => {
    setSearchWithName(event.target.value, "nameSarch");
  };
  return (
    <div>
      <div
        className="Parent_Section"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="Header_Section">
          {basicDetails ? (
            <div className="basic-details_header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <h3>ID : {basicDetails?.design_code}</h3>
                <span
                  className={
                    basicDetails.timer_status === "Completed"
                      ? "completed"
                      : basicDetails.timer_status === "on-going"
                      ? "ongoing"
                      : "notstarted"
                  }
                >
                  {basicDetails.timer_status
                    .replace("-", "")
                    .charAt(0)
                    .toUpperCase() + 
                    basicDetails.timer_status
                      .replace("-", "") 
                      .slice(1) 
                      .toLowerCase()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <p className="Name_Sub_admin">Assigned To:</p>
                <div className="Profile_Admin" onClick={handleLogout}>
                  {userImage ===
                  "http://dmstestapi.zinfog.in/media/default.png" ? (
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
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="Left_User_Section">
                {location.pathname === "/users" && <h3>Users</h3>}
                {location.pathname === "/designpool" && <h3>Design pool</h3>}
                {location.pathname === "/customRequestTable" && (
                  <h3>Customize Request</h3>
                )}
                {location.pathname === "/wareHouse" && <h3>Votors panel</h3>}
                {location.pathname === "/votorspanal" && <h3>Voters panel</h3>}
                {location.pathname === "/gallery" && <h3>Gallery</h3>}
                {location.pathname === "/finishedProject" && (
                  <h3>Finished project</h3>
                )}
                {location.pathname === "/renderCard" && <h3>Renders</h3>}
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
                {location.pathname === `/centralfolderdetails/${id}` && (
                  <h3>{assignmentFolderName}</h3>
                )}
                {location.pathname === `/CadAssignment` && <h3>Assignments</h3>}
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
                  <h3>{assignmentFolderName}</h3>
                )}
                {location.pathname === `/assignmentview/${assignmentId}` && (
                  <h3>{folderNameAssignmentView}</h3>
                )}
                {location.pathname === `/rendersdetailing/${id}` && (
                  <h3>{folderName}</h3>
                )}
                {location.pathname === `/finished/${id}` && (
                  <h3>{folderName}</h3>
                )}
                {location.pathname === `/warehouseDetails` && (
                  <h3>ID : {customizationsku}</h3>
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
                {location.pathname === "/centralhubtransfer" && (
                  <h3>Transfer</h3>
                )}
                {location.pathname === "/unassigneddesigner" && (
                  <h3>Assigned to</h3>
                )}
                {location.pathname === "/statusPage" && (
                  <h3>Status</h3>
                )}

                {location.pathname === "/slot" && <h3>Slot</h3>}
                {leftHeader && <h3>{leftHeader}</h3>}

                {(location.pathname === "/masterspage/findings" ||
                  location.pathname === "/masterspage/tag" ||
                  location.pathname === "/masterspage/metal" ||
                  location.pathname === "/masterspage/diamond" ||
                  location.pathname === "/masterspage/valueedition" ||
                  location.pathname === "/masterspage/whstatus" ||
                  location.pathname === "/masterspage/chstatus" ||
                  location.pathname === "/masterspage/productcategory" ||
                  location.pathname === "/masterspage/outlet") && (
                  <h3>Masters</h3>
                )}

                {location.pathname === "/scan" && <h3>Recieved</h3>}
                {location.pathname === "/workdone" && <h3>Work Done</h3>}
                {location.pathname === "/newscanmodule" && <h3>Scan</h3>}
                {location.pathname === "/centralhubscan" && <h3>Scan</h3>}
              </div>

              <div className="Right_User_Section">
                {location.pathname !== "/assignmentpanel" &&
                  location.pathname !== "/masterspage" &&
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
                  location.pathname !== "/workdone" &&
                  location.pathname !== "/newscanmodule" &&
                  location.pathname !== "/centralhubtransfer" &&
                  location.pathname !== "/finishedProject" &&
                  location.pathname !== "/masterspage/findings" &&
                  location.pathname !== "/masterspage/tag" &&
                  location.pathname !== "/masterspage/metal" &&
                  location.pathname !== "/masterspage/diamond" &&
                  location.pathname !== "/masterspage/diamond" &&
                  location.pathname !== "/masterspage/whstatus" &&
                  location.pathname !== "/masterspage/chstatus" &&
                  location.pathname !== "/masterspage/productcategory" &&
                  location.pathname !== "/masterspage/outlet" &&
                  location.pathname !== `/assignmentpaneldetailsview/${id}` &&
                  location.pathname !== `/rendersdetailing/${id}` &&
                  location.pathname !== `/finished/${id}` &&
                  location.pathname !== `/Customizedorder` &&
                  location.pathname !== `/unassigneddesigner` &&
                  location.pathname !== `/FinishedProduct` &&
                  location.pathname !== `/folderdetails/${id}` &&
                  location.pathname !== "/wareHouse" &&
                  location.pathname !== "/scan" &&
                  location.pathname !== "/designpool" &&
                  location.pathname !== "/statusPage" &&
                  location.pathname !== "/centralhubscan" &&
                  location.pathname !== "/otherlogin" &&
                  location.pathname !== `/centralfolderdetails/${id}` &&
                  location.pathname !== `/assignmentview/${assignmentId}` && (
                    <div className="Search_Admin">
                      <div className="Search_User">
                        <input
                          type="text"
                          placeholder="Search User"
                          onChange={handleSearchWithName}
                        />
                        <img src={searchimg} alt="" />
                      </div>
                    </div>
                  )}

                {location.pathname === "/designpool" && (
                  <div className="Search_Admin">
                    <div className="Search_User">
                      <input
                        type="text"
                        placeholder="Search ID"
                        value={searchListId}
                        onChange={handleInputChange}
                      />
                      {/* <img onClick={handleSearchDesignPoool} src={searchimg} alt="" /> */}
                      <img src={searchimg} alt="" />
                    </div>
                  </div>
                )}

{headerDetails?.paper_design &&
headerDetails.paper_design.designer_img !== "N/A" &&
headerDetails.paper_design.designer_name !== "N/A" ? (
  <div className="headerImageDesinger">
    <div>
      <span>Assigned to : </span>{" "}
    </div>
    <div className="headerDesingerImage">
      <img
        src={headerDetails.paper_design.designer_img}
        alt={
          headerDetails.paper_design.designer_name || "Designer Image"
        }
      />
    </div>
    <div>
      <span>{headerDetails.paper_design.designer_name}</span>
    </div>
  </div>
) : null}

                <div className="Profile_Admin" onClick={handleLogout}>
                  {userImage ===
                  "http://dmstestapi.zinfog.in/media/default.png" ? (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
