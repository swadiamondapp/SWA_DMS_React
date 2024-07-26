import React, { useState } from "react";
import { TbDownload } from "react-icons/tb";
import { MdViewModule, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { RiFilter3Line } from "react-icons/ri";
import "./DesignPool.css";
import { Link, useLocation } from "react-router-dom";
import BasicDetailModal from "../../BasicDetails/BasicDetailModal";
import AssignToModal from "../../AssignToModal/AssignToModal";
import CreateCustomisation from "../../CreateCustomisation/CreateCustomisation";
import { move_to_folder } from "../../Assignment Panel/Api";
import { useParams } from "react-router-dom";
import AssignmentModal from "../../AssignmentModal/AssignmentModal";

const DesignBtn = ({
  votersSetData,
  toggleDownloadOptions,
  selectButtonLabel,
  toggleRadioButtons,
  toggleMoveOptions,
  showDownloadOptions,
  showMoveOptions,
  moveSelectedDesign,
  getSelectedDesign,
  selectedAssignment,
  setAssignmentFolder,
  userId,
  selectedDesign,
  folderId,
  assignToCadId,
  list_id,
  setFolderDetails,
  list_designer_folderDetails,
  setSelectedAssignment,
  setIsOpen,
  open,
  setData,
  setSelectedDesigns,
  setShowRadioButtons,
  setSelectButtonLabel,
  setcreateFolderModal,
  handleCreatedFolder,
  handleSortByDesigner,
  handleSortByAdmin,
  handleSortByAll
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState(false);
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);
  const [sort, setSort] = useState(false);

  // const [createFolderModal, setcreateFolderModal] = useState(false);

  // const handleCreatedFolder = () => {
  //   setcreateFolderModal(true)
  //   setIsModalOpen(true);
  // };
  const handleAssignment = () => {
    setIsModalOpenAssign(false);
  };
  const { id } = useParams();

  console.log("selectedAssignmentbtnnnnnn", setSelectedAssignment);

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div style={location.pathname === "/unassigneddesigner" ? { marginTop: "18px" } : {}}>

      <div className="DesignPool_btns" style={{position:"relative",}}>

      {location.pathname === "/unassigneddesigner" && (
       <h4 style={{marginRight:"59%"}}>Not Started Assignements</h4>
      )}

      <div className="" style={{display:"flex",gap:"6px",position:"absolute",right:"0%",top:"-10px"}}>
       {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
          location.pathname !== "/designerassignview" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== "/finishedProject" &&
          location.pathname !== "/unassigneddesigner" &&
          location.pathname !== `/designerassignview/${id}` && (
            <div className="Download_ParentD">
              <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
                Download <TbDownload />
              </button>
              {showDownloadOptions && (
                <div className="Download_Sub">
                  <p>All</p>
                  <p>Selected</p>
                </div>
              )}
            </div>
          )}
        {location.pathname !== "/designdashboard" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== "/unassigneddesigner" &&
          location.pathname !== "/finishedProject" && (
            <button className="D_selectBtn" onClick={toggleRadioButtons}>
              {selectButtonLabel}
            </button>
          )}

        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
          location.pathname === "/designpool" &&
          selectButtonLabel === "Unselect" &&
          getSelectedDesign.length > 0 &&
          location.pathname !== "/designerassignview" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== `/designerassignview/${id}` &&
          location.pathname !== "/finishedProject" && (
            <div className="Parent_MoveTo">
              <button className="D_moveBtn" onClick={toggleMoveOptions}>
                Move to <MdOutlineKeyboardArrowDown />
              </button>
              {showMoveOptions && (
                <div className="Sub_AssignmentPanel">
                  <Link
                    style={{ textDecoration: "none" }}
                    // to="/assignmentpanel"
                  >
                    <p
                      style={{ color: "#000" }}
                      onClick={() => moveSelectedDesign()}
                    >
                      Assignment panel
                    </p>
                  </Link>
                </div>
              )}
            </div>
          )}
        {location.pathname === `/designerassignview/${id}` &&
          selectedDesign.length > 0 &&
          selectButtonLabel === "Unselect" && (
            <div className="Parent_MoveTo">
              <button
                className="D_moveBtn"
                onClick={() => setIsModalOpenAssign(true)}
              >
                Assign To
              </button>
            </div>
          )}

        {location.pathname === "/assignmentpanel" &&
          selectedAssignment.length > 0 &&
          selectButtonLabel === "Unselect" && (
            <div className="Parent_MoveTo">
              <button className="D_moveBtn" onClick={handleCreatedFolder}>
                Create folder
              </button>
            </div>
          )}

        {location.pathname !== "/votorscustomization" &&
        location.pathname !== "/assignmentpanel" &&
        location.pathname !== "/unassigneddesigner" &&
        location.pathname !== "/designpool" && (
          <button className="D_View_Sort_Filter">
            <MdViewModule /> View
          </button>
        )}

        {location.pathname === "/assignmentpanel" && (
          <button onClick={handleSort} className="D_View_Sort_Filter" style={{position:"relative"}}>
            <LuArrowUpDown /> Sort
            {sort && (
              <div className="sortData">
                <span onClick={handleSortByAll}>All</span>
                <span onClick={handleSortByDesigner}>Designer added</span>
                <span onClick={handleSortByAdmin}>Admin added</span>
              </div>
            )}
          </button>
        )}

        <button className="D_View_Sort_Filter">
          <RiFilter3Line /> Filter
        </button>
        {location.pathname === "/votorscustomization" && (
          <button
            className="D_downlodBtn"
            onClick={() => setIsCreateCustomizeModalOpen(true)}
          >
            Create Customization
          </button>
        )}
      </div>
      </div>
      <BasicDetailModal
        open={open}
        onClose={() => setIsOpen(false)}
        selectedAssignment={selectedAssignment}
        setAssignmentFolder={setAssignmentFolder}
        setSelectedAssignment={setSelectedAssignment}
        getSelectedDesign={getSelectedDesign}
        setData={setData}
        setSelectedDesigns={setSelectedDesigns}
        setShowRadioButtons={setShowRadioButtons}
        setSelectButtonLabel={setSelectButtonLabel}
      />
      <AssignToModal
        open={isModalOpenAssign}
        onClose={() => handleAssignment()}
        assignToCadId={assignToCadId}
        selectedDesign={selectedDesign}
        setSelectedDesigns={setSelectedDesigns}
        list_id={list_id}
        list_designer_folderDetails={list_designer_folderDetails}
        setSelectedAssignment={setSelectedAssignment}
        setSelectButtonLabel={setSelectButtonLabel}
        setShowRadioButtons={setShowRadioButtons}
      />
      <CreateCustomisation
        open={isModalOpenCreateCutomize}
        onClose={() => {
          setIsCreateCustomizeModalOpen(false);
        }}
        votersSetData={votersSetData}
      />

      {/* <AssignmentModal
      open={openAdminFolder}
      AdminUploadedIds={AdminUploadedIds}
      onClose={() => setOpenAdminFolder(false)}
      AdminBasicItemId={AdminBasicItemId}
      setAssignDesignerModalOpen={ setAssignDesignerModalOpen}
      setAdminBasicDetailsOpen={setAdminBasicDetailsOpen}
      setUploadedImage={setUploadedImage}
      setAssignedDesignerId={ setAssignedDesignerId}
    
      /> */}
    </div>

  );
};

export default DesignBtn;
