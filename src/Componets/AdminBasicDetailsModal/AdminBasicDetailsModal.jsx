import React, { useEffect, useState } from "react";
import "./AdminBasicDetailsModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, Space } from "antd";
import { TagsInput } from "react-tag-input-component";
import Joi from "joi";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import EyeIcons from "../../assets/bmEye.png";
import DeleteICon from "../../assets/imageDelete.png";
import SuccessTickk from "../../assets/tickad.png";
import {
  diamond_type_dropdown_basicDetails,
  findings_List_basicDetails,
  metal_type_dropdown_basicDetails,
  move_to_folder,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";

const style = {
  position: "absolute",

  right: "0px",
  width: 330,
  height: "100%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px 0 0 8px",
  overflowY: "none",
  p: 2,
};
const BasicEye = {
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
  p: 4,
};

const AdminBasicDetailsModal = ({
  AdminBasicModalOpen,
  setAdminBasicModalOpen,
  onClose,
  selectedAssignment,
  setAssignmentFolder,
  setSelectedAssignment,
  getSelectedDesign,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("image",uploadedImage)

  const handleImageRemove = () => {
    setUploadedImage(null);
  };
  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={AdminBasicModalOpen}
            // onClose={handleClose}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0" }}
          >
            <Box sx={style}>
              <Typography>
                <div className="adminBasicModal_container">
                  <div className="numbers_container">
                    <div className="Container1">
                      <div className="parant1">
                        <div className="numberPro" style={{border:uploadedImage? "none":"1px solid #23A064"}}>
                          {uploadedImage ? (
                            <img
                              style={{ width: "25px" }}
                              src={SuccessTickk}
                              alt=""
                            />
                          ) : (
                            <p style={{display:uploadedImage? "none": "block"}}>1</p>
                          )}
                        </div>
                        <div className="line1"></div>
                      </div>
                      <div className="headerTExt">Upload File</div>
                    </div>
                    <div className="Container2">
                      <div className="parant1">
                        <div className="numberPro2" style={{border:uploadedImage ? "1px solid #23A064" : "1px solid #B4C3D0" }}>
                          <p>2</p>
                        </div>
                        <div className="line2"></div>
                      </div>
                      <div className="headerTExt">Add basic details</div>
                    </div>
                    <div className="Container3">
                      <div className="parant1">
                        <div className="numberPro3">
                          <p>3</p>
                        </div>
                        {/* <div className="line1"></div> */}
                      </div>
                      <div className="headerTExt">Assign designer</div>
                    </div>
                  </div>
                  <div className="title_upload_container">
                    <p>Upload File</p>
                    <div className="upload_admin_image">
                      {uploadedImage ? (
                        <div className="image_contianer_upload">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            style={{ width: "80%", marginBottom: "10px" }}
                          />
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {uploadedFileName}
                              <button
                                className="delete_uploaded_image"
                                onClick={handleImageRemove}
                              >
                                <img src={DeleteICon} alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <div>
                            <p>PNG/JPEG</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                            id="upload-input"
                          />
                          <div className="dragText">
                            Drag & Drop or{" "}
                            <label
                              htmlFor="upload-input"
                              style={{
                                color: "#0464D5",
                                fontSize: "13px",
                                padding: "0px 5px",
                              }}
                            >
                              choose File
                            </label>
                            to upload{" "}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      bottom: "25px",
                    }}
                  >
                    <button
                      className="next-button"
                      type="submit"
                      // onClick={() => handleNextClick()}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <AssignmentModal
      // open={showAssignmentModal}
      // formData={formData}
      // onClose={() => setShowAssignmentModal(false)}
      // selectedAssignment={selectedAssignment}
      // setAssignmentFolder={setAssignmentFolder}
      // setSelectedAssignment={setSelectedAssignment}
      // setFormData={setFormData}
      // findingsNames={findingsNames}
      // selectedFechedTagsId={selectedFechedTagsId}
      />
    </div>
  );
};

export default AdminBasicDetailsModal;
