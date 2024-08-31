import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import close from "../../assets/close.png";
import "./InstructionModal.css";
import { addCadRemark, addRenderRemark } from "../AssignmentDetailsViewsAll/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  fontFamily: "Gilroy medium",
  boxShadow: 24,
  p: 2,
};

const InstructionModal = ({
  open,
  setOpenmodal,
  modalHeading,
  modalTitle,
  setSuccessModalOpen,
  setIsLoading,
  detailsViewFolderName,
  remarkData,
  renderData
  // setCadRemark,
  // setRenderRemark,
  // renderRemark
}) => {
  const [renderRemarkText, setRenderRemarkText] = useState("");
  const [cadRemark, setCadRemark] = useState("");
  const [error, setError] = useState("");

  // const handleInputData =(e) => {
  //   if (modalHeading === "Add Render Instructions") {
  //     setText(e.target.value);
  //   } else if (modalHeading === "Add CAD Instructions") {
  //     setCadRemark(e.target.value);
  //   } else {
  //     console.warn(`Unhandled modalHeading: ${modalHeading}`);
  //   }
  // };

  const handleInputData = (e) => {
    if (modalHeading === "Add Render Instructions") {
      setRenderRemarkText(e.target.value);
    }
    if (modalHeading === "Add cad Instructions") {
      setCadRemark(e.target.value);
    }
  };

  const handleAddRemark = async () => {
    if (modalHeading === "Add Render Instructions") {
      if (renderRemarkText === ""){
        setError("Add instruction")
        return
      }
    
      await addRenderRemark(
        setIsLoading,
        renderRemarkText,
        setSuccessModalOpen,
        detailsViewFolderName,
        setOpenmodal
      );
    }
    if (modalHeading === "Add cad Instructions") {
      if (cadRemark === ""){
        setError("Add instruction")
        return
      }
        await addCadRemark(
        setIsLoading,
        cadRemark,
        setSuccessModalOpen,
        detailsViewFolderName,
        setOpenmodal
      );
    }
  };

  const pathName = location.pathname;
  const shouldRenderButton = !(
    (pathName.startsWith("/finished/") && /\d+$/.test(pathName)) ||
    (pathName.startsWith("/folderdetails/") && /\d+$/.test(pathName))
  );

  console.log("remarkData",remarkData)
  console.log("modalHeading",modalHeading)

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

        <div className="modal_fields" style={{ marginTop: "15px" }}>
          <div className="inp2_admin">
            <label htmlFor="">
              {modalTitle ? modalTitle : "Write instructions here"}
            </label>
           { modalHeading == "CAD Instructions"  && (
                 <textarea
                 type="text"
                 name="name"
                   value={remarkData || ""}
                readOnly
               />      
           )}
           { modalHeading == "Render Instructions"  && (
                 <textarea
                 type="text"
                 name="name"
                   value={renderData || ""}
                readOnly
               />      
           )}
           { modalHeading == "Add cad Instructions"  ||
             modalHeading == "Add Render Instructions" ? (
            <textarea
                 type="text"
                 name="name"
                 onChange={handleInputData}
               />     
              ) : (
                <div className=""></div>
              )}
            
          </div>
        </div>

        {/* {errors && (
          <span style={{ color: "red", fontSize: "10px" }}>{errors}</span>
        )} */}
        {/* {location.pathname !== "/newscanmodule" &&
          location.pathname !== "/centralhubscan" && ( */}
          {error && (<span style={{fontSize:"12px",color:"red"}}>{error}</span>)}
        <div className="modal_btns">
          {shouldRenderButton && (
            <button
              style={{
                width: "100%",
                background: "#04344D",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
              }}
              onClick={handleAddRemark}
            >
              ADD INSTRUCTION
            </button>
          )}
        </div>
        {/* )} */}
      </Box>
    </Modal>
  );
};

export default InstructionModal;
