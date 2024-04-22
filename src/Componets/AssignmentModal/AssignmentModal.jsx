import React, { useState } from "react";
import "./AssignmentModal.css";

import { Modal, Select } from "antd";

const AssignmentModal = ({ open, onClose }) => {
  // create modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
                />
                <button className="button-create">Create</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
