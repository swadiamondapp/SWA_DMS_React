import React, { useEffect, useState } from "react";
import ring from "../../../assets/ring.png";
import "./CustomizedOrder.css";
import { CircularProgress } from "@mui/material";
import { list_all_cutomization_paper_design } from "../Designer Detail View/Api";

const CustomizedOrder = ({ sidebarExpanded,SearchWithName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customizationDesign, setCustomizationDesign] = useState([]);

  useEffect(() => {
    list_all_cutomization_paper_design(setIsLoading, setCustomizationDesign,SearchWithName);
  }, [SearchWithName]);
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
    <div
      className="DesignerAssignmentPanel"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
       {/* <h3 className="HeadNewdesign">Customized Order (&nbsp;{customizationDesign.length}&nbsp;)</h3> */}
      <div className="CustomizedOrderParent">
        <div className="Parent_NewDesign">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={70} // Set the desired size
                sx={{
                  color: "#126e72",
                  padding: "8px 10px",
                  width: "35px",
                  marginTop: "100px",
                  marginLeft: "100px",
                }}
              />
            </div>
          ) : (
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
                      {/* <p className="OrderLow">Low</p> */}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizedOrder;
