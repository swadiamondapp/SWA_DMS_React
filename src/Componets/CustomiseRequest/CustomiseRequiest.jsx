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

const CustomiseRequest = ({
  open,
  onClose,
  userId,
  wareHouseuserId,
  CustomizationWareHouseData,
  setData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [customization, setCustomization] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [customization, setCustomization] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [successMessage, setSuccessMessage] = useState(
    "Mail Send Success Fully"
  );
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);

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

  useEffect(() => {
    customization_details(setIsLoading, setCustomization, userId);
  }, [userId]);

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

  const dataToDisplay = CustomizationWareHouseData || customization;
  const dataById = wareHouseuserId || userId;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 480,
    height: wareHouseuserId ? "95%" : "96%",
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

  return (
    <div>
      <div className="">
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
                        style={{ width: "16px", height: "18px" }}
                        src={close}
                        alt=""
                      />
                    </div>
                    <div className="lineCR"></div>
                    <div style={{ marginBottom: "5px" }}>
                      <span className="basic-Details-title">Basic Details</span>
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
                    </div>
                    <div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="imgTitleCR">Images</span>
                      </div>
                      <div className="ringImages">
                        <div className="imageContainer">
                          <img className="" src={dataToDisplay.image} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={dataToDisplay.image2} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={dataToDisplay.image3} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={dataToDisplay.image4} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={dataToDisplay.image5} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="lineCR"></div>
                    <div style={{ marginBottom: "5px" }}>
                      <span className="basic-Details-title">Metal Details</span>
                    </div>
                    <div className="subTitle-metal">
                      <div className="ProductInformation">
                        <span>Metal type</span>
                        <span>
                          {findMetalNameById(Number(dataToDisplay.metal_type))}
                        </span>
                      </div>
                      <div className="ProductInformation">
                        <span>Weight</span>
                        <span>{dataToDisplay.weight} GM</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Size</span>
                        <span>{dataToDisplay.size}</span>
                      </div>
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
                        <span>{dataToDisplay.diamond_weight} CT</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Number of Diamonds</span>
                        <span>{dataToDisplay.no_of_diamond}</span>
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
                      <span className="basic-Details-title">Other details</span>
                    </div>
                    <div className="subTitle-metal">
                      <div className="ProductInformation">
                        <span>Budget</span>
                        <span>{Math.floor(dataToDisplay.budget)}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>SWA Product SKU</span>
                        <span>{dataToDisplay.sku_of_swa_product}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Note</span>
                        <span style={{ wordBreak: "break-word" }}>
                          {dataToDisplay.notes}
                        </span>
                      </div>
                    </div>
                    <div className="lineCR"></div>

                    <div className="crButtonContainer">
                      {CustomizationWareHouseData && (
                        <>
                          <>
                            {/* <button
                                onClick={() => handleConfirm()}
                                className="CR_ButtonCommen confirmButtonCR"
                              >
                                Confirm
                              </button> */}
                            {dataToDisplay.status === "Rejected" ? (
                              <span>Rejected</span>
                            ) : (
                              <button
                                onClick={() => handleReject()}
                                className="CR_ButtonCommen rejectButtonCR"
                              >
                                Reject
                              </button>
                            )}
                          </>
                        </>
                      )}
                      {console.log(
                        "CustomizationWareHouseData.status",
                        dataToDisplay.status
                      )}

                      {dataToDisplay.status !== "Rejected" && (
                        <>
                          {dataToDisplay.status === "Updated" ||
                          dataToDisplay.status === "Confirmed" ? (
                            <span>Already Updated</span>
                          ) : (
                            <button
                              onClick={() =>
                                handleEditWareHouseDetails(dataToDisplay)
                              }
                              className="CR_ButtonCommen editButtonCR"
                            >
                              edit <img src={editIcon} alt="" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
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
