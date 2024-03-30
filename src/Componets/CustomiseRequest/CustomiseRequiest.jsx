import React, { useState } from "react";
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
import editIcon from '../../assets/editIcon.svg'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "98%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 1,
  overflowY: "scroll",
  borderRadius: 1,
  
};

const CustomiseRequest = () => {
  // create modal

  const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

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

  return (
    <div>
      <div className="">
        <div className="">
          <Button onClick={handleOpen}>CustomiseRequest</Button>
        </div>
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mx: 1, pb: 1 }}>
                <div>
                  <span className="headerTitle">
                    Customization ID : SWA3DR56
                  </span>
                  <div  className="lineCR"></div>
                  <div style={{marginBottom:'5px'}}>

                  <span className="basic-Details-title">Basic Details</span>
                  </div>
                  <div className="subTitle">
                    <div className="ProductInformation">
                      <span>Sales man</span>
                      <span>Muhammed Ajmel</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Phone Number</span>
                      <span>+91 9996567656</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Outlet</span>
                      <span>Malabar jewllery kozhikode</span>
                    </div>
                  </div>
                  <div   className="lineCR"></div>
                  <div style={{marginBottom:'5px'}}>

                  <span className="basic-Details-title">
                    Product Information
                  </span>
                  </div>
                  <div className="subTitle">
                    <div className="ProductInformation">
                      <span>Sales man</span>
                      <span>Muhammed Ajmel</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Phone Number</span>
                      <span>+91 9996567656</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Outlet</span>
                      <span>Malabar jewllery kozhikode</span>
                    </div>
                  </div>
                  <div>
                  <div style={{margin:'5px 0px'}}>
                    <span className="imgTitleCR">Images</span>
                  </div>
                    <div className="ringImages">
                      <div className="imageContainer">
                        <img className="" src={RingA} alt="" />
                      </div>
                      <div className="imageContainer">
                        <img src={RingB} alt="" />
                      </div>
                      <div className="imageContainer">
                        <img src={RingC} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                     className="lineCR"
                  ></div>
                     <div style={{marginBottom:'5px'}}>

                  <span className="basic-Details-title">Metel Details</span>
                     </div>
                  <div className="subTitle-metal">
                    <div className="ProductInformation">
                      <span>Metel type</span>
                      <span>Yellow Gold 18 K</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Weight</span>
                      <span>56.00 GM</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Size</span>
                      <span>5</span>
                    </div>
                  </div>
                  <div
                    className="lineCR"
                  ></div>
                     <div style={{marginBottom:'5px'}}>

                  <span className="basic-Details-title">Diamond Details</span>
                     </div>
                  <div className="DiamondType">
                    <div className="ProductInformation">
                      <span>Diamond Weight</span>
                      <span>56.00 CT</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Number of Diamonds</span>
                      <span>10</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Diamond Clarity</span>
                      <span>Vvs</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Diamond colour</span>
                      <span>EF</span>
                    </div>
                  </div>
                  <div
                  className="lineCR"
                  ></div>
                     <div style={{marginBottom:'5px'}}>

                  <span className="basic-Details-title">Other details</span>
                     </div>
                  <div className="subTitle-metal">
                    <div className="ProductInformation">
                      <span>Budget</span>
                      <span>24000</span>
                    </div>
                    <div className="ProductInformation">
                      <span>SWA Product SKU</span>
                      <span>Nill</span>
                    </div>
                    <div className="ProductInformation">
                      <span>Note</span>
                      <span>
                        Make the design as same as<br/> the referance image
                      </span>
                    </div>
                  </div>
                  <div className="lineCR"></div>
                  
                    <div className="crButtonContainer">
                      <button className="CR_ButtonCommen confirmButtonCR">confirm</button>
                      <button className="CR_ButtonCommen rejectButtonCR">Rejet</button>
                      <button className="CR_ButtonCommen editButtonCR">edit <img src={editIcon} alt="" /></button>
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
