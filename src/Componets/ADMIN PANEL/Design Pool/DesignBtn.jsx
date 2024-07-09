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

const DesignBtn = ({
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
  setSelectButtonLabel
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState(false);
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);

  const handleCreatedFolder = () => {
    setIsModalOpen(true);
  };
  const handleAssignment = () => {
    setIsModalOpenAssign(false);
  };
  const { id } = useParams();
  console.log(selectedAssignment, "selectedAssignment?==>");
  return (
    <div>
      <div className="DesignPool_btns">
        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
          location.pathname !== "/designerassignview" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== "/finishedProject" &&
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
          location.pathname !== "/finishedProject" && (
            <button className="D_selectBtn" onClick={toggleRadioButtons}>
              {selectButtonLabel}
            </button>
          )}

        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
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
          selectButtonLabel === "Unselect" && (
            <div className="Parent_MoveTo">
              <button
                className="D_moveBtn"
                onClick={() => handleCreatedFolder()}
              >
                Create folder
              </button>
            </div>
          )}

        {location.pathname !== "/votorscustomization" && (
          <button className="D_View_Sort_Filter">
            <MdViewModule /> View
          </button>
        )}

        {location.pathname !== "/votorscustomization" && (
          <button className="D_View_Sort_Filter">
            <LuArrowUpDown /> Sort
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
      <BasicDetailModal
        open={open}
        onClose={() => setIsOpen(false)}
        selectedAssignment={selectedAssignment}
        setAssignmentFolder={setAssignmentFolder}
        setSelectedAssignment={setSelectedAssignment}
        getSelectedDesign={getSelectedDesign}
        setData={ setData}
        setSelectedDesigns={setSelectedDesigns}
        setShowRadioButtons={setShowRadioButtons}
        setSelectButtonLabel={setSelectButtonLabel}
      />
      <AssignToModal
        open={isModalOpenAssign}
        onClose={() => handleAssignment()}
        assignToCadId={assignToCadId}
        selectedDesign={selectedDesign}
        list_id={list_id}
        list_designer_folderDetails={list_designer_folderDetails}
        setSelectedAssignment={setSelectedAssignment}
      />
      <CreateCustomisation
        open={isModalOpenCreateCutomize}
        onClose={() => setIsCreateCustomizeModalOpen(false)}
      />
    </div>
  );
};

export default DesignBtn;
