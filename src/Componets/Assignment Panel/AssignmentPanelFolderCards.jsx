import React, { useState, useEffect } from "react";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
// import ring from "../../../assets/ring.png";
import { useParams, useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { list_designer_folderDetails } from "../DESIGNER PANEL/Designer Detail View/Api";

const AssignmentPanelFolderCards = (props) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folderName = query.get("name");
  const navigate = useNavigate();

  console.log(folderName, "folderName====>");

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
  const handleFolderDetailsView = (item) => {
    navigate(`/assignmentview/${props.id}?design_id=${item.item_id}`, {
      state: {
        folderNameAssignmentView: item.paper_design.designcode,
        assignmentId: props.id,
        designId: item.paper_design.design_id,
      
      },
    });
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
  console.log(props.folderDetails.assignment_items, "props.folderDetails");
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.item_id}`, {
      state: {
        code: designCode,
      },
    });
  };

  return (
    <div
      className="DesignerAssignmentPanel"
      style={{ paddingLeft: props.sidebarExpanded ? "225px" : "130px" }}
    >
      {/* <DesignBtn
        toggleDownloadOptions={toggleDownloadOptions}
        selectButtonLabel={selectButtonLabel}
        toggleRadioButtons={toggleRadioButtons}
        toggleMoveOptions={toggleMoveOptions}
        showDownloadOptions={showDownloadOptions}
        showMoveOptions={showMoveOptions}
       
      /> */}
      <div className="DesignerAssignment___panel_Cards">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent">
            {props.folderDetails &&
              props.folderDetails?.assignment_items?.map((item) => (
                <div className="New_Design_card">
                  {console.log("folderDetails?", item.paper_design.image)}
                  <div
                    className="Card_img"
                    onClick={() => handleFolderDetailsView(item)}
                  >
                    {/* <Link
                      to={`/assignmentview/${props.id}?design_id=${item.item_id}`}
                    > */}
                    <img src={item.paper_design.image} alt="" />
                    {/* </Link> */}
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.paper_design.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.paper_design.designer_name}</p>
                        <p>{formatDate(item.paper_design.created_at)}</p>
                      </div>
                    </div>
                    <button
                                    style={{
                                      padding: "7px 5px ",
                                      borderRadius: "4px",
                                      color: "white",
                                      backgroundColor: "#0464D5",
                                      border: "none",
                                      fontSize: "13px",
                                      fontWeight: "900",
                                    }}
                                    onClick={() =>
                                      handleTrack(item, item?.paper_design?.designcode)
                                    }
                                  >
                                    Track
                                  </button>
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
                      //   disabled={item.items_status === 'ALLOCATED'}
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

export default AssignmentPanelFolderCards;
