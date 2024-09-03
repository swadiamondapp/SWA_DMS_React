import React, { useState, useEffect } from "react";
import "./AssignmentModal.css";
import {
  move_to_folder,
  move_to_folder_admin_user,
} from "../Assignment Panel/Api";
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
  ToCloseCreatefolder,
  setcreateFolderModal,
  setShowRadioButtons,
  setSelectButtonLabel,
  assignmentFolder,
}) => {
  // create modal

  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const [create, setCreate] = useState(false);

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleAlredyExist = () => {
    setCreate(!create);
    setFolderName("");
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
    if (folderName.trim() === "") {
      setError("Please enter the folder name.");
      return;
    }
    const existingFolderNames = assignmentFolder.map((folder) =>
      folder.name.toLowerCase()
    );
    if (existingFolderNames.includes(folderName.trim().toLowerCase())) {
      setError("Folder already exists.");
      return;
    }
    setTimeout(() => {
      setError("");
    }, 3000);

    move_to_folder(
      setIsLoading,
      folderName,
      selectedAssignment,
      setAssignmentFolder,
      setData,
      onClose,
      setSuccessMessage,
      setSuccessModalOpen,
      setFolderName,
      setSelectedAssignment,
      setError,
      setShowRadioButtons,
      setSelectButtonLabel
    );
  };

  const handleCreateButtonSelect = () => {
    if (folderName.trim() === "") {
      setError("Please enter the folder name.");
      return;
    }
    setTimeout(() => {
      setError("");
    }, 3000);

    move_to_folder(
      setIsLoading,
      folderName,
      selectedAssignment,
      setAssignmentFolder,
      setData,
      onClose,
      setSuccessMessage,
      setSuccessModalOpen,
      setFolderName,
      setSelectedAssignment,
      setError,
      setShowRadioButtons,
      setSelectButtonLabel
    );
  };

  // setTimeout(() => {
  //   setError("")
  // }, 5000);

  const handleClose = () => {
    setSuccessModalOpen(false);
  };

  const handleCloseCreateModal = () => {
    ToCloseCreatefolder(false);
    setError("");
    setFolderName("");
  };

  const handleChange = (event) => {
    setFolderName(event.target.value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log(error, "error");
  console.log(selectedAssignment, "selectedAssignment infolder");
  console.log(assignmentFolder, "assignmentFolder");
  console.log(folderName, "folderName");

  return (
    <div className="create_folder">
      <div className="">
        <div className=""></div>
        <div className="modalContainer">
          <Modal
            title=""
            open={open}
            // onClose={()=>ToCloseCreatefolder(false)}
            onCancel={handleCloseCreateModal}
            centered
            width={300}
          >
            <div className="modal-Content">
              <div>
                <p className="title">Assignment folder name</p>
              </div>
              <div className="folderInputContainer">
                <label htmlFor="" className="label-title">
                  Folder Name
                </label>
                {!create && (
                  <input
                    className="inputFeildt"
                    type="text"
                    placeholder=""
                    value={folderName}
                    onChange={handleChange}
                  />
                )}
                {create && (
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    value={folderName}
                    onChange={(value) => setFolderName(value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{
                      // width: "100%",
                      // zIndex: "9999999",
                      backgroundColor: "white",
                      borderRadius: "19px",
                    }}
                    options={assignmentFolder?.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                  />
                )}
                {error && (
                  <p style={{ fontSize: "10px", color: "red" }}>{error}</p>
                )}

                <span
                  style={{
                    fontSize: "11px",
                    marginTop: "10px",
                    marginLeft: "140px",
                    color: "#04344D",
                  }}
                  onClick={handleAlredyExist}
                >
                  {create ? "Create new Folder" : "Add to Existing folder"}
                </span>
                <button
                  className="button-create"
                  onClick={
                    create ? handleCreateButtonSelect : handleCreateButton
                  }
                >
                  {create ? "Move to the Folder" : "Create"}
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
