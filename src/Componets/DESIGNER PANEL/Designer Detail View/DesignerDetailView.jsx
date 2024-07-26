import React, { useState, useEffect } from "react";
import "./DesignerDetailView.css";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";
import { useParams, useLocation } from "react-router-dom";
import { list_designer_folderDetails } from "./Api";

const DesignerDetailView = (props) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folderName = query.get("name");
  console.log(folderName, "folderName=12===>");

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

  const handleCheckboxChange = (designcode) => {
    if (selectedAssignment.includes(designcode)) {
      setSelectedAssignment(
        selectedAssignment.filter((item) => item !== designcode)
      );
    } else {
      setSelectedAssignment([...selectedAssignment, designcode]);
    }
  };
  // const handleAssignmentCad = () => {
  //   assign_to_cad(setIsLoading,folderId,userId,selectedDesigns)
  // }
  console.log(props.folderDetails, "dataP87");

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const month = String(monthIndex + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Extract hours, minutes, and seconds from the Date object
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Return the formatted date in the format "YYYY-MM-DD HH:MM:SS"
    return `${day}-${monthName}-${year}`;
  };

  const sortedItems =
  props.folderDetails?.assignment_items?.sort((a, b) =>
    a.items_status === "ALLOCATED" ? 1 : -1
  ) || [];
  return (
    <div className="DesignerAssignmentPanel"  style={{paddingLeft:props.sidebarExpanded? "225px":"130px"}}>
      <DesignBtn
        toggleDownloadOptions={toggleDownloadOptions}
        selectButtonLabel={selectButtonLabel}
        toggleRadioButtons={toggleRadioButtons}
        toggleMoveOptions={toggleMoveOptions}
        showDownloadOptions={showDownloadOptions}
        showMoveOptions={showMoveOptions}
        assignToCadId={props.id}
        selectedDesign={selectedAssignment}
        setSelectedAssignment={setSelectedAssignment}
        list_id={props.id}
        list_designer_folderDetails={props.list_designer_folderDetails}
        setSelectButtonLabel={setSelectButtonLabel}
        setShowRadioButtons={setShowRadioButtons}
      />
      <div className="DesignerAssignment___panel_Cards">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent" style={{marginTop:"50px"}}>
            {props.folderDetails &&
              sortedItems.map((item) => (
                <div
                  className="New_Design_card"
                  // style={{
                  //   display:
                  //     item.items_status === "ALLOCATED" ? "none" : "block",
                  // }}
                >
                  {console.log("folderDetails?", item.paper_design.image)}
                  <div className="Card_img">
                    <img
                      src={item.paper_design.image}
                      style={{
                        opacity: item.items_status === "ALLOCATED" ? 0.5 : 1,
                      }}
                      alt=""
                    />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.paper_design.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.paper_design.designer_name}</p>
                        <p>{formatDate(item.paper_design.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  {/* radio btn */}

                  {showRadioButtons && (
                    <input
                      className="Radio_select"
                      type="checkbox"
                      id="html"
                      name="fav_language"
                      value=""
                      onChange={() => handleCheckboxChange(item.item_id)}
                      disabled={item.items_status === "ALLOCATED"}
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
