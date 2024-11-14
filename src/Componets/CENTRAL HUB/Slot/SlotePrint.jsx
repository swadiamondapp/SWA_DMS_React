// import React, { forwardRef } from "react";
// import "./SlotePrint.css";
// import QRCodeGenerator from "../../QRCodeGenerator/QRCodeGenerator";
// import cross from "../../../assets/cross.png";

// const chunkArray = (arr, chunkSize) => {
//   const result = [];
//   for (let i = 0; i < arr.length; i += chunkSize) {
//     result.push(arr.slice(i, i + chunkSize));
//   }
//   return result;
// };

// const SlotePrint = forwardRef(({ slotView }, ref) => {
//   return (
//     <div className="NewSlotPrint" ref={ref} style={{ padding: "5px", justifyContent: "space-evenly" }}>
//       {slotView?.flatMap((item) =>
//         chunkArray(item.caddesigns, 6).map((chunk, chunkIndex) => (
//           <>
//            <div key={chunkIndex} style={{width:"100%"}}>
//           <div className="padding-top" style={{width:"100%"}}>
//             {chunk.map((design, designIndex) => (
//               <div className="slot_items" key={designIndex} style={{ marginTop: "30px", marginBottom: "20px", position: "relative", padding: "3px" }}>
//                 <div className="print_head">
//                   <span style={{ zIndex: "999" }}>DMS</span>
//                   <span style={{ zIndex: "999" }}>ID : {design.designcode}</span>
//                   <img src={cross} alt="" srcset="" />
//                   {/* Add cross image or icon if needed */}
//                 </div>
//                 <div style={{ padding: "0px" }}>
//                   <div className="print_detail">
//                     {/* <div className="qrsection">
//                       <div className="print_content" style={{ gap: "10px" }}>
//                         <span>Folder Name : {design.folder_name}</span>
//                         <span>Category : {design.product_category.join(", ")}</span>
//                         <span>Cad Name : {design.CAD_Name}</span>
//                         <span>Metal Type : {design.metal_type}</span>
//                         <span>Tag : {design.Tag.join(", ")}</span>
//                         <span>Findings : {design.Findings.join(", ")}</span>
//                       </div>
//                       <div className="print_qr" style={{position:"absolute",right:"173px"}}>
//                         <QRCodeGenerator value={design.designcode} />
//                       </div>
//                     </div> */}

//                     <div
//                       //  className="print_qr"
//                       style={{ height: "72px", width: "72px", background: "red", marginLeft: "40px" }}>
//                       <QRCodeGenerator value={design.designcode} />
//                     </div>
//                     <div className="img_section" style={{ height: "152px", width: "152px" }}>
//                       <img
//                         style={{ width: "100%", height: "100%" }}
//                         src={design.design_image}
//                         alt=""
//                         srcset=""
//                       />
//                     </div>
//                   </div>
//                   <div className="approx_details" style={{ gap: "10px", marginTop: "17px" }}>
//                     <div className="approx">
//                       <h6 style={{ borderBottom: "1px solid black", fontSize: "12px", width: "86px", paddingBottom: "4px" }}>
//                         Approx Details
//                       </h6>
//                       <span>Metal Weight : {design.approx_metal_weight}</span>
//                       {/* <span>Diamond Weight : {design.approx_diamond_weight}</span> */}
//                       <span>MRP : {design.approx_price}</span>
//                     </div>
//                     <div className="approx">
//                       {/* <span>Date of design : {new Date(design.date_of_design).toLocaleDateString()}</span>
//                       <span>Date of Folder : {new Date(design.date_of_folder).toLocaleDateString()}</span>
//                       <span>Date of Slot : {new Date(design.created_at).toLocaleDateString()}</span>
//                       <span>Designer Name : {design.Designer_Name}</span> */}
//                       <span>Folder Name : {design.folder_name}</span>
//                       <span>Category : {design.product_category.join(", ")}</span>
//                       <span>Tag : {design.Tag.join(", ")}</span>
//                       <span>Metal Type : {design.metal_type}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div style={{ pageBreakAfter: "always" }}></div> {/* Force page break after each chunk */}
//             </div>
//             </div>
//           </>
//         ))
//       )}
//     </div>
//   );
// });

// export default SlotePrint;

import React, { forwardRef } from "react";
import "./SlotePrint.css";
import QRCodeGenerator from "../../QRCodeGenerator/QRCodeGenerator";
import cross from "../../../assets/cross.png";

const SlotePrint = forwardRef(({ slotView }, ref) => {
  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const renderDesigns = (designs) => {
    return designs.map((design, index) => (
      <div
        className="slot_items"
        key={index}
        style={{
          width: "383.25px",
          height: "356.25px",
          borderRadius: "4px",
          marginTop: "6px",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between"
        }}
      >
        <div
          className="print_head"
          style={{ borderRadius: "4px", fontSize: "16px", padding: "5px" }}
        >
          <span>DMS</span>
          <span>ID : {design.designcode}</span>
        </div>
        <div
          className="print_detail"
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // gap:"15px"
          }}
        >
          <div style={{ height: "auto", width: "55%" }}>
            <QRCodeGenerator value={design.designcode} />
            <div
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                fontSize: "13px",
                justifyContent: "space-evenly",
                marginTop: "5px",
                gap: "5px",
              }}
            >
              <span>Gold Type : {design.metal_type}</span>
              <span>
                Gold Color :{/* {design.product_category.join(", ")} */}
              </span>
<span>
                Findings :{/* {design.product_category.join(", ")} */}
              </span>
              <span>Net Weight :{/* {design.Tag.join(", ")} */}</span>
              <span>Gross Weight :{/* {design.metal_type} */}</span>
              <span>SKU :{design.designcode}</span>
              <span>DY number :{/* {design.metal_type} */}</span>
            </div>
          </div>
          <div
            className="img_section"
            style={{ height: "182px", width: "182px", marginLeft: "10px" }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={design.design_image}
              alt=""
            />
          </div>
        </div>
        <div className="approx_details" style={{ fontSize: "12px" }}>
          <div
            style={{
              width: "58%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              fontSize: "13px",
              justifyContent: "space-evenly",
              gap: "6px",
            }}
          >
            {/* <span>Folder Name : {design.folder_name}</span> */}
            <span>Product Category : {design.product_category.join(", ")}</span>
            <span>Tag SWA: {design.Tag.join(", ")}</span>
            {/* <span>Metal Type : {design.metal_type}</span> */}
          </div>
          <div
            style={{
              width: "48%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              fontSize: "13px",
              justifyContent: "space-evenly",
              gap: "5px",
              // background:"red"
            }}
          >
            <h6
              style={{
                borderBottom: ".5px solid black",
                fontSize: "13px",
                width: "56%",
              }}
            >
              Approx Details
            </h6>
            <span>Metal Weight : {design.approx_metal_weight}</span>
            {/* <span>MRP : {design.approx_price}</span> */}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      // className="NewSlotPrint"
      ref={ref}
      style={{
        width: "100%",
        margin: "10px",
      }}
    >
      {slotView?.flatMap((item) =>
        chunkArray(item.caddesigns, 6).map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="page-break"
            style={{
              paddingTop: "10px",
              paddingBottom: "5px",
              display: "grid",
              justifyContent: "space-evenly",
              gridTemplateColumns: "1fr 1.028fr",
              // background:"red",
              // marginLeft:"6px",
              // gap: "5px",
              gap: "0px",
              marginLeft: "4px",
            }}
          >
            {renderDesigns(chunk)}
          </div>
        ))
      )}
    </div>
  );
});

export default SlotePrint;
