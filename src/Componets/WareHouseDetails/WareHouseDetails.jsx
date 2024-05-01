import React from "react";
import "../../Componets/WareHouseDetails/WareHouseDetails.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import image1 from "../../assets/wh_img.png";
import image12 from "../../assets/ring_Wh.png";

const WareHouseDetails = () => {
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
                <p>SWA12356</p>
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
                <p></p>
              </div>
              <div className="A1_text">
                <p>Length</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>Width</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>Height</p>
                <p></p>
              </div>
              <div className="A1_text">
                <p>Type of metal</p>
                <p></p>
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
                <p></p>
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
                <p>
                  <span></span>
                  <span></span>
                </p>
              </div>
              <div className="A1_text" style={{ borderBottom: "0px" }}>
                <p>Note</p>
                <p>
                 
                </p>
              </div>
              <div className="actualDetailsButtonContiner"><button>Update</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouseDetails;
