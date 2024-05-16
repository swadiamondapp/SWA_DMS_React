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
import editIcon from "../../assets/editIcon.svg";
import { customization_details } from "../VOTORS PANEL/Api";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  height: "98%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 1,
  overflowY: "scroll",
  borderRadius: 1,
  outline: "none",
};

const CustomiseRequest = ({ open, onClose, userId }) => {
  // const [customization, setCustomization] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [customization, setCustomization] = useState([]);

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
                    <span className="headerTitle">
                      Customization ID :{customization.customizationcode}
                    </span>
                    <div className="lineCR"></div>
                    <div style={{ marginBottom: "5px" }}>
                      <span className="basic-Details-title">Basic Details</span>
                    </div>
                    <div className="subTitle">
                      <div className="ProductInformation">
                        <span>Sales man</span>
                        <span>{customization.salesman}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Phone Number</span>
                        <span>{customization.mobile_number}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Outlet</span>
                        <span>{customization.outlet}</span>
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
                        <span>{customization.product_type}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Model Previously Made</span>
                        <span>{customization.previously_made}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>If previously made</span>
                        <span>{customization.outlet}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ margin: "5px 0px" }}>
                        <span className="imgTitleCR">Images</span>
                      </div>
                      <div className="ringImages">
                        <div className="imageContainer">
                          <img className="" src={customization.image} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={customization.image2} alt="" />
                        </div>
                        <div className="imageContainer">
                          <img src={customization.image3} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="lineCR"></div>
                    <div style={{ marginBottom: "5px" }}>
                      <span className="basic-Details-title">Metel Details</span>
                    </div>
                    <div className="subTitle-metal">
                      <div className="ProductInformation">
                        <span>Metel type</span>
                        <span>{customization.metal_type}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Weight</span>
                        <span>{customization.weight}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Size</span>
                        <span>{customization.size}</span>
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
                        <span>{customization.diamond_weight}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Number of Diamonds</span>
                        <span>{customization.no_of_diamond}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Diamond Clarity</span>
                        <span>{customization.diamond_clarity}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Diamond colour</span>
                        <span>{customization.diamond_colour}</span>
                      </div>
                    </div>
                    <div className="lineCR"></div>
                    <div style={{ marginBottom: "5px" }}>
                      <span className="basic-Details-title">Other details</span>
                    </div>
                    <div className="subTitle-metal">
                      <div className="ProductInformation">
                        <span>Budget</span>
                        <span>{customization.budget}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>SWA Product SKU</span>
                        <span>{customization.sku_of_swa_product}</span>
                      </div>
                      <div className="ProductInformation">
                        <span>Note</span>
                        <span>{customization.notes}</span>
                      </div>
                    </div>
                    <div className="lineCR"></div>

                    <div className="crButtonContainer">
                      {/* <button className="CR_ButtonCommen confirmButtonCR">
                          confirm
                        </button>
                        <button className="CR_ButtonCommen rejectButtonCR">
                          Rejet
                        </button> */}
                      <button className="CR_ButtonCommen editButtonCR">
                        edit <img src={editIcon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CustomiseRequest;
