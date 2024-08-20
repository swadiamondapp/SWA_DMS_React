import React, { forwardRef, useEffect, useState } from "react";
import { choose_outlet_drop_down } from "../ADMIN PANEL/Api_dropDown";
import {
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
} from "../Assignment Panel/Api";

const CustomizationListDataPrint = forwardRef(({ dataToDisplay }, ref) => {
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);

  useEffect(() => {
    choose_outlet_drop_down(setOutLetDropDown);
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    product_category_basicDetails(setListProductCategory);
  }, []);

  const findMetalNameById = (id) => {
    const item = MetalTypeDropDown.find((entry) => entry.id === id);
    return item ? item.metal_name : "Not found";
  };

  const findOutLetNameByID = (id) => {
    const item = outLetDropDown.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };
  const productCategoryByID = (id) => {
    const item = ProudctCategory.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };

  // console.log("outLetDropDown",outLetDropDown)

  return (
    <div ref={ref} style={{ paddingTop: "10px", padding: "8px" }}>
      {/* Your component JSX */}
      <div
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
            // height:"100%"
          }}
        >
          <span className="headerTitle" style={{ fontSize: "26px" }}>
            Customization ID :{dataToDisplay?.customizationcode}
          </span>
          {/* <img
            onClick={onClose}
            style={{ width: "16px", height: "18px" }}
            style={{width:"80px",height:"75px"}} src={close}
            alt=""
          /> */}
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "26px" }}>
            Basic Details
          </span>
        </div>
        <div className="subTitle">
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Sales man</span>
            <span style={{ fontSize: "20px" }}>{dataToDisplay?.salesman}</span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Phone Number</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.mobile_number}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Outlet</span>
            <span style={{ fontSize: "20px" }}>
              {findOutLetNameByID(Number(dataToDisplay?.outlet))}
            </span>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "26px" }}>
            Product Information
          </span>
        </div>
        <div className="subTitle">
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Product type</span>
            <span style={{ fontSize: "20px" }}>
              {productCategoryByID(Number(dataToDisplay?.product_type))}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Model Previously Made</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.previously_made}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>If previously made</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.previously_made &&
                dataToDisplay?.previously_made.charAt(0).toUpperCase() +
                  dataToDisplay?.previously_made.slice(1)}
            </span>
          </div>
        </div>
        <div>
          <div style={{ margin: "5px 0px" }}>
            <span className="imgTitleCR" style={{ fontSize: "24px" }}>
              Images
            </span>
          </div>
          <div className="ringImages">
            <div style={{ width: "150px", height: "140px" }}>
              {dataToDisplay?.image === null ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "150px", height: "140px" }}
                  src={dataToDisplay?.image}
                  alt=""
                />
              )}
            </div>
            <div style={{ width: "150px", height: "140px" }}>
            {dataToDisplay?.image2 === null ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "150px", height: "140px" }}
                  src={dataToDisplay?.image2}
                  alt=""
                />
              )}
            </div>
            <div style={{ width: "150px", height: "140px" }}>
            {dataToDisplay?.image3 === null ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "150px", height: "140px" }}
                  src={dataToDisplay?.image3}
                  alt=""
                />
              )}
            </div>
            <div style={{ width: "150px", height: "140px" }}>
            {dataToDisplay?.image4 === null ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "150px", height: "140px" }}
                  src={dataToDisplay?.image4}
                  alt=""
                />
              )}
            </div>
            <div style={{ width: "150px", height: "140px" }}>
            {dataToDisplay?.image5 === null ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "150px", height: "140px" }}
                  src={dataToDisplay?.image5}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "26px" }}>
            Metel Details
          </span>
        </div>
        <div className="subTitle-metal">
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Metel type</span>
            <span style={{ fontSize: "20px" }}>
              {findMetalNameById(Number(dataToDisplay?.metal_type))}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Weight</span>
            <span style={{ fontSize: "20px" }}>{dataToDisplay?.weight} GM</span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Size</span>
            <span style={{ fontSize: "20px" }}>{dataToDisplay?.size}</span>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "26px" }}>
            Diamond Details
          </span>
        </div>
        <div className="DiamondType">
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Diamond Weight</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.diamond_weight} CT
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Number of Diamonds</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.no_of_diamond}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Diamond Clarity</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.diamond_clarity}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Diamond colour</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.diamond_colour}
            </span>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title">Other details</span>
        </div>
        <div className="subTitle-metal">
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Budget</span>
            <span style={{ fontSize: "20px" }}>
              {Math.floor(dataToDisplay?.budget)}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>SWA Product SKU</span>
            <span style={{ fontSize: "20px" }}>
              {dataToDisplay?.sku_of_swa_product}
            </span>
          </div>
          <div className="ProductInformation" style={{ width: "250px" }}>
            <span style={{ fontSize: "20px" }}>Note</span>
            <span style={{ fontSize: "20px", wordBreak: "break-word" }}>
              {dataToDisplay?.notes}
            </span>
          </div>
        </div>
        <div className="lineCR"></div>
      </div>
    </div>
  );
});

export default CustomizationListDataPrint;
