import React, { useState, useEffect } from "react";
import "./DesignerDetailView.css";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";
import { useParams } from "react-router-dom";
import { list_designer_folderDetails } from "./Api";

const DesignerDetailView = () => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [folderDetails, setFolderDetails] = useState([]);
  const { id } = useParams();

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

  useEffect(() => {
    list_designer_folderDetails(setIsLoading, setFolderDetails, id);
  }, []);

  return (
    <div className="DesignerAssignmentPanel">
      <DesignBtn
        toggleDownloadOptions={toggleDownloadOptions}
        selectButtonLabel={selectButtonLabel}
        toggleRadioButtons={toggleRadioButtons}
        toggleMoveOptions={toggleMoveOptions}
        showDownloadOptions={showDownloadOptions}
        showMoveOptions={showMoveOptions}
      />
      <div className="DesignerAssignment___panel_Cards">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent">
            {folderDetails &&
              folderDetails?.assignment_items?.map((item) => (
                <div className="New_Design_card">
                  {console.log("folderDetails?", item.paper_design.image)}
                  <div className="Card_img">
                    <img src={item.paper_design.image} alt="" />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.paper_design.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.paper_design.designer_name}</p>
                        <p>date pending</p>
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDetailView;
