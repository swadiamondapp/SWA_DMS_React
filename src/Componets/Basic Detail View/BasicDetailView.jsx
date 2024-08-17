import React from "react";
import "./BasicDetailView.css";
import "../Assignment Folder/AssignmentView.css";

const BasicDetailView = ({ basicDetails,sidebarExpanded }) => {

  console.log("findinggggg",basicDetails?.assignment?.findings)
  return (
    <div className="ParentCad"
    style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      {/* <div className="details-container">
        <div>
          <img src={basicDetails?.design_image} alt="" />
        </div>
        <div className="details_text-container">
          <h3>Basic details</h3>
          <div className="left-right_container">
            <div>
              <p>SKU</p>
              <p>Length</p>
              <p>Height</p>
              <p>Type of metal</p>
              <p>Dimond Type</p>
              <p>APPROX DIAMOND WEIGHT</p>
              <p>Findings</p>
              <p>Approx weight</p>
              <p>Tags</p>
              <p>Note</p>
            </div>
            <div>
              <p>{basicDetails?.design_code}</p>
              <p>{basicDetails?.assignment?.length}</p>
              <p>{basicDetails?.assignment?.height}</p>
              <p>{basicDetails?.assignment?.type_of_metal}</p>
              <p>{basicDetails?.assignment?.diamond_type}</p>
              <p>{basicDetails?.assignment?.approx_diamond_weight}</p>
              <p>{basicDetails?.assignment?.findings}</p>
              <p>{basicDetails?.assignment?.approx_metal_weight}</p>
              <p>{basicDetails?.assignment?.tag}</p>
              <p>{basicDetails?.assignment?.notes}</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="Parent_AssignmentView" style={{ paddingLeft: "0px" }}>
        <div className="AssignmentView">
          <div className="Left_img_View">
            <img src={basicDetails?.design_image} alt="" />
          </div>
          <div className="right_Assignment_View">
            <div className="Assignment_contents">
              <h3>Basic details</h3>
              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>SKU</p>
                  <p>{basicDetails?.design_code}</p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{basicDetails?.assignment?.length} mm</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{basicDetails?.assignment?.width} mm</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{basicDetails?.assignment?.height} mm</p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>{basicDetails?.assignment?.diamond_type}</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>{basicDetails?.assignment?.type_of_metal}</p>
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <p>{basicDetails?.assignment?.approx_diamond_weight} ct</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                    {basicDetails?.assignment?.findings.map((item)=>(
                    <span style={{background:"#EFEFEF",padding:"4px 8px",borderRadius:"10px",fontSize:"11px"}}>{item}</span>
                  ))}
                    </div>
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{basicDetails?.assignment?.approx_metal_weight} g</p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                    {basicDetails?.assignment?.tag.map((item)=>(
                    <span style={{background:"#EFEFEF",padding:"4px 8px",borderRadius:"10px",fontSize:"11px"}}>{item}</span>
                  ))}
                    </div>
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>{basicDetails?.assignment?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailView;
