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

  const images = [
    dataToDisplay?.image,
    dataToDisplay?.image2,
    dataToDisplay?.image3,
    dataToDisplay?.image4,
    dataToDisplay?.image5,
  ].filter((img) => img !== null);

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
          <span className="headerTitle" style={{ fontSize: "25px" }}>
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
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Basic Details
          </span>
        </div>
        <div className="subTitle">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Sales man</span>
            <span style={{ fontSize: "18px" }}>{dataToDisplay?.salesman}</span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Phone Number</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay?.mobile_number}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Outlet</span>
            <span style={{ fontSize: "18px" }}>
              {findOutLetNameByID(Number(dataToDisplay?.outlet))}
            </span>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Customer Details
          </span>
        </div>
        <div className="subTitle">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Customer man</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.customer_name}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Phone Number</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.customer_number}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Email</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.customer_email === "undefined" || "null"
                ? "N/A"
                : dataToDisplay.customer_email}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Recived Advance</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.received_advance}
            </span>
          </div>
          {/* <div className="ProductInformation">
                        <span>Outlet</span>
                        <span>
                          {findOutLetNameByID(Number(dataToDisplay.outlet))}
                        </span>
                      </div> */}
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Product Information
          </span>
        </div>
        <div className="subTitle">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Product type</span>
            <span style={{ fontSize: "18px" }}>
              {productCategoryByID(Number(dataToDisplay?.product_type))}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Model Previously Made</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay?.previously_made}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>If previously made</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay?.previously_made &&
                dataToDisplay?.previously_made.charAt(0).toUpperCase() +
                  dataToDisplay?.previously_made.slice(1)}
            </span>
          </div>
          <div className="ProductInformation">
            <span style={{ fontSize: "18px" }}>Metal Size</span>
            {/* <span>{dataToDisplay.size}</span> */}
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.size === undefined ||
              dataToDisplay.size === null ||
              dataToDisplay.size === ""
                ? "N/A"
                : dataToDisplay.size}
            </span>
          </div>
        </div>
        <div>
          <div className="lineCR"></div>
          <div style={{ margin: "5px 0px" }}>
            {/* <span className="imgTitleCR" style={{ fontSize: "24px" }}>
              Images
            </span> */}
            <span className="basic-Details-title" style={{ fontSize: "25px" }}>
              Images
            </span>
          </div>
          <div className="ringImages">
            <div className="ringImages">
              {images.map((image, index) => (
                <div key={index} style={{ width: "150px", height: "140px" ,objectFit:"contain" }}>
                  {image ? (
                    <img
                      style={{ width: "150px", height: "140px" }}
                      src={image}
                      alt={`image-${index}`}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Metel Details
          </span>
        </div>
        <div className="subTitle-metal">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Metel type</span>
            <span style={{ fontSize: "18px" }}>
              {findMetalNameById(Number(dataToDisplay?.metal_type))}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Weight</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.weight === undefined ||
              dataToDisplay.weight === null
                ? "N/A"
                : `${dataToDisplay.weight} GM`}
            </span>
          </div>
          {/* <div className="ProductInformation" style={{ gap:"10px" }}>
            <span style={{ fontSize: "18px" }}>Size</span>
            <span style={{ fontSize: "18px" }}>{dataToDisplay?.size}</span>
          </div> */}
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Diamond Details
          </span>
        </div>
        <div className="DiamondType">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Diamond Weight</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.diamond_weight === undefined ||
              dataToDisplay.diamond_weight === null
                ? "N/A"
                : `${dataToDisplay.diamond_weight} CT`}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Number of Diamonds</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay.no_of_diamond === undefined ||
              dataToDisplay.no_of_diamond === null
                ? "N/A"
                : `${dataToDisplay.no_of_diamond} `}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Diamond Clarity</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay?.diamond_clarity}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Diamond colour</span>
            <span style={{ fontSize: "18px" }}>
              {dataToDisplay?.diamond_colour}
            </span>
          </div>
        </div>
        <div className="lineCR"></div>
        <div style={{ marginBottom: "5px" }}>
          <span className="basic-Details-title" style={{ fontSize: "25px" }}>
            Other details
          </span>
        </div>
        <div className="subTitle-metal">
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Budget</span>
            <span style={{ fontSize: "18px" }}>
              {Math.floor(dataToDisplay?.budget)}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}> Actual Price</span>
            <span style={{ fontSize: "18px" }}>
              {" "}
              {/* {Math.floor(dataToDisplay.actual_price)} */}
              {dataToDisplay.actual_price === undefined ||
              dataToDisplay.actual_price === null ||
              dataToDisplay.actual_price === ""
                ? "N/A"
                : `${dataToDisplay.actual_price}`}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>SWA Product SKU</span>
            <span style={{ fontSize: "18px" }}>
              {/* {dataToDisplay?.sku} */}
              {dataToDisplay.sku === undefined ||
              dataToDisplay.sku === null ||
              dataToDisplay.sku === ""
                ? "N/A"
                : `${dataToDisplay.sku}`}
            </span>
          </div>
          <div className="ProductInformation" style={{ gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>Note</span>
            <span style={{ fontSize: "18px", wordBreak: "break-word" }}>
              {dataToDisplay.notes === undefined ||
              dataToDisplay.notes === null ||
              dataToDisplay.notes === ""
                ? "N/A"
                : `${dataToDisplay.notes}`}
            </span>
          </div>
        </div>
        {/* <div className="lineCR"></div> */}
      </div>
      <div className="ringImages" style={{ flexDirection: "column"}}>
        {images.map((image, index) => (
          <div key={index} style={{ width: "100%", height: "80vh" }}>
            {image ? (
              <img
                style={{ width: "100%", height: "80vh",marginTop:"40px",objectFit:"contain" }}
                src={image}
                alt={`image-full-${index}`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
});

export default CustomizationListDataPrint;
