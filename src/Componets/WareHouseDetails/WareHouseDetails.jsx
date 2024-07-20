import React, { useEffect, useState } from "react";
import "../../Componets/WareHouseDetails/WareHouseDetails.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import image1 from "../../assets/wh_img.png";
import image12 from "../../assets/ring_Wh.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  customization_details_view_warehouse,
  wareHouseEditBasicDetails,
} from "../../Pages/WareHousePageView/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  diamond_type_dropdown_basicDetails,
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
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
  const [actualFormData, setActualFormData] = useState({
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
  const [customizationwarehouseData, setCustomizationWareHouseData] = useState(
    []
  );

  const notify = () => toast("Wow so easy!");

  // useEffect(() => {
  //   if (customizationwarehouseData) {
  //     setActualFormData((prevFormData) => ({
  //       ...prevFormData,
  //       SKU: customizationwarehouseData.customizationcode || "",
  //       length: customizationwarehouseData.length_of_item || "",
  //       width: customizationwarehouseData.width || "",
  //       height: customizationwarehouseData.height || "",
  //       typeOfMetal: customizationwarehouseData.metal_type || "",
  //       diamondType: customizationwarehouseData.product_type || "",
  //       approxDiamondWeight: customizationwarehouseData.diamond_weight || "",
  //       approxWeight:customizationwarehouseData.weight||"",

  //       // approxMetalWeights: basicDetails
  //       //   ? basicDetails.approx_metal_weight
  //       //   : "",
  //       // approxMRP: basicDetails.approx_price || "",
  //       // tag: basicDetails.tag || "",
  //       // notes: basicDetails.notes || "",
  //     }));
  //   }
  // }, [customizationwarehouseData]);
  console.log(actualFormData, "formData");
  console.log(wareHouseuserId, "wss");
  useEffect(() => {
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
  }, []);
  useEffect(() => {
    customization_details_view_warehouse(
      setIsLoading,
      setCustomizationWareHouseData,
      userWareHouseId
    );
  }, [userWareHouseId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setActualFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the current input field
    }));
  };
  console.log(customizationwarehouseData, "customizationwarehouseData");

  console.log(actualFormData, "actual");

  const handleUpdateWareHouseDetails = () => {
    // toast("Please fill in the form", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   // transition: Bounce,
    // });
    if (!actualFormData.actualPrice) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        actualPrice: "Actual price is required",
      }));
      return; // Stop the function execution if validation fails
    }

    wareHouseEditBasicDetails(
      setIsLoading,
      setActualFormData,
      actualFormData,
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

  return (
    <>
      <div
        className="Parant_WareHouseDetails"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="wareHouseImageConatainer">
          <div className="imageWarehouspart1">
            <img src={image1} />
            <img src={image12} />
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
                  <p>{customizationwarehouseData.length_of_item}</p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{customizationwarehouseData.width}</p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{customizationwarehouseData.height}</p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>{customizationwarehouseData.metal_type}</p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>{customizationwarehouseData.diamond_type}</p>
                </div>
                <div className="A1_text">
                  <p>Approx Diamond weight</p>
                  <p>{customizationwarehouseData.diamond_weight}</p>
                </div>
                {/* <div className="A1_text">
                <p>Findings</p>
                <p>Findings</p>
              </div> */}
                <div className="A1_text">
                  <p>Approx weight</p>
                  <p>{customizationwarehouseData.weight}</p>
                </div>

                <div className="A1_text">
                  <p>Actual Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <LiaRupeeSignSolid />
                    {customizationwarehouseData.actual_price}
                  </p>
                </div>
                {/* <div className="A1_text">
                <p>Tags</p>
                <p>
                  <span>Birthday</span>
                  <span>Kids</span>
                </p>
              </div> */}
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>{customizationwarehouseData.notes}</p>
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
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="length"
                    value={actualFormData.length}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="width"
                    value={actualFormData.width}
                    onChange={handleInput}
                    // style={{backgroundColor:"red"}}
                  />
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="height"
                    value={actualFormData.height}
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
                      setActualFormData((prevState) => ({
                        ...prevState,
                        typeOfMetal: value,
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
                    value={actualFormData.typeOfMetal}
                  />
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  {/* <input
                    type="number"
                    className="actualDetails_input"
                    name="diamondType"
                    value={actualFormData.diamondType}
                    onChange={handleInput}
                  /> */}
                  <Select
                    showSearch
                    placeholder="-Select-"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setActualFormData((prevState) => ({
                        ...prevState,
                        diamondType: value,
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
                    value={actualFormData.diamondType || undefined}
                  />
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="approxDiamondWeight"
                    value={actualFormData.approxDiamondWeight}
                    onChange={handleInput}
                  />
                </div>
                {/* <div className="A1_text">
                <p>Findings</p>
                <input
                  type="text"
                  className="actualDetails_input"
                  name="findings"
                  value={actualFormData.findings}
                  onChange={handleInput}
                />
              </div> */}
                <div className="A1_text">
                  <p>Approx weight</p>
                  <input
                    type="number"
                    className="actualDetails_input"
                    name="approxWeight"
                    value={actualFormData.approxWeight}
                    onChange={handleInput}
                  />
                </div>
                <div className="A1_text" style={{ position: "relative" }}>
                  <p>Actual Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    {actualFormData.actualPrice.length > 0 && (
                      <LiaRupeeSignSolid />
                    )}

                    <input
                      type="number"
                      className="actualDetails_input"
                      name="actualPrice"
                      value={actualFormData.actualPrice}
                      onChange={handleInput}
                    />
                  </p>
                </div>
                {/* <div className="A1_text">
                <p>Tags</p>
                <input
                  type="text"
                  className="actualDetails_input"
                  name="tags"
                  value={actualFormData.tags}
                  onChange={handleInput}
                />
              </div> */}
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <input
                    type="text"
                    className="actualDetails_input"
                    name="notes"
                    value={actualFormData.notes}
                    onChange={handleInput}
                  />
                </div>
                {errors.actualPrice && (
                  <span className="error_input_p_warehouse">{errors.actualPrice}</span>
                )}
                <div className="actualDetailsButtonContiner">
                  <button onClick={() => handleUpdateWareHouseDetails()}>
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
                    // transition: Bounce,
                  />
                  {/* Same as */}
                  <ToastContainer />
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
