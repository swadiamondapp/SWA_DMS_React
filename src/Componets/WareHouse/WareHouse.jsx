import React, { useState } from "react";
import "../../Componets/ADMIN PANEL/Design Pool/DesignPool.css";
import like from "../../assets/like.png";
import ring from "../../assets/ring.png";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";

const WareHouse = (props) => {
  const navigate = useNavigate();

  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);

  const [value, setValue] = React.useState("1");

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.id}`, {
      state: {
        code: designCode,
      },
    });
  };

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formatDateTwo = (isoString) => {
    if (!isoString) {
      return "";
    }
  
    const date = new Date(isoString);
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : '12'; 
    
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };
  

  return (
    <div>
      <div
        className="Parent_DesignView"
        style={{ paddingLeft: props.sidebarExpanded ? "225px" : "130px" }}
      >
        {/* <div className="DesignPool_btns">
          <div className="Download_ParentD">
            <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
              Download <TbDownload />
            </button>
            {showDownloadOptions && (
              <div className="Download_Sub">
                <p>All</p>
                <p>Selected</p>
              </div>
            )}
          </div>
          <button className="D_selectBtn" onClick={toggleRadioButtons}>
            {selectButtonLabel}
          </button>
          <div className="Parent_MoveTo">
            <button className="D_moveBtn" onClick={toggleMoveOptions}>
              Move to <MdOutlineKeyboardArrowDown />
            </button>
            {showMoveOptions && (
              <div className="Sub_AssignmentPanel">
                <p>Assignment panel</p>
              </div>
            )}
          </div>
          <button className="D_View_Sort_Filter">
            <MdViewModule /> View
          </button>
          <button className="D_View_Sort_Filter">
            <LuArrowUpDown /> Sort
          </button>
          <button className="D_View_Sort_Filter">
            <RiFilter3Line /> Filter
          </button>
        </div> */}
        {/* Use the DesignButtons component */}

        {/* new design section */}
        {/* new design section */}

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Newly Added"
                  value="1"
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Last Voted"
                  value="2"
                  style={{ textTransform: "capitalize" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="first_tab" style={{ paddingTop: "50px" }}>
                <h3 className="HeadNewdesign">
                  Newly added (&nbsp;{props.DesignWareHouse?.length}&nbsp;)
                </h3>

                {props.isLoading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      // filter={filter}
                      // setFilter={setFilter}
                      size={50}
                      sx={{
                        color: "#126e72",
                        padding: "8px 10px",
                        width: "35px",
                      }}
                    />
                  </div>
                )}

                {props.isLoading === false &&
                  props?.DesignWareHouse?.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginTop: "100px" }}>No Data Found</span>
                    </div>
                  )}

                <div className="Card_Design_Parent">
                  {props.DesignWareHouse.map((item) =>{
                    console.log("itemssssss",item)
                    return (
                    <div className="New_Design_card">
                      <div className="Card_img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="Card_Details">
                        <h3>ID : {item.designcode}</h3>
                        <div
                          className=""
                          style={{ display: "flex", gap: "5px" }}
                        >
                          <span
                                  style={{ color: "#23A064", fontSize: "13px" }}
                                >
                                  Track status :{" "}
                                  <span
                                    style={{ color: "black", fontSize: "12px" }}
                                  >
                                    {item?.currentstatus_track && item?.currentstatus_track[0]?.current_status} -
                                    {item?.currentstatus_track && formatDateTwo(item?.currentstatus_track[0]?.date)}
                                  </span>
                                </span>
                          {/* <span>{item.current_status || ""}</span> */}
                        </div>
                        <div className="Card_Details_Inner">
                          <div className="Inner_Left">
                            <p>{item.user_name}</p>
                            <p>{item.created_at}</p>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              width: "auto",
                              gap: "10px",
                            }}
                          >
                            <button
                              style={{
                                padding: "7px 10px ",
                                borderRadius: "4px",
                                color: "white",
                                backgroundColor: "#0464D5",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: "900",
                              }}
                              onClick={() => handleTrack(item, item.designcode)}
                            >
                              Track
                            </button>
                            <div className="Inner_Right">
                              <p>{item.likes_count}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* radio btn */}
                      {showRadioButtons && (
                        <input
                          className="Radio_select"
                          type="radio"
                          id="html"
                          name="fav_language"
                          value="HTML"
                        ></input>
                      )}
                      {/* radio btn */}
                    </div>
                  )})}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" className="folders_tabpanel">
              <div className="Parent_Folder_section">
                <h3 className="HeadNewdesign">
                  Last Voted (&nbsp;{props.LastVotedDesign?.length}&nbsp;)
                </h3>
                <div className="Card_Design_Parent">
                  {props.LastVotedDesign.map((item) => (
                    <div className="New_Design_card">
                      <div className="Card_img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="Card_Details">
                        <h3>ID : {item.designcode}</h3>
                        <div className="Card_Details_Inner">
                          <div className="Inner_Left">
                            <p>{item.user_name}</p>
                            <p>{item.created_at}</p>
                          </div>
                          <div className="Inner_Right">
                            <p>{item.likes_count}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default WareHouse;
