/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import axios from "axios";
import { apiService } from "../../Pages/Services/ApiInstants";
import { voters_customization_list } from "../VOTORS PANEL/Api";

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
  setData,
  votersSetData,
  open,
  onClose,
  dataToDisplaytomodal,
  displayEditDetailsById,
  userId,
  wareHouseuserId,
  name,
  customizationFunction,
  refreshList,
  submitMode, 
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
  const customerNameRef = useRef(null);
  const customerMobileRef = useRef(null);
  const receivedAdvanceRef = useRef(null);
  const customerEmailRef = useRef(null);
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
  const dueDateRef = useRef(null);
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
    due_date: "",
    customerName: "",
    customerMobile: "",
    receivedAdvance: "",
    customerEmail: "",
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
        prevMadeSKU: dataToDisplaytomodal.sku || "",
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
        due_date: dataToDisplaytomodal.due_date || "",
        notes: dataToDisplaytomodal.notes || "",
        image: dataToDisplaytomodal.image || "",
        image2: dataToDisplaytomodal.image2 || "",
        image3: dataToDisplaytomodal.image3 || "",
        // <....ToDo....>
        customerName: dataToDisplaytomodal.customer_name || "",
        customerMobile: dataToDisplaytomodal.customer_number || "",
        receivedAdvance: dataToDisplaytomodal.received_advance || "",
        customerEmail: dataToDisplaytomodal.customer_email || "",
      });
    }
  }, [dataToDisplaytomodal]);

  console.log(dataToDisplaytomodal?.image2, "dataToDisplaytomodal.image2 ");
  console.log(formData, "editCus");

{/* const schema = Joi.object({
  sallerName: Joi.string().trim().required(),

  mobileNumber: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits",
    }),

  customerName: Joi.string().trim().required(),

  customerMobile: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits",
    }),

  customerEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .allow("", null),

chooseOutlet: Joi.object({
  id: Joi.any().required(),
}).required(),

productType: Joi.object({
  id: Joi.any().required(),
}).required(),

receivedAdvance: Joi.string().required(),


  modelPrevioslyMade: Joi.string()
    .valid("yes", "no")
    .required(),

  prevMadeSKU: Joi.when("modelPrevioslyMade", {
    is: "yes",
    then: Joi.string().trim().required(), 
    otherwise: Joi.optional(),
  }),

  metalType: Joi.object({
    id: Joi.any().required(),
  })
    .required(),

  diamondClarity: Joi.string().required(),
  diamondColor: Joi.string().required(),
  Budget: Joi.string().required(),

  due_date: Joi.date()
    .min("now")
    .required()
    .messages({
      "date.min": "Due date cannot be in the past",
    }),
});*/}
const requiredField = Joi.any()
  .required()
  .custom((value, helpers) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return helpers.error("any.empty");
    }
    return value;
  })
  .messages({
    "any.required": "This field is required",
    "any.empty": "This field is required",
  });

const schema = Joi.object({
  sallerName: requiredField,
  mobileNumber: requiredField,
  customerName: requiredField,
  customerMobile: requiredField,
  receivedAdvance: requiredField,

  chooseOutlet: requiredField,
  productType: requiredField,
  metalType: requiredField,

  modelPrevioslyMade: requiredField,
  diamondClarity: requiredField,
  diamondColor: requiredField,
  Budget: requiredField,
   due_date: Joi.date()
    .min("now")
    .required()
    .messages({
      "date.min": "Due date cannot be in the past",
    }),
});

  console.log(ProudctCategory, "diamonType");
  console.log(errors, "errors");

const updateOrderStatus = async () => {
  try {
    await apiService.patch(
      `customization/${dataToDisplaytomodal.id}/update-orderstatus/`,
      { status: "Requested" }
    );
 //voters_customization_list(setIsLoading,setData, "", "");
    
  } catch (err) {
    console.error("Status update failed", err);
  }
};

const handleSubmitCustomization = (e) => {
  e.preventDefault(); // 🔥 REQUIRED

const normalizedFormData = {
  ...formData,

  chooseOutlet:
    typeof formData.chooseOutlet === "object"
      ? formData.chooseOutlet
      : { id: formData.chooseOutlet },

  productType:
    typeof formData.productType === "object"
      ? formData.productType
      : { id: formData.productType },

  metalType:
    typeof formData.metalType === "object"
      ? formData.metalType
      : { id: formData.metalType },

  modelPrevioslyMade:
    typeof formData.modelPrevioslyMade === "string"
      ? formData.modelPrevioslyMade.toLowerCase().trim()
      : "",

  receivedAdvance:
    formData.receivedAdvance != null
      ? String(formData.receivedAdvance)
      : "",
};



  // 2️⃣ VALIDATE ONLY WHEN SENDING TO WAREHOUSE
  if (submitMode === "SEND_TO_WH") {
    const { error } = schema.validate(normalizedFormData, {
      abortEarly: false,
      allowUnknown: true, // ✅ IMPORTANT LINE
    });

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path.join(".")] = err.message;
      });
      setErrors(validationErrors);
      return; // ❌ STOP SUBMIT
    }
  }

  // ✅ Continue with API calls
  if (dataToDisplaytomodal) {
    edit_customizaion_warehouse(
      setIsLoading,
      formData, // 🚨 send ORIGINAL formData to API
      dataToDisplaytomodal.id,
      async () => {
        if (submitMode === "SEND_TO_WH") {
          await updateOrderStatus();
        }
        refreshList(); // Refresh list after edit
        onClose();
      },
      setSuccessMessage,
      setSuccessModalOpen,
      images,
      setImages,
      votersSetData,
      customizationFunction
    );
  } else {
    // CREATE
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

  //const displayEditDetailsById = userId || wareHouseuserId;

  // const handleUpdateCustomization = (id) => {
  //   handleSubmitButton();
  //   edit_customizaion_warehouse(setIsLoading, formData,id);
  // };
const handleUpdateCustomization = () => {
 // if (!displayEditDetailsById) return;

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
};

   // Call schema validation first
  

  {/*   const { error } = schema.validate(formData, {
      abortEarly: false,
      allowUnknown: true,
    }); if (error) {
      // Form is invalid, display validation errors
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
    } else {    setErrors({});*/}
      // Clear validation errors when the form is valid
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
      case "customerName":
        customerNameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "customerMobile":
        customerMobileRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "receivedAdvance":
        receivedAdvanceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case "customerEmail":
        customerEmailRef.current?.scrollIntoView({
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
        case "dueDate":
          dueDateRef.current?.scrollIntoView({
            behavior:"smooth",
            block:"center",
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
      due_date: "",
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
                <form onSubmit={handleSubmitCustomization}>
                    <div className="FormContainer">
                      <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Sales man{" "}
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={customerNameRef}
                        >
                          Customer Name
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="customerName"
                          value={formData.customerName}
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
                        {errors.customerName && (
                          <p className="error_input">{errors.customerName}</p>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={customerMobileRef}
                        >
                          Customer Mobile Number
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="customerMobile"
                          value={formData.customerMobile}
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
                        {errors.customerMobile && (
                          <p className="error_input">{errors.customerMobile}</p>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={receivedAdvanceRef}
                        >
                          Recived Advance
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="receivedAdvance"
                          value={formData.receivedAdvance}
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
                        {errors.receivedAdvance && (
                          <p className="error_input">
                            {errors.receivedAdvance}
                          </p>
                        )}
                      </div>
                      <div className="parant_relative">
                        <label
                          htmlFor=""
                          className="label_text"
                          ref={customerEmailRef}
                        >
                          Customer Email
                          {/* <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span> */}
                        </label>
                        <input
                          type="text"
                          className="input_feild"
                          name="customerEmail"
                          value={formData.customerEmail}
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
                        {errors.customerEmail && (
                          <p className="error_input">{errors.customerEmail}</p>
                        )}
                      </div>
                      <div className="parant_relative" ref={chooseOutletRef}>
                        <label htmlFor="" className="label_text">
                          Choose Outlet
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          If previously made please enter the SKU{" "}
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                  
                      {name === "editModalOpen" ? (
                        <>
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
                                      {(images[index] ||
                                        serverImage[index]) && (
                                        <img
                                          src={
                                            images[index]
                                              ? URL.createObjectURL(
                                                  images[index]
                                                )
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
                        </>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          Diamond weight ( ct )
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="diamondWeight"
                          ref={diamondWeightRef}
                          value={formData.diamondWeight}
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
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
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          className="input_feild"
                          name="Budget"
                          ref={budgetRef}
                          value={formData.Budget}
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
                        {errors.Budget && (
                          <span className="error_input">{errors.Budget}</span>
                        )}
                      </div>
                     <div className="parant_relative">
                        <label htmlFor="" className="label_text">
                          Due Date
                        </label>
                        <input
                          type="date"
                          className="input_feild"
                          name="due_date"
                          ref={dueDateRef}
                          value={formData.due_date}
                          onChange={handleInput}
                        />
                        {errors.due_date && (
                          <span className="error_input">
                            {errors.due_date}
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
                    <button
                            type="submit"
                            className="submitButton"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <CircularProgress size={15} sx={{ color: "#fff" }} />
                            ) : dataToDisplaytomodal ? (
                              "Update"
                            ) : (
                              "Submit"
                            )}
                          </button>

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

  {/* <div className="parant_relative">
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
                      </div> */}
                      {/* <div className="parant_relative">
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
                      </div> */}
                      {/* <div className="parant_relative">
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
                      </div> */}
                      {/* <div className="parant_relative">
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
                      </div> */}
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
                      </div> 
                      
                      
                      
  const handleSubmit = (e) => {
  e.preventDefault(); // 🔥 critical

  // Image validation
  {/* const hasAtLeastOneImage = images.some((img) => img);
 if (!hasAtLeastOneImage) {
    setImageError("At least one image is required.");
    return;
  }*/}


  // Joi validation
  {/*const { error } = schema.validate(formData, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    const validationErrors = error.details.reduce((errors, err) => {
      errors[err.path[0]] = err.message;
      return errors;
    }, {});
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  // 🚀 API CALL (single source of truth)
  if (dataToDisplaytomodal) {
    handleUpdateCustomization();
  } else {
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
                      */}