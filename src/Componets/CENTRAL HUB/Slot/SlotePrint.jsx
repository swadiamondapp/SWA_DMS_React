import React, { forwardRef } from "react";
import "./SlotePrint.css";
import QRCodeGenerator from "../../QRCodeGenerator/QRCodeGenerator";
import cross from "../../../assets/cross.png";


const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const SlotePrint = forwardRef(({ slotView }, ref) => {
  return (
    <div className="NewSlotPrint" ref={ref} style={{ padding: "5px", justifyContent: "space-evenly" }}>
      {slotView?.flatMap((item) =>
        chunkArray(item.caddesigns, 6).map((chunk, chunkIndex) => (
          <>
           <div key={chunkIndex} style={{width:"100%"}}>
          <div className="padding-top" style={{width:"100%"}}>
            {chunk.map((design, designIndex) => (
              <div className="slot_items" key={designIndex} style={{ marginTop: "30px", marginBottom: "20px", position: "relative", padding: "3px" }}>
                <div className="print_head">
                  <span style={{ zIndex: "999" }}>DMS</span>
                  <span style={{ zIndex: "999" }}>ID : {design.designcode}</span>
                  <img src={cross} alt="" srcset="" />
                  {/* Add cross image or icon if needed */}
                </div>
                <div style={{ padding: "0px" }}>
                  <div className="print_detail">
                    {/* <div className="qrsection">
                      <div className="print_content" style={{ gap: "10px" }}>
                        <span>Folder Name : {design.folder_name}</span>
                        <span>Category : {design.product_category.join(", ")}</span>
                        <span>Cad Name : {design.CAD_Name}</span>
                        <span>Metal Type : {design.metal_type}</span>
                        <span>Tag : {design.Tag.join(", ")}</span>
                        <span>Findings : {design.Findings.join(", ")}</span>
                      </div>
                      <div className="print_qr" style={{position:"absolute",right:"173px"}}>
                        <QRCodeGenerator value={design.designcode} />
                      </div>
                    </div> */}

                    <div
                      //  className="print_qr"
                      style={{ height: "72px", width: "72px", background: "red", marginLeft: "40px" }}>
                      <QRCodeGenerator value={design.designcode} />
                    </div>
                    <div className="img_section" style={{ height: "152px", width: "152px" }}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={design.design_image}
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                  <div className="approx_details" style={{ gap: "10px", marginTop: "17px" }}>
                    <div className="approx">
                      <h6 style={{ borderBottom: "1px solid black", fontSize: "12px", width: "86px", paddingBottom: "4px" }}>
                        Approx Details
                      </h6>
                      <span>Metal Weight : {design.approx_metal_weight}</span>
                      {/* <span>Diamond Weight : {design.approx_diamond_weight}</span> */}
                      <span>MRP : {design.approx_price}</span>
                    </div>
                    <div className="approx">
                      {/* <span>Date of design : {new Date(design.date_of_design).toLocaleDateString()}</span>
                      <span>Date of Folder : {new Date(design.date_of_folder).toLocaleDateString()}</span>
                      <span>Date of Slot : {new Date(design.created_at).toLocaleDateString()}</span>
                      <span>Designer Name : {design.Designer_Name}</span> */}
                      <span>Folder Name : {design.folder_name}</span>
                      <span>Category : {design.product_category.join(", ")}</span>
                      <span>Tag : {design.Tag.join(", ")}</span>
                      <span>Metal Type : {design.metal_type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ pageBreakAfter: "always" }}></div> {/* Force page break after each chunk */}
            </div>
            </div>
          </>
        ))
      )}
    </div>
  );
});

export default SlotePrint;
