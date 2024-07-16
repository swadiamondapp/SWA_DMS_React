import React, { useState, useEffect } from "react";
import "./Transfer.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SlotCreation from "../../SlotCreation/SlotCreation";
import SlotView from "../../SlotVIew/SlotView";
import {
  centralTransfer,
  changeCentralHubStatus,
  listCentralHubStatus,
  list_slot_central_hub,
  scanSloteTransfer,
  slot_view_by_id,
} from "../../../Pages/CENTRAL HUB/Api";
import printIcon from "../../../assets/printIconSlot.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../../assets/closeButton.svg";
import searchIcon from "../../../assets/search.png";
import SuccessModal from "../../SuccessModal/SuccessModal";

const Transfer = ({sidebarExpanded}) => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [isModalOpenslot, setIsModalOpenslot] = useState(false);
  const [isModalOpenslotview, setIsModalOpenslotview] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState([]);
  const [slotView, setSloteView] = useState([]);
  const [printSlotModalOpen, setPrintSlotModalOpen] = useState(false);
  const [TransferData, setTransferData] = useState([]);
  const [TransferScan, setTransferScan] = useState("");
  const [centralStatus, setCentralStatus] = useState("Created");
  const [CentralHubStatus, setCentralHubStatus] = useState([]);

  const handlePrintSlotModalClose = () => {
    setPrintSlotModalOpen(false);
  };

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

  const handleEyeButton = (Id) => {
    setIsModalOpenslotview(true);
    setUserId(Id);
    slot_view_by_id(Id, setSloteView);
  };
  useEffect(() => {
    centralTransfer(setIsLoading, setTransferData);
    listCentralHubStatus(setIsLoading, setCentralHubStatus);
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

  const handleScanChange = (event) => {
    setTransferScan(event.target.value);
  };
  const handleTransferScan = () => {
    scanSloteTransfer(
      setIsLoading,
      TransferScan,
      setSuccessModalOpen,
      setSuccessMessage,
      setTransferData
    );
  };

  const selectStyle = {
    backgroundColor: centralStatus === "Created" ? "green" : "blue",
    color: centralStatus === "Created" ? "white" : "#fff",
  };
  const handleStatusChange = (event, itemId) => {
    const { value } = event.target;
    console.log(value, itemId, "acscas");
    changeCentralHubStatus(itemId, setIsLoading, value);

    // Update TransferData state based on itemId
    setTransferData((prevTransferData) =>
      prevTransferData.map((item) =>
        item.id === itemId ? { ...item, status: value } : item
      )
    );

    // Call changeCentralHubStatus with appropriate parameters
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }
  console.log(TransferData, "TransferScan");
  console.log(CentralHubStatus, "CentralHubStatus");
  return (
    <div className="parentCentral"  style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
      <div className="slote_labe" style={{ border: "none" }}>
        <div style={{ display: "flex" }}>
          <form action="">
            <div className="searchContiainer">
              <div className="Search_Userr transferSearchIcon">
                <input
                  type="text"
                  placeholder="Scan Product ID"
                  className="transferSearch"
                  value={TransferScan}
                  onChange={(event) => handleScanChange(event)}
                />
                <div
                  className="iconBack searchIconTransfer"
                  onClick={() => handleTransferScan()}
                >
                  <img src={searchIcon} alt="" />
                </div>
              </div>
            </div>
          </form>
        </div>
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
                <td>{formatDate(item.created_at)}</td>
                <td className="slot_cell">{item.slot.slotnumber}</td>
                <td className="actions-cell">
                  <div className="parentSlotS">
                    <div
                      className="EYEBTN"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <select
                          className="scan_select_Central"
                          name="centralStatus"
                          id="centralHubStatus"
                          value={item.status} // Assuming item.status holds the status value
                          onChange={(e) => handleStatusChange(e, item.id)} // Pass item.id to handleStatusChange
                          style={selectStyle}
                        >
                          {CentralHubStatus.map((option) => (
                            <option className="custom-option" style={{margin:'10px'}} key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

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
      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
    </div>
  );
};

export default Transfer;
