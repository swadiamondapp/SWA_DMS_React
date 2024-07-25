import React, { useEffect, useId, useState } from "react";
import "./AdminBasicDetailsModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, Space } from "antd";
import { TagsInput } from "react-tag-input-component";
import Joi from "joi";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import EyeIcons from "../../assets/bmEye.png";
import DeleteICon from "../../assets/imageDelete.png";
import SuccessTickk from "../../assets/tickad.png";
import SuccessModal from "../SuccessModal/SuccessModal";
import CircularProgress from "@mui/material/CircularProgress";
import closeButton from "../../assets/closeButton.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyles.css";

// import {
//   diamond_type_dropdown_basicDetails,
//   findings_List_basicDetails,
//   metal_type_dropdown_basicDetails,
//   move_to_folder,
//   product_category_basicDetails,
//   tag_List_basicDetails,
// } from "../Assignment Panel/Api";
import {
  assign_to_designers,
  basic_calculation,
  diamond_type_dropdown_basicDetails,
  findings_List_basicDetails,
  list_all_designers,
  listDesignersByName,
  metal_type_dropdown_basicDetails,
  move_to_assignment,
  move_to_assignment_from_admin,
  move_to_folder,
  product_category_basicDetails,
  tag_List_basicDetails,
  upload_admin_image_assignment,
} from "../Assignment Panel/Api";
import { assign_to_cad } from "../DESIGNER PANEL/Designer Detail View/Api";

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
const BasicEye = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  outline: "none",
  border: "none",
  boxShadow: 24,
  borderRadius: "4px",
  width: 300,
  height: "auto",
  p: 4,
};

const AdminBasicDetailsModal = ({
  AdminBasicModalOpen,
  setAdminBasicModalOpen,
  onClose,
  selectedAssignment,
  setAssignmentFolder,
  setSelectedAssignment,
  getSelectedDesign,
}) => {
  const [adminUploadedItemId, setAdminUploadedItemId] = useState([]);
  const [ ImageSingleError, setImageSingleError] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [AdminUploadedImageFile, setAdminUploadedImageFile] = useState(false);
  const [AdminBasicDetailsOpen, setAdminBasicDetailsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFindings, setSelectedFindings] = useState([]);
  const [selectedSKU, setSelectedSKU] = useState([]);
  const [errors, setErrors] = useState({});
  const [metalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [diamonType, setDiamondType] = useState([]);
  const [FindingsList, setFindingsList] = useState([]);
  const [selectedFechedTags, setSelectedFechedTags] = useState([]);
  const [findingsNames, setFindingsNames] = useState([]);
  const [BasicModalEyeOpen, setBasicModalEyeOpen] = useState(false);
  const [selectedFechedTagsId, setSelectedFechedTagsId] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [SelectedMetalId, setSelectedMetalId] = useState([]);
  const [SelectedDiamondId, setSelectedDiamondId] = useState([]);
  const [CalculationData, setCalculationData] = useState([]);
  const [MovedItemsId, setMovedItemsId] = useState([]);
  const [IsLoadingCalculation, setIsLoadingCalculation] = useState(false);
  const [AdminUploadedImageIds, setAdminUploadedImageIds] = useState([]);
  const [AssignDesignerModalOpen, setAssignDesignerModalOpen] = useState(false);
  const [AllDesigners, setAllDesigners] = useState([]);
  const [AdminUploadedIds, setAdminUploadedIds] = useState([]);
  const [assignedDesignerId, setAssignedDesignerId] = useState(null);
  const [openAdminFolder, setOpenAdminFolder] = useState(false);
  const [AdminBasicItemId, setAdminBasicItemId] = useState(null);
  const [SearchDesigners, setSearchDesigner] = useState("");
  const [showMrp,setShowMrp] = useState([])

  const [ItemMovedToAssignment, setItemMovedToAssignment] = useState([]);
  console.log(AssignDesignerModalOpen, "AssignDesignerModalOpen");
  const [formData, setFormData] = useState({
    SKU: [],
    productCategory: "",
    length: "",
    width: "",
    height: "",
    typeOfMetal: "",
    diamondType: "",
    approxDiamondWeight: "",
    findings: "",
    approxMetalWeights: "",
    approxMRP: "",
    tag: "",
    notes: "",
  });

  const schema = Joi.object({
    SKU: Joi.required().messages({
      "array.min": `SKU field must contain at least one item.`,
      "any.required": `SKU field is required and cannot be empty.`,
    }),
    productCategory: Joi.required().messages({
      "string.empty": `cannot be empty`,
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
    typeOfMetal: Joi.required().messages({
      "string.empty": `cannot be empty`,
    }),
    diamondType: Joi.required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxDiamondWeight: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxMetalWeights: Joi.string().required().messages({
      "string.empty": `cannot be empty`,
    }),
    approxMRP: Joi.number().required().messages({
      "string.empty": `cannot be empty`,
    }),
    tag: Joi.array().items(Joi.required()).min(1).required().messages({
      "any.required": "Tags are required",
      "array.min": "At least one tag is required",
      "array.includesRequiredUnknowns": "Each tag must be a string",
      "string.empty": `cannot be empty`,
    }),
    findings: Joi.required().messages({
      "string.empty": `cannot be empty`,
    }),
    notes: Joi.string().messages({
      "string.empty": `cannot be empty`,
    }),
  });

  console.log(assignedDesignerId, "assignedDesignerId");
  console.log(AdminBasicDetailsOpen, "AdminBasicDetailsOpen");

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
      console.log("AdminBadicDetails", formData);
      // onClose();
      move_to_assignment_from_admin(
        formData,
        setSuccessModalOpen,
        setAssignDesignerModalOpen,
        setSuccessMessage,
        setAdminBasicDetailsOpen,
        setAdminBasicItemId,
        setFormData
      );
      setErrors({ undefined });
    }
  };

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  useEffect(() => {
    if (FindingsList.length > 0) {
      const names = FindingsList.map((findings) => ({
        name: findings.find_name,
        id: findings.id,
      }));
      setFindingsNames(names);
      console.log("Findings names set:", names);
    }
  }, [FindingsList]);
  console.log(findingsNames, "FindingsList");

  useEffect(() => {
    if (selectedTags.length > 0) {
      const tags = selectedTags.map((tag) => ({ id: tag.id, name: tag.name }));
      setSelectedFechedTags(tags);
      console.log("Fetched tags set:", tags);
    }
  }, [selectedTags]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      approxMRP: CalculationData?.calculated_mrp,
      SKU: [AdminUploadedImageIds?.designcode],
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
      console.log("AdminFormdAta", formData);
      // Clear errors
      setErrors({ undefined });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFileName(file.name);
        setAdminUploadedImageFile(file);
        setImageSingleError("");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBasicModalEye = () => {
    setBasicModalEyeOpen(true);
  };
  const handleBasicEyeOpen = () => {
    setBasicModalEyeOpen(true);
  };
  const handleBasicEyeClose = () => {
    setBasicModalEyeOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log("image", uploadedImage);

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  useEffect(() => {
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    tag_List_basicDetails(setSelectedTags);
    findings_List_basicDetails(setFindingsList);
    product_category_basicDetails(setListProductCategory);
    list_all_designers(setAllDesigners);
  }, []);
  console.log(AllDesigners, "AllDesigners");

  const handleUploadAdminImageClick = () => {
    if (uploadedImage === null) {
      setImageSingleError("Please upload an image");
      return; 
    }
    upload_admin_image_assignment(
      setAdminUploadedImageIds,
      AdminUploadedImageFile,
      setAdminBasicDetailsOpen,
      setAdminUploadedIds,
      setImageSingleError
    );
  };

  // useEffect(() => {
  //   if (
  //     formData.approxMetalWeights &&
  //     formData.approxDiamondWeight &&
  //     SelectedDiamondId &&
  //     SelectedMetalId
  //   ) {
  //     basic_calculation(
  //       setIsLoadingCalculation,
  //       formData,
  //       SelectedDiamondId,
  //       SelectedMetalId,
  //       setCalculationData
  //     );
  //   }
  // }, [
  //   formData.approxMRP,
  //   formData.approxMetalWeights,
  //   formData.approxDiamondWeight,
  //   SelectedMetalId,
  //   SelectedDiamondId,
  // ]);

  const CalculateApproxAmount = () => {
    if (
      formData.approxMetalWeights &&
      formData.approxDiamondWeight &&
      SelectedDiamondId &&
      SelectedMetalId
    ) {
      basic_calculation(
        setIsLoadingCalculation,
        formData,
        SelectedDiamondId,
        SelectedMetalId,
        setCalculationData
      );
    }
  };
  useEffect(() => {
    if (
      formData.approxMetalWeights &&
      formData.approxDiamondWeight &&
      SelectedDiamondId &&
      SelectedMetalId &&
      formData.diamondType &&
      formData.typeOfMetal
    ) {
      CalculateApproxAmount();
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        approxMRP: 0,
      }));
    }
  }, [
    formData.approxMetalWeights,
    formData.approxDiamondWeight,
    SelectedDiamondId,
    SelectedMetalId,
    formData.diamondType,
    formData.typeOfMetal,
  ]);
  useEffect(() => {
    if (CalculationData) {
      setShowMrp(CalculationData.calculated_mrp);
      setFormData(prevFormData => ({
        ...prevFormData,
        approxMRP: CalculationData.calculated_mrp,
      }));
    }
  }, [CalculationData]);

  console.log(AdminBasicItemId, "AdminUploadedImageIds");
  console.log(AdminUploadedImageIds);

  // const handleAssignButton = (userIdString) => {
  //   const userId = String(userIdString);
  //   assign_to_designers(
  //     useId,
  //     AdminUploadedIds,
  //     onClose,
  //     setSuccessMessage,
  //     setSuccessModalOpen
  //   );
  // };

  const handleAssignClick = (designerId) => {
    if (assignedDesignerId === designerId) {
      setAssignedDesignerId(null); // Unassign if already assigned
    } else {
      setAssignedDesignerId(designerId); // Assign the new designer
    }

    // Call the external handler if needed
    handleAssignButton(designerId);
  };

  const handleAssignDesigners = () => {
    if (!assignedDesignerId) {
      toast.warn("Choose a designer", {
        position: "top-right",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "red",
        className: "toast-warning",
      });
      return;
    }
    assign_to_designers(
      assignedDesignerId,
      AdminUploadedIds,
      onClose,
      setSuccessModalOpen,
      setSuccessMessage,
      setOpenAdminFolder,
      setAssignDesignerModalOpen,
      setAdminBasicDetailsOpen,
      setUploadedImage,
      setAssignedDesignerId,
      setSearchDesigner,
      setAllDesigners
    );
  };

  const handleBackdropClick = (event) => {
    // Prevent the modal from closing when clicking the backdrop
    event.stopPropagation();
  };
  const handleCloseButton = () => {
    onClose();
    setUploadedImage(null);
    setAdminBasicDetailsOpen(false);
    setImageSingleError("")
    setFormData({
      SKU: [],
      productCategory: "",
      length: "",
      width: "",
      height: "",
      typeOfMetal: "",
      diamondType: "",
      approxDiamondWeight: "",
      findings: "",
      approxMetalWeights: "",
      approxMRP: "",
      tag: "",
      notes: "",
    });
  };
  const handleSearchDesigners = (event) => {
    const value = event.target.value;
    setSearchDesigner(value);

    if (value === "") {
      console.log("Search field is empty");
      listDesignersByName(setIsLoading, setAllDesigners, value);
    }
  };
  const SearchDesiners = () => {
    listDesignersByName(setIsLoading, setAllDesigners, SearchDesigners);
  };

  console.log(assignedDesignerId, "assignedDesignerId");
  console.log(SearchDesigners, "SearchDesigners");
  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={AdminBasicModalOpen}
            // onClose={handleClose}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0" }}
            BackdropProps={{
              onClick: handleBackdropClick, // Stop backdrop clicks from closing the modal
            }}
          >
            <Box sx={style}>
              <Typography>
                <div className="adminBasicModal_container">
                  <div style={{ position: "relative" }}>
                    <div
                      style={{ position: "absolute", right: "0" }}
                      onClick={handleCloseButton}
                    >
                      <img src={closeButton} alt="" />
                    </div>
                  </div>
                  <div className="numbers_container">
                    <div className="Container1">
                      <div className="parant1">
                        <div
                          className="numberPro"
                          style={{
                            border: uploadedImage
                              ? "none"
                              : "1px solid #23A064",
                          }}
                        >
                          {uploadedImage ? (
                            <img
                              style={{ width: "25px" }}
                              src={SuccessTickk}
                              alt=""
                            />
                          ) : (
                            <p
                              style={{
                                display: uploadedImage ? "none" : "block",
                              }}
                            >
                              1
                            </p>
                          )}
                        </div>
                        <div className="line1"></div>
                      </div>
                      <div className="headerTExt">Upload File</div>
                    </div>
                    <div className="Container2">
                      <div className="parant1">
                        {AssignDesignerModalOpen ? (
                          <>
                            <div
                              className="numberPro2"
                              style={{
                                border: AssignDesignerModalOpen
                                  ? "1px solid #23A064"
                                  : "1px solid #B4C3D0",
                                color: "#23A064",
                              }}
                            >
                              <img
                                style={{ width: "25px" }}
                                src={SuccessTickk}
                                alt=""
                              />
                            </div>
                          </>
                        ) : (
                          <div
                            className="numberPro2"
                            style={{
                              border: uploadedImage
                                ? "1px solid #23A064"
                                : "1px solid #B4C3D0",
                              color: "#23A064",
                            }}
                          >
                            <p>2</p>
                          </div>
                        )}
                        <div className="line2"></div>
                      </div>
                      <div className="headerTExt">Add basic details</div>
                    </div>
                    <div className="Container3">
                      <div className="parant1">
                        <div className="numberPro3">
                          {assignedDesignerId === null ? (
                            <p>3</p>
                          ) : (
                            <div
                              className="numberPro3"
                              style={{
                                border: "none",
                                color: "#23A064",
                              }}
                            >
                              <img
                                style={{ width: "25px" }}
                                src={SuccessTickk}
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                        {/* <div className="line1"></div> */}
                      </div>
                      <div className="headerTExt">Assign designer</div>
                    </div>
                  </div>
                  {AdminBasicDetailsOpen ? (
                    <>
                      {AssignDesignerModalOpen ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                              height: "100%",
                            }}
                          >
                            <div className="Assigner_Designer_Container">
                              <label className="assignDesignerTitle">
                                Assign Designer
                              </label>
                              <div className="AssignInput">
                                <div className="assigner_SearchBar">
                                  <input
                                    type="text"
                                    className="assignDesignerSearchBar"
                                    onChange={handleSearchDesigners}
                                    placeholder="Search"
                                  />
                                </div>
                                <div className="assignSearchBar_button">
                                  <button onClick={SearchDesiners}>
                                    Search
                                  </button>
                                </div>
                              </div>
                              <div
                                className="main"
                                style={{ margin: "20px 0px" }}
                              >
                                {isLoading ? (
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CircularProgress
                                        size={40} // Set the desired size
                                        sx={{
                                          color: "#126e72",
                                          padding: "8px 10px",
                                          width: "35px",
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    {AllDesigners.map((item, index) => (
                                      <div className="Avata" key={index}>
                                        <div className="avatarContainer">
                                          <div className="leftTo">
                                            <div className="avatarImageContainer">
                                              <img
                                                src={item.image}
                                                alt=""
                                                className="avataImage"
                                              />
                                            </div>
                                            <div className="detailsAvatar">
                                              <span className="nameA">
                                                {item.name}
                                              </span>
                                              {/* <span className="nameB">
                                                {item.Usertype}
                                              </span> */}
                                            </div>
                                          </div>
                                          <div className="rightTo">
                                            <div className="tagged">
                                              <span className="taggedText">
                                                {/* {item.status} */}
                                                {assignedDesignerId === item.id
                                                  ? "Assigned"
                                                  : ""}
                                              </span>
                                            </div>
                                            <div>
                                              <button
                                                onClick={() =>
                                                  handleAssignClick(item.id)
                                                }
                                                style={{
                                                  background:
                                                    assignedDesignerId ===
                                                      item.id && "#fff",
                                                  color:
                                                    assignedDesignerId ===
                                                      item.id && "#126E72",
                                                  border:
                                                    assignedDesignerId ===
                                                      item.id &&
                                                    "1px solid #126E72",
                                                }}
                                                className={`avatarButton_designer ${
                                                  assignedDesignerId === item.id
                                                    ? "assigned"
                                                    : ""
                                                }`}
                                              >
                                                {assignedDesignerId === item.id
                                                  ? "Unassign"
                                                  : "Assign"}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="line"></div>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                              <button
                                className="next-button"
                                type="submit"
                                // onClick={() => handleNextClick()}
                                onClick={() => handleAssignDesigners()}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="container">
                            <span className="titleBasic">Basic details</span>
                            <form onSubmit={handleSubmit}>
                              <div className="formContainer">
                                <label htmlFor="" className="label-text">
                                  Product Id
                                </label>
                                {/* <TagsInput
                              disabled
                              value={formData.SKU}
                              onChange={(value) =>
                                setFormData((prevState) => ({
                                  ...prevState,
                                  SKU: AdminUploadedImageIds.designCode,

                                }))
                              }
                              name="SKU"
                              // placeHolder="Findings"
                              classNames="inputTag"
                            /> */}
                                <input
                                  type="text"
                                  className="inputFields"
                                  name="SKU"
                                  value={
                                    AdminUploadedImageIds?.designcode ||
                                    getSelectedDesign
                                  }
                                  onChange={handleInput}
                                />
                                <div>
                                  {errors.SKU && (
                                    <span className="error_input_p">
                                      {errors.SKU}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="productCategory">
                                <label htmlFor="" className="label-text">
                                  Product Category
                                </label>
                                <Select
                                  showSearch
                                  placeholder="-Select-"
                                  optionFilterProp="children"
                                  // value={formData.typeOfMetal}
                                  onChange={(value) =>
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      productCategory: [value],
                                    }))
                                  }
                                  onSearch={onSearch}
                                  filterOption={filterOption}
                                  style={{
                                    width: "100%",
                                    zIndex: "9999999",
                                    background: "#006E7F1A",
                                  }}
                                  options={ProudctCategory.map((tag) => ({
                                    label: tag.name,
                                    value: tag.id,
                                  }))}
                                />
                                <div>
                                  {errors.productCategory && (
                                    <span className="error_input_p">
                                      {errors.productCategory}
                                    </span>
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
                                    placeholder="-Select-"
                                    optionFilterProp="children"
                                    // value={formData.typeOfMetal}
                                    onChange={(value) => {
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        typeOfMetal: [value],
                                      }));
                                      setSelectedMetalId(value); // Update the state with the selected metal ID
                                    }}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    style={{
                                      width: "100%",
                                      zIndex: "9999999",
                                      background: "#006E7F1A",
                                    }}
                                    options={metalTypeDropDown.map((item) => ({
                                      value: item.id,
                                      label: item.metal_name,
                                    }))}
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
                                    placeholder="-Select-"
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        diamondType: [value],
                                      }));
                                      setSelectedDiamondId(value); // Update the state with the selected diamond ID
                                    }}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    style={{
                                      width: "100%",
                                      zIndex: 999999999,
                                      background: "#006E7F1A",
                                    }}
                                    options={diamonType.map((item) => ({
                                      value: item.id,
                                      label: item.name,
                                    }))}
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
                              <div className="">
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
                                <div className="bm_eye_parant">
                                  <label htmlFor="" className="label-text">
                                    Approx MRP
                                  </label>
                                  <input
                                    type="number"
                                    className="inputFields"
                                    name="approxMRP"
                                    value={formData.approxMRP}
                                    onChange={handleInput}
                                    readOnly
                                  />
                                  {IsLoadingCalculation ? (
                                    <div
                                      className="basic_eye_cirCular"
                                      onClick={handleBasicModalEye}
                                    >
                                      <CircularProgress
                                        size={35} // Set the desired size
                                        sx={{
                                          color: "#000000",
                                          padding: "8px 10px",
                                          width: "35px",
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className="basic_eye"
                                      onClick={handleBasicModalEye}
                                    >
                                      <img src={EyeIcons} alt="" />
                                    </div>
                                  )}

                                  <div>
                                    {errors.approxMRP && (
                                      <span className="error_input_p">
                                        {errors.approxMRP}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="" className="label-text">
                                    Findings
                                  </label>
                                  <Select
                                    mode="multiple"
                                    style={{
                                      width: "100%",
                                      zIndex: "9999999",
                                      background: "#006E7F1A",
                                    }}
                                    placeholder="Select tags"
                                    onChange={(value) => {
                                      console.log("Tag changed to:", value);
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        findings: value,
                                      }));
                                    }}
                                    options={findingsNames.map((tag) => ({
                                      label: tag.name,
                                      value: tag.id,
                                    }))}
                                  />
                                  {/* <TagsInput
                          value={findingsNames}
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              findings: value,
                            }))
                          }
                          name="findings"
                          // placeHolder="Findings"
                          classNames="inputTag"
                        /> */}
                                  {/* <input
                          type="text"
                          className="inputFields"
                          name="findings"
                          value={formData.findings}
                          onChange={handleInput}
                        /> */}
                                  <div>
                                    {errors.findings && (
                                      <span className="error_input_p">
                                        {errors.findings}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="tagsInputfeild">
                                  <label htmlFor="" className="label-text">
                                    Tags
                                  </label>
                                  {/* <TagsInput
                          value={selectedFechedTags}
                          onChange={(value) => {
                            console.log("Tag changed to:", value); // Log the tag value to the console
                            setFormData((prevState) => ({
                              ...prevState,
                              tag: value,
                            }));
                          }}
                          name="tags"
                          // placeHolder="Tags"
                          classNames="inputTag"
                        /> */}
                                  <Select
                                    mode="multiple"
                                    style={{
                                      width: "100%",
                                      zIndex: "9999999",
                                      background: "#006E7F1A",
                                    }}
                                    placeholder="Select tags"
                                    onChange={(value) => {
                                      console.log("Tag changed to:", value);
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        tag: value,
                                      }));
                                    }}
                                    options={selectedFechedTags.map((tag) => ({
                                      label: tag.name,
                                      value: tag.id,
                                    }))}
                                  />
                                  <div>
                                    {errors.tag && (
                                      <span className="error_input_p">
                                        {errors.tag}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="textArea">
                                <label htmlFor="" className="label-text">
                                  Notes
                                </label>
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
                                    <span className="error_input_p">
                                      {errors.notes}
                                    </span>
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
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="title_upload_container">
                        <div>

                        <p>Upload File</p>
                        <div className="upload_admin_image">
                          {uploadedImage ? (
                            <div className="image_contianer_upload">
                              <img
                                src={uploadedImage}
                                alt="Uploaded"
                                style={{ width: "80%", marginBottom: "10px" }}
                              />
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  {uploadedFileName}
                                  <button
                                    className="delete_uploaded_image"
                                    onClick={handleImageRemove}
                                  >
                                    <img src={DeleteICon} alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div style={{ textAlign: "center" }}>
                              <div>
                                <p>PNG/JPEG</p>
                              </div>
                              <input
                                type="file"
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="upload-input"
                              />
                              <div className="dragText">
                                Drag & Drop or{" "}
                                <label
                                  htmlFor="upload-input"
                                  style={{
                                    color: "#0464D5",
                                    fontSize: "13px",
                                    padding: "0px 5px",
                                  }}
                                >
                                  choose File
                                </label>
                                to upload{" "}
                              </div>
                            </div>
                          )}
                        </div>
                        <div style={{position:'relative'}}>
                       {ImageSingleError && (
                            <span className="error_select">
                              {ImageSingleError}
                            </span>
                          )}
                       </div>
                        </div>

                        <div>
                     
                          {!AdminBasicDetailsOpen && (
                            <div
                              style={{
                                // position: "absolute",
                                width: "100%",
                                // bottom: "0",
                              }}
                            >
                              <button
                                className="next-button"
                                type="submit"
                                // onClick={() => handleNextClick()}
                                onClick={() => handleUploadAdminImageClick()}
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <SuccessModal
                    successModalOpen={successModalOpen}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    successMessage={successMessage}
                  />
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
        <Modal open={BasicModalEyeOpen} onClose={handleBasicEyeClose}>
          <Box sx={BasicEye}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="headerModal">
                <span
                  className="assignTitle"
                  style={{ position: "absolute", top: 10, left: 25 }}
                >
                  MRP Calculation
                </span>
                <button
                  onClick={() => handleBasicEyeClose()}
                  // onClose={onClose}
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 30,
                    background: "none",
                    border: "none",
                  }}
                >
                  <img src={closeButton} />
                </button>
              </div>
            </Typography>
            <Typography>
              <div className="calculationContainer">
                <table className="calculationTable">
                  <thead>
                    <tr>
                      {/* <th>Type</th>
                  <th>Amount</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="calculationType">Net Weight</td>
                      <td className="calculatedAmount">
                        {CalculationData?.net_weight?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Metal Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData.metal_cost?.toFixed(2)}
                       
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Diamond Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData?.diamond_cost}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Manufacturing Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData?.manufacturing_cost?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">GST</td>
                      <td className="calculatedAmount">
                        {CalculationData?.gst?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Production Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData?.production_cost?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Value Add</td>
                      <td className="calculatedAmount">
                        {CalculationData?.value_additions?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Calculated MRP</td>
                      <td className="calculatedAmount">
                        {CalculationData?.calculated_mrp?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* <AssignmentModal
      open={openAdminFolder}
      AdminUploadedIds={AdminUploadedIds}
      onClose={() => setOpenAdminFolder(false)}
      AdminBasicItemId={AdminBasicItemId}
      setAssignDesignerModalOpen={ setAssignDesignerModalOpen}
      setAdminBasicDetailsOpen={setAdminBasicDetailsOpen}
      setUploadedImage={setUploadedImage}
      setAssignedDesignerId={ setAssignedDesignerId}
      
      
      /> */}
      <ToastContainer />
    </div>
  );
};

export default AdminBasicDetailsModal;
