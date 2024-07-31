import React, { useState } from "react";
import "./ProductCustomisation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import { Select } from "antd";
import Joi from "joi";
import { create_stock_order_gallary } from "../VOTORS PANEL/Api";
import SuccessModal from "../SuccessModal/SuccessModal";

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

const ProductCustomisation = ({
  open,
  onClose,
  orderAssignMentCode,
  orderDesignCode,
  value,
  CustomizedCod,
  CustomizedId
}) => {
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [errors, setErrors] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    size: "",
    type: "",
    colour: "",
    notes:""
  });
  console.log(
    orderAssignMentCode,
    orderDesignCode,
    selectedValues.size,
    selectedValues.colour,
    selectedValues.type,
    selectedValues.notes,
    CustomizedCod,
  CustomizedId,
    "proudcd"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(selectedValues, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
    } else {
      create_stock_order_gallary(
        orderAssignMentCode,
        selectedValues,
        value,
        CustomizedId,
        onClose,
        setSuccessMessage,
        setSuccessModalOpen,
        setSelectedValues
      );
      setErrors({});
      // onValidSubmit();
    }
  };



  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClose()
    setSelectedValues({
      size: "",
      type: "",
      colour: "",
      notes:""
    })
    setErrors({})
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log(orderAssignMentCode,"orderAssignMentCode")

  return (
    <div>
      <div className="">
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
                          style={{ width: "100%", marginBottom: "6px" }}
                          options={[
                            { value: "small", label: "Small" },
                            { value: "medium", label: "Medium" },
                            { value: "large", label: "Large" },
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
                          style={{ width: "100%", marginBottom: "6px" }}
                          options={[
                            { value: "Stock Order", label: "Stock Order" },
                            { value: "Customized Order", label: "Customized Order"},
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
                          style={{ width: "100%", marginBottom: "6px" }}
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
                      {/* <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Notes
                        </label>
                        <textarea
                          type="text"
                          name="notes"
                          className="textArea_feild"
                          value={selectedValues.notes}
                          onChange={(event) =>
                            setSelectedValues((prevState) => ({
                              ...prevState,
                              notes: event.target.value,
                            }))
                          }
                          id=""
                          cols="30"
                          rows="6"
                          style={{ width: "100%" }}
                        />
                        {errors.notes && (
                          <span className="error_input">{errors.notes}</span>
                        )}
                      </div> */}
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
        <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
      </div>
    </div>
  );
};

export default ProductCustomisation;
