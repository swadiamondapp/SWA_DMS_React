import React, { useEffect, useState } from "react";
import "./SlotCreation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import roundedClose from "../../assets/roundedClose.png";
import searchIcon from "../../assets/search.png";
import delteIcon from "../../assets/delete_icon_sc.svg";
import {
  createSloteBag,
  listAvailableCadDesigns,
  searchCentralHubSlot,
} from "./Api";
import SuccessModal from "../SuccessModal/SuccessModal";

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
  borderRadius: 2,
};

const SlotCreation = ({ open, onClose, generatSloteNum ,slotListUpdate}) => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sloteCreationId, setSloteCreationId] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedSlotId, setGeneratedSlotId] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [searchCentralItem, setSearchCentralItem] = useState("");

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (
        prevSelectedItems.some((selectedItem) => selectedItem.id === item.id)
      ) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedItems(newSelectAll ? Data : []);
  };

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

  useEffect(() => {
    listAvailableCadDesigns(setIsLoading, setData);
  }, []);
  
  console.log(Data, "setData");
  console.log(selectedItems, "selectedItems");

  const handleDeleteItem = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const selectedIds = selectedItems.map((item) => item.id);
  const genSlotId = generatSloteNum && generatSloteNum?.slotnumber;
  const handleCreateSlot = () => {
    if (selectedItems.length === 0) {
      setErrorMessage("No items In the Bag");
      setTimeout(() => {
        setErrorMessage("");
      }, 1600);
 
      return;
    }
    createSloteBag(
      setIsLoading,
      selectedIds,
      setSuccessMessage,
      setSuccessModalOpen,
      genSlotId,
      onClose,
      setData,
      setSelectedItems,
      slotListUpdate
    );
  };

const handleCentralHubSearch =(e)=> {
    setSearchCentralItem(e.target.value.toLocaleUpperCase())
  }
useEffect(()=> {
  searchCentralHubSlot(setIsLoading, setData,searchCentralItem)
},[searchCentralItem])

  // console.log(selectedIds, "dataToSend");
  console.log(selectedIds, "selectedIds");
  console.log(generatSloteNum, "generatSloteNum");
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
            <div>
              <button
                onClick={() => handleClose()}
                className="overLayButton_sc"
              >
                <img src={roundedClose} />
                CLOSE
              </button>
              <Box sx={style}>
                <div className="wrapper">
                  <div className="leftTable">
                    <span className="left_header_title_sc_left">
                      Create Bag
                    </span>
                    <div className="header_slotCreation_left">
                      <div>
                        {/* <button className="add_button_sc">ADD TO SLOT</button> */}
                      </div>
                      <div className="searchContiainer">
                        <div className="Search_Userr">
<input type="text" placeholder="Search"
                          value={searchCentralItem}
                           onChange={handleCentralHubSearch}/>
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
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                  />
                                  <span>Product ID</span>
                                </div>
                              </th>
                              <th className="table-header">Created Date</th>
                              <th className="table_productCat">
                                Product Category
                              </th>
                              <th
                                className="table_weight"
                                style={{ width: "20%" }}
                              >
                                Weight
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Data.map((item) => (
                              <tr key={item.id}>
                                <td className="table-data">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: "5px",
                                      padding: "8px 0px",
                                    }}
                                  >
                                    <div>
                                      <input
                                        type="checkbox"
                                        className="select_input_sc"
                                        checked={selectedItems.some(
                                          (selectedItem) =>
                                            selectedItem.id === item.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(item)
                                        }
                                      />
                                    </div>
                                    <div>{item.designcode}</div>
                                  </div>
                                </td>
                                <td className="table-data">
                                  {item.created_at}
                                </td>
                                <td className="table-data">
                                  {item.product_category}
                                </td>
                                <td className="table-data">
                                  <div className="right-data-and-button-c">
                                    <span>
                                      {item.approx_metal_weight}{" "}
                                      <span className="gramstyle">Gram</span>
                                    </span>
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
                            {generatSloteNum && generatSloteNum?.slotnumber}
                          </span>
                        </span>
                      </div>
                      <div
                        className="header-right-side-button"
                        style={{ position: "relative" }}
                      >
                        <button
                          className="create_bag_button"
                          onClick={() => handleCreateSlot()}
                        >
                          Create Slot
                        </button>
                        <div style={{ position: "absolute", bottom: "-20px" }}>
                          {ErrorMessage && (
                            <p style={{ color: "red" }}>{ErrorMessage}</p>
                          )}
                        </div>
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
                            {selectedItems.map((item) => (
                              <tr key={item.id}>
<td className="table-data">{item.designcode}</td>
                                <td className="table-data">
                                  {item.created_at}
                                </td>
                                <td className="table-data">{item.product_category}</td>
                                <td className="table-data">
                                  <div className="right-data-and-button-c">
                                    <span>{item.approx_metal_weight} Gram</span>
                                    <button
                                      className="Delete_button_sc"
                                      onClick={() => handleDeleteItem(item)}
                                    >
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
        <SuccessModal
          successModalOpen={successModalOpen}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default SlotCreation;
