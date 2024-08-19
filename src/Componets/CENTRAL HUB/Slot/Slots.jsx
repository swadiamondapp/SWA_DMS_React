  import React, { useState, useEffect,useRef } from "react";
  import "./Slot.css";
  import { IoEye } from "react-icons/io5";
  import { BsThreeDotsVertical } from "react-icons/bs";
  import SlotCreation from "../../SlotCreation/SlotCreation";
  import SlotView from "../../SlotVIew/SlotView";
  import {
    generateSloteNumber,
    list_slot_central_hub,
    slot_view_by_id,
  } from "../../../Pages/CENTRAL HUB/Api";
  import printIcon from "../../../assets/printIconSlot.png";
  import Box from "@mui/material/Box";
  import Button from "@mui/material/Button";
  import Typography from "@mui/material/Typography";
  import Modal from "@mui/material/Modal";
  import closeButton from "../../../assets/closeButton.svg";
  import ReactToPrint, { useReactToPrint } from "react-to-print";
  import { LuPrinter } from "react-icons/lu";
  import SlotePrint from "./SlotePrint";

  const Slots = ({sidebarExpanded}) => {
    const [showEditDelete, setShowEditDelete] = useState(null);
    const [isModalOpenslot, setIsModalOpenslot] = useState(false);
    const [isModalOpenslotview, setIsModalOpenslotview] = useState(false);
    const [generatSloteNum, setGeneratSloteNum] = useState([]);

    const [Data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState([]);
    const [slotView, setSloteView] = useState([]);
    const [printSlotModalOpen, setPrintSlotModalOpen] = useState(false);

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

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (showEditDelete !== null && !event.target.closest(".parentSlotS")) {
          setShowEditDelete(null);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [showEditDelete]);

    const handleEyeButton = (Id) => {
      setIsModalOpenslotview(true);
      setUserId(Id);
      slot_view_by_id(Id, setSloteView);
    };
    useEffect(() => {
      list_slot_central_hub(setIsLoading, setData);
    }, []);

    const handlePrintButton = (Id) => {
      setPrintSlotModalOpen(true);
      setUserId(Id);
      slot_view_by_id(Id, setSloteView);
    };

    const handleCreateSloteButton =() => {
      setIsModalOpenslot(true);
      generateSloteNumber(setIsLoading, setGeneratSloteNum);
    };

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
    
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    
      return { formattedDate, formattedTime };
    };
    
  

    console.log(generatSloteNum, "generateSloteNumber");
    console.log(slotView, "slotView");
    console.log(userId, "slotView");
    console.log(Data, "center==============>");

    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: printRef.current,
    });
    // const sortedData = Data.sort((a, b) => a.id - b.id);
    // console.log(sortedData, "sortedData");
    return (
      <div className="parentCentral"  style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
        <div className="slot_create">
          <button onClick={() => handleCreateSloteButton()}>Create</button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index) =>{
                const { formattedDate, formattedTime } = formatDate(item.updated_at);
                return (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td className="serialNumber_cell">{index +1}</td>
                  <td>{`${formattedDate} ${formattedTime}`}</td>
                <td className="slot_cell">{item.slotnumber}</td>
                <td className="actions-cell">
                  <div className="parentSlotS">
                    <div className="EYEBTN">
                      <button
                        className="slotPrintButton"
                        onClick={() => handlePrintButton(item.id)}
                      >
                         <LuPrinter  style={{ marginRight: "5px" }} />
                          {/* <img
                            src={printIcon}
                            style={{ marginRight: "5px" }}
                            alt=""
                          /> */}
                        Print
                      </button>
                      <IoEye
                        onClick={() => handleEyeButton(item.id)}
                        style={{
                          color: "#455173",
                          cursor: "pointer",
                          margin: "0px 25px",
                        }}
                      />
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
                      {showEditDelete === index && (
                        <div className="Edit_delete_btn_user">
                          <p className="Edit_btn_user">Edit</p>
                          <p className="Delete_btn_user">Delete</p>
                        </div>
                      )}
                    </div> */}
                  </div>
                </td>
              </tr>
            )})}
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
                  {/* <button
                    className="slotPrintButton"
                    onClick={() => handlePrintButton()}
                  >
                    <img
                      src={printIcon}
                      style={{ marginRight: "5px" }}
                      alt=""
                    />
                    Print
                  </button> */}
                  <ReactToPrint
                      trigger={() => (
                        <div
                          className="slotPrintButton"
                          onClick={handlePrint}
                               style={{cursor:"pointer"}}
                        >
                          <LuPrinter /> Print
                        </div>
                      )}
                      content={() => printRef.current}
                    />
                    <div style={{display:'none'}}>
                      <SlotePrint                        
                        ref={printRef}
                        slotView={slotView}
                      />
                    </div>


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
                        {slotView.map((item, index) =>
                          item.caddesigns.map((design, designIndex) => (
                            <tr key={`${index}-${designIndex}`}>
                              <td className="table-cell">
                                {design.designcode}
                              </td>
                              <td className="table-cell">
                                {design.created_at}
                              </td>
                              <td className="table-cell">
                                {design.product_category.join(", ")}
                              </td>
                              <td className="table-cell">
                                {design.approx_metal_weight} Gram
                              </td>
                            </tr>
                          ))
                        )}
                        {/* <tr>
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
                        </tr> */}
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
        generatSloteNum={generatSloteNum}
        slotListUpdate={()=>  list_slot_central_hub(setIsLoading, setData)}
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

export default Slots;
