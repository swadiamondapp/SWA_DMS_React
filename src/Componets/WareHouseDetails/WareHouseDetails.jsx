import React, { useEffect, useState } from "react";
import "../../Componets/WareHouseDetails/WareHouseDetails.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import image1 from "../../assets/wh_img.png";
import image12 from "../../assets/ring_Wh.png";
import { useLocation } from "react-router-dom";
import { customization_details_view_warehouse } from "../../Pages/WareHousePageView/Api";

const WareHouseDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [actualFormData, setActualFormData] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    Budget: "",
    notes: "",
    findings:'',
  });
  const [customizationwarehouseData, setCustomizationWareHouseData] = useState(
    []
  );
  const location = useLocation();
  const { wareHouseuserId, customizationsku } = location.state || {};
  console.log(customizationwarehouseData, "wss");

  useEffect(() => {
    customization_details_view_warehouse(
      setIsLoading,
      setCustomizationWareHouseData,
      wareHouseuserId
    );
  }, []);

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


  return (
    <div className="Parant_WareHouseDetails">
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
                <p>{customizationwarehouseData.sku}</p>
              </div>
              <div className="A1_text">
                <p>Length</p>
                <p>12 mm</p>
              </div>
              <div className="A1_text">
                <p>Width</p>
                <p>20 mm</p>
              </div>
              <div className="A1_text">
                <p>Height</p>
                <p>34 mm</p>
              </div>
              <div className="A1_text">
                <p>Type of metal</p>
                <p>Rose gold</p>
              </div>
              <div className="A1_text">
                <p>Dimond Type</p>
                <p>Circle</p>
              </div>
              <div className="A1_text">
                <p>APPROX DIAMOND WEIGHT</p>
                <p>0.10 ct</p>
              </div>
              <div className="A1_text">
                <p>Findings</p>
                <p>Findings</p>
              </div>
              <div className="A1_text">
                <p>Approx weight</p>
                <p>5.000 g</p>
              </div>
              <div className="A1_text">
                <p>Approx Price</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <LiaRupeeSignSolid />
                  27000
                </p>
              </div>
              <div className="A1_text">
                <p>Tags</p>
                <p>
                  <span>Birthday</span>
                  <span>Kids</span>
                </p>
              </div>
              <div className="A1_text" style={{ borderBottom: "0px" }}>
                <p>Note</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Scelerisque at turpis
                  in morbi et consectetur. Sagittis lobortis odio ipsum pharetra
                  mauris
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
                {/* <input
                  type="number"
                  className="actualDetails_input"
                  name="width"
                  value={actualFormData.height}
                  onChange={handleInput}
                /> */}
              </div>
              <div className="A1_text">
                <p>Dimond Type</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>APPROX DIAMOND WEIGHT</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>Findings</p>
                <input
                  type="text"
                  className="actualDetails_input"
                  name="findings"
                  value={actualFormData.findings}
                  onChange={handleInput}
                />
              </div>
              <div className="A1_text">
                <p>Approx weight</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>Approx Price</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  {/* <LiaRupeeSignSolid />
                  27000 */}
                </p>
              </div>
              <div className="A1_text">
                <p>Tags</p>
                <input
                  type="text"
                  className="actualDetails_input"
                  name="tags"
                  value={actualFormData.tags}
                  onChange={handleInput}
                />
              </div>
              <div className="A1_text" style={{ borderBottom: "0px" }}>
                <p>Note</p>
                <input
                  type="text"
                  className="actualDetails_input"
                  name="note"
                  value={actualFormData.note}
                  onChange={handleInput}
                />
              </div>
              <div className="actualDetailsButtonContiner">
                <button>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouseDetails;
