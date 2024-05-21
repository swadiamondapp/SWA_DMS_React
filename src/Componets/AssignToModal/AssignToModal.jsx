import React, { useEffect, useState } from "react";
import "./AssignToModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import avatar from "../../assets/avataprofile.png";
import { assign_to_cad } from "../DESIGNER PANEL/Designer Detail View/Api";
import { list_all_cad_users } from "../DESIGNER PANEL/Designer Dashboard/Api";
import { useParams, useLocation } from "react-router-dom";

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
const AssignToModal = ({ open, onClose,}) => {

  // const [isLoading,setIsLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);

  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAssignButton = (userId) => {
  };
  useEffect(() => {
    list_all_cad_users(setIsLoading, setData);
  }, []);
  console.log(Data, "cad");

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
                  {Data.map((item, index) => (
                    <div className="Avata">
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
                            <span className="taggedText">{item.status}</span>
                          </div>
                          <div>
                            <button
                              onClick={handleAssignButton(item.id)}
                              className="avatarButton"
                            >
                            Assigned
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
      </div>
    </div>
  );
};

export default AssignToModal;
