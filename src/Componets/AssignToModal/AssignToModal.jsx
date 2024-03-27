import React, { useState } from "react";
import "./AssignToModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import avatar from "../../assets/avataprofile.png";

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
};
const AssignToModal = ({ open, onClose }) => {
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAssignButton = () => {
    setAssignedButton((prevText) =>
      prevText === "Assign" ? "Unasign" : "Assign"
    );
  };

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
                    // onClick={handleClose}
                    onClose={onClose}
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
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>{" "}
                  <div className="Avata">
                    <div className="avatarContainer">
                      <div className="leftTo">
                        <div className="avatarImageContainer">
                          <img src={avatar} alt="" className="avataImage" />
                        </div>
                        <div className="detailsAvatar">
                          <span className="nameA">Vipin Vinod</span>
                          <span className="nameB">cad</span>
                        </div>
                      </div>
                      <div className="rightTo">
                        <div className="tagged">
                          <span className="taggedText">Assigned</span>
                        </div>
                        <div>
                          <button
                            onClick={handleAssignButton}
                            className="avatarButton"
                          >
                            {AssinedButton}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AssignToModal;
