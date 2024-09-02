import React, { useState, useEffect } from "react";
import "./DesignerDetailView.css";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { list_designer_folderDetails, list_designer_folderDetails_new } from "./Api";
import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";

const DesignerDetailView = (props) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
 
  const [filteredDta,setFilteredData]= useState([])
  const [dd, setDd] = useState();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const folderName = query.get("name");


  console.log("filteredDta",filteredDta)

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
    if (selectedAssignment > 0) {
      setSelectedAssignment([]);
    }
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

  const handleSelectAll = () => {
    const allItemIds = props.folderDetails?.assignment_items?.filter((item) => item.items_status !== "ALLOCATED")
      .map((item) => item.item_id);
    setSelectedAssignment(allItemIds);
  };

  const handleDeselectAll = () => {
    setSelectedAssignment([]);
  };

  // const handleAssignmentCad = () => {
  //   assign_to_cad(setIsLoading,folderId,userId,selectedDesigns)
  // }

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

  // const sortedItems =
  //   props.folderDetails?.assignment_items?.sort((a, b) =>
  //     a.items_status === "ALLOCATED" ? 1 : -1
  //   ) || [];
  // const sortedItems =
  // props.folderDetails?.assignment_items?.sort((a, b) => {
  //   if (a.items_status === b.items_status) {
  //     return 0; // Keep original order if status is the same
  //   }
  //   return a.items_status === "ALLOCATED" ? 1 : -1;
  // }) || [];
  // console.log(sortedItems, "sorted");
  const handleDetailsView = (item) => {
    navigate(`/assignmentviewsAll/${item.item_id}`, {
      state: {
        // folderNameAssignmentView: item.paper_design.designcode,
        // assignmentId: props.id,
        detailsViewFolderName: item.paper_design.designcode,
      },
    });
  };

  useEffect(() => {
    // Logs to check if `folderDetails` is updated correctly
    console.log("Updated folderDetails:", props.folderDetails);
  }, [props.folderDetails]);

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.item_id}`, {
      state: {
        code: designCode,
      },
    });
  };
    
 
console.log("showRadioButtons",showRadioButtons)

  return (
    <div
      className="DesignerAssignmentPanel"
      style={{ paddingLeft: props.sidebarExpanded ? "225px" : "130px" }}
    >
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
        list_designer_folderDetails_new={props.list_designer_folderDetails_new}
        setSelectButtonLabel={setSelectButtonLabel}
        setShowRadioButtons={setShowRadioButtons}
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
        handleSelectAll={handleSelectAll}
            handleDeselectAll={handleDeselectAll}
            showRadioButtons={showRadioButtons}
      />
      <div className="DesignerAssignment___panel_Cards">
        <div className="Parent_NewDesign">
          <div className="Card_Design_Parent" style={{ marginTop: "50px" }}>
         
          {props.folderDetails?.assignment_items?.length === 0 && <h6>No Data Found</h6>}

            {props.folderDetails &&
              props.folderDetails?.assignment_items?.map((item) => (
                <div
                  className="New_Design_card"
                >
                  {console.log("itemeeeeeee", item)}
                  <div
                    className="Card_img"
                    onClick={() => handleDetailsView(item)}
                  >
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
                        <p>Time Taken : {item.time_taken} </p>
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
                                      fontWeight: "900"
                                     }}
                                    onClick={() =>
                                      handleTrack(item,item?.paper_design?.designcode)
                                    }
                                  >
                                    Track
                                  </button>
                    <div
                      style={{
                        padding: "4px 10px",
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className={
                        item.working_status === "Completed"
                          ? "complete"
                          : item.working_status === "on-going"
                          ? "ongoing"
                          : "notstarted"
                      }
                    >
                      {item.working_status === "Completed"
                        ? "Completed"
                        : item.working_status === "on-going"
                        ? "On Going"
                        : "Not Started"}
                    </div>
                    
                  </div>

                  {showRadioButtons &&  (
        <input
          key={item.item_id}
          className="Radio_select"
          type="checkbox"
          id={item.item_id}
          name="fav_language"
          value={item.item_id}
          onChange={() => handleCheckboxChange(item.item_id)}
          checked={selectedAssignment.includes(item.item_id)}
          disabled={item.items_status === "ALLOCATED"}
        />
      )}
                </div>
              ))}
          </div>
        </div>
      {openFilterModal && (
        <DesignerFilterModal
          open={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          setOpenFilterModal={setOpenFilterModal}
          setFolderDetails={props.setFolderDetails}
          onClearCall={props.onClearCall}
          folderDetails={props.folderDetails}
          setFilteredData={setFilteredData}
          setDd={setDd}
          dd={dd}
        />
      )}
      </div>
    </div>
  );
};

export default DesignerDetailView;
