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
import searchimg from "../../../assets/search.png";
import bluesearch from "../../../assets/bluesearch.png";
import SuccessModal from "../../SuccessModal/SuccessModal";

const Transfer = ({ sidebarExpanded }) => {
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
  // const [centralStatus, setCentralStatus] = useState("Created");
  const [CentralHubStatus, setCentralHubStatus] = useState([]);
  const [error, setError] = useState("");
  const [transferStatus, setTransferStatus] = useState("Created");

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
    setTransferScan(event.target.value.toUpperCase());
  };
  const handleTransferScan = () => {
    if (TransferScan === "") {
      setError("Enter slot ID");
    } else {
      scanSloteTransfer(
        setIsLoading,
        TransferScan,
        setSuccessModalOpen,
        setSuccessMessage,
        setTransferData,
        setTransferScan
      );
    }
  };

  // const selectStyle = {
  //   backgroundColor: transferStatus === "Created" ? "green" : "blue",
  //   color: transferStatus === "Created" ? "white" : "#fff",
  // };

  const handleStatusChange = (event, itemId) => {
    const { value } = event.target;
    console.log(value, itemId, "acscas");

    changeCentralHubStatus(itemId, setIsLoading, value, setTransferData);

    setTransferStatus(value);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }

  // const handleTransferStatus = (event) => {
  //   setTransferStatus(event.target.value);
  // };

  console.log(transferStatus, "transferStatus");
  console.log(CentralHubStatus, "CentralHubStatus");
  return (
    <div
      className="parentCentral"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="slote_labe" style={{ border: "none" }}>
        <div style={{ display: "flex" }}>
          {/* <form action=""> */}
          <div
            className="scantable_main_search"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="Search_User">
              <input
                className="searchblue_border"
                type="text"
                name="slot_id"
                placeholder="Search"
              />
              <img className="searchblue" src={bluesearch} alt="" />
            </div>
            {/* {error && (
            <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
          )} */}

            <div className="secton_search">
              <div className="Search_User">
                <input
                  type="text"
                  name="slot_id"
                  placeholder="Scan Product ID"
                  value={TransferScan}
                  onChange={handleScanChange}
                />
                <img onClick={handleTransferScan} src={searchimg} alt="" />
              </div>
              {error && (
                <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
              )}
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
      {/* table */}
      <div className="">
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ color: "#455173" }}>
              <th>SL NO</th>
              <th className="created_date">Created onnn</th>
              <th style={{ width: "25%" }}>Product ID</th>
              <th style={{}}>Product Category</th>
              <th>Weight</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TransferData.map((item, index) => (
              <tr key={index} style={{ color: "#2E364C" }}>
                <td className="serialNumber_cell">{index + 1}</td>
 <td style={{ width: "25%" }}>{formatDate(item.created_at)}</td>
                <td className="slot_cell">{item.finisheditem.designcode}</td>
                <td className="slot_cell">{item.finisheditem.designcode}</td>
                <td className="slot_cell">{item.finisheditem.designcode}</td>
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
                          value={item.status}
                          onChange={(event) =>
                            handleStatusChange(event, item.id)
                          }
                          style={{
                            backgroundColor:
                              item.status === "Created" ? "#23A064" : "#0464D5",
                            color: item.status === "Created" ? "white" : "#fff",
                          }}
                        >
 <option value="Created">Created</option>
                          <option value="Transfered">Transfered</option>
                        </select>
                      </div>

                      {/* <div>
                        <IoEye
                          onClick={() => handleEyeButton(item.id)}
                          style={{
                            color: "#455173",
                            cursor: "pointer",
                            margin: "0px 25px",
                            fontSize: "15px",
                          }}
                        />
                      </div> */}
                    </div>
                    {/* <div className="DOTSBTNS">
                      <BsThreeDotsVertical
                        className="Action_dots"
                        onClick={() =>
                          setShowEditDelete(
                            showEditDelete === index ? null : index
                          )
                        }
                      />
                    </div> */}
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
                    <table class="">
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
