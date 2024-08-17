import React, { useState, useEffect, useRef } from "react";
import "../ADMIN PANEL/Design Pool/DesignPool.css";
import "./AssignmentPanel.css";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../assets/gold.png";
import like from "../../assets/like.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, Link, useNavigate } from "react-router-dom";
import folderimg from "../../assets/folder.png";
import {
  list_assignment_panel,
  list_folderDetails,
  moveSingleItemToDesignPool,
  deleteItemFromAssignmentPanel,
  sort_assignmentpanel_bydesigner,
  sort_assignmentpanel_byadmin,
} from "./Api";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
import DesignPools from "../DesignPoolExtended/DesignPools";
import AdminBasicDetailsModal from "../AdminBasicDetailsModal/AdminBasicDetailsModal";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import { Box, CircularProgress, Tab } from "@mui/material";
import AdminFilter from "../AdminFilter/AdminFilter";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import { useLocation, useNavigate } from "react-router-dom";

const AssignmentPanel = ({ sidebarExpanded }) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [showDeleteMoveButtons, setShowDeleteMoveButtons] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Data, setData] = useState([]);
  const [assignmentFolder, setAssignmentFolder] = useState([]);
  const [folderId, setFolderId] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const [openDesignPool, setOpenDesignPool] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [AdminBasicModalOpen, setAdminBasicModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);

  const [createFolderModal, setcreateFolderModal] = useState(false);
  const [IdOfDeleteAssignment, setIdOfDeleteAssignment] = useState([]);

  const [filter, setFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDesigner, setFilterDesigner] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [dd, setDd] = useState();
  const [value, setValue] = React.useState("1");

  const location = useLocation();
  const dotsRef = useRef(null);
  const navigate = useNavigate();

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
    if (showRadioButtons) {
      // If toggling to "Unselect", clear the selected designs
      setSelectedAssignment([]);
    }
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };
  // const toggleDeleteMoveButtons = () => {
  //   setShowDeleteMoveButtons(!showDeleteMoveButtons);
  //   setShowOverlay(!showOverlay);
  // };
  const toggleDeleteMoveButtons = (id) => {
    if (activeCardId === id) {
      setActiveCardId(null);
      setShowOverlay(false);
    } else {
      setActiveCardId(id);
      setShowOverlay(true);
    }
  };
  const handleClickOutside = (event) => {
    if (dotsRef.current && !dotsRef.current.contains(event.target)) {
      // setActiveCardId(null);
      // setShowOverlay(false);
    }
  };
  // const handleClickOutside = (event) => {
  //   if (dotsRef.current && !dotsRef.current.contains(event.target)) {
  //     setShowDeleteMoveButtons(false);
  //     setShowOverlay(false);
  //   }
  // };
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUploadedImage(reader.result);
  //       setUploadInstructionsVisible(false);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    list_assignment_panel(setIsLoading, setData);
    list_assignment_folder(setIsLoading, setAssignmentFolder);
    list_folderDetails();
  }, []);

  // const handleFolderClick = (id) => {
  //   console.log("id.....>", id);
  //   if (location.pathname === "/assignmentview") {
  //     navigate(`assignmentview${id}`);
  //   }
  // };
  const [selectedDesignCode, setSelectedDesignCode] = useState([]);
  const handleCheckboxChange = (designcode, tickedDesings) => {
    if (selectedAssignment.includes(designcode)) {
      setSelectedAssignment(
        selectedAssignment.filter((item) => item !== designcode)
      );
    } else {
      setSelectedAssignment([...selectedAssignment, designcode]);
    }

    if (selectedDesignCode.includes(tickedDesings)) {
      setSelectedDesignCode(
        selectedDesignCode.filter((item) => item !== tickedDesings)
      );
    } else {
      setSelectedDesignCode([...selectedDesignCode, tickedDesings]);
    }
  };

  const handleOpenDesignPool = () => {
    setOpenDesignPool(true);
  };
  const hadnleCloseDesignPool = () => {
    setOpenDesignPool(false);
  };

  const handleDrawModal = (item) => {
    setModalDetails(item);
  };
  const handleAdminBasicModal = () => {
    setAdminBasicModalOpen(true);
  };

  const handleCloseAdminModal = () => {
    setAdminBasicModalOpen(false);
  };

  const handleCreatedFolder = () => {
    setcreateFolderModal(true);
  };

  const handleForlderDetailsVeiw = (item, designCode) => {
    navigate(`/assignmentviewsAll/${item.id}`, {
      state: {
        detailsViewFolderName: designCode,
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFolderNaviate = (item) => {
    navigate(`/assignmentpaneldetailsview/${item.id}`, {
      state: { assignmentFolderName: item.name },
    });
  };
  const moveToDesignPool = (item) => {
    moveSingleItemToDesignPool(
      setIsLoading,
      item,
      setData,
      setSuccessModalOpen,
      setSuccessMessage,
      setActiveCardId
    );
    console.log(item, "itemmmmm");
  };
  const handleDeleteSingle = (item) => {
    setIdOfDeleteAssignment(item);
    setDeleteConfirmationOpen(true);
    // deleteItemFromAssignmentPanel(
    //   setIsLoading,
    //   IdOfDeleteAssignment,
    //   setData,
    //   setSuccessModalOpen,
    //   setSuccessMessage,
    //   setActiveCardId
    // );
  };

  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleSortByDesigner = () => {
    sort_assignmentpanel_bydesigner(setIsLoading, setData);
    setActiveFilter("designer");
  };
  const handleSortByAdmin = () => {
    sort_assignmentpanel_byadmin(setIsLoading, setData);
    setActiveFilter("admin");
  };
  const handleSortByAll = () => {
    list_assignment_panel(setIsLoading, setData);
    setActiveFilter("all");
  };

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.id}`, {
      state: {
        code: designCode,
      },
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const length = Data.reduce((count, dataItem) => {
    if (!dataItem?.items) return count;
    return count + dataItem.items.length;
  }, 0);


  return (
    <div
      className={`Parent_AssignmentView ${filter ? "no-scroll" : ""}`}
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="AssignmentPanel_FileUpload" style={{ padding: "10px" }}>
        {uploadInstructionsVisible && !uploadedImage && (
          <>
            <p>Create new assignment</p>
            <p>You can create Assignment directly</p>
            <span
              className="assignmentPanal_upload_text"
              onClick={handleAdminBasicModal}
            >
              Create Assignment
            </span>
          </>
        )}
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="uploadedimg" />
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <div className="Assignment_Panel_desc">
        <DesignBtn
          toggleDownloadOptions={toggleDownloadOptions}
          selectButtonLabel={selectButtonLabel}
          toggleRadioButtons={toggleRadioButtons}
          toggleMoveOptions={toggleMoveOptions}
          showDownloadOptions={showDownloadOptions}
          showMoveOptions={showMoveOptions}
          selectedAssignment={selectedAssignment}
          setSelectedAssignment={setSelectedAssignment}
          setAssignmentFolder={setAssignmentFolder}
          selectedDesignCode={selectedDesignCode}
          handleCreatedFolder={handleCreatedFolder}
          handleSortByDesigner={handleSortByDesigner}
          handleSortByAdmin={handleSortByAdmin}
          handleSortByAll={handleSortByAll}
          assignmentFolder={assignmentFolder}
          filter={filter}
          setFilter={setFilter}
          activeFilter={activeFilter}
          // setcreateFolderModal={setcreateFolderModal}
          // handleCreateFolderModal
        />

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Selected"
                  value="1"
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Folders"
                  value="2"
                  style={{ textTransform: "capitalize" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="first_tab" style={{paddingTop:"50px"}}>
              <h3 className="HeadNewdesign">
              Selected (&nbsp; {length}&nbsp; )
            </h3>

            {!isLoading && Data.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ marginTop: "100px" }}>No Data Found</span>
              </div>
            ) : (
              <div className="Card_Design_Parent">
                {Data.map((dataItem, dataIndex) =>
                  dataItem?.items?.map((item, itemIndex) => {
                    const paperDesign = item?.paper_design;
                    const itemId = item?.id;
                    const createdAt = item?.paper_design?.uploaded_date;
                    const updatedAt = item?.updated_at;
                    const designer = paperDesign?.designer;
                    const designCode = paperDesign?.designcode;
                    const image = paperDesign?.image;
                    const likesCount = paperDesign?.likes_count;
                    if (!image) {
                      return null;
                    }

                    return (
                      <div
                        className="New_Design_card"
                        key={`${dataIndex}-${itemIndex}`}
                      >
                        <div
                          className="Card_img"
                          onClick={() =>
                            handleForlderDetailsVeiw(item, designCode)
                          }
                        >
                          <img
                            src={image}
                            alt={`Design by ${designer}`}
                            onClick={() => handleDrawModal(image)}
                          />
                          {showDeleteMoveButtons && <div className="Overlay" />}
                        </div>
                        <div className="Card_Details">
                          <h3>ID : {designCode}</h3>
                          <div
                            className=""
                            style={{ display: "flex", gap: "5px" }}
                          >
                            <span style={{ color: "#23A064" }}>Status :</span>
                            <span>{item.current_status || ""}</span>
                          </div>
                          <div className="Card_Details_Inner">
                            <div className="Inner_Left">
                              <p>{designer}</p>
                              <p>
                                <span className="dateUpdate_fix">
                                  created at :{" "}
                                </span>
                                {formatDate(createdAt)}
                              </p>
                              <p>
                                <span className="dateUpdate_fix">
                                  {" "}
                                  updated at :{" "}
                                </span>
                                {formatDate(updatedAt)}
                              </p>
                            </div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                width: "auto",
                                gap: "10px",
                              }}
                            >
                              <button
                                style={{
                                  padding: "7px 10px ",
                                  borderRadius: "4px",
                                  color: "white",
                                  backgroundColor: "#0464D5",
                                  border: "none",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                                onClick={() => handleTrack(item, designCode)}
                              >
                                Track
                              </button>
                              <div className="Inner_Right">
                                <p>
                                  {likesCount}
                                  <img src={like} alt="Likes" />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {showRadioButtons && (
                          <input
                            className="Radio_select"
                            type="checkbox"
                            id={itemId}
                            name="fav_language"
                            value={itemId}
                            onChange={() =>
                              handleCheckboxChange(itemId, designCode)
                            }
                            checked={selectedAssignment.includes(itemId)}
                          />
                        )}
                        {!showRadioButtons &&
                          location.pathname === "/assignmentpanel" && (
                            <div
                              onClick={() => toggleDeleteMoveButtons(itemId)}
                              ref={dotsRef}
                            >
                              <BsThreeDotsVertical
                                className="A_dots"
                                style={{ fontSize: "20px" }}
                              />
                            </div>
                          )}
                        {activeCardId === itemId && (
                          <div
                            className="Dots_Delete_DesignPool_btns"
                            ref={dropdownRef}
                          >
                            <p onClick={() => handleDeleteSingle(itemId)}>
                              Delete
                            </p>
                            <p onClick={() => moveToDesignPool(itemId)}>
                              Move to Design pool
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
              </div>
            </TabPanel>
            <TabPanel value="2" className="folders_tabpanel">

              <div className="Parent_Folder_section" >
              <h3 className="HeadNewdesign">Folders</h3>
              <div className="folderCard_parent">
                {assignmentFolder.map((item) => (
                  <div
                    className="folder__card"
                    key={item.id}
                    onClick={() => handleFolderNaviate(item)}
                  >
                    {/* <Link
                  to={`/assignmentpaneldetailsview/${
                    item.id
                  }?name=${encodeURIComponent(item.name)}`}
                > */}
                    <img src={folderimg} alt="" />
                    {/* </Link> */}
                    <p style={{ wordWrap: "break-word", maxWidth: "100px" }}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </TabPanel>
          </TabContext>
        </Box>

        <div className="Assignment_panel_section">
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                size={50} // Set the desired size
                sx={{
                  color: "#126e72",
                  padding: "8px 10px",
                  width: "35px",
                }}
              />
            </div>
          )}

          <>
            

            
          </>
        </div>
      </div>
      <DesignPools
        handleOpenDesignPool={handleOpenDesignPool}
        hadnleCloseDesignPool={hadnleCloseDesignPool}
        openDesignPool={openDesignPool}
        modalDetails={modalDetails}
      />
      <AdminBasicDetailsModal
        AdminBasicModalOpen={AdminBasicModalOpen}
        setAdminBasicModalOpen={setAdminBasicModalOpen}
        onClose={handleCloseAdminModal}
        selectedDesignCode={selectedDesignCode}
        recallListDesigners={() => list_assignment_panel(setIsLoading, setData)}
      />

      <AssignmentModal
        open={createFolderModal}
        // AdminUploadedIds={AdminUploadedIds}
        onClose={() => setcreateFolderModal(false)}
        // AdminBasicItemId={AdminBasicItemId}
        // setAssignDesignerModalOpen={ setAssignDesignerModalOpen}
        // setAdminBasicDetailsOpen={setAdminBasicDetailsOpen}
        // setUploadedImage={setUploadedImage}
        // setAssignedDesignerId={ setAssignedDesignerId}
        setAssignmentFolder={setAssignmentFolder}
        setcreateFolderModal={setcreateFolderModal}
        selectedAssignment={selectedAssignment}
        setSelectedAssignment={setSelectedAssignment}
        setData={setData}
        ToCloseCreatefolder={setcreateFolderModal}
        setShowRadioButtons={setShowRadioButtons}
        setSelectButtonLabel={setSelectButtonLabel}
        assignmentFolder={assignmentFolder}
      />

      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
      <DeleteConfirmationModal
        DeleteConfirmationOpen={DeleteConfirmationOpen}
        handleDeleteClose={handleDeleteClose}
        setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        handleDeleteOpen={handleDeleteOpen}
        isLoading={isLoading}
        deleteFunction={() => {
          deleteItemFromAssignmentPanel(
            setIsLoading,
            IdOfDeleteAssignment,
            setData,
            setSuccessModalOpen,
            setSuccessMessage,
            setActiveCardId,
            setDeleteConfirmationOpen
          );
        }}
      />

      {filter && (
        <AdminFilter
          filter={filter}
          setFilter={setFilter}
          setData={setData}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDesigner={filterDesigner}
          setFilterDesigner={setFilterDesigner}
          filterMaxPrice={filterMaxPrice}
          setFilterMaxPrice={setFilterMaxPrice}
          filterMinPrice={filterMinPrice}
          setFilterMinPrice={setFilterMinPrice}
          setDd={setDd}
          dd={dd}
        />
      )}
    </div>
  );
};

export default AssignmentPanel;
