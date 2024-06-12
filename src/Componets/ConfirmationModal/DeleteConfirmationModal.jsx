import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./DeleteConfirmationModal.css";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessModal from "../SuccessModal/SuccessModal";

const successM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  outline: "none",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const DeleteConfirmationModal = ({
  DeleteConfirmationOpen,
  handleDeleteClose,
  deleteFunction,
  setDeleteConfirmationOpen,
  isLoading,
}) => {
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >= 300 && window.innerWidth <= 575);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const handleDeleteModalButton = () => {
    deleteFunction()
  };
  const handlCancelButton = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      <Modal open={DeleteConfirmationOpen} onClose={handleDeleteClose}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "25%", height: "auto" }
          }
        >
          <Typography className="successModalContainer">
            <div className="deleteModalContainer">
              <span className="deleteMessageText">
                Are you sure want to delete ?
              </span>
              <div className="deleteButtonContiner">
                <button onClick={() => handlCancelButton()}>cancel</button>
                <button
                  onClick={() => handleDeleteModalButton()}
                  className="delete_button_modal"
                >
                  {/* {isLoading ? (
                    <>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress
                          size={12} // Set the desired size
                          sx={{ color: "#fff",padding:"8px 10px", width:"35px" }}
                        />
                      </Box>
                    </>
                  ) : (
                    <> */}
                    delete
                    {/* </>
                  )} */}
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteConfirmationModal;
