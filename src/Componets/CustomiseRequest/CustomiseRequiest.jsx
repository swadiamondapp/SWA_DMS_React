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
import { customization_details, updateOrderStatus, voters_customization_list } from "../VOTORS PANEL/Api";
import CreateCustomisation from "../CreateCustomisation/CreateCustomisation";
import { useLocation, useNavigate } from "react-router-dom";
import {
  confirm_customization,
  customizaztion_list_wareHouse,
  edit_customizaion_warehouse,
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { apiService } from "../../Pages/Services/ApiInstants";

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
   onConfirmSuccess
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
  const [missingFields, setMissingFields] = useState([]);

  const [successMessage, setSuccessMessage] = useState(
    "Mail Send Success Fully"
  );
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);
const [customization, setCustomization] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const REQUIRED_FIELDS = [
  { key: "salesman", label: "Sales man" },
  { key: "mobile_number", label: "Phone Number" },
  { key: "outlet", label: "Outlet" },
  { key: "customer_name", label: "Customer name" },
  { key: "customer_number", label: "Customer phone number" },
  { key: "product_type", label: "Product type" },
  { key: "metal_type", label: "Metal type" },
 // { key: "weight", label: "Weight" },
 // { key: "budget", label: "Budget" },
 // { key: "due_date", label: "Due date" },
//  { key: "image", label: "At least one image" },
//  { key: "size", label: "Metal Size" },
//  { key: "diamond_weight", label: "Diamond Weight" },
//  { key: "no_of_diamond", label: "Number of Diamonds" },
 // { key: "diamond_clarity", label: "Diamond Clarity" },
//  { key: "diamond_colour", label: "Diamond colour" }, 
//  { key : "received_advance", label : "Recived Advance"},
//  { ke : "metal_type", label : "Metal Type"},
  //{ key: "weight", label: "Weight" },
];
useEffect(() => {
  if (open) {
    setMissingFields([]);
 //   setSendError("");
  }
}, [open]);
const InfoRow = ({ label, value, fieldKey }) => {
  const missing = isMissing(fieldKey);

  const renderValue = () => {
    if (Array.isArray(value)) {
      return value.length ? value : "N/A";
    }

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "null" ||
      value === "undefined"
    ) {
      return "N/A";
    }

    // IMPORTANT: allow 0 / 0.0 to be visible
    return value;
  };

  return (
    <div className={`ProductInformation ${missing ? "missing-field" : ""}`}>
      <span>
        {label}
        {missing && <span className="missing-text"> (Required)</span>}
      </span>
      <span>{renderValue()}</span>
    </div>
  );
};

const isSendDisabled = missingFields.length > 0;
const validateBeforeSend = (data) => {
  const missing = REQUIRED_FIELDS.filter(({ key }) => {
    if (!key) {
      console.error("❌ REQUIRED_FIELDS contains invalid key:", key);
      return true;
    }

    const value = data[key];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "null" ||
      value === "undefined"
    );
    
  });

  if (missing.length > 0) {
    setMissingFields(missing.map(f => f.key));
  

    return false;
  }

  setMissingFields([]);
  return true;
  
};





const isMissing = (fieldKey) => missingFields.includes(fieldKey);

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

//  console.log(customization, "custoooo>>");
 // console.log(userId, "userId================>");
//  console.log(wareHouseuserId, "wareHouseIDD");
//  console.log(CustomizationWareHouseData, "CustomizationWareHouseData");

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
  const updateRequestStatus = async () => {
    try {
      await apiService.patch(
        `customization/${dataToDisplay.id}/update-orderstatus/`,
        { status: "Requested" }
      );
   voters_customization_list(setIsLoading,setData, "", "");
      
    } catch (err) {
      console.error("Status update failed", err);
    }
  };const handleSend = async () => {
  console.log("Handle Send clicked");
//    console.log("Handle Send clicked");

  const finalData = {
    ...customization,
    ...CustomizationWareHouseData,
    metal_type:
      CustomizationWareHouseData?.metal_type?.length
        ? CustomizationWareHouseData.metal_type
        : customization?.metal_type
  };

  console.log("Final metal_type before validation:", finalData.metal_type);

  if (!validateBeforeSend(finalData)) return;

  console.log("Sending to warehouse with data:", finalData);

    await updateRequestStatus();

    // 2️⃣ Refresh list AFTER backend is updated
    refreshList();

    // 3️⃣ Close modal last
    onClose();
  };
   { /*  edit_customizaion_warehouse(
          setIsLoading,
          finalData,  🚨 send ORIGINAL formData to API
          finalData.id,
       () => {
     
      voters_customization_list(setIsLoading, setData);
     },
          setSuccessMessage,
          setSuccessModalOpen,
         finalData.images,
      
         // votersSetData,
       //   customizationFunction
        );*/}
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
const [rejectModalOpen, setRejectModalOpen] = useState(false);
const [rejectReason, setRejectReason] = useState("");
const [reasonError, setReasonError] = useState("");

 const handleRejectSubmit = () => {
{ /* if (!rejectReason.trim()) {
    setReasonError("Rejection reason is required");
    return;
  }*/}

  reject_customization(
    setIsLoading,
    dataById,
    rejectReason,
   () => {
      onClose();
      onConfirmSuccess(); // 🔁 refresh table after confirm
    },
    setSuccessModalOpen,
    setSuccessMessage
  );

  setRejectModalOpen(false);
  setRejectReason("");
};

  const handleConfirm = () => {
    confirm_customization(
      setIsLoading,
      dataById,
       () => {
      onClose();
      onConfirmSuccess(); // 🔁 refresh table after confirm
    },
      setSuccessModalOpen,
      setSuccessMessage,
   
    );
    customizaztion_list_wareHouse(setIsLoading, CustomizationListData, "");
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
 // console.log(dataToDisplay.status, "metalListType");

//  console.log("dataToDisplay---", dataToDisplay);
//  console.log("isLoading---", isLoadingDetail);
const usertype = localStorage.getItem("Usertype");
const status = dataToDisplay.status?.trim();
const wh_status = dataToDisplay.wh_status?.trim();
const canEdit =
  CustomizationWareHouseData &&
  (wh_status === "Received" || wh_status === "MRP Updated") &&
  status !== "Rejected";


const canConfirmReject =
  CustomizationWareHouseData && wh_status === "MRP Updated";

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
              <Typography component="div" id="modal-modal-description" sx={{ mx: 1, pb: 1 }}>
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
                      <InfoRow
                        label="Sales man"
                        value={dataToDisplay.salesman}
                        fieldKey="salesman"
                      />

                        <InfoRow
                        label="Phone Number"
                        value={dataToDisplay.mobile_number}
                        fieldKey="mobile_number"
                      />

                        <InfoRow
                        label="Outlet"
                        value={findOutLetNameByID(Number(dataToDisplay.outlet))}
                        fieldKey="outlet"
                      />

                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Customer Details
                        </span>
                      </div>
                      <div className="subTitle">
                       <InfoRow
                            label="Customer name"
                            value={dataToDisplay.customer_name}
                            fieldKey="customer_name"
                          />

                       <InfoRow
                          label="Customer phone number"
                          value={dataToDisplay.customer_number}
                          fieldKey="customer_number"
                        />

                        <div className="ProductInformation">
                          <span>Email</span>
                          <span>
                            {dataToDisplay.customer_email === "undefined" ||
                            dataToDisplay.customer_email === "null"
                              ? "N/A"
                              : dataToDisplay.customer_email}
                          </span>
                        </div>
                        <InfoRow
                          label="Recived Advance"
                          value={dataToDisplay.received_advance}
                          fieldKey="received_advance"
                        />
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
                     <InfoRow
                          label="Product type"
                          value={productCategoryByID(Number(dataToDisplay.product_type))}
                          fieldKey="product_type"
                        />

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
                       <InfoRow
                          label="Metal Size"
                          value={dataToDisplay.size}
                          fieldKey="size"
                        />

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
                       <InfoRow
                      label="Metal type"
                      value={findMetalNameById(Number(dataToDisplay.metal_type))}
                      fieldKey="metal_type"
                    />

                                        <InfoRow
                      label="Weight"
                      value={dataToDisplay.weight ? `${dataToDisplay.weight} GM` : ""}
                      fieldKey="weight"
                    />

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
                       <InfoRow
                                label="Diamond Weight"
                                value={dataToDisplay.diamond_weight}
                                fieldKey="diamond_weight"
                              />

                              <InfoRow
                                label="Number of Diamonds"
                                value={dataToDisplay.no_of_diamond}
                                fieldKey="no_of_diamond"
                              />

                              <InfoRow
                                label="Diamond Clarity"
                                value={dataToDisplay.diamond_clarity}
                                fieldKey="diamond_clarity"
                              />

                              <InfoRow
                                label="Diamond colour"
                                value={dataToDisplay.diamond_colour}
                                fieldKey="diamond_colour"
                              />

                      </div>
                      <div className="lineCR"></div>
                      <div style={{ marginBottom: "5px" }}>
                        <span className="basic-Details-title">
                          Other details
                        </span>
                      </div>
                      <div className="subTitle-metal">
                       <InfoRow
                      label="Budget"
                      value={dataToDisplay.budget}
                      fieldKey="budget"
                    />

                  <div className="ProductInformation">
                  <span>Actual Price</span>
                  <span className="actual_mrp">
                    {dataToDisplay.actual_price > 0
                      ? Math.floor(dataToDisplay.actual_price)
                      : '-'}
                  </span>
                </div>
                 <InfoRow
                  label="Due Date"
                  value={dataToDisplay.due_date}
                  fieldKey="due_date"
                />
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

      {status === "Rejected"  && <span className="reject_title">Customer Cancelled</span>}

 {canEdit && (
  <button
    onClick={() => handleEditWareHouseDetails(dataToDisplay)}
    className="CR_ButtonCommen editButtonCR"
  >
    Edit <img src={editIcon} alt="" />
  </button>
)}

{canConfirmReject && (
  <div className="cr-action-buttons">
   {/*   <button
      onClick={handleConfirm}
      className="CR_ButtonCommen confirmButtonCR"
    >
      Confirm
    </button>

  <button
      onClick={() => setRejectModalOpen(true)}
      className="CR_ButtonCommen rejectButtonCR"
    >
      Reject
    </button>*/}
  </div>
)}

    </>
  ) : (
    /* ================= NON-WAREHOUSE USER ================= */
    <>
     {status === "Requested" && wh_status === "MRP Updated" && (
        <button
          onClick={() => handleEditWareHouseDetails(dataToDisplay)}
          className="CR_ButtonCommen editButtonCR"
        >
          Edit <img src={editIcon} alt="" />
        </button>
      )}
      { status === "Requested" && wh_status === "Received" && (<span className="timeline_title" >Waiting for Warehouse Updation</span>)}
   
      {status === "Rejected"  && <span className="reject_title">Customer Cancelled</span>}
      {wh_status === "Rejected" && <span className="reject_title">Warehouse Rejected</span>}
      {wh_status === "Completed" && <span className="timeline_title">Completed</span>}
    {status === "Drafted" && (
        <button
          className={`send_wh ${isSendDisabled ? "disabled" : ""}`}
          onClick={handleSend}
          disabled={isSendDisabled}
        >
          Send
        </button>
      )}

         {status === "Confirmed" && <span className="timeline_title">Confirmed</span>}
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
    <Dialog
  open={rejectModalOpen}
  onClose={() => {
    setRejectModalOpen(false);
    setRejectReason("");
    setReasonError("");
  }}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>Reject Customization</DialogTitle>

  <DialogContent>
    <TextField
      autoFocus
      fullWidth
      required
      multiline
      rows={4}
      margin="dense"
      label="Rejection Reason"
      placeholder="Enter rejection reason"
      value={rejectReason}
      onChange={(e) => {
        setRejectReason(e.target.value);
        setReasonError("");
      }}
      error={!!reasonError}
      helperText={reasonError}
    />
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => {
        setRejectModalOpen(false);
        setRejectReason("");
        setReasonError("");
      }}
    >
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={handleRejectSubmit}
    >
      Reject
    </Button>
  </DialogActions>
</Dialog>


    </div>
  );
};

export default CustomiseRequest;
