import React, { useState } from "react";
import "./ProductCustomisation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import { Select } from "antd";
import Joi from "joi";

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

const schema = Joi.object({
  size: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
  }),
  type: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
  }),
  colour: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
  }),
});

const ProductCustomisation = () => {
  // create modal

  const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedValues, setSelectedValues] = useState({
    size: "",
    type: "",
    colour: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(selectedValues)
      .filter(([key, value]) => value === "")
      .map(([key, value]) => key);

    if (emptyFields.length > 0) {
      console.log("Please fill in all required fields Product Customisation modal.");
      console.log("Empty fields:", emptyFields);
      return; // Prevent further execution of the function
    }

    const { error } = schema.validate(selectedValues, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const validationError = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationError);
    } else {
      console.log("form submitted", selectedValues);
      setErrors({ undefined });
    }
  };

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
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      background: "none",
                      border: "none",
                    }}
                  >
                    <img src={closeButton} />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="container">
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Size
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setSelectedValues((prevState) => ({
                              ...prevState,
                              size: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            { value: "small", label: "Small" },
                            { value: "medium", label: "Medium" },
                            { value: "large", label: "Large" },
                            { value: "", label: "" },
                          ]}
                        />
                        {errors.size && (
                          <span className="error_input">{errors.size}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Type of Order
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setSelectedValues((prevState) => ({
                              ...prevState,
                              type: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            { value: "online", label: "Online" },
                            { value: "offline", label: "Offline" },
                          ]}
                        />
                        {errors.type && (
                          <span className="error_input">{errors.type}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Colour
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setSelectedValues((prevState) => ({
                              ...prevState,
                              colour: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            { value: "red", label: "Red" },
                            { value: "blue", label: "Blue" },
                            { value: "green", label: "Green" },
                          ]}
                        />
                        {errors.colour && (
                          <span className="error_input">{errors.colour}</span>
                        )}
                      </div>
                      <div>
                        <button type="submit" className="CreateOrderButton">
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
