import React, { useRef } from 'react'
import cross from "../../../assets/cross.png";
import QRCodeGenerator from '../../../Componets/QRCodeGenerator/QRCodeGenerator';
import { LuPrinter } from 'react-icons/lu';
import SlotePrint from '../../../Componets/CENTRAL HUB/Slot/SlotePrint';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const PreviewTab = ({ sidebarExpanded, soltData }) => {
    
    const printRef = useRef();
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handlePrint = useReactToPrint({
        content: printRef.current,
      });

    return (
        <div className="parentCentral" style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}>
            <div className="NewSlotPrint">
                {soltData?.map((item, index) =>
                    item.caddesigns.map((design, designIndex) => (
                        <div className="slot_items" style={{ gap: "10px" }}>
                            <div className="print_head">
                                <span style={{ zIndex: "999" }}>DMS</span>
                                <span style={{ zIndex: "999" }}>ID : {design.designcode}</span>
                                <img src={cross} alt="" srcset="" />
                            </div>

                            <div className="" style={{ padding: "8px" }}>
                                <div className="print_detail">
                                    <div className="qrsection" style={{ paddingBottom: "98px" }}>
                                        <div className="print_content" style={{ gap: "10px" }}>
                                            <span>Folder Name : {design.folder_name} </span>
                                            <span>Category : {design.product_category}</span>
                                            <span>Cad Name : {design.CAD_Name}</span>
                                            <span>Metal Type : {design.metal_type}</span>
                                        </div>
                                        <div className="print_qr">
                                            <QRCodeGenerator value={design.designcode} />
                                        </div>
                                    </div>
                                    <div className="img_section" style={{ height: "130px" }}>
                                        <img
                                            style={{ width: "100%", height: "100%" }}
                                            src={design.design_image}
                                            alt=""
                                            srcset=""
                                        />
                                    </div>
                                </div>

                                <div className="print_tag" style={{ gap: "10px", position: "relative", marginTop: "-12px", paddingBottom: "50px" }}>
                                    <span>Tag : {design.Tag}</span>
                                    <span>Findings : {design.Findings}</span>
                                </div>

                                <div className="approx_details" style={{ gap: "10px", position: "relative", marginTop: "17px" }}>
                                    <div className="approx" style={{ gap: "10px" }}>
                                        <h6
                                            style={{
                                                borderBottom: "1px solid black",
                                                fontSize: "12px",
                                                width: "35%",
                                                paddingBottom:"4px"
                                            }}
                                        >
                                            Approx Details
                                        </h6>
                                        <span>Metal Weight : {design.approx_metal_weight}</span>
                                        <span>Diamond Weight : {design.approx_diamond_weight}</span>
                                        <span>MRP : {design.approx_price}</span>
                                    </div>
                                    <div className="approx" style={{ gap: "10px" }}>
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
                            </div>
                            {/* <div className="print_table">
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
              </div> */}
                        </div>
                    ))
                )}
            </div>

            <div className="" style={{ width: "100%", display: "flex", justifyContent: "end", alignItems: "end",marginTop:"20px" }}>
              <ReactToPrint
                      trigger={() => (
                        <div
                          className="slotPrintButton"
                          onClick={handlePrint}
                               style={{cursor:"pointer",padding:"8px 10px"}}
                        >
                          <LuPrinter /> Print
                        </div>
                      )}
                      content={() => printRef.current}
                    />
                    <div style={{display:'none'}}>
                      <SlotePrint                        
                        ref={printRef}
                        slotView={soltData}
                      />
                    </div>
            </div>
        </div>
    )
}

export default PreviewTab
