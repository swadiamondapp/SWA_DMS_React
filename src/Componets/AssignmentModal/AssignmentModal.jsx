import React, { useState, useEffect } from "react";
import "./AssignmentModal.css";
import { move_to_folder } from "../Assignment Panel/Api";
import { Modal, Select } from "antd";

const AssignmentModal = ({ open, onClose, formData }) => {
  // create modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [isLoading, setIsLoading] = useState(false);
  const [folderName, setFolderName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCreateButton = () => {
    move_to_folder(setIsLoading, formData,folderName);
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
                  placeholder="june 24 2023"
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
      </div>
    </div>
  );
};

export default AssignmentModal;
