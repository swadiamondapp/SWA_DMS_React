import React, { useEffect, useState } from "react";
import "./SlotView.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import roundedClose from "../../assets/roundedClose.png";
import { Select } from "antd";
import plusICon from "../../assets/plusIcon.png";
import { slot_view_by_id } from "../../Pages/CENTRAL HUB/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.transparent",
  border: "none",
  boxShadow: "none",
  p: 0,
  overflowY: "auto",
  borderRadius: 0,
  
};

const SlotView = ({ open, onClose, userId, slotView }) => {
  // const [slotView,setSloteView] = useState([])
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [slotDetailsById,setSlotDetialsById] = useState([])

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

  console.log(slotView, "slotViewModal");

  // useEffect(()=> {
  //   slot_view_by_id(setIsLoading,userId,setSloteView)
  // },[])

  return (
    <div>
      <div className="">
        {/* <div className="">
          <Button onClick={handleOpen}>Slot View</Button>
        </div> */}
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <div>
              <Box sx={style}>
                <button
                  onClick={() => handleClose()}
                  className="overLayButton_cht"
                >
                  <img src={roundedClose} />
                  CLOSE
                </button>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <div
                    className="headerModal"
                    style={{ background: "#F2F2F2", padding: "0px 15px" }}
                  >
                    <span className="assignTitle">Slot List</span>
                  </div>
                </Typography>

                <Typography id="modal-modal-description">
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
                              <td className="print-table-cell">
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
                </Typography>
              </Box>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SlotView;
