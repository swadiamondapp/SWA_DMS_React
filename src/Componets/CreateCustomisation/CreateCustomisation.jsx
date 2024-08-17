import React, { useState, useEffect, useRef } from "react";
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
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import plusICon from "../../assets/plusIcon.png";
import {
  diamond_type_dropdown_basicDetails,
  findings_List_basicDetails,
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";

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

// const props = {
//   name: "file",
//   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };
const CreateCustomisation = ({
  votersSetData,
  open,
  onClose,
  dataToDisplaytomodal,
  userId,
  wareHouseuserId,
  setData,
  setCustomization,
  name,
  customizationFunction,
}) => {
  // const [open, setOpen] = useState(false);
  const [tagText, setTagText] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [productTypeDropDown, setProductTypeDropDown] = useState([]);
  const [SelectDiamondColours, setSelectDiamondColor] = useState([]);
  const [SelectDiamondClarity, setSelectDiamondClarity] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [ImageError, setImageError] = useState("");
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [successMessage, setSuccessMessage] = useState(
    "Mail Send Successfully"
  );
  const [diamonType, setDiamondType] = useState([]);
  const [images, setImages] = useState(Array(5).fill(""));

  const formRef = useRef(null);
  const sallerNameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const chooseOutletRef = useRef(null);
  const productTypeRef = useRef(null);
  const modelPrevioslyMadeRef = useRef(null);
  const prevMadeSKURef = useRef(null);
  const metalTypeRef = useRef(null);
  const weightRef = useRef(null);
  const sizeRef = useRef(null);
  const widthRef = useRef(null);
  const lengthOfItemRef = useRef(null);
  const heightRef = useRef(null);
  const diamondTypeRef = useRef(null);
  const diamondWeightRef = useRef(null);
  const numberOfDiamondsRef = useRef(null);
  const diamondClarityRef = useRef(null);
  const diamondColorRef = useRef(null);
  const budgetRef = useRef(null);
  const swaProductSKURef = useRef(null);
  const notesRef = useRef(null);
  const imageRef = useRef(null);
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
    width: "",
    height: "",
    diamond_type: "",
    length_of_item: "",
    diamondWeight: "",
    numberOfDiamonds: "",
    diamondClarity: "",
    diamondColor: "",
    Budget: "",
    swaProductSKU: "",
    notes: "",
  });

  useEffect(() => {
    // metal_type_drop_down(setMetalTypeDropDown);
    product_type_drop_down(setProductTypeDropDown);
    choose_outlet_drop_down(setOutLetDropDown);
    diamond_colours(setSelectDiamondColor);
    diamond_clarity_choice(setSelectDiamondClarity);
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    product_category_basicDetails(setListProductCategory);
  }, []);

  console.log(outLetDropDown, "outLetDropDown");

  useEffect(() => {
    if (dataToDisplaytomodal) {
      setFormData({
        sallerName: dataToDisplaytomodal.salesman || "",
        mobileNumber: dataToDisplaytomodal.mobile_number || "",
        chooseOutlet: dataToDisplaytomodal.outlet || "",
        productType: dataToDisplaytomodal.product_type || "",
        modelPrevioslyMade: dataToDisplaytomodal.previously_made || "",
        prevMadeSKU: dataToDisplaytomodal.sku_of_swa_product || "",
        metalType: dataToDisplaytomodal.metal_type || "",
        weight: dataToDisplaytomodal.weight || "",
        size: dataToDisplaytomodal.size || "",
        width: dataToDisplaytomodal.width || "",
        height: dataToDisplaytomodal.height || "",
        length_of_item: dataToDisplaytomodal.length_of_item || "",
        diamond_type: dataToDisplaytomodal.diamond_type || "",
        diamondWeight: dataToDisplaytomodal.diamond_weight || "",
        numberOfDiamonds: dataToDisplaytomodal.no_of_diamond || "",
        diamondClarity: dataToDisplaytomodal.diamond_clarity || "",
        diamondColor: dataToDisplaytomodal.diamond_colour || "",
        Budget: dataToDisplaytomodal.budget || "",
        swaProductSKU: dataToDisplaytomodal.sku_of_swa_product || "",
        notes: dataToDisplaytomodal.notes || "",
        image: dataToDisplaytomodal.image || "",
        image2: dataToDisplaytomodal.image2 || "",
        image3: dataToDisplaytomodal.image3 || "",
      });
    }
  }, [dataToDisplaytomodal]);

  console.log(dataToDisplaytomodal?.image2, "dataToDisplaytomodal.image2 ");
  console.log(formData, "editCus");

  const schema = Joi.object({
    sallerName: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
      "string.pattern.base": "cannot contain numbers.",
    }),
    mobileNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .min(10)
      .max(10)
      .required()
      .messages({
        "string.empty": `Mobile number required`,
        "string.min": `Mobile number must be exactly 10 digits`,
        "string.max": `Mobile number must be exactly 10 digits`,
      }),
    chooseOutlet: Joi.any()
      .required()
      .custom((value, helpers) => {
        if (value === "" || value === null || value === undefined) {
          return helpers.error("any.empty");
        }
        return value;
      })
      .messages({
        "any.required": "cannot be empty",
        "any.empty": "cannot be empty",
      }),
    productType: Joi.any()
      .required()
      .custom((value, helpers) => {
        if (value === "" || value === null || value === undefined) {
          return helpers.error("any.empty");
        }
        return value;
      })
      .messages({
        "any.required": "cannot be empty",
        "any.empty": "cannot be empty",
      }),
    modelPrevioslyMade: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    prevMadeSKU: Joi.when("modelPrevioslyMade", {
      is: Joi.string().valid("yes"), // When modelPrevioslyMade is "yes"
      then: Joi.string().required().messages({
        "any.required": `Previous Made SKU is required when Model previously made is yes`,
        "string.empty": `Previous Made SKU cannot be empty when Model previously made is yes`,
      }),
      // Otherwise, it's optional
    }),
    metalType: Joi.any()
      .required()
      .custom((value, helpers) => {
        if (value === "" || value === null || value === undefined) {
          return helpers.error("any.empty");
        }
        return value;
      })
      .messages({
        "any.required": "cannot be empty",
        "any.empty": "cannot be empty",
      }),
    weight: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    size: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    diamondWeight: Joi.string().required().messages({
      "string.empty": `cannot be  empty `,
    }),
    numberOfDiamonds: Joi.required().messages({
      "string.empty": `cannot be  empty`,
    }),
    diamondClarity: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    diamondColor: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    Budget: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    swaProductSKU: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    notes: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    width: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    height: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
    diamond_type: Joi.any()
      .required()
      .custom((value, helpers) => {
        if (value === "" || value === null || value === undefined) {
          return helpers.error("any.empty");
        }
        return value;
      })
      .messages({
        "any.required": "cannot be empty",
        "any.empty": "cannot be empty",
      }),
    length_of_item: Joi.string().required().messages({
      "string.empty": `cannot be  empty`,
    }),
  });
  console.log(ProudctCategory, "diamonType");
  console.log(errors, "errors");

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
    // const firstErrorField = Object.keys(errors).find((key) => errors[key]);

    // // Scroll to the first error field
    // if (firstErrorField && inputRefs[firstErrorField] && inputRefs[firstErrorField].current) {
    //   inputRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
    if (ImageError) {
      setImageError("");
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

  const displayEditDetailsById = userId || wareHouseuserId;

  // const handleUpdateCustomization = (id) => {
  //   handleSubmitButton();
  //   edit_customizaion_warehouse(setIsLoading, formData,id);
  // };
  const handleUpdateCustomization = () => {
    // Call schema validation first
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
      // Proceed with update logic here
      edit_customizaion_warehouse(
        setIsLoading,
        formData,
        displayEditDetailsById,
        onClose,
        setSuccessMessage,
        setSuccessModalOpen,
        images,
        setImages,
        votersSetData,
        customizationFunction
      );
    }
  };
  const handleImageUpload = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };

  console.log(ErrorMessage, "asdfkd");
  const handleCreateSubmitCustomization = () => {
    const hasAtLeastOneImage = images.some((img) => img); // Check if there's at least one image

    if (!hasAtLeastOneImage) {
      setImageError("At least one image is required.");
      return; // Stop further execution if image validation fails
    } else {
      setImageError(""); // Clear image error if validation passes
    }
    // Call handleSubmitButton first
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

      // const firstErrorField = Object.keys(errors).find((key) => errors[key]);

      // // Scroll to the first error field
      // if (firstErrorField && inputRefs[firstErrorField] && inputRefs[firstErrorField].current) {
      //   inputRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // }

      // Then proceed with handleCreateSubmitCustomization logic
      create_customizaion_warehouse(
        setIsLoading,
        formData,
        onClose,
        setSuccessMessage,
        setSuccessModalOpen,
        setErrorMessage,
        images,
        votersSetData,
        setFormData,
        setImages
      );
    }
  };

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + imageFiles.length > 5) {
      message.error("You can only upload up to 5 images in total");
    } else {
      setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setUploadInstructionsVisible(false);
    }
  };

  console.log(images, "images==>new");
  const serverImage = [
    dataToDisplaytomodal?.image,
    dataToDisplaytomodal?.image2,
    dataToDisplaytomodal?.image3,
    dataToDisplaytomodal?.image4,
    dataToDisplaytomodal?.image5,
  ];

  useEffect(() => {
    // Find the first field with an error
    const firstErrorField =
      Object.keys(errors).find((key) => errors[key]) ||
      (ImageError && "ImageError");

    // Scroll to the first error field if it exists
    switch (firstErrorField) {
      case "sallerName":
        sallerNameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "mobileNumber":
        mobileNumberRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "chooseOutlet":
        chooseOutletRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "productType":
        productTypeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "modelPrevioslyMade":
        modelPrevioslyMadeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "prevMadeSKU":
        prevMadeSKURef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "metalType":
        metalTypeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "weight":
        weightRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "size":
        sizeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "width":
        widthRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "length_of_item":
        lengthOfItemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "height":
        heightRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "diamond_type":
        diamondTypeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "diamondWeight":
        diamondWeightRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "numberOfDiamonds":
        numberOfDiamondsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "diamondClarity":
        diamondClarityRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "diamondColor":
        diamondColorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "Budget":
        budgetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "swaProductSKU":
        swaProductSKURef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "notes":
        notesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "ImageError": // Add this case for image errors
        imageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      default:
        break;
    }
  }, [errors]);
  const handleCloseButton = () => {
    onClose();
    // setErrorMessage([])
    setImageError("");
    setErrors({});
    setFormData({
      sallerName: "",
      mobileNumber: "",
      chooseOutlet: "",
      productType: "",
      modelPrevioslyMade: "",
      prevMadeSKU: "",
      metalType: "",
      weight: "",
      size: "",
      width: "",
      height: "",
      diamond_type: "",
      length_of_item: "",
      diamondWeight: "",
      numberOfDiamonds: "",
      diamondClarity: "",
      diamondColor: "",
      Budget: "",
      swaProductSKU: "",
      notes: "",
    });
    setImages(Array(5).fill(""));
  };

  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={handleCloseButton}
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
                    onClick={handleCloseButton}
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
                          ref={sallerNameRef}
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
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={mobileNumberRef}
                        >
                          Mobile Number
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInput}
                          onFocus={(e) =>
                            e.target.addEventListener(
                              "wheel",
                              function (e) {
                                e.preventDefault();
                              },
                              { passive: false }
                            )
                          }
                        />
                        {errors.mobileNumber && (
                          <p className="error_input">{errors.mobileNumber}</p>
                        )}
                      </div>
                      <div className="parant_relative" ref={chooseOutletRef}>
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
                          options={outLetDropDown.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          value={formData.chooseOutlet || undefined}
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
                        ref={productTypeRef}
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
                          // options={productTypeDropDown}
                          options={ProudctCategory.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          value={formData.productType || undefined}
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
                        ref={modelPrevioslyMadeRef}
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
                          value={formData.modelPrevioslyMade || undefined}
                        />
                        {errors.modelPrevioslyMade && (
                          <span className="error_select">
                            {errors.modelPrevioslyMade}
                          </span>
                        )}
                      </div>
                      <div
                        className={
                          formData.modelPrevioslyMade === "yes"
                            ? "parant_relative"
                            : "parant_relative_hide"
                        }
                        // style={{
                        //   display:
                        //     formData.modelPrevioslyMade === "no"
                        //       ? "none"
                        //       : "block",
                        // }}
                        ref={prevMadeSKURef}
                      >
                        <label htmlFor="" className="label_text">
                          If previously made please enter the SKU
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="prevMadeSKU"
                          value={formData.prevMadeSKU}
                          onChange={handleInput}
                          onFocus={(e) =>
                            e.target.addEventListener(
                              "wheel",
                              function (e) {
                                e.preventDefault();
                              },
                              { passive: false }
                            )
                          }
                        />
                        {errors.prevMadeSKU && (
                          <span className="error_input">
                            {errors.prevMadeSKU}
                          </span>
                        )}
                      </div>
                      {/* <div className="uploadImageContainer">
                        {imageFiles.length > 0 ? (
                          <>
                            {imageFiles.map((item, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(item)}
                                alt={`Uploaded ${index + 1}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "4px",
                                }}
                              />
                            ))}
                          </>
                        ) : (
                          <div className="leftI">
                            {dataToDisplaytomodal ? (
                              <div style={{ display: "flex", gap: "10px" }}>
                                <img
                                  // key={index}
                                  src={dataToDisplaytomodal.image}
                                  // alt={`Uploaded ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "4px",
                                  }}
                                />
                                <img
                                  // key={index}
                                  src={dataToDisplaytomodal.image2}
                                  // alt={`Uploaded ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "4px",
                                  }}
                                />{" "}
                                <img
                                  // key={index}
                                  src={dataToDisplaytomodal.image3}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "4px",
                                  }}
                                />
                                 <img
                                  // key={index}
                                  src={dataToDisplaytomodal.image4}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "4px",
                                  }}
                                />
                                  <img
                                  // key={index}
                                  src={dataToDisplaytomodal.image5}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "4px",
                                  }}
                                />
                              </div>
                            ) : (
                              <>
                                <span className="imgUpText">Image Upload</span>
                                <span className="imgDText">
                                  You can upload 3 files max
                                </span>
                              </>
                            )}
                          </div>
                        )}
                        <div className="rightw">
                          <div
                            id="fileUpload"
                            className="uploadButton"
                            onClick={() =>
                              document.getElementById("fileUploadImage").click()
                            }
                            style={{display:imageFiles.length === 5 || dataToDisplaytomodal ? "none":"block"}}
                          >
                            {console.log(imageFiles, "images#")}
                            <input
                              type="file"
                              id="fileUploadImage"
                              style={{ display: "none" }}
                              multiple
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                            Upload <BsCloudUpload />
                          </div>
                        </div>
                      </div> */}
                      {name === "editModalOpen" ? (
                        <div className="uploadImageContainer">
                          <div className="rightw">
                            <div
                              id="fileUpload"
                              // className="uploadButton"
                              // onClick={() =>
                              //   document.getElementById("fileUploadImage").click()
                              // }
                            >
                              <div className="dashed_imageContainer">
                                {images.map((image, index) => (
                                  <div
                                    key={index}
                                    className="dashedImage"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      position: "relative",
                                    }}
                                  >
                                    {(images[index] || serverImage[index]) && (
                                      <img
                                        src={
                                          images[index]
                                            ? URL.createObjectURL(images[index])
                                            : serverImage[index]
                                        }
                                        alt=""
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                      />
                                    )}
                                    <div
                                      style={{
                                        position: "absolute",
                                      }}
                                    >
                                      <label>
                                        <img src={plusICon} alt="" />
                                        <input
                                          type="file"
                                          accept="image/png, image/jpeg"
                                          style={{ display: "none" }}
                                          onChange={(e) =>
                                            handleImageUpload(index, e)
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="uploadImageContainer"
                          style={{ position: "relative" }}
                          ref={imageRef}
                        >
                          <div className="rightw">
                            <div
                              id="fileUpload"
                              // className="uploadButton"
                              // onClick={() =>
                              //   document.getElementById("fileUploadImage").click()
                              // }
                            >
                              <div className="dashed_imageContainer">
                                {images.map((image, index) => (
                                  <div
                                    key={index}
                                    className="dashedImage"
                                    style={{ width: "50px", height: "50px" }}
                                  >
                                    {image && (
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                      />
                                    )}
                                    <div style={{ position: "absolute" }}>
                                      <label>
                                        <img src={plusICon} alt="" />
                                        <input
                                          type="file"
                                          accept="image/png, image/jpeg"
                                          style={{ display: "none" }}
                                          onChange={(e) =>
                                            handleImageUpload(index, e)
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {ImageError && (
                            <span className="error_select">{ImageError}</span>
                          )}
                        </div>
                      )}
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={metalTypeRef}
                        >
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
                          // options={MetalTypeDropDown}
                          options={MetalTypeDropDown.map((item) => ({
                            value: item.id,
                            label: item.metal_name,
                          }))}
                          value={formData.metalType || undefined}
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
                          ref={weightRef}
                          value={formData.weight}
                          onChange={handleInput}
                          onFocus={(e) =>
                            e.target.addEventListener(
                              "wheel",
                              function (e) {
                                e.preventDefault();
                              },
                              { passive: false }
                            )
                          }
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
                          ref={sizeRef}
                          value={formData.size}
                          onChange={handleInput}
                          onFocus={(e) =>
                            e.target.addEventListener(
                              "wheel",
                              function (e) {
                                e.preventDefault();
                              },
                              { passive: false }
                            )
                          }
                        />
                        {errors.size && (
                          <span className="error_select">{errors.size}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          width
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="width"
                          ref={widthRef}
                          value={formData.width}
                          onChange={handleInput}
                          onFocus={(e) =>
                            e.target.addEventListener(
                              "wheel",
                              function (e) {
                                e.preventDefault();
                              },
                              { passive: false }
                            )
                          }
                        />
                        {errors.width && (
                          <span className="error_select">{errors.width}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          length
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="length_of_item"
                          ref={lengthOfItemRef}
                          value={formData.length_of_item}
                          onChange={handleInput}
                          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        />
                        {errors.length_of_item && (
                          <span className="error_select">
                            {errors.length_of_item}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          height
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="height"
                          ref={heightRef}
                          value={formData.height}
                          onChange={handleInput}
                          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        />
                        {errors.height && (
                          <span className="error_select">{errors.height}</span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={diamondTypeRef}
                        >
                          Diamond Type
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              diamond_type: value,
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{ width: "100%" }}
                          // options={MetalTypeDropDown}
                          options={diamonType.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          value={formData.diamond_type || undefined}
                        />
                        {errors.diamond_type && (
                          <span className="error_select">
                            {errors.diamond_type}
                          </span>
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
                          ref={diamondWeightRef}
                          value={formData.diamondWeight}
                          onChange={handleInput}
                          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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
                          ref={numberOfDiamondsRef}
                          value={formData.numberOfDiamonds}
                          onChange={handleInput}
                          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        />
                        {errors.numberOfDiamonds && (
                          <span className="error_input">
                            {errors.numberOfDiamonds}
                          </span>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={diamondClarityRef}
                        >
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
                          value={formData.diamondClarity || undefined}
                        />
                        {errors.diamondClarity && (
                          <span className="error_select">
                            {errors.diamondClarity}
                          </span>
                        )}
                      </div>{" "}
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={diamondColorRef}
                        >
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
                          value={formData.diamondColor || undefined}
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
                          ref={budgetRef}
                          value={formData.Budget}
                          onChange={handleInput}
                          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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
                          ref={swaProductSKURef}
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
                          ref={notesRef}
                          value={formData.notes}
                          onChange={handleInput}
                          id=""
                          cols="40"
                          rows="7"
                        >
                          {" "}
                        </textarea>
                        {errors.notes && (
                          <span className="error_input">{errors.notes}</span>
                        )}
                        {/* {ErrorMessage?(
                      <span className="error_Custom">
                        {ErrorMessage}
                      </span>
                    ):null} */}
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
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <CircularProgress
                                size={15}
                                sx={{ color: "#fff" }}
                              />
                            ) : (
                              " SUBMIT"
                            )}
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
