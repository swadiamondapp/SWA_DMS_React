import React, { useEffect, useState } from "react";
import ring from "../../../assets/ring.png";
import "./CustomizedOrder.css";
import { list_all_cutomization_paper_design } from "../Designer Detail View/Api";

const CustomizedOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customizationDesign, setCustomizationDesign] = useState([]);

  useEffect(() => {
    list_all_cutomization_paper_design(setIsLoading, setCustomizationDesign);
  }, []);
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
  console.log(customizationDesign, "customizattion");
  return (
    <div className="DesignerAssignmentPanel">
      <div className="CustomizedOrderParent">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent">
            {customizationDesign.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={item.image} alt="" />
                </div>
                <div className="Card_Details">
                  <div className="parent_CustomeOrder">
                    <h3 style={{ marginBottom: "0px" }}>
                      ID : {item.customizationcode}
                    </h3>
                    {/* <p className="OrderHigh">High</p> */}
                    {/* <p className="OrderMedium">Medium</p> */}
                    <p className="OrderLow">Low</p>
                  </div>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.created_at}</p>
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
