import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InvertedTick from "../../assets/sucesLarge.png";
import "./SuccessModal.css"

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

const SuccessModal = ({successModalOpen,handleClose,handleOpen}) => {
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

  return (
    <div>
      <Modal open={successModalOpen} onClose={handleClose}>
        <Box
          sx={successM}
          style={
            isMobileView ? { width: "90%" } : { width: "30%", height: "auto" }
          }
        >
          <Typography className="successModalContainer">
            <div className="imageContianer">
              <img className='tick' src={InvertedTick} />
            </div>
            <div style={{ textAlign: "center", margin: "12px 0px" }}>
              <span className="titlesuccesModal">
                Mail Sended Successfully <br />
              </span>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessModal;
