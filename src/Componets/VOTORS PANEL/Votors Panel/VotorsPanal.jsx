import React, { useState, useEffect } from "react";
import "./VotorsPanal.css";
import ring from "../../../assets/ring.png";
// import { voters_customization_list } from "./Api";
import { all_Designs_items, like_design, voted_design_list } from "../Api";
import thumb from "../../../assets/thumb2.png";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const VotorsPanal = ({ sidebarExpanded }) => {
  const navigate = useNavigate();

  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [votedList, setVotedList] = useState([]);
  const [animate, setAnimate] = useState({});
  const [value, setValue] = React.useState("1");

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.id}`, {
      state: {
        code: designCode,
      },
    });
  };

  useEffect(() => {
    all_Designs_items(setIsLoading, setData);
    voted_design_list(setIsLoading, setVotedList);
  }, []);

  const handleLikeClicks = (id) => {
    like_design(setIsLoading, id, setData, setVotedList);
    setAnimate((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAnimate((prev) => ({ ...prev, [id]: false })); // Reset the animation state after it completes
    }, 800); // Duration of the animation
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const card = [
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
  ];
  return (
    <div
      className="ParentVotors"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="VotorsPanelsection">
        <div className="Parent_NewDesign">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Newly added"
                    value="1"
                    style={{ textTransform: "capitalize" }}
                  />
                  <Tab
                    label=" Last voted"
                    value="2"
                    style={{ textTransform: "capitalize" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="first_tab" style={{ paddingTop: "50px" }}>
                  <h3 className="HeadNewdesign">
                    Newly added (&nbsp;{Data.length}&nbsp;)
                  </h3>

                  {isLoading && (
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

                  {!isLoading && Data.length === 0 && (
                    <div
                      className=""
                      style={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span>No Data Found</span>
                    </div>
                  )}

                  <div className="Card_Design_Parent">
                    {Data.map((item) => (
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
                            <span style={{ color: "#23A064" }}>Status :</span>
                            <span>{item.current_status || ""}</span>
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
                                onClick={() =>
                                  handleTrack(item, item.designcode)
                                }
                              >
                                Track
                              </button>
                              <div
                                // className="Inner_Right"
                                className={`Inner_Right ${
                                  animate[item.id] ? "wobble" : ""
                                }`}
                                style={{ borderRadius: "4px" }}
                                onClick={() => handleLikeClicks(item.id)}
                              >
                                <p style={{ padding: "8px 18px" }}>
                                  <FaRegThumbsUp size={20} />
                                </p>
                                {/* <p style={{ padding: "8px 18px" }}>{item.likes_count}</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2" className="folders_tabpanel">
                <div className="lastvoted">
                  <div className="Parent_unvoted">
                    <h3 className="HeadNewdesign">
                      Last voted (&nbsp;{votedList.length}&nbsp;)
                    </h3>
                    <div className="Card_Design_Parent">
                      {votedList.map((item) => (
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
                              <div
                                // className="Inner_Right"
                                className={`Inner_Right ${
                                  animate[item.id] ? "wobble" : ""
                                }`}
                                style={{ borderRadius: "4px" }}
                                onClick={() => handleLikeClicks(item.id)}
                              >
                                <p style={{ padding: "8px 18px" }}>
                                  <FaThumbsUp size={20} />
                                </p>
                                {/* <p style={{ padding: "8px 18px" }}>{item.likes_count}</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default VotorsPanal;
