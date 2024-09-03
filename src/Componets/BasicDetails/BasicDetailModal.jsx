import React, { useEffect, useState } from "react";
import "./BasicDetails.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, Backdrop, Fade } from "@mui/material";
import { Select, Space } from "antd";
import { TagsInput } from "react-tag-input-component";
import Joi from "joi";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import EyeIcons from "../../assets/bmEye.png";
import closeButton from "../../assets/closeButton.svg";
import like from "../../assets/like.png";

import {
  assignmentPanelSelectedEdit,
  basic_calculation,
  diamond_type_dropdown_basicDetails,
  editBasicDetails,
  findings_List_basicDetails,
  metal_type_dropdown_basicDetails,
  move_to_assignment,
  move_to_folder,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";
import SuccessModal from "../SuccessModal/SuccessModal";
import CircularProgress from "@mui/material/CircularProgress";
import closeButtonBM from "../../assets/closeButtonBM.png";

const style = {
  position: "absolute",
  right: "0px",
  width: "100%",
  height: "100%",
  // bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px 0 0 8px",
  overflowY: "scroll",
  // p: 2,
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
  width: 350,
  height: "auto",
  p: 4,
};

const BasicDetailModal = ({
  open,
  onClose,
  selectedAssignment,
  setAssignmentFolder,
  setSelectedAssignment,
  selectedDesignCode,
  getSelectedDesign,
  setData,
  setSelectedDesigns,
  setShowRadioButtons,
  setSelectButtonLabel,
  name,
  DetailsProductId,
  folderIdA,
  designId,
  basicDetails,
  updateEditFunction,
  setSelectedIdsForDelet,
  pid,
  setFolderDetailsView,
  detailId,
  Data,
  unvotedData,
  setUnvotedData,
}) => {
  // create modal

  // const [open, setOpen] = React.useState(false);
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
  const [SelectedMetalId, setSelectedMetalId] = useState(
    localStorage.getItem("selectedMetalType")
      ? localStorage.getItem("selectedMetalType")
      : []
  );
  const [SelectedDiamondId, setSelectedDiamondId] = useState(
    localStorage.getItem("selectedDiamondType")
      ? localStorage.getItem("selectedDiamondType")
      : []
  );
  const [CalculationData, setCalculationData] = useState([]);
  const [MovedItemsId, setMovedItemsId] = useState([]);
  const [IsLoadingCalculation, setIsLoadingCalculation] = useState(false);
  const [showMrp, setShowMrp] = useState([]);

  const [ItemMovedToAssignment, setItemMovedToAssignment] = useState([]);

  const [formData, setFormData] = useState({
    SKU: "",
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
    tag: [],
    notes: "",
  });

  console.log(basicDetails, "basicDetails");

  useEffect(() => {
    if (name === "editbasicDetails" && basicDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        SKU: DetailsProductId || "",
        productCategory: basicDetails.product_category || "",
        length: basicDetails.length || "",
        width: basicDetails.width || "",
        height: basicDetails.height || "",
        typeOfMetal: basicDetails.type_of_metal || "",
        diamondType: basicDetails.diamond_type || "",
        approxDiamondWeight: basicDetails.approx_diamond_weight || "",
        findings: basicDetails.findings || "",
        approxMetalWeights: basicDetails
          ? basicDetails.approx_metal_weight
          : "",
        approxMRP: basicDetails.approx_price || "",
        tag: basicDetails.tag || "",
        notes: basicDetails.notes || "",
      }));
    }
  }, [name, DetailsProductId, basicDetails]);
  // console.log(successMessage, "success");
  // console.log(formData, "basicFormdData");
  // console.log(selectedAssignment, "basic=====>");
  // console.log(formData.approxMetalWeights, "metalWieght");
  // console.log(metalTypeDropDown, "metalTypeDropDown");
  // console.log(ProudctCategory, "taggggg");
  // console.log(CalculationData, "CalculationData");
  // console.log(basicDetails && basicDetails.approx_metal_weight, "basicDtails");

  const schema = Joi.object({
    SKU: Joi.required().messages({
      "array.min": `SKU field must contain at least one item.`,
      "any.required": `SKU field is required and cannot be empty.`,
    }),
    productCategory: Joi.array().min(1).required().messages({
      "array.base": "cannot be empty",
      "array.empty": "Product category cannot be empty",
      "array.min": "Product category cannot be empty",
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
    typeOfMetal: Joi.array().min(1).required().messages({
      "array.base": "cannot be empty",
      "array.empty": "Product category cannot be empty",
      "array.min": "Product category cannot be empty",
    }),
    diamondType: Joi.array().min(1).required().messages({
      "array.base": "cannot be empty",
      "array.empty": "Product category cannot be empty",
      "array.min": "Product category cannot be empty",
    }),
    approxDiamondWeight: Joi.alternatives()
      .try(
        Joi.number().custom((value, helpers) => {
          if (value === 0) {
            return helpers.message("cannot be zero");
          }
          return value;
        }),
        Joi.string().custom((value, helpers) => {
          if (value === "0") {
            return helpers.message("cannot be zero");
          }
          return value;
        })
      )
      .required()
      .messages({
        "alternatives.match": "must be a valid number or string",
        "string.empty": "cannot be empty",
      }),
    approxMetalWeights: Joi.alternatives()
      .try(
        Joi.number().custom((value, helpers) => {
          if (value === 0) {
            return helpers.message("cannot be zero");
          }
          return value;
        }),
        Joi.string().custom((value, helpers) => {
          if (value === "0") {
            return helpers.message("cannot be zero");
          }
          return value;
        })
      )
      .required()
      .messages({
        "alternatives.match": "must be a valid number or string",
        "string.empty": "cannot be empty",
      }),
    approxMRP: Joi.number().required().messages({
      "number.base": "Approximate MRP must be a number",
      "number.empty": "Approximate MRP cannot be empty", // Handles cases where it is empty but should be a number
      "any.required": "cannot be empty", // Handles cases where the field is missing
    }),
    tag: Joi.array().allow(null).allow("").messages({
      "array.base": "cannot be empty",
      "array.empty": "cannot be empty",
      "array.min": " cannot be empty",
    }),
    findings: Joi.array().allow(null).allow("").messages({
      "array.base": "cannot be empty",
      "array.empty": " cannot be empty",
      "array.min": "cannot be empty",
    }),
    notes: Joi.string().allow("").messages({
      "string.empty": `cannot be empty`,
    }),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      approxMRP: CalculationData?.calculated_mrp,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, {
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

  const pathname = location.pathname;
  const isStatusPage = pathname === "/assignmentviewsAll/";
  const isStatusPageWithId = pathname.startsWith("/assignmentviewsAll/");
  const isStatusPageName = pathname.startsWith("/assignmentview/");

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
      // onClose();
      if (name === "editbasicDetails") {
        editBasicDetails(formData, setFormData, folderIdA, designId);
      } else {
        console.log("formData-----------hdsc", formData);
        move_to_assignment(
          formData,
          onClose,
          setSuccessModalOpen,
          setSuccessMessage,
          setIsLoading,
          setSelectedDesigns,
          setData,
          setShowRadioButtons,
          setSelectButtonLabel,
          setShowAssignmentModal,
          setMovedItemsId,
          setFormData,
          getSelectedDesign,
          () => {
            setCalculationData([]);
          },
          setSelectedIdsForDelet,
          setUnvotedData
        );
      }
      // setShowAssignmentModal(true);
      // Clear errors
      setErrors({ undefined });
    }
  };
  const handleEditDetails = () => {
    const { error } = schema.validate(formData, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
    } else if (isStatusPageName) {
      console.log("Form submitted:", formData);
      editBasicDetails(
        formData,
        folderIdA,
        designId,
        setSuccessMessage,
        setSuccessModalOpen,
        onClose,
        updateEditFunction
      );
      setErrors({ undefined });
    } else if (isStatusPageWithId) {
      console.log("Form submitted:", formData);
      assignmentPanelSelectedEdit(
        formData,
        pid,
        setSuccessMessage,
        setSuccessModalOpen,
        onClose,
        updateEditFunction,
        setIsLoading,
        setFolderDetailsView,
        detailId
      );
    }
  };
  console.log(errors, "eeeeeeeee==>");

  useEffect(() => {
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    tag_List_basicDetails(setSelectedTags);
    findings_List_basicDetails(setFindingsList);
    product_category_basicDetails(setListProductCategory);
  }, []);

  // Use useEffect to initialize findingsNames from FindingsList on component mount
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
  // const findinsList = FindingsList.map((findings) => findings.find_name);
  // const selectedNames = selectedTags.map((tag) => tag.name);
  console.log(selectedFechedTags, "FindingsList");

  const handleBasicModalEye = () => {
    setBasicModalEyeOpen(true);
  };
  const handleBasicEyeOpen = () => {
    setBasicModalEyeOpen(true);
  };
  const handleBasicEyeClose = () => {
    setBasicModalEyeOpen(false);
  };

  console.log("selectedFechedTagsId-->", selectedFechedTags);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // console.log(selectedDesignCode)

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
        SelectedMetalId,
        SelectedDiamondId,
        setCalculationData
      );
      // setShowMrp(CalculationData?.calculated_mrp)
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
        approxMRP: CalculationData?.calculated_mrp,
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
    if (name === "editbasicDetails" && basicDetails) {
      // Update selected IDs based on basicDetails
      setSelectedMetalId(Number(basicDetails.type_of_metal));
      setSelectedDiamondId(Number(basicDetails.diamond_type));

      // Call calculation if all values are present
      if (
        formData.approxMetalWeights &&
        formData.approxDiamondWeight &&
        basicDetails.type_of_metal &&
        basicDetails.diamond_type
      ) {
        CalculateApproxAmount();
      }
    }
  }, [
    name,
    basicDetails,
    formData.approxMetalWeights,
    formData.approxDiamondWeight,
  ]);

  console.log(
    SelectedMetalId,
    SelectedDiamondId,
    formData.approxMetalWeights,
    formData.approxDiamondWeight,
    "metalId=diamondId+metalW=diamonW"
  );

  useEffect(() => {
    if (CalculationData) {
      // setShowMrp(CalculationData.calculated_mrp);
      setFormData((prevFormData) => ({
        ...prevFormData,
        approxMRP: CalculationData.calculated_mrp,
      }));
    }
  }, [CalculationData]);

  console.log(CalculationData, "CalculationData");
  // const ItemMovedToAssignment = MovedItemsId?.map((item)=> item.item_id)
  // console.log(ItemMovedToAssignment,"MovedItemsId")
  useEffect(() => {
    if (MovedItemsId) {
      const mappedItems = MovedItemsId.map((item) => item.item_id);
      setItemMovedToAssignment(mappedItems);
    }
  }, [MovedItemsId]);

  const handleCLoseButton = () => {
    onClose();
    setSelectedDesigns([]);
    setShowRadioButtons(false);
    setSelectButtonLabel("Select");
    setSelectedIdsForDelet([]);
    setFormData({
      SKU: "",
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
      tag: [],
      notes: "",
    });
    setErrors({});

    setCalculationData([]);
  };

  const filteredData = Data?.filter((item) =>
    getSelectedDesign.includes(item.designcode)
  );

  const filteredUvoted = unvotedData?.filter((item) =>
    getSelectedDesign.includes(item.designcode)
  );

  console.log(filteredData, "filteredData");

  // const [selectedValue, setSelectedValue] = useState(null);
  // const [selectedLabel, setSelectedLabel] = useState(null);

  // const [selectedDiamond, setSelectedDiamond] = useState(null);
  // const [selectedLabelDiamond, setSelectedLabelDiamond] = useState(null);

  // useEffect(() => {
  //   const storedIdDiamond = Number(localStorage.getItem("selectedDiamondType"));
  //   console.log(storedIdDiamond,"storedIdDiamond")
  //   if (storedIdDiamond) {
  //     const matchedItem = diamonType.find((item) => item.id === storedIdDiamond);
  //     if (matchedItem) {
  //       setSelectedDiamond(storedIdDiamond);
  //       setSelectedLabelDiamond(matchedItem.name);
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         typeOfMetal: storedIdDiamond,
  //       }));
  //     }
  //   }
  // }, [ setFormData]);

  // useEffect(() => {
  //   const storedId = Number(localStorage.getItem("selectedMetalType"));
  //   console.log(storedId,"storedId")
  //   if (storedId) {
  //     const matchedItem = metalTypeDropDown.filter((item) => item.id === storedId);
  //     console.log(matchedItem,"matchedItem")
  //     if (matchedItem) {
  //       setSelectedValue(storedId);
  //       setSelectedLabel(matchedItem.metal_name);
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         typeOfMetal: storedId,
  //       }));
  //     }
  //   }
  // }, [ setFormData]);

  // const currentMetal = Number(localStorage.getItem("selectedMetalType"));
  // const filterData = metalTypeDropDown.filter((item) => item.id === currentMetal);

  // console.log("filterData", filterData);
  // console.log("selectedLabel", selectedLabel);
  // console.log(filterData,"filterData")
  const metalValue = localStorage.getItem("selectedMetalType");
  const [selectedValue, setSelectedValue] = useState(metalValue || null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedLabelDiamond, setSelectedLabelDiamond] = useState(null);

  useEffect(() => {
    const storedIdDiamond =
      Number(basicDetails?.diamond_type) ||
      Number(localStorage.getItem("selectedDiamondType"));
    if (storedIdDiamond) {
      const matchedItem = diamonType.find(
        (item) => item.id === storedIdDiamond
      );
      if (matchedItem) {
        setSelectedDiamond(storedIdDiamond);
        setSelectedLabelDiamond(matchedItem.name);
        setFormData((prevState) => ({
          ...prevState,
          diamondType: [storedIdDiamond],
        }));
      }
    }
  }, [diamonType, basicDetails, localStorage.getItem("selectedDiamondType")]);

  // Effect to set metal type from localStorage or basicDetails
  useEffect(() => {
    const storedId =
      Number(basicDetails?.type_of_metal) ||
      Number(localStorage.getItem("selectedMetalType"));
    if (storedId) {
      const matchedItem = metalTypeDropDown.find(
        (item) => item.id === storedId
      );
      if (matchedItem) {
        setSelectedValue(storedId);
        setSelectedLabel(matchedItem.metal_name);
        setFormData((prevState) => ({
          ...prevState,
          typeOfMetal: [storedId],
        }));
      }
    }
  }, [
    metalTypeDropDown,
    basicDetails,
    localStorage.getItem("selectedMetalType"),
  ]);

  console.log(SelectedDiamondId, "SelectedDiamondId");

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
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              onClick: (event) => event.stopPropagation(), // Prevent modal close on backdrop click
            }}
          >
            <Box sx={style}>
              <div className="modal_card_images">
                {filteredData?.map((item, index) => (
                  <>
                    <div
                      className="New_Design_card"
                      key={item.id}
                      style={{ width: "250px" }}
                    >
                      <div
                        className="Card_img"
                        style={{
                          marginTop: "12px",
                          height: "170px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={item.image}
                          alt="image"
                          // onClick={() => OpenAnntaitionmodal(item)}
                        />
                      </div>
                      <div className="Card_Details">
                        <h3>ID : {item.designcode}</h3>
                        <div className="Card_Details_Inner">
                          <div className="Inner_Left">
                            <p>{item.user_name}</p>
                            <p>{item.created_at}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                          alignItems: "end",
                        }}
                      >
                        <div className="Inner_Right" style={{ width: "50px" }}>
                          <p style={{ color: "white", fontSize: "12px" }}>
                            {item?.likes_count} <img src={like} alt="" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {filteredData?.length === 0 &&
                  filteredUvoted?.map((item, index) => (
                    <>
                      <div
                        className="New_Design_card"
                        key={item.id}
                        style={{ width: "250px" }}
                      >
                        <div
                          className="Card_img"
                          style={{
                            marginTop: "12px",
                            height: "170px",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={item.image}
                            alt="image"
                            // onClick={() => OpenAnntaitionmodal(item)}
                          />
                        </div>
                        <div className="Card_Details">
                          <h3>ID : {item.designcode}</h3>
                          <div className="Card_Details_Inner">
                            <div className="Inner_Left">
                              <p>{item.user_name}</p>
                              <p>{item.created_at}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "100%",
                            alignItems: "end",
                          }}
                        >
                          <div
                            className="Inner_Right"
                            style={{ width: "50px" }}
                          >
                            <p style={{ color: "white", fontSize: "12px" }}>
                              {item?.likes_count} <img src={like} alt="" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <Typography className="modal_edit_section">
                <div className="container">
                  <div className="basicClosModalIcon">
                    <div>
                      <span className="titleBasic">Basic details</span>
                    </div>
                    <div
                      className="closeButtonImageBm"
                      onClick={handleCLoseButton}
                    >
                      <img
                        src={closeButtonBM}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                      <label htmlFor="" className="label-text">
                        Product Id
                      </label>
                      {name === "editbasicDetails" ? (
                        <input
                          type="text"
                          className="inputFields"
                          name="SKU"
                          value={formData.SKU || getSelectedDesign}
                          onChange={handleInput}
                          readOnly
                        />
                      ) : (
                        <TagsInput
                          disabled
                          value={getSelectedDesign}
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              SKU: value,
                            }))
                          }
                          name="SKU"
                          classNames="inputTag"
                        />
                      )}
                      <div>
                        {errors.SKU && (
                          <span className="error_input_p">{errors.SKU}</span>
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
                        value={formData.productCategory}
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
                          type="text"
                          className="inputFields"
                          name="length"
                          value={formData.length}
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
                          type="text"
                          className="inputFields"
                          name="width"
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
                          type="text"
                          className="inputFields"
                          name="height"
                          value={formData.height}
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
                          placeholder={selectedLabel || "-Select-"}
                          optionFilterProp="children"
                          value={selectedValue}
                          onChange={(value) => {
                            const selectedItem = metalTypeDropDown.find(
                              (item) => item.id === value
                            );
                            if (selectedItem) {
                              setSelectedValue(value);
                              setSelectedLabel(selectedItem.metal_name);
                            }
                            setFormData((prevState) => ({
                              ...prevState,
                              typeOfMetal: [value],
                            }));
                            setSelectedMetalId(value);
                            localStorage.setItem("selectedMetalType", value);
                          }}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{
                            width: "100%",
                            zIndex: 9999999,
                            background: "#006E7F1A",
                            cursor: "pointer",
                          }}
                          options={metalTypeDropDown.map((item) => ({
                            value: item.id,
                            label: item.metal_name,
                          }))}
                        />
                        <div>
                          {errors.typeOfMetal && (
                            <span className="error_input_p">
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
                          placeholder={selectedLabelDiamond || "-Select-"}
                          optionFilterProp="children"
                          value={selectedDiamond}
                          onChange={(value) => {
                            const selectedItem = diamonType.find(
                              (item) => item.id === value
                            );
                            if (selectedItem) {
                              setSelectedDiamond(value);
                              setSelectedLabelDiamond(selectedItem.name);
                            }
                            setFormData((prevState) => ({
                              ...prevState,
                              diamondType: [value],
                            }));
                            setSelectedDiamondId(value);
                            localStorage.setItem("selectedDiamondType", value);
                          }}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{
                            width: "100%",
                            zIndex: 999999999,
                            background: "#006E7F1A",
                            cursor: "pointer",
                          }}
                          options={diamonType.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                        />
                        <div>
                          {errors.diamondType && (
                            <span className="error_input_p">
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
                          style={{ background: "#ADD8E6" }}
                          type="text"
                          className="inputFields"
                          name="approxDiamondWeight"
                          value={formData.approxDiamondWeight}
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
                          Approx metal weight
                        </label>
                        <input
                          style={{ background: "#FEDD56" }}
                          type="text"
                          className="inputFields"
                          name="approxMetalWeights"
                          value={formData.approxMetalWeights}
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
                          type="text"
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
                        {name === "editbasicDetails" ? (
                          <Select
                            onSearch={onSearch}
                            filterOption={filterOption}
                            mode="multiple"
                            style={{
                              width: "100%",
                              zIndex: "9999999",
                              background: "#006E7F1A",
                            }}
                            value={formData.findings}
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
                        ) : (
                          <Select
                            onSearch={onSearch}
                            filterOption={filterOption}
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
                        )}
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
                        {name === "editbasicDetails" ? (
                          <Select
                            mode="multiple"
                            style={{
                              width: "100%",
                              zIndex: "9999999",
                              background: "#006E7F1A",
                              border: "1px solid #e0e1e1 !import",
                            }}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            value={formData.tag}
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
                        ) : (
                          <Select
                            onSearch={onSearch}
                            filterOption={filterOption}
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
                        )}
                        <div>
                          {errors.tag && (
                            <span className="error_input_p">{errors.tag}</span>
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
                          <span className="error_input_p">{errors.notes}</span>
                        )}
                      </div>
                    </div>
                    {name === "editbasicDetails" ? (
                      <div style={{ marginTop: "10px" }}>
                        <button
                          className="next-button"
                          type="submit"
                          onClick={() => handleEditDetails()}
                        >
                          Next
                        </button>
                      </div>
                    ) : (
                      <div style={{ marginTop: "10px" }}>
                        <button
                          className="next-button"
                          type="submit"
                          onClick={() => handleNextClick()}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </form>
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
                        {CalculationData?.net_weight}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Metal Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData.metal_cost}
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
                        {CalculationData?.manufacturing_cost}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">GST</td>
                      <td className="calculatedAmount">
                        {CalculationData?.gst}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Production Cost</td>
                      <td className="calculatedAmount">
                        {CalculationData?.production_cost}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Value Add</td>
                      <td className="calculatedAmount">
                        {CalculationData?.value_additions}
                      </td>
                    </tr>
                    <tr>
                      <td className="calculationType">Calculated MRP</td>
                      <td className="calculatedAmount">
                        {CalculationData?.calculated_mrp}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      <AssignmentModal
        open={showAssignmentModal}
        formData={formData}
        onClose={() => setShowAssignmentModal(false)}
        selectedAssignment={selectedAssignment}
        setAssignmentFolder={setAssignmentFolder}
        setSelectedAssignment={setSelectedAssignment}
        setFormData={setFormData}
        findingsNames={findingsNames}
        selectedFechedTagsId={selectedFechedTagsId}
        ItemMovedToAssignment={ItemMovedToAssignment}
        setItemMovedToAssignment={setItemMovedToAssignment}
      />
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        successMessage={successMessage}
      />
    </div>
  );
};

export default BasicDetailModal;
