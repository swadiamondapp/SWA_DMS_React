import React, { useEffect, useState } from "react";
import "./AssignToModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import avatar from "../../assets/avataprofile.png";
import {
  assign_to_cad,
  unAssignCadDesigner,
} from "../DESIGNER PANEL/Designer Detail View/Api";
import { list_all_cad_users } from "../DESIGNER PANEL/Designer Dashboard/Api";
import { useParams, useLocation } from "react-router-dom";
import SuccessModal from "../SuccessModal/SuccessModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 350,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  borderRadius: 2,
  outLine: "none",
};
const AssignToModal = ({
  open,
  onClose,
  assignToCadId,
  selectedDesign,
  setFolderDetails,
  list_id,
  list_designer_folderDetails,
  setSelectedAssignment,
  setSelectButtonLabel,
  setShowRadioButtons,
}) => {
  // const [isLoading,setIsLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [AssignedData, setAssignedData] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [assignBtnText, setAssignBtnText] = useState("Assign");
  const [assignedStatus, setAssignedStatus] = useState({});
  const [currentlyAssignedUser, setCurrentlyAssignedUser] = useState(null);

  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    list_all_cad_users(setIsLoading, setData);
  }, []);

  // const handleOpen = () => setOpen(true);

  // const handleOpen = () => setOpen(true);

  const handleOpenSuccess = () => setSuccessModalOpen(true);
  const handleCloseSuccess = () => setSuccessModalOpen(false);
  const handleUnAssignButton = (userId) => {
    const itemId = String(userId);
    console.log(itemId, "itemsdfsdf");
    unAssignCadDesigner(
      assignToCadId,
      userId,
      selectedDesign,
      list_id,
      list_designer_folderDetails,
      setAssignBtnText
    );
  };

  const handleAssignButton = (userIdString) => {
    const userId = String(userIdString);
    const isCurrentlyAssigned = assignedStatus[userId];

    if (isCurrentlyAssigned) {
      // Unassign the user
      unAssignCadDesigner(
        setIsLoading,
        assignToCadId,
        userId,
        selectedDesign,
        list_designer_folderDetails,
        setSuccessMessage,
        setSuccessModalOpen
      );
      setCurrentlyAssignedUser(null);
    } else {
      // Assign the user
      assign_to_cad(
        setIsLoading,
        assignToCadId,
        userId,
        selectedDesign,
        list_designer_folderDetails,
        setSuccessMessage,
        setSuccessModalOpen
      );
      setCurrentlyAssignedUser(userId);
    }

    setAssignedStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !isCurrentlyAssigned,
    }));
  };
  const handleOnCLose = () => {
    onClose();
    setSelectedAssignment([]);
    setSelectButtonLabel("Select");
    setShowRadioButtons(false);
    setAssignedStatus({});
    setCurrentlyAssignedUser(null)
  };
  console.log(assignToCadId, "assignToCadId====>");
  console.log(selectedDesign, "selectedDesign====>Modal");
  console.log(AssignedData, "resp_assignedData==>");
  const activeCadrs = Data.filter((user) => user.status === "ACTIVE");
  console.log(activeCadrs, "assignedStatus");

  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            // onClose={handleClose}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="headerModal">
                  <span
                    className="assignTitle"
                    style={{ position: "absolute", top: 10, left: 16 }}
                  >
                    Assign to
                  </span>
                  <button
                    onClick={handleOnCLose}
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      background: "none",
                      border: "none",
                    }}
                  >
                    <img src={closeButton} />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <div className="main">
                  {activeCadrs.map((item, index) => (
                    <div className="Avata" key={index}>
                      <div className="avatarContainer">
                        <div className="leftTo">
                          <div className="avatarImageContainer">
                            <img
                              src={item.image}
                              alt=""
                              className="avataImage"
                            />
                          </div>
                          <div className="detailsAvatar">
                            <span className="nameA">{item.name}</span>
                            <span className="nameB">{item.Usertype}</span>
                          </div>
                        </div>
                        <div className="rightTo">
                          <div className="tagged">
                            <span className="taggedText">
                              {assignedStatus[item.id] ? "Assigned" : ""}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() => handleAssignButton(item.id)}
                              className="avatarButton_assign_button"
                              disabled={
                                currentlyAssignedUser &&
                                currentlyAssignedUser !== item.id &&
                                !assignedStatus[item.id]
                              }
                            >
                              {assignedStatus[item.id] ? "Unassign" : "Assign"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  ))}
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
        <SuccessModal
          successModalOpen={successModalOpen}
          handleOpen={handleOpenSuccess}
          handleClose={handleCloseSuccess}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default AssignToModal;
