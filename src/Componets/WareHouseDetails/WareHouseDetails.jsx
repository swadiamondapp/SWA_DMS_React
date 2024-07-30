import React, { useEffect, useState } from "react";
import "../../Componets/WareHouseDetails/WareHouseDetails.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import {
  customization_details_view_warehouse,
  wareHouseEditBasicDetails,
} from "../../Pages/WareHousePageView/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  diamond_type_dropdown_basicDetails,
  metal_type_dropdown_basicDetails,
} from "../Assignment Panel/Api";
import { Select } from "antd";
import SuccessModal from "../SuccessModal/SuccessModal";

const WareHouseDetails = ({ sidebarExpanded }) => {
  const userWareHouseId = localStorage.getItem("wareHouseuserId");
  const location = useLocation();
  const navigate = useNavigate();
  const { wareHouseuserId, customizationsku } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [diamonType, setDiamondType] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [ErrorPriceMessage, setErrorPriceMessage] = useState(false);
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    notes: "",
    typeOfMetal: [],
    diamondType: [],
    approxDiamondWeight: "",
    approxWeight: "",
    actualPrice: "",
  });
  const [customizationwarehouseData, setCustomizationWareHouseData] = useState({});

  useEffect(() => {
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
  }, []);

  useEffect(() => {
    if (userWareHouseId) {
      customization_details_view_warehouse(
        setIsLoading,
        setCustomizationWareHouseData,
        userWareHouseId
      );
    }
  }, [userWareHouseId]);

  useEffect(() => {
    if (customizationwarehouseData) {
      setFormData({
        length: customizationwarehouseData.length_of_item || "",
        width: customizationwarehouseData.width || "",
        height: customizationwarehouseData.height || "",
        notes: customizationwarehouseData.notes || "",
        typeOfMetal: customizationwarehouseData.metal_type || [],
        diamondType: customizationwarehouseData.diamond_type || [],
        approxDiamondWeight: customizationwarehouseData.diamond_weight || "",
        approxWeight: customizationwarehouseData.weight || "",
        actualPrice: customizationwarehouseData.actual_price || "",
      });
    }
  }, [customizationwarehouseData]);

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

  const handleUpdateWareHouseDetails = () => {
    if (!formData.actualPrice) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        actualPrice: "Actual price is required",
      }));
      return; // Stop the function execution if validation fails
    }

    wareHouseEditBasicDetails(
      setIsLoading,
      setFormData,
      formData,
      userWareHouseId,
      setSuccessMessage,
      setSuccessModalOpen,
      setErrorPriceMessage,
      setErrors,
      navigate
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



  const findMetalNameById = (id) => {
    const item = MetalTypeDropDown.find((entry) => entry.id === id);
    return item ? item.metal_name : "Not found";
  };
  const findDiamondNameById = (id) => {
    const item = diamonType.find((entry) => entry.id === id);
    return item ? item.name : "Not found";
  };

  return (
    <>
      <div
        className="Parant_WareHouseDetails"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="wareHouseImageConatainer">
          <div className="imageWarehouspart1" style={{ overflow: "hidden" }}>
            <img src={customizationwarehouseData.image} />
            <img src={customizationwarehouseData.image2} />
            <img src={customizationwarehouseData.image3} />
            <img src={customizationwarehouseData.image4} />
            <img src={customizationwarehouseData.image5} />
          </div>
        </div>
        <div className="wareHouse_basicDetails">
          <div className="right_Assignment_View">
            <div className="Assignment_contents">
              <h3>Basic details</h3>
              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>SKU</p>
                  <p>{customizationwarehouseData.customizationcode}</p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{customizationwarehouseData.length_of_item} mm</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{customizationwarehouseData.width} mm</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{customizationwarehouseData.height} mm</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>{findMetalNameById(Number(customizationwarehouseData.metal_type))}</p>
                </div>
                <div className="A1_text">
                  <p>Diamond Type</p>
                  <p>{findDiamondNameById(Number(customizationwarehouseData.diamond_type))}</p>
                </div>
                <div className="A1_text">
                  <p>Approx Diamond weight</p>
                  <p>{customizationwarehouseData.diamond_weight} g</p>
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{customizationwarehouseData.weight} g</p>
                </div>
                <div className="A1_text">
                  <p>Actual Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <LiaRupeeSignSolid />
                    {customizationwarehouseData.actual_price}
                  </p>
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p style={{ wordBreak: "break-word" }}>
                    {customizationwarehouseData.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wareHouse_actualDetails">
          <div className="right_Assignment_View">
            <div className="Assignment_contents">
              <h3>Actual details</h3>
              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>SKU</p>
                  <p>{customizationsku}</p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <div className="">
                    <input
                      type="number"
                      className="actualDetails_input"
                      name="length"
                      value={formData.length}
                      onChange={handleInput}
                    />
                    mm
                  </div>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="width"
                    value={formData.width}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="height"
                    value={formData.height}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        typeOfMetal: value,
                      }))
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "100%" }}
                    options={MetalTypeDropDown.map((item) => ({
                      value: item.id,
                      label: item.metal_name,
                    }))}
                    value={formData.typeOfMetal}
                  />
                </div>
                <div className="A1_text">
                  <p>Diamond Type</p>
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        diamondType: value,
                      }))
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "100%" }}
                    options={diamonType.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    value={formData.diamondType}
                  />
                </div>
                <div className="A1_text">
                  <p>Approx diamond weight</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="approxDiamondWeight"
                    value={formData.approxDiamondWeight}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text">
                  <p>Approx weight</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="approxWeight"
                    value={formData.approxWeight}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text" style={{ position: "relative" }}>
                  <p>Actual Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    {formData.actualPrice.length > 0 && (
                      <LiaRupeeSignSolid />
                    )}
                    <input
                      type="number"
                      className="actualDetails_input"
                      name="actualPrice"
                      value={formData.actualPrice}
                      onChange={handleInput}
                    />
                  </p>
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <input
                    type="text"
                    className="actualDetails_input"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInput}
                  />
                </div>
                {errors.actualPrice && (
                  <span className="error_input_p_warehouse">
                    {errors.actualPrice}
                  </span>
                )}
                <div className="actualDetailsButtonContiner">
                  <button onClick={handleUpdateWareHouseDetails}>
                    Update
                  </button>
                  <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SuccessModal
          successModalOpen={successModalOpen}
          successMessage={successMessage}
        />
      </div>
    </>
  );
};

export default WareHouseDetails;
