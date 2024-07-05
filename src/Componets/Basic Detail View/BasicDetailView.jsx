import React from "react";
import "./BasicDetailView.css";
import "../Assignment Folder/AssignmentView.css";

const BasicDetailView = ({ basicDetails }) => {
  return (
    <div className="ParentCad">
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
                  <p>{basicDetails?.assignment?.length}</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{basicDetails?.assignment?.width}</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{basicDetails?.assignment?.height}</p>
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
                  <p>{basicDetails?.assignment?.approx_diamond_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <p>{basicDetails?.assignment?.findings}</p>
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{basicDetails?.assignment?.approx_metal_weight}</p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <p>
                    <span>{basicDetails?.assignment?.tag}</span>
                  </p>
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
