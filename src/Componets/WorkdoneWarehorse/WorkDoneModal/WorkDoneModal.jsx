import { Box, Modal } from "@mui/material";
import React from "react";
import close from "../../../assets/close.png";
import "./WokrDoneModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  fontFamily: "Gilroy medium",
  boxShadow: 24,
  p: 1.5,
};

const WorkDoneModal = ({ setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="MastersModal wr_padding">
            <>
          <div className="master_modal">
            <h3>Basic Detail</h3>
            <button onclick={handleClose}>
              <img className="btn_close" src={close} alt="" srcset="" />
            </button>
          </div>

          <div className="workdone_modal" style={{marginTop:"15px"}}>
            <span>Product ID</span>
            <span>SWA12356</span>
          </div>
          <div className="workdone_modal">
            <span>Length</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Width</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Height</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Type of metal</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Dimond Type</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>APPROX DIAMOND WEIGHT</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Findings</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Approx weight</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal">
            <span>Tags</span>
            <span>20 mm</span>
          </div>
          <div className="workdone_modal" style={{borderBottom:"none"}}>
            <span>Note</span>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates expedita voluptatem a provident, ab magni unde
              repellendus rem autem minus veritatis perspiciatis necessitatibus
              vel qui repudiandae nihil animi. Dignissimos, nemo?
            </p>
          </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default WorkDoneModal;
