import React from "react";
import ring from "../../../assets/ring.png";
import "./CustomizedOrder.css";

const CustomizedOrder = () => {
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
    <div className="DesignerAssignmentPanel">
      <div className="CustomizedOrderParent">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent">
            {card.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={ring} alt="" />
                </div>
                <div className="Card_Details">
                  <div className="parent_CustomeOrder">
                    <h3 style={{ marginBottom: "0px" }}>ID : {item.product}</h3>
                    {/* <p className="OrderHigh">High</p> */}
                    {/* <p className="OrderMedium">Medium</p> */}
                    <p className="OrderLow">Low</p>
                  </div>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedOrder;
