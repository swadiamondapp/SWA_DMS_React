import React, { useContext, useEffect, useRef } from "react";
import "./RendersDetailPage.css";
import download from "../../../assets/download.png";
import print from "../../../assets/printer.png";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import RendersProductPrint from "../RendersProductPrint/RendersProductPrint";

const RendersDetailPage = ({ folderDetails }) => {
  console.log("folderDetails", folderDetails);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: printRef.current,
  });

  return (
    <>
      {folderDetails.map((item) => (
        <div className="RendersDetailPage">
          <div className="Detail_Card">
            <img src={item.file_2d} alt="" />
            <span>
              POSTED ON: <b>{item.created_at.split("T")[0]} </b>
            </span>
            <button>
              DOWNLOAD{" "}
              <img className="img_detail" src={download} alt="" srcset="" />
            </button>
          </div>
          <div className="Detail_Card">
            <img src={item.file_3d} alt="" />
            <span>
              POSTED ON: <b> {item.created_at.split("T")[0]} </b>
            </span>
            {/* <button className="Detail_Card_print">
              Print <img className="img_detail" src={print} alt="" srcset="" />
            </button> */}
            <ReactToPrint
              trigger={() => (
                <div className="Detail_Card_print" onClick={handlePrint}>
                  <LuPrinter /> Print
                </div>
              )}
              content={() => printRef.current}
            />
            <div style={{ display: "none" }}>
              <RendersProductPrint
                ref={printRef}
                folderDetails={folderDetails}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RendersDetailPage;
