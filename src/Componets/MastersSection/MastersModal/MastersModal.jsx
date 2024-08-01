import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./MastersModal.css";
import { IoCloseOutline } from "react-icons/io5";
import upload from "../../../assets/Group.png";
import close from "../../../assets/close.png";
import {
  categoryDataCreate,
  categoryDataUpadate,
  centralStatusDataCreate,
  centralStatusDataUpadate,
  diamondDataCreate,
  diamondDataUpadate,
  finding_data_upadate,
  finding_table_data_create,
  metalDataCreate,
  metalDataUpadate,
  outletDataCreate,
  outletDataUpadate,
  tag_data_upadate,
  tag_table_data_create,
  valueaddDataCreate,
  valueaddDataUpadate,
  whstatusDataCreate,
  whstatusDataUpadate,
} from "../ApiMasters/ApiMasters";
import { useLocation } from "react-router-dom";
import {
  centralHubnewScanProductStatusUpdate,
  newScanProductStatusUpdate,
} from "../../ScanComponentWarehouse/ApiScan/ApiScan";

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

const MastersModal = ({
  setOpen,
  modalHeading,
  btnName,
  modalPage,
  setTableData,
  inputData,
  setInputData,
  setSelectedImage,
  selectedImage,
  status,
  clickedProductIds,
  setScanTableData,
  setSuccessModalOpen,
  setSuccessMessage,
  setClickedProductIds,
  // setSuccessModalOpen,
  // setSuccessMessage
  setIsLoading

}) => {
  const location = useLocation();
  const [errors, setErrors] = useState("");
  const [statusId, setStatusId] = useState("");
  const [cHstatusId, setChStatusId] = useState("");

  const handleClose = () => {
    setOpen(false);
    setInputData({})
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatedata = () => {
    if (location.pathname === "/masterspage/findings") {
      if (!inputData.find_name || !inputData.priority) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          finding_data_upadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          finding_table_data_create(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/tag") {
      if (!inputData.name || !inputData.priority || !selectedImage) {
        setErrors("Please fill missing fields.");
      } else {
        if (inputData.id) {
          const formData = new FormData();
          formData.append("name", inputData.name);
          formData.append("priority", inputData.priority);
          formData.append("image", selectedImage);

          tag_data_upadate(
            formData,
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            selectedImage,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          const formData = new FormData();
          formData.append("name", inputData.name);
          formData.append("priority", inputData.priority);
          formData.append("image", selectedImage);

          tag_table_data_create(
            formData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSelectedImage,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/metal") {
      if (!inputData.metal_name || !inputData.price || !inputData.making_cost) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          metalDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          metalDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/diamond") {
      if (!inputData.name || !inputData.price) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          diamondDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          diamondDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/valueedition") {
      if (
        !inputData.slab_number ||
        !inputData.min_value ||
        !inputData.max_value ||
        !inputData.value
      ) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          valueaddDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          valueaddDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/whstatus") {
      if (!inputData.name || !inputData.order) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          whstatusDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          whstatusDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/chstatus") {
      if (!inputData.name) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          centralStatusDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          centralStatusDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/productcategory") {
      if (!inputData.name) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          categoryDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          categoryDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    } else if (location.pathname === "/masterspage/outlet") {
      if ((!inputData.name, !inputData.place)) {
        setErrors("Please fill in all required fields.");
      } else {
        if (inputData.id) {
          outletDataUpadate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            inputData.id,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        } else {
          outletDataCreate(
            inputData,
            setErrors,
            setTableData,
            handleClose,
            setInputData,
            setSuccessModalOpen,
            setSuccessMessage,
            setIsLoading
          );
        }
      }
    }
  };

  const handleUpdateProductStatus = async () => {
    if (statusId === "") {
      setErrors("Choose a Option");
    }
    try {
      await newScanProductStatusUpdate(
        statusId,
        clickedProductIds,
        setScanTableData,
        setErrors,
        setStatusId,
        setOpen,
        setClickedProductIds,
        setSuccessModalOpen,
        setSuccessMessage
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdateCentralStatus = async () => {
    if (cHstatusId === "") {
      setErrors("Choose a Option");
    }
    try {
      await centralHubnewScanProductStatusUpdate(
        cHstatusId,
        clickedProductIds,
        setScanTableData,
        setErrors,
        setChStatusId,
        setOpen,
        setSuccessModalOpen,
        setSuccessMessage,
        setClickedProductIds
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("clickedProductIds on status", clickedProductIds);
  console.log("satus000", status);
  console.log("statusId", statusId);
  console.log("cHstatusId", cHstatusId);

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
            {location.pathname !== "/newscanmodule" && (
              <button onClick={handleClose}>
                <img className="btn_close" src={close} alt="" srcset="" />
              </button>
            )}
          </div>

          {modalPage === "Findings" && (
            <div className="modal_fields">
              <div className="inp1">
                <label htmlFor="">Findings Name</label>
                <input
                  name="find_name"
                  type="text"
                  value={inputData.find_name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp_2nd">
                <label htmlFor="">Priority</label>
                <input
                  name="priority"
                  type="number"
                  value={inputData.priority || ""}
                  onChange={handleInputData}
                />
              </div>
            </div>
          )}

          {modalPage === "Tags" && (
            <>
              <div className="modal_fields">
                <div className="inp1">
                  <label htmlFor="">Tag Name</label>
                  <input
                    name="name"
                    type="text"
                    value={inputData.name || ""}
                    onChange={handleInputData}
                  />
                </div>
                <div className="inp1 inp_2nd">
                  <label htmlFor="">Priority</label>
                  <input
                    name="priority"
                    type="number"
                    value={inputData.priority || ""}
                    onChange={handleInputData}
                  />
                </div>
              </div>
              <div className="img_div">
                <span>Upload Image</span>
                <div className="image_upload">
                  <label htmlFor="image_upload">
                    Upload Image{" "}
                    <img className="upload_img" src={upload} alt="" srcset="" />
                  </label>
                  <input
                    id="image_upload"
                    type="file"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </div>
              </div>
            </>
          )}

          {modalPage === "Metal" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Metal Name</label>
                <input
                  type="text"
                  name="metal_name"
                  value={inputData.metal_name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  name="price"
                  value={inputData.price || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Making Cost</label>
                <input
                  type="text"
                  name="making_cost"
                  value={inputData.making_cost || ""}
                  onChange={handleInputData}
                />
              </div>
            </>
          )}

          {modalPage === "Diamond" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Diamond Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  name="price"
                  value={inputData.price || ""}
                  onChange={handleInputData}
                />
              </div>
            </>
          )}

          {modalPage === "ValueAddition" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Slab No</label>
                <input
                  type="text"
                  name="slab_number"
                  value={inputData.slab_number || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Min</label>
                <input
                  type="text"
                  name="min_value"
                  value={inputData.min_value || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Max</label>
                <input
                  type="text"
                  name="max_value"
                  value={inputData.max_value || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Value</label>
                <input
                  type="text"
                  name="value"
                  value={inputData.value || ""}
                  onChange={handleInputData}
                />
              </div>
            </>
          )}

          {modalPage === "WHstatus" && (
            <div className="modal_fields">
              <div className="inp1">
                <label htmlFor="">Status Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp_2nd">
                <label htmlFor="">Order</label>
                <input
                  type="number"
                  name="order"
                  value={inputData.order || ""}
                  onChange={handleInputData}
                />
              </div>
            </div>
          )}

          {modalPage === "CHstatus" && (
            <div className="modal_fields">
              <div className="inp1">
                <label htmlFor="">Status Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp_2nd">
                <label htmlFor="">Order</label>
                <input
                  type="number"
                  name="order"
                  value={inputData.order || ""}
                  onChange={handleInputData}
                />
              </div>
            </div>
          )}

          {modalPage === "productCategory" && (
            <div className="inp1 inp3">
              <label htmlFor="">Category Name</label>
              <input
                type="text"
                name="name"
                value={inputData.name || ""}
                onChange={handleInputData}
              />
            </div>
          )}

          {modalPage === "outlets" && (
            <>
              <div className="inp1 inp3">
                <label htmlFor="">Outlet Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name || ""}
                  onChange={handleInputData}
                />
              </div>
              <div className="inp1 inp3">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  name="place"
                  value={inputData.place || ""}
                  onChange={handleInputData}
                />
              </div>
            </>
          )}

          {modalPage === "newscanmodule" && (
            <>
              <div
                className="modal_fields"
                style={{ height: "40px", marginTop: "15px" }}
              >
                <div className="inp1 inp3">
                  <FormControl style={{ height: "40px" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Status
                    </InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={statusId}
                      onChange={(e) => setStatusId(e.target.value)}
                      autoWidth
                      label="Status"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {status.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <button
                  className="scan_update_btn"
                  onClick={handleUpdateProductStatus}
                >
                  Update
                </button>
              </div>
            </>
          )}

          {modalPage === "centralhubscan" && (
            <>
              <div
                className="modal_fields"
                style={{ height: "40px", marginTop: "15px" }}
              >
                <div className="inp1 inp3">
                  <FormControl style={{ height: "40px" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Status
                    </InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={cHstatusId}
                      onChange={(e) => setChStatusId(e.target.value)}
                      autoWidth
                      label="Status"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {status.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <button
                  className="scan_update_btn"
                  onClick={handleUpdateCentralStatus}
                >
                  Update
                </button>
              </div>
            </>
          )}

          {errors && (
            <span style={{ color: "red", fontSize: "10px" }}>{errors}</span>
          )}
          {location.pathname !== "/newscanmodule" &&
            location.pathname !== "/centralhubscan" && (
              <div className="modal_btns">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleCreatedata}>{btnName}</button>
              </div>
            )}

        </Box>
      </Modal>
    </div>
  );
};

export default MastersModal;
