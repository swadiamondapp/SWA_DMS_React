import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import close from "../../assets/close.png";
import "./InstructionModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  fontFamily: "Gilroy medium",
  boxShadow: 24,
  p: 2
};

const InstructionModal = ({ open, setOpenmodal, modalHeading,modalTitle}) => {
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="MastersModal">
        <div
          className="master_modal"
          //  onclick={()=>setOpenmodal(false)}
        >
          <h3>{modalHeading}</h3>
          <button onClick={() => setOpenmodal(false)}>
            <img className="btn_close" src={close} alt="" srcset="" />
          </button>
        </div>

        <div className="modal_fields" style={{marginTop:"15px"}}>
          <div className="inp2_admin">
          <label htmlFor="">{modalTitle ? modalTitle : "Write instractions here"}</label>
            <textarea
              type="text"
              name="name"
              //   value={inputData.name || ""}
              //   onChange={handleInputData}
            />
          </div>
        </div>

        {/* {errors && (
          <span style={{ color: "red", fontSize: "10px" }}>{errors}</span>
        )} */}
        {/* {location.pathname !== "/newscanmodule" &&
          location.pathname !== "/centralhubscan" && ( */}
        <div className="modal_btns" >
          <button
          style={{width:"100%",background:"#04344D",color:"white",fontSize:"14px",fontWeight:"600"}}
          //   onClick={handleCreatedata}
          >
            ADD INSTRACTION
          </button>
        </div>
        {/* )} */}
      </Box>
    </Modal>
  );
};

export default InstructionModal;
