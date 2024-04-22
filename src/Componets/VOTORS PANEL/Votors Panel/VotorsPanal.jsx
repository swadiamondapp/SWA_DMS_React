import React from "react";
import "./VotorsPanal.css";
import ring from "../../../assets/ring.png";

const VotorsPanal = () => {
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
    <div className="ParentVotors">
      <div className="VotorsPanelsection">
        <div className="Parent_NewDesign">
          <h3 className="HeadNewdesign">Newly added</h3>
          <div className="Card_Design_Parent">
            {card.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={ring} alt="" />
                </div>
                <div className="Card_Details">
                  <h3>ID : {item.product}</h3>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.name}</p>
                      <p>{item.date}</p>
                    </div>
                    <div
                      className="Inner_Right"
                      style={{ borderRadius: "4px" }}
                    >
                      <p style={{ padding: "8px 18px" }}>0</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Last voted design */}
          <div className="lastvoted">
            <div className="Parent_unvoted">
              <h3 className="HeadNewdesign">Last voted</h3>
              <div className="Card_Design_Parent">
                {card.map((item) => (
                  <div className="New_Design_card">
                    <div className="Card_img">
                      <img src={ring} alt="" />
                    </div>
                    <div className="Card_Details">
                      <h3>ID : {item.product}</h3>
                      <div className="Card_Details_Inner">
                        <div className="Inner_Left">
                          <p>{item.name}</p>
                          <p>{item.date}</p>
                        </div>
                        <div
                          className="Inner_Right"
                          style={{ borderRadius: "4px" }}
                        >
                          <p style={{ padding: "8px 18px" }}>0</p>
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
