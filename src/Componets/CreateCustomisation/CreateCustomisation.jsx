import React, { useState } from "react";
import "./CreateCustomisation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import avatar from "../../assets/avataprofile.png";
import { message, Upload,Select } from "antd";
import { BsCloudUpload } from "react-icons/bs";


    
    


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "95%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  borderRadius: 2,
};


const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const CreateCustomisation = () => {
  
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
          <Button onClick={handleOpen}>Create Customisation</Button>
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
                    Swa Diamonds Product
                    <br /> Customization
                  </span>
                  <button
                    onClick={handleClose}
                    style={{ position: "absolute", top: 15, right: 15,background: 'none',border:"none" }}
                  >
                    <img src={closeButton} />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 10 }}>
                <div>
                  <form>
                    <div className="FormContainer">
                      <div>
                        <label htmlFor="" className="label_text">
                          Sales man
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Mobile Number
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div className="selectFeild">
                        <label htmlFor="" className="label_text">
                          Choose Outlet
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
                          Product Type
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
                      </div>{" "}
                      <div>
                        <label htmlFor="" className="label_text">
                          Model previously made
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
                          If previously made please enter the SKU
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div className="uploadImageContainer">
                        <div className="leftI">
                          <span className="imgUpText">Image Upload</span>
                          <span className="imgDText">
                            you can upload 3 files max
                          </span>
                        </div>
                        <div className="rightw">
                          <button className="uploadButton">Upload{" "} <BsCloudUpload /> </button>
                        </div>
                      </div>
                      <div className="select_fleild">
                        <label htmlFor="" className="label_text">
                          Model previously made
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
                          Weight ( grams )
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Size
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Diamond weight ( ct )
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Number of Diamonds
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Product Type
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
                      </div>{" "}
                      <div>
                        <label htmlFor="" className="label_text">
                          Product Type
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
                          Budget
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="" className="label_text">
                          Swa Product ( SKU)
                        </label>
                        <input type="text" className="input_feild" />
                      </div>
                      <div>
                        <label htmlFor="">Notes</label>
                        <textarea
                          className="textArea"
                          name=""
                          id=""
                          cols="40"
                          rows="10"
                        ></textarea>
                      </div>
                      <button className="submitButton">SUBMIT</button>
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

export default CreateCustomisation;
