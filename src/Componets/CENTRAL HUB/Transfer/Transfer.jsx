import React, { useState, useEffect } from "react";
import "./Transfer.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SlotCreation from "../../SlotCreation/SlotCreation";
import SlotView from "../../SlotVIew/SlotView";
import {
  centralTransfer,
  list_slot_central_hub,
  slot_view_by_id,
} from "../../../Pages/CENTRAL HUB/Api";
import printIcon from "../../../assets/printIconSlot.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../../assets/closeButton.svg";

const Transfer = () => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [isModalOpenslot, setIsModalOpenslot] = useState(false);
  const [isModalOpenslotview, setIsModalOpenslotview] = useState(false);

  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState([]);
  const [slotView, setSloteView] = useState([]);
  const [printSlotModalOpen, setPrintSlotModalOpen] = useState(false);
  const [TransferData, setTransferData] = useState([]);

  const handlePrintSlotModalClose = () => {
    setPrintSlotModalOpen(false);
  };
  const userlist = [
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
  ];

  const printSlotOpen = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 0,
    overflowY: "auto",
    borderRadius: 0,
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (showEditDelete !== null && !event.target.closest(".parentSlotS")) {
  //       setShowEditDelete(null);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [showEditDelete]);

  const handleEyeButton = (Id) => {
    setIsModalOpenslotview(true);
    setUserId(Id);
    // slot_view_by_id(Id, setSloteView);
  };
  useEffect(() => {
    // list_slot_central_hub(setIsLoading, setData);
    centralTransfer(setIsLoading, setTransferData);
  }, []);

  const handlePrintButton = () => {
    // setPrintSlotModalOpen(true);
  };
  console.log(slotView, "slotView");
  console.log(userId, "slotView");
  console.log(Data, "center==============>");
  console.log(TransferData, "TransferData");
  const sortedData = Data.sort((a, b) => a.id - b.id);
  const sortedTransfer = Data.sort((a, b) => a.id - b.id);
  return (
    <div className="parentCentral">
      <div className="slot_create">
        <button onClick={() => setIsModalOpenslot(true)}>Create</button>
      </div>
      <div className="slote_labe">
        <h3>Slot list</h3>
      </div>
      {/* table */}
      <div className="Users_Table_List">
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ color: "#455173" }}>
              <th>SL NO</th>
              <th>Created on</th>
              <th>Slot ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TransferData.map((item, index) => (
              <tr key={index} style={{ color: "#2E364C" }}>
                <td className="serialNumber_cell">{index + 1}</td>
                <td>{item.created_at}</td>
                <td className="slot_cell">{item.slot.slotnumber}</td>
                <td className="actions-cell">
                  <div className="parentSlotS">
                    <div className="EYEBTN"  style={{display:'flex',alignItems:"center",gap:"15px"}}>
                      <div>

                      <button
                        className="slotPrintButton"
                        onClick={() => handlePrintButton()}
                       
                      >
                        {item.slot.status}
                      </button>
                      </div>
                      {/* <div  className="slotPrintButton">
                      {item.slot.status}
                      </div> */}
                      <div>
                        <IoEye
                          onClick={() => handleEyeButton(item.id)}
                          style={{
                            color: "#455173",
                            cursor: "pointer",
                            margin: "0px 25px",
                            fontSize: "15px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="DOTSBTNS">
                      <BsThreeDotsVertical
                        className="Action_dots"
                        onClick={() =>
                          setShowEditDelete(
                            showEditDelete === index ? null : index
                          )
                        }
                      />
                      {/* {showEditDelete === index && (
                        <div className="Edit_delete_btn_user">
                          <p className="Edit_btn_user">Edit</p>
                          <p className="Delete_btn_user">Delete</p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <Modal open={printSlotModalOpen} onClose={handlePrintSlotModalClose}>
            <Box sx={printSlotOpen}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div
                  className="headerModal"
                  style={{ background: "#F2F2F2", padding: "5px 10px" }}
                >
                  <span className="assignTitle" style={{ fontSize: "15px" }}>
                    Slot List
                  </span>
                  <button
                    className="slotPrintButton"
                    onClick={() => handlePrintButton()}
                  >
                    <img
                      src={printIcon}
                      style={{ marginRight: "5px" }}
                      alt=""
                    />
                    Print
                  </button>
                </div>
              </Typography>

              <Typography>
                <div className="print_slot_modal_container">
                  <div className="Slote_Container">
                    <table class="custom-table single-border">
                      <thead>
                        <tr>
                          <th class="column-header">Product ID</th>
                          <th class="column-header">Created date</th>
                          <th class="column-header">Product Category</th>
                          <th class="column-header">Weight</th>
                        </tr>
                      </thead>
                      <tbody className="tbodyy">
                        {/* {slotView.map((item, index) => (
                          <tr key={index}>
                            <td class="table-cell">{item.slotnumber}</td>
                            <td class="table-cell">{item.created_at}</td>
                            <td class="table-cell">Bangles</td>
                            <td class="table-cell">16 Gram</td>
                          </tr>
                        ))} */}
                        <tr>
                          <td class="table-cell">SWA34R56</td>
                          <td class="table-cell">12-02-23</td>
                          <td class="table-cell">Bangles</td>
                          <td class="table-cell">16 Gram</td>
                        </tr>
                        <tr>
                          <td class="table-cell">SWA34R56</td>
                          <td class="table-cell">12-02-23</td>
                          <td class="table-cell">Bangles</td>
                          <td class="table-cell">16 Gram</td>
                        </tr>
                        <tr>
                          <td class="table-cell">SWA34R56</td>
                          <td class="table-cell">12-02-23</td>
                          <td class="table-cell">Bangles</td>
                          <td class="table-cell">16 Gram</td>
                        </tr>
                        <tr>
                          <td class="table-cell">SWA34R56</td>
                          <td class="table-cell">12-02-23</td>
                          <td class="table-cell">Bangles</td>
                          <td class="table-cell">16 Gram</td>
                        </tr>
                        <tr className="lastrow">
                          <td class="table-cell">SWA34R56</td>
                          <td class="table-cell">12-02-23</td>
                          <td class="table-cell">Bangles</td>
                          <td class="table-cell">16 Gram</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </table>
      </div>
      {/* table */}
      <SlotCreation
        open={isModalOpenslot}
        onClose={() => setIsModalOpenslot(false)}
      />
      <SlotView
        open={isModalOpenslotview}
        onClose={() => setIsModalOpenslotview(false)}
        userId={userId}
        slotView={slotView}
      />
    </div>
  );
};

export default Transfer;
