import React, { useState } from "react";
import "./BasicDetails.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select } from "antd";
import { TagsInput } from "react-tag-input-component";

const style = {
  position: "absolute",

  right: "0px",
  width: 330,
  height: "100%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px 0 0 8px",
  overflowY:'scroll',
  p: 2,
};

const BasicDetailModal = () => {
  // create modal

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState(["papaya"]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button onClick={handleOpen}>BasicDetails modal</Button>
        </div>
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0" }}
          >
            <Box sx={style}>
              <Typography>
                <div className="container">
                  <span className="titleBasic">Basic details</span>
                  <div className="formContainer">
                    <label htmlFor="" className="label-text">
                      SKU
                    </label>
                    <input type="text" className="inputFields" />
                  </div>
                  <div className="gridThree">
                    <div>
                      <label htmlFor="" className="label-text">
                        length
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                    <div>
                      <label htmlFor="" className="label-text">
                        Width
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                    <div>
                      <label htmlFor="" className="label-text">
                        Height
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                  </div>
                  <div className="gridfifty">
                    <div className="select_field">
                      <label htmlFor="" className="label-text">
                        Type of metel
                      </label>
                      <Select
                        showSearch
                        placeholder="Gold"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        // style={{ width: "100%" }}
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
                    <div className="select_field">
                      <label htmlFor="" className="label-text">
                        Diamond Type
                      </label>
                      <Select
                        showSearch
                        placeholder="Diamond Type"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        style={{ width: "100%", }}
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
                  </div>
                  <div className="gridfifty">
                    <div>
                      <label htmlFor="" className="label-text">
                        Approx Diamond weight
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                    <div>
                      <label htmlFor="" className="label-text">
                        Findings
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                  </div>
                  <div className="approxMetel">
                    <div>
                      <label htmlFor="" className="label-text">
                        Approx metel .weight
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                    <div>
                      <label htmlFor="" className="label-text">
                        Approx MRP
                      </label>
                      <input type="text" className="inputFields" />
                    </div>
                    <div className="tagsInputfeild">
                      <label htmlFor="" className="label-text">
                        Tags
                      </label>
                      <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="fruits"
                        placeHolder="enter fruits"
                        classNames='inputTag'
                      />
                    </div>
                  </div>
                  <div className="textArea">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="6"
                      style={{ width: "100%", padding: "0px 6px" }}
                    ></textarea>
                  </div>
                  <div >
                    <button className="next-button">Next</button>
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

export default BasicDetailModal;
