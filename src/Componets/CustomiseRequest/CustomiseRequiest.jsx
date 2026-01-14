/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./CustomiseRequiest.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import roundedClose from "../../assets/roundedClose.png";
import searchIcon from "../../assets/searchIcon.svg";
import RingA from "../../assets/ringa.png";
import RingB from "../../assets/ringb.png";
import RingC from "../../assets/ringc.png";
import close from "../../assets/close.png";
import editIcon from "../../assets/editIcon.svg";
import { customization_details } from "../VOTORS PANEL/Api";
import CreateCustomisation from "../CreateCustomisation/CreateCustomisation";
import { useLocation, useNavigate } from "react-router-dom";
import {
  confirm_customization,
  reject_customization,
} from "../../Pages/WareHousePageView/Api";
import SuccessModal from "../SuccessModal/SuccessModal";
import {
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
} from "../Assignment Panel/Api";
import {
  choose_outlet_drop_down,
  product_type_drop_down,
} from "../ADMIN PANEL/Api_dropDown";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Checkbox } from "antd";
import { CircularProgress } from "@mui/material";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CustomiseRequest = ({
  open,
  onClose,
  userId,
  wareHouseuserId,
  CustomizationWareHouseData,
  setData,
  isLoadingDetail,
  submitMode,
  refreshList,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [customization, setCustomization] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  //const [customization, setCustomization] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [successMessage, setSuccessMessage] = useState(
    "Mail Send Success Fully"
  );
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);
const [customization, setCustomization] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  if (open && userId) {
    customization_details(setIsLoading, setCustomization, userId);
  }
}, [open, userId]);

  const dataToDisplay = CustomizationWareHouseData || customization;
  const dataById = wareHouseuserId || userId;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const imagePreview = (image) => {
    setPreviewImage(image);
    setPreviewOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAssignButton = () => {
    setAssignedButton((prevText) =>
      prevText === "Assign" ? "Unasign" : "Assign"
    );
  };
  const handleCancelButton = () => {
    setOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // useEffect(() => {
  //   if (userId !== undefined || userId !== "") {
  //     customization_details(setIsLoading, setCustomization, userId);
  //   }
  // }, [userId]);

  console.log(customization, "custoooo>>");
  console.log(userId, "userId================>");
  console.log(wareHouseuserId, "wareHouseIDD");
  console.log(CustomizationWareHouseData, "CustomizationWareHouseData");

  // const handleEditWareHouseDetails = () => {
  //   onClose();
  //   setIsCreateCustomizeModalOpen(true);
  // };
  const handleEditWareHouseDetails = (dataToDisplay) => {
    const customizationsku = dataToDisplay.customizationcode;
    localStorage.setItem("wareHouseuserId", wareHouseuserId);
    onClose();

    if (location.pathname === "/votorscustomization") {
      setIsCreateCustomizeModalOpen(true);
    } else {
      navigate("/warehouseDetails", {
        state: {
          warehouseID: wareHouseuserId,
          customizationsku: customizationsku,
        },
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 480,
    // height:600,
    // height: wareHouseuserId ? "95%" : "96%",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 1,
    overflowY: "scroll",
    borderRadius: 1,
    outline: "none",
  };

  const handleReject = () => {
    reject_customization(
      setIsLoading,
      dataById,
      onClose,
      setSuccessModalOpen,
      setSuccessMessage
    );
  };
  const handleConfirm = () => {
    confirm_customization(
      setIsLoading,
      dataById,
      onClose,
      setSuccessModalOpen,
      setSuccessMessage
    );
  };
  useEffect(() => {
    // metal_type_drop_down(setMetalTypeDropDown);
    // product_type_drop_down(setProductTypeDropDown);
    choose_outlet_drop_down(setOutLetDropDown);
    // diamond_colours(setSelectDiamondColor);
    // diamond_clarity_choice(setSelectDiamondClarity);
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    // diamond_type_dropdown_basicDetails(setDiamondType);
    product_category_basicDetails(setListProductCategory);
  }, []);

  const findMetalNameById = (id) => {
    const item = MetalTypeDropDown.find((entry) => entry.id === id);
    return item ? item.metal_name : "Not found";
  };

  const findOutLetNameByID = (id) => {
    const item = outLetDropDown.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };
  const productCategoryByID = (id) => {
    const item = ProudctCategory.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };
  console.log(dataToDisplay.status, "metalListType");

  console.log("dataToDisplay---", dataToDisplay);
  console.log("isLoading---", isLoadingDetail);
const usertype = localStorage.getItem("Usertype");
const status = dataToDisplay.status?.trim();
  return (
    <div>
      <div className="content-modal">
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
              <Typography id="modal-modal-description" sx={{ mx: 1, pb: 1 }}>
                <div>
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress
                        size={50}
                        sx={{
                          color: "black",
                          padding: "8px 10px",
                          width: "35px",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="headerTitle">
                          Customization ID :{dataToDisplay.customizationcode}
                        </span>
                        <img
                          onClick={onClose}
                          style={{
                            width: "16px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                          src={close}
                          alt=""
                        />
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Basic Details
                        </span>
                      </div>
                      <div className="subTitle">
                        <div className="ProductInformation">
                          <span>Sales man</span>
                          <span>{dataToDisplay.salesman}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>Phone Number</span>
                          <span>{dataToDisplay.mobile_number}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>Outlet</span>
                          <span>
                            {findOutLetNameByID(Number(dataToDisplay.outlet))}
                          </span>
                        </div>
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Customer Details
                        </span>
                      </div>
                      <div className="subTitle">
                        <div className="ProductInformation">
                          <span>Customer man</span>
                          <span>{dataToDisplay.customer_name}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>Phone Number</span>
                          <span>{dataToDisplay.customer_number}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>Email</span>
                          <span>
                            {dataToDisplay.customer_email === "undefined" ||
                            dataToDisplay.customer_email === "null"
                              ? "N/A"
                              : dataToDisplay.customer_email}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Recived Advance</span>
                          <span>{dataToDisplay.received_advance}</span>
                        </div>
                        {/* <div className="ProductInformation">
                        <span>Outlet</span>
                        <span>
                          {findOutLetNameByID(Number(dataToDisplay.outlet))}
                        </span>
                      </div> */}
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Product Information
                        </span>
                      </div>
                      <div className="subTitle">
                        <div className="ProductInformation">
                          <span>Product type</span>
                          <span>
                            {productCategoryByID(
                              Number(dataToDisplay.product_type)
                            )}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Model Previously Made</span>
                          <span>{dataToDisplay.previously_made}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>If previously made</span>
                          <span>
                            {dataToDisplay.previously_made &&
                              dataToDisplay.previously_made
                                .charAt(0)
                                .toUpperCase() +
                                dataToDisplay.previously_made.slice(1)}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Metal Size</span>
                          {/* <span>{dataToDisplay.size}</span> */}
                          <span>
                            {dataToDisplay.size === undefined ||
                            dataToDisplay.size === null ||
                            dataToDisplay.size === ""
                              ? "N/A"
                              : dataToDisplay.size}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div style={{ margin: "5px 0px" }}>
                          <span className="imgTitleCR">Images</span>
                        </div>
                        <div className="ringImages">
                          <div
                            className="imageContainer"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={dataToDisplay.image}
                              alt=""
                              onClick={() => imagePreview(dataToDisplay.image)}
                            />
                            {previewImage && (
                              <div className="content-modal2">
                                <Image
                                  preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                      setPreviewOpen(visible),
                                  }}
                                  src={previewImage}
                                  style={{ display: "none" }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="imageContainer">
                            <img
                              src={dataToDisplay.image2}
                              onClick={() => imagePreview(dataToDisplay.image2)}
                              alt=""
                            />
                          </div>
                          <div className="imageContainer">
                            <img
                              src={dataToDisplay.image3}
                              onClick={() => imagePreview(dataToDisplay.image3)}
                              alt=""
                            />
                          </div>
                          <div className="imageContainer">
                            <img
                              src={dataToDisplay.image4}
                              onClick={() => imagePreview(dataToDisplay.image4)}
                              alt=""
                            />
                          </div>
                          <div className="imageContainer">
                            <img
                              src={dataToDisplay.image5}
                              onClick={() => imagePreview(dataToDisplay.image5)}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Metal Details
                        </span>
                      </div>
                      <div className="subTitle-metal">
                        <div className="ProductInformation">
                          <span>Metal type</span>
                          <span>
                            {findMetalNameById(
                              Number(dataToDisplay.metal_type)
                            )}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Weight</span>
                          {/* <span>{dataToDisplay.weight} GM</spa  n> */}
                          <span>
                            {dataToDisplay.weight === undefined ||
                            dataToDisplay.weight === null
                              ? "N/A"
                              : `${dataToDisplay.weight} GM`}
                          </span>
                        </div>
                        {/* <div className="ProductInformation">
                        <span>Size</span>
                        <span>{dataToDisplay.size}</span>
                      </div> */}
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Diamond Details
                        </span>
                      </div>
                      <div className="DiamondType">
                        <div className="ProductInformation">
                          <span>Diamond Weight</span>
                          <span>
                            {dataToDisplay.diamond_weight === undefined ||
                            dataToDisplay.diamond_weight === null
                              ? "N/A"
                              : `${dataToDisplay.diamond_weight} CT`}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Number of Diamonds</span>
                          {/* <span>{dataToDisplay.no_of_diamond}</span> */}
                          <span>
                            {dataToDisplay.no_of_diamond === undefined ||
                            dataToDisplay.no_of_diamond === null
                              ? "N/A"
                              : `${dataToDisplay.no_of_diamond} `}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Diamond Clarity</span>
                          <span>{dataToDisplay.diamond_clarity}</span>
                        </div>
                        <div className="ProductInformation">
                          <span>Diamond colour</span>
                          <span>{dataToDisplay.diamond_colour}</span>
                        </div>
                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Other details
                        </span>
                      </div>
                      <div className="subTitle-metal">
                        <div className="ProductInformation">
                          <span>Budget</span>
                          <span>
                            {dataToDisplay.budget}
                            {/* {dataToDisplay.actual_price === 0
                            ? Math.floor(dataToDisplay.budget)
                            : Math.floor(dataToDisplay.actual_price)} */}
                          </span>
                        </div>
                  <div className="ProductInformation">
                  <span>Actual Price</span>
                  <span className="actual_mrp">
                    {dataToDisplay.actual_price > 0
                      ? Math.floor(dataToDisplay.actual_price)
                      : '-'}
                  </span>
                </div>
                    <div className="ProductInformation">
                          <span>Due Date</span>
                          <span>
                            {dataToDisplay.due_date}
                      
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>SWA Product SKU</span>
                          <span>
                            {dataToDisplay.sku === undefined ||
                            dataToDisplay.sku === null ||
                            dataToDisplay.sku === ""
                              ? "N/A"
                              : `${dataToDisplay.sku}`}
                          </span>
                        </div>
                        <div className="ProductInformation">
                          <span>Note</span>
                          {/* <span style={{ wordBreak: "break-word" }}>
                          {dataToDisplay.notes}
                          </span> */}
                          <span style={{ wordBreak: "break-word" }}>
                            {dataToDisplay.notes === undefined ||
                            dataToDisplay.notes === null ||
                            dataToDisplay.notes === ""
                              ? "N/A"
                              : `${dataToDisplay.notes}`}
                          </span>
                        </div>
                      </div>
                      <div className="lineCR"></div>

                    


<div className="crButtonContainer">
  {/* ================= WAREHOUSE USER ================= */}
  {usertype === "WAREHOUSE" ? (
    <>
      {status === "Confirmed" && <span>Already Updated</span>}

      {status === "Rejected" && <span>Rejected</span>}

      {status === "Requested" && CustomizationWareHouseData && (
        <div className="cr-action-buttons">
          <button
            onClick={() => handleEditWareHouseDetails(dataToDisplay)}
            className="CR_ButtonCommen editButtonCR"
          >
            Edit <img src={editIcon} alt="" />
          </button>

       <button
            onClick={handleConfirm}
            className="CR_ButtonCommen confirmButtonCR"
          >
            Confirm
          </button>

          <button
            onClick={handleReject}
            className="CR_ButtonCommen rejectButtonCR"
          >
            Reject
          </button>
        </div>
      )}
    </>
  ) : (
    /* ================= NON-WAREHOUSE USER ================= */
    <>
      {!["Confirmed", "Rejected"].includes(status) && (
        <button
          onClick={() => handleEditWareHouseDetails(dataToDisplay)}
          className="CR_ButtonCommen editButtonCR"
        >
          Edit <img src={editIcon} alt="" />
        </button>
      )}

      {status === "Confirmed" && <span>Already Updated</span>}
    </>
  )}
</div>

                    </div>
                  )}
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <CreateCustomisation
        open={isModalOpenCreateCutomize}
        onClose={() => setIsCreateCustomizeModalOpen(false)}
        dataToDisplaytomodal={dataToDisplay}
        userId={userId}
        wareHouseuserId={wareHouseuserId}
        setData={setData}
        setCustomization={setCustomization}
        name="editModalOpen"
        customizationFunction={() =>
          customization_details(setIsLoading, setCustomization, userId)
        }
          submitMode={submitMode} 
            refreshList={refreshList}
      />
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        successMessage={successMessage}
      />
    </div>
  );
};

export default CustomiseRequest;
