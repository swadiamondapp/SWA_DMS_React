import React, { useState } from "react";
import "./ProductCustomisation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import { Select } from "antd";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  borderRadius: 2,
};

const ProductCustomisation = () => {
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
          <Button onClick={handleOpen}>Product Customization</Button>
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="headerModal">
                  <span
                    className="assignTitle"
                    style={{ position: "absolute", top: 10, left: 16 }}
                  >
                    Product Customization
                  </span>
                  <button
                    onClick={handleClose}
                    style={{ position: "absolute", top: 15, right: 15,background: 'none',border:"none" }}
                  >
                    <img src={closeButton} />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <div>
                  <form>
                    <div className="container">
                      <div className="">
                        <label htmlFor="" className="label_text">
                          Size
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            {
                              value: "jack",
                              label: "Designer",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "tom",
                              label: "Tom",
                            },
                          ]}
                        />
                      </div>
                      <div className="">
                        <label htmlFor="" className="label_text">
                          Type of Order
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            {
                              value: "jack",
                              label: "Designer",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "tom",
                              label: "Tom",
                            },
                          ]}
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Colour
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            {
                              value: "jack",
                              label: "Designer",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "tom",
                              label: "Tom",
                            },
                          ]}
                        />
                      </div>
                      <div>
                        <button className="CreateOrderButton">
                          Create Order Button
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomisation;
