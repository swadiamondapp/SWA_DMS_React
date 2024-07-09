import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InvertedTick from "../../assets/sucesLarge.png";
import "./TransferConfirmationModal.css";
import { transfer_work } from "../CAD/Api";
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
  width: 300,
  height: "auto",
  p: 2,
};

const TransferConfirmationModal = ({
  TransferModalOpen,
  handleCloseTransfer,
  handleOpenTransfer,
  setTransferModalOpen,
  StatusToModal,
  CardId,
  paramId,
  setFolderDetailsById,
  folderDetailsById,
  setIsLoading
}) => {
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 575
  );
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
  console.log(folderDetailsById,"paraamm")

  const transferCard = () => {
    transfer_work(StatusToModal, CardId, setTransferModalOpen,setSuccessMessage, setSuccessModalOpen,paramId,setFolderDetailsById,);
  };

  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  return (
    <div>
      <Modal open={TransferModalOpen} onClose={handleCloseTransfer}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className="transfer_modal_contianer">
            <div className="transfer_modal_contianer">
              <div className="transfer_modal_title">
                <p>Please confirm</p>
              </div>
              <div className="content_transferModal">
                <span className="transfer_modal_content_details">
                  Are you sure you want to transfer the file?
                  <br /> once you transfered the file you cant able to
                  <br /> change the status again{" "}
                </span>
              </div>
              <div className="transferModal_buttons">
                <button
                  className="transfer_modal_cancel_button"
                  onClick={() => setTransferModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="transfer_modal_confirm_button"
                  onClick={() => transferCard()}
                >
                  Yes
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      <SuccessModal
        successModalOpen={successModalOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        successMessage={successMessage}
      />
    </div>
  );
};

export default TransferConfirmationModal;
