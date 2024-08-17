import React, { useState, useEffect } from "react";
import "./VotorsPanal.css";
import ring from "../../../assets/ring.png";
// import { voters_customization_list } from "./Api";
import { all_Designs_items, like_design, voted_design_list } from "../Api";
import thumb from "../../../assets/thumb2.png";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const VotorsPanal = ({ sidebarExpanded }) => {
  const navigate = useNavigate();

  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [votedList, setVotedList] = useState([]);
  const [animate, setAnimate] = useState({});

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
  console.log(Data, "voterssss");
  console.log(votedList, "votedList");

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
          <h3 className="HeadNewdesign">
            Newly added (&nbsp;{Data.length}&nbsp;)
          </h3>
          <div className="Card_Design_Parent">
            {Data.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={item.image} alt="" />
                </div>
                <div className="Card_Details">
                  <h3>ID : {item.designcode}</h3>
                  <div className="" style={{ display: "flex", gap: "5px" }}>
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
                        onClick={() => handleTrack(item, item.designcode)}
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
          {/* Last voted design */}
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
          {/* unvoted design */}
        </div>
      </div>
    </div>
  );
};

export default VotorsPanal;
