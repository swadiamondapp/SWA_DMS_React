import React, { useEffect, useState } from "react";
import "./BasicDetails.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select } from "antd";
import { TagsInput } from "react-tag-input-component";
import Joi from "joi";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import { move_to_folder } from "../Assignment Panel/Api";

const style = {
  position: "absolute",

  right: "0px",
  width: 330,
  height: "100%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px 0 0 8px",
  overflowY: "scroll",
  p: 2,
};

const BasicDetailModal = ({
  open,
  onClose,
  selectedAssignment,
  setAssignmentFolder,
}) => {
  // create modal

  // const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    SKU: "",
    length: "",
    width: "",
    height: "",
    typeOfMetal: "",
    diamondType: "",
    approxDiamondWeight: "",
    findings: "",
    approxMetalWeights: "",
    approxMRP: "",
    tags: "",
    notes: "",
  });
  console.log(formData, "basicFormdData");
  console.log(selectedAssignment, "basic=====>");
  console.log(formData.tags, "taaggss");

  const schema = Joi.object({
    SKU: Joi.string().required().messages({
      "string.empty": `SKU feild cannot be an empty`,
      "string.pattern.base": "Sales Man Name cannot contain numbers.",
    }),
    length: Joi.string().required().messages({
      "string.empty": ` cannot be empty`,
    }),
    width: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    height: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    typeOfMetal: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    diamondType: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxDiamondWeight: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxMetalWeights: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxMRP: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    tags: Joi.required().messages({
      "string.empty": `cannot be empty`,
    }),
    // notes: Joi.string().required().messages({
    //   "string.empty": `cannot be empty`,
    // }),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data using Joi schema
    const { error } = schema.validate(formData, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      // Form is invalid, display validation errors
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
    } else {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      // Clear errors
      setErrors({ undefined });
    }
  };

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
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

  const handleNextClick = () => {
    const { error } = schema.validate(formData, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      // Form is invalid, display validation errors
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
    } else {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      onClose();
      setShowAssignmentModal(true);
      // Clear errors
      setErrors({ undefined });

    }
  };
  console.log(errors,"eeeeeeeee==>")
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
            style={{ position: "absolute", right: "0" }}
          >
            <Box sx={style}>
              <Typography>
                <div className="container">
                  <span className="titleBasic">Basic details</span>
                  <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                      <label htmlFor="" className="label-text">
                        SKU
                      </label>
                      <input
                        type="text"
                        className="inputFields"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleInput}
                      />
                      <div>
                        {errors.SKU && (
                          <span className="error_input_p">{errors.SKU}</span>
                        )}
                      </div>
                    </div>
                    <div className="gridThree">
                      <div>
                        <label htmlFor="" className="label-text">
                          length
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="length"
                          value={formData.length}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.length && (
                            <span className="error_input_p">
                              {errors.length}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="label-text">
                          Width
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="width"
                          value={formData.width}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.width && (
                            <span className="error_input_p">
                              {errors.width}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="label-text">
                          Height
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="height"
                          value={formData.height}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.height && (
                            <span className="error_input_p">
                              {errors.height}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="gridfifty">
                      <div className="select_field">
                        <label htmlFor="" className="label-text">
                          Type of metal
                        </label>
                        <Select
                          showSearch
                          placeholder="Gold"
                          optionFilterProp="children"
                          // value={formData.typeOfMetal}
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              typeOfMetal: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%",zIndex:"9999999",background:'#006E7F1A', }}
                          options={[
                            {
                              value: "Gold",
                              label: "Gold",
                            },
                            {
                              value: "Rose Gold",
                              label: "Rose Gold",
                            },
                            {
                              value: "Silver",
                              label: "Silver",
                            },
                            {
                              value: "Platinum",
                              label: "Platinum",
                            },
                          ]}
                        />
                        <div>
                          {errors.typeOfMetal && (
                            <span className="error_select_p">
                              {errors.typeOfMetal}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="select_field">
                        <label htmlFor="" className="label-text">
                          Diamond Type
                        </label>
                        <Select
                          showSearch
                          placeholder="Diamond Type"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              diamondType: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%",zIndex:999999999,background:'#006E7F1A' }}
                          options={[
                            {
                              value: "Natuaral Diamond",
                              label: "Natuaral Diamond",
                            },
                            {
                              value: "Treated Diamond",
                              label: "Treated Diamond",
                            },
                            {
                              value: "Pink Diomond",
                              label: "Pink Diomond",
                            },
                          ]}
                        />
                        <div>
                          {errors.diamondType && (
                            <span className="error_select_p">
                              {errors.diamondType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="gridfifty">
                      <div>
                        <label htmlFor="" className="label-text">
                          Approx Diamond weight
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="approxDiamondWeight"
                          value={formData.approxDiamondWeight}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.approxDiamondWeight && (
                            <span className="error_input_p">
                              {errors.approxDiamondWeight}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="label-text">
                          Findings
                        </label>
                        <input
                          type="text"
                          className="inputFields"
                          name="findings"
                          value={formData.findings}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.findings && (
                            <span className="error_input_p">
                              {errors.findings}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="approxMetel">
                      <div>
                        <label htmlFor="" className="label-text">
                          Approx metel .weight
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="approxMetalWeights"
                          value={formData.approxMetalWeights}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.approxMetalWeights && (
                            <span className="error_input_p">
                              {errors.approxMetalWeights}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="label-text">
                          Approx MRP
                        </label>
                        <input
                          type="number"
                          className="inputFields"
                          name="approxMRP"
                          value={formData.approxMRP}
                          onChange={handleInput}
                        />
                        <div>
                          {errors.approxMRP && (
                            <span className="error_input_p">
                              {errors.approxMRP}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="tagsInputfeild">
                        <label htmlFor="" className="label-text">
                          Tags
                        </label>
                        <TagsInput
                          value={selected}
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,

                              tags: value,
                            }))
                          }
                          name="fruits"
                          placeHolder="Tags"
                          classNames="inputTag"
                        />
                        <div>
                          {errors.tags && (
                            <span className="error_input_p">
                              {errors.tags}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="textArea">
                      <textarea
                        type="text"
                        name="notes"
                        className="textArea_feild"
                        value={formData.notes}
                        onChange={handleInput}
                        id=""
                        cols="30"
                        rows="6"
                        style={{ width: "100%" }}
                      />
                      <div style={{ marginBottom: "20px" }}>
                        {errors.notes && (
                          <span className="error_input_p">{errors.notes}</span>
                        )}
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <button
                        className="next-button"
                        type="submit"
                        onClick={() => handleNextClick()}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <AssignmentModal
        open={showAssignmentModal}
        formData={formData}
        onClose={() => setShowAssignmentModal(false)}
        selectedAssignment={selectedAssignment}
        setAssignmentFolder={setAssignmentFolder}
      />
    </div>
  );
};

export default BasicDetailModal;
