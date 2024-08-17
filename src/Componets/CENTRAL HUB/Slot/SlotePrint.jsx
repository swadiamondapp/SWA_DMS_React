import React, { forwardRef } from "react";
import "./SlotePrint.css";
import qr from "../../../assets/qr.png";
import ring from "../../../assets/ringa.png";
import cross from "../../../assets/cross.png";
import QRCodeGenerator from "../../QRCodeGenerator/QRCodeGenerator";

const SlotePrint = forwardRef(({ slotView }, ref) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log("slotView", slotView);

  return (
    <div ref={ref} className="print-renders-product">
      {/* <div className="print-slot-modal-container">
        <div className="print-slot-container">
          <table className="print-custom-table print-single-border">
            <thead>
              <tr>
                <th className="print-column-header">Product ID</th>
                <th className="print-column-header">Created date</th>
                <th className="print-column-header">Product Category</th>
                <th className="print-column-header">Weight</th>
              </tr>
            </thead>
            <tbody className="print-table-body">
              {slotView.map((item, index) =>
                item.caddesigns.map((design, designIndex) => (
                  <tr key={`${index}-${designIndex}`}>
                    <td className="print-table-cell">{design.designcode}</td>
                    <td className="print-table-cell">{design.created_at}</td>
                    <td className="print-table-cell">
                      {design.product_category.join(", ")}
                    </td>
                    <td className="print-table-cell">{design.approx_metal_weight} Gram</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="NewSlotPrint">
        {slotView.map((item, index) =>
          item.caddesigns.map((design, designIndex) => (
            <div className="slot_items">
              <div className="print_head">
                <span style={{ zIndex: "999" }}>DMS</span>
                <span style={{ zIndex: "999" }}>ID : {design.designcode}</span>
                <img src={cross} alt="" srcset="" />
              </div>

              <div className="print_detail">
                <div className="qrsection">
                  <div className="print_content">
                    <span>Folder Name : {design.folder_name} </span>
                    <span>Category : {design.product_category}</span>
                    <span>Cad Name : {design.CAD_Name}</span>
                    <span>Metal Type : {design.metal_type}</span>
                  </div>
                  <div className="print_qr">
                    <QRCodeGenerator value={design.designcode} />
                  </div>
                </div>
                <div className="img_section">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={design.design_image}
                    alt=""
                    srcset=""
                  />
                </div>
              </div>

              <div className="print_tag">
                <span>Tag : {design.Tag}</span>
                <span>Findings : {design.Findings}</span>
              </div>

              <div className="approx_details">
                <div className="approx">
                  <h6
                    style={{
                      borderBottom: "1px solid black",
                      fontSize: "12px",
                      width: "45%",
                    }}
                  >
                    Approx Details
                  </h6>
                  <span>Metal Weight : {design.approx_metal_weight}</span>
                  <span>Diamond Weight : {design.approx_diamond_weight}</span>
                  <span>MRP : {design.approx_price}</span>
                </div>
                <div className="approx">
                  <span>
                    Date of design : {formatDate(design.date_of_design)}
                  </span>
                  <span>
                    Date of Folder : {formatDate(design.date_of_folder)}
                  </span>
                  <span>Date of Slot : {formatDate(design.created_at)}</span>
                  <span>Designer Name : {design.Designer_Name}</span>
                </div>
              </div>

              <div className="print_table">
                <div className="table_head">
                  <h6 style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Actual Details
                  </h6>
                </div>
                <table className="print_table_main" width={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Metal Weight</th>
                      <th>Diamond Weight</th>
                      <th>Size and Number of Diamond</th>
                    </tr>
                  </thead>
                  <tbody className="tr_section">
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default SlotePrint;
