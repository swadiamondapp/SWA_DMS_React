import React, { useState } from "react";
import "./SlotCreation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import roundedClose from "../../assets/roundedClose.png";
import searchIcon from "../../assets/search.png";
import delteIcon from "../../assets/delete_icon_sc.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0.5,
  // overflowY: "auto",
  borderRadius: 2,
};

const data = [
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 20,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 25,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 30,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 35,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 40,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 45,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 50,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 55,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 55,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 55,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 55,
    productCategory: "Bangles",
  },
  {
    id: "SWA34R56",
    createdDate: "12/02/23",

    weight: 55,
    productCategory: "Bangles",
  },
];

const SlotCreation = ({ open, onClose }) => {
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => onClose();

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
        {/* <div className="">
          <Button onClick={handleOpen}>Slot Creation</Button>
        </div> */}
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
            <div>
              <button onClick={()=>handleClose()} className="overLayButton_sc">
                <img src={roundedClose} />
                CLOSE
              </button>
              <Box sx={style}>
                <div className="wrapper">
                  <div className="leftTable">
                    <div className="header_slotCreation_left">
                      <div>
                        <span className="left_header_title_sc">
                          Create Slot
                        </span>
                      </div>
                      <div className="searchContiainer">
                        <div className="Search_Userr">
                          <input type="text" placeholder="Search User" />
                          <div className="iconBack">
                            <img src={searchIcon} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table_left_data_container">
                      <div className="table-container-left">
                        <table className="supermarket-table">
                          <thead>
                            <tr>
                              <th className="table-header">
                                <div className="checkbox_container">
                                  <input
                                    type="checkbox"
                                    className="center-input"
                                  />
                                  <span>Product ID</span>
                                </div>
                              </th>
                              <th className="table-header">Created Date</th>
                              <th className="table-header">Product Category</th>
                              <th className="table-header weight_header-left">
                                Weight
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.id}>
                                <td className="table-data">{item.id}</td>
                                <td className="table-data">
                                  {item.createdDate}
                                </td>
                                <td className="table-data">
                                  {item.productCategory}
                                </td>
                                <td className="table-data">
                                  <div className="right-data-and-button-c">
                                    <span>{item.weight}</span>
                                    <button className="add_button_sc">
                                      ADD TO SLOT
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="rightTable">
                    <div className="right-header-sc">
                      <div className="headers-left-content">
                        <span className="left_header_title_sc">Slot</span>
                        <span className="right-span-text">
                          slot Number :{" "}
                          <span className="right-span-number-text">
                            5646DE4
                          </span>
                        </span>
                      </div>
                      <div className="header-right-side-button">
                        <button className="create_bag_button">
                          Create Bag
                        </button>
                      </div>
                    </div>
                    <div className="table-righ-container-sc">
                      <div className="table-container-right">
                        <table className="supermarket-table">
                          <thead>
                            <tr>
                              <th className="table-header">Product ID</th>
                              <th className="table-header">Created Date</th>
                              <th className="table-header">Product Category</th>
                              <th className="table-header weight_header-right">
                                Weight
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.id}>
                                <td className="table-data">{item.id}</td>
                                <td className="table-data">
                                  {item.createdDate}
                                </td>
                                <td className="table-data">
                                  {item.productCategory}
                                </td>
                                <td className="table-data">
                                  <div className="right-data-and-button-c">
                                    <span>{item.weight}</span>
                                    <button className="Delete_button_sc">
                                      <img src={delteIcon} alt="" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SlotCreation;
