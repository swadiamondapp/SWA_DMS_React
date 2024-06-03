import React, { useState, useEffect } from "react";
import "./CreateCustomisation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import avatar from "../../assets/avataprofile.png";
import { message, Upload, Select } from "antd";
import { BsCloudUpload } from "react-icons/bs";
import Joi from "joi";
import {
  create_customizaion_warehouse,
  edit_customizaion_warehouse,
} from "../../Pages/WareHousePageView/Api";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessModal from "../SuccessModal/SuccessModal";
import {
  choose_outlet_drop_down,
  diamond_clarity_choice,
  diamond_colours,
  metal_type_drop_down,
  product_type_drop_down,
} from "../ADMIN PANEL/Api_dropDown";

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
  outline: "none",
};

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const CreateCustomisation = ({
  open,
  onClose,
  dataToDisplaytomodal,
  userId,
  wareHouseuserId,
}) => {
  // const [open, setOpen] = useState(false);
  const [tagText, setTagText] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [productTypeDropDown, setProductTypeDropDown] = useState([]);
  const [SelectDiamondColours, setSelectDiamondColor] = useState([]);
  const [SelectDiamondClarity, setSelectDiamondClarity] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ErrorMessage,setErrorMessage] = useState([])
  const [successMessage, setSuccessMessage] = useState(
    "Mail Send Success Fully"
  );
  const [formData, setFormData] = useState({
    sallerName: "",
    mobileNumber: "",
    chooseOutlet: "",
    productType: "",
    modelPrevioslyMade: "",
    prevMadeSKU: "",
    metalType: "",
    weight: "",
    size: "",
    diamondWeight: "",
    numberOfDiamonds: "",
    diamondClarity: "",
    diamondColor: "",
    Budget: "",
    swaProductSKU: "",
    notes: "",
  });

  useEffect(() => {
    metal_type_drop_down(setMetalTypeDropDown);
    product_type_drop_down(setProductTypeDropDown);
    choose_outlet_drop_down(setOutLetDropDown);
    diamond_colours(setSelectDiamondColor);
    diamond_clarity_choice(setSelectDiamondClarity);
  }, []);
  console.log(MetalTypeDropDown, "MetalTypeDropDown");

  useEffect(() => {
    if (dataToDisplaytomodal) {
      setFormData({
        sallerName: dataToDisplaytomodal.salesman || "",
        mobileNumber: dataToDisplaytomodal.mobile_number || "",
        chooseOutlet: dataToDisplaytomodal.outlet || "",
        productType: dataToDisplaytomodal.product_type || "",
        modelPrevioslyMade: dataToDisplaytomodal.previously_made || "",
        prevMadeSKU: dataToDisplaytomodal.outlet || "",
        metalType: dataToDisplaytomodal.metal_type || "",
        weight: dataToDisplaytomodal.weight || "",
        size: dataToDisplaytomodal.size || "",
        diamondWeight: dataToDisplaytomodal.diamond_weight || "",
        numberOfDiamonds: dataToDisplaytomodal.no_of_diamond || "",
        diamondClarity: dataToDisplaytomodal.diamond_clarity || "",
        diamondColor: dataToDisplaytomodal.diamond_colour || "",
        Budget: dataToDisplaytomodal.budget || "",
        swaProductSKU: dataToDisplaytomodal.sku_of_swa_product || "",
        notes: dataToDisplaytomodal.notes || "",
      });
    }
  }, [dataToDisplaytomodal]);

  // console.log(dataToDisplaytomodal, "editCus");

  const schema = Joi.object({
    sallerName: Joi.string().required().messages({
      "string.empty": `salesMan feild cannot be an empty field`,
      "string.pattern.base": "Sales Man Name cannot contain numbers.",
    }),
    mobileNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.empty": `Mobile number required`,
      }),
    chooseOutlet: Joi.string().required().messages({
      "string.empty": `choose Outlet cannot be an empty feild`,
    }),
    productType: Joi.string().required().messages({
      "string.empty": `Product Type cannot be an empty feild`,
    }),
    modelPrevioslyMade: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    prevMadeSKU: Joi.string().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    metalType: Joi.string().required().messages({
      "string.empty": `Metal Type cannot be an empty feild`,
    }),
    weight: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    size: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    diamondWeight: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    numberOfDiamonds: Joi.required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    diamondClarity: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    diamondColor: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    Budget: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    swaProductSKU: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
    notes: Joi.string().required().messages({
      "string.empty": `cannot be an empty feild`,
    }),
  });

  const handleSubmitButton = (e) => {
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
      // Clear validation errors when the form is valid
      setErrors({});
      // Proceed with form submission logic here
      console.log("Form submitted:", formData);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the current input field
    }));
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

  const displayEditDetailsById = userId || wareHouseuserId;

  // const handleUpdateCustomization = (id) => {
  //   handleSubmitButton();
  //   edit_customizaion_warehouse(setIsLoading, formData,id);
  // };
  const handleUpdateCustomization = () => {
    edit_customizaion_warehouse(
      setIsLoading,
      formData,
      displayEditDetailsById,
      onClose,
      setSuccessMessage,
      setSuccessModalOpen,

    );
  };
console.log(ErrorMessage,"asdfkd")
  const handleCreateSubmitCustomization = () => {
    create_customizaion_warehouse(
      setIsLoading,
      formData,
      displayEditDetailsById,
      onClose,
      setSuccessMessage,
      setSuccessModalOpen,
      setErrorMessage
    );
  };

  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={onClose}
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
                    onClick={onClose}
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

              <Typography id="modal-modal-description" sx={{ mt: 10 }}>
                <div>
                  <form onSubmit={handleSubmitButton}>
                    <div className="FormContainer">
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Sales man
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="sallerName"
                          value={formData.sallerName}
                          onChange={handleInput}
                        />
                        {errors.sallerName && (
                          <span className="error_input">
                            {errors.sallerName}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Mobile Number
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInput}
                        />
                        {errors.mobileNumber && (
                          <p className="error_input">{errors.mobileNumber}</p>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Choose Outlet
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              chooseOutlet: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={outLetDropDown}
                          value={formData.chooseOutlet}
                        />
                        {errors.chooseOutlet && (
                          <span className="error_select">
                            {errors.chooseOutlet}
                          </span>
                        )}
                      </div>
                      <div
                        className="parant_relative"
                        style={{ marginBottom: "16px" }}
                      >
                        <label htmlFor="" className="label_text">
                          Product Type
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              productType: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={productTypeDropDown}
                          value={formData.productType}
                        />
                        <div style={{ marginTop: "2px" }}>
                          {errors.productType && (
                            <span className="error_select">
                              {errors.productType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="parant_relative"
                        style={{ marginTop: "5px" }}
                      >
                        <label htmlFor="" className="label_text">
                          Model previously made
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              modelPrevioslyMade: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={[
                            {
                              value: "yes",
                              label: "Yes",
                            },
                            {
                              value: "no",
                              label: "No",
                            },
                          ]}
                          value={formData.modelPrevioslyMade}
                        />
                        {errors.modelPrevioslyMade && (
                          <span className="error_select">
                            {errors.modelPrevioslyMade}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          If previously made please enter the SKU
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="prevMadeSKU"
                          value={formData.prevMadeSKU}
                          onChange={handleInput}
                        />
                        {errors.prevMadeSKU && (
                          <span className="error_input">
                            {errors.prevMadeSKU}
                          </span>
                        )}
                      </div>
                      <div className="uploadImageContainer">
                        <div className="leftI">
                          <span className="imgUpText">Image Upload</span>
                          <span className="imgDText">
                            you can upload 3 files max
                          </span>
                        </div>
                        <div className="rightw">
                          <button className="uploadButton">
                            Upload <BsCloudUpload />{" "}
                          </button>
                        </div>
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Metal Type
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              metalType: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={MetalTypeDropDown}
                          value={formData.metalType}
                        />
                        {errors.metalType && (
                          <span className="error_select">
                            {errors.metalType}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Weight ( grams )
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInput}
                        />
                        {errors.weight && (
                          <span className="error_select">{errors.weight}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Size
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="size"
                          value={formData.size}
                          onChange={handleInput}
                        />
                        {errors.size && (
                          <span className="error_select">{errors.size}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Diamond weight ( ct )
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="diamondWeight"
                          value={formData.diamondWeight}
                          onChange={handleInput}
                        />
                        {errors.diamondWeight && (
                          <span className="error_input">
                            {errors.diamondWeight}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Number of Diamonds
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="numberOfDiamonds"
                          value={formData.numberOfDiamonds}
                          onChange={handleInput}
                        />
                        {errors.numberOfDiamonds && (
                          <span className="error_input">
                            {errors.numberOfDiamonds}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Diamond Clarity
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              diamondClarity: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={SelectDiamondClarity}
                          value={formData.diamondClarity}
                        />
                        {errors.diamondClarity && (
                          <span className="error_select">
                            {errors.diamondClarity}
                          </span>
                        )}
                      </div>{" "}
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Diamond Colour
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              diamondColor: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          options={SelectDiamondColours}
                          value={formData.diamondColor}
                        />
                        {errors.diamondColor && (
                          <span className="error_select">
                            {errors.diamondColor}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Budget
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="Budget"
                          value={formData.Budget}
                          onChange={handleInput}
                        />
                        {errors.Budget && (
                          <span className="error_input">{errors.Budget}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Swa Product ( SKU)
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="swaProductSKU"
                          value={formData.swaProductSKU}
                          onChange={handleInput}
                        />
                        {errors.swaProductSKU && (
                          <span className="error_input">
                            {errors.swaProductSKU}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="">Notes</label>
                        <textarea
                          className="textArea"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInput}
                          id=""
                          cols="40"
                          rows="10"
                        >
                          {" "}
                        </textarea>
                        {errors.notes && (
                          <span className="error_input">{errors.notes}</span>
                        )}
                           {ErrorMessage?(
                      <span className="error_Custom">
                        {ErrorMessage}
                      </span>
                    ):null}
                      </div>
                      {dataToDisplaytomodal ? (
                        <button
                          onClick={() => handleUpdateCustomization()}
                          className="submitButton"
                          type="submit"
                        >
                          {isLoading ? (
                            <CircularProgress
                              size={15}
                              sx={{ color: "#fff" }}
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleCreateSubmitCustomization()}
                            type="submit"
                            className="submitButton"
                          >
                            SUBMIT
                          </button>
                     
                        </>
                      )}
                    </div>
                 
                  </form>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        successMessage={successMessage}
      />
    </div>
  );
};

export default CreateCustomisation;
