import { Box, Modal } from "@mui/material";
import React from "react";
import "./MastersModal.css";
import { IoCloseOutline } from "react-icons/io5";
import upload from "../../../assets/Group.png";
import close from "../../../assets/close.png";

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

const MastersModal = ({ setOpen, modalHeading, btnName, modalPage }) => {
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
        <Box sx={style} className="MastersModal">
          <div className="master_modal" onclick={handleClose}>
            <h3>{modalHeading}</h3>
            <button onClick={handleClose}><img className="btn_close" src={close} alt="" srcset="" /></button>
          </div>

          {(modalPage === "Findings" || modalPage === "Tags") && (
            <div className="modal_fields">
              <div className="inp1">
                <label htmlFor="">Findings Name</label>
                <input type="text" />
              </div>
              <div className="inp1 inp_2nd">
                <label htmlFor="">Priority</label>
                <input type="text" />
              </div>
            </div>
          )}

          {modalPage === "Tags" && (
            <div className="img_div">
              <span>Upload Image</span>
              <div className="image_upload">
                <label htmlFor="image_upload">
                  Upload Image{" "}
                  <img className="upload_img" src={upload} alt="" srcset="" />
                </label>
                <input id="image_upload" type="file" />
              </div>
            </div>
          )}

          {modalPage === "Metal" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Metal Name</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Price</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Making Cost</label>
                <input type="text" />
              </div>
            </>
          )}

          {modalPage === "Diamond" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Diamond Name</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Price</label>
                <input type="text" />
              </div>
            </>
          )}

          {modalPage === "ValueAddition" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Slab No</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Min</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Max</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Value</label>
                <input type="text" />
              </div>
            </>
          )}

          {modalPage === "WHstatus" && (
            <div className="modal_fields">
              <div className="inp1">
                <label htmlFor="">Status Name</label>
                <input type="text" />
              </div>
              <div className="inp1 inp_2nd">
                <label htmlFor="">Order</label>
                <input type="text" />
              </div>
            </div>
          )}

          {modalPage === "CHstatus" && (
            <div className="inp1 inp3">
              <label htmlFor="">Status Name</label>
              <input type="text" />
            </div>
          )}

          {modalPage === "productCategory" && (
            <div className="inp1 inp3">
              <label htmlFor="">Category Name</label>
              <input type="text" />
            </div>
          )}

          {modalPage === "outlets" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Outlet Name</label>
                <input type="text" />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Place</label>
                <input type="text" />
              </div>
            </>
          )}

          <div className="modal_btns">
            <button onClick={handleClose}>Cancel</button>
            <button>{btnName}</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MastersModal;
