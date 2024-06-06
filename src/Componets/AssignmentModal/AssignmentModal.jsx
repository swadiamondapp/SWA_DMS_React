import React, { useState, useEffect } from "react";
import "./AssignmentModal.css";
import { move_to_folder } from "../Assignment Panel/Api";
import { Modal, Select } from "antd";
import SuccessModal from "../SuccessModal/SuccessModal";

const AssignmentModal = ({ open, onClose, formData,selectedAssignment, setAssignmentFolder,setSelectedAssignment }) => {
  // create modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen,setSuccessModalOpen] =useState(false)
  const [folderName, setFolderName] = useState("");
  const [successMessage,setSuccessMessage] = useState("")
  const [error,setError] = useState([])

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleCreateButton = () => {
   
    move_to_folder(setIsLoading, formData,folderName,selectedAssignment, setAssignmentFolder,onClose,setSuccessMessage,setSuccessModalOpen,setSelectedAssignment);
  };
  const handleChange = (event) => {
    setFolderName(event.target.value);

  };
  console.log(folderName,'folder')

  return (
    <div>
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
                <button
                  className="button-create"
                  onClick={() => handleCreateButton()}
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
