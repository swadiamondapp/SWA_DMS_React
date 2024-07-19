import React, { useState, useEffect } from "react";
import "./AssignmentModal.css";
import { move_to_folder, move_to_folder_admin_user } from "../Assignment Panel/Api";
import { Modal, Select } from "antd";
import SuccessModal from "../SuccessModal/SuccessModal";

const AssignmentModal = ({
  open,
  onClose,
  formData,
  selectedAssignment,
  setAssignmentFolder,
  setSelectedAssignment,
  setFormData,
  findingsNames,
  selectedFechedTagsId,
  ItemMovedToAssignment,
  setItemMovedToAssignment,
  AdminUploadedIds,
  AdminBasicItemId,
  setAssignDesignerModalOpen,
  setAdminBasicDetailsOpen,
  setUploadedImage,
  setAssignedDesignerId,
  setData,
  ToCloseCreatefolder
}) => {
  // create modal
 
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState('');

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  const handleCreateButton = () => {
    // const isAssignmentPanel = window.location.pathname === '/assignmentpanel';
    // const adminUploadedIdsArray = Array.isArray(AdminUploadedIds) ? AdminUploadedIds : [AdminUploadedIds];
    // const adminBasicItemIdsArray = Array.isArray(AdminBasicItemId) ? AdminBasicItemId : [AdminBasicItemId];
    // if (isAssignmentPanel) {
    //   move_to_folder_admin_user(
    //     adminBasicItemIdsArray,
    //     folderName,
    //     setSuccessMessage,
    //     setSuccessModalOpen,
    //     setFolderName,
    //     onClose,
    //     setAssignDesignerModalOpen,
    //     setAdminBasicDetailsOpen,
    //     setUploadedImage,
    //     setAssignedDesignerId
    //   );
    // } else {
    if(folderName===""){
     setError("Plese write the folder name.")
    }else{
      move_to_folder(
        setIsLoading,
        folderName,
        setAssignmentFolder,
        onClose,
        setSuccessMessage,
        setSuccessModalOpen,
        setSelectedAssignment,
        ItemMovedToAssignment,
        handleClose,
        setFolderName,
        setItemMovedToAssignment,
        selectedAssignment,
        setData,
        setError,
        ToCloseCreatefolder
      );
      // ToCloseCreatefolder(false)
    }
    // }
  };
  const handleChange = (event) => {
    setFolderName(event.target.value);
  };
  console.log(error, "error");
  console.log(selectedAssignment,"selectedAssignment infolder")

  return (
    <div className="create_folder">
      <div className="">
        <div className=""></div>
        <div className="modalContainer">
          <Modal title="" open={open} onCancel={onClose} centered width={300}>
            <div className="modal-Content">
              <div>
                <p className="title">Assignment folder name</p>
              </div>
              <div className="folderInputContainer">
                <label htmlFor="" className="label-title">
                  Folder Name
                </label>
                <input
                  className="inputFeildt"
                  type="text"
                  placeholder=""
                  value={folderName}
                  onChange={handleChange}
                />
                {error && <p style={{fontSize:"10px",color:"red"}}>{error}</p>}
                <button
                  className="button-create"
                  onClick={handleCreateButton}
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <SuccessModal
          successModalOpen={successModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default AssignmentModal;
