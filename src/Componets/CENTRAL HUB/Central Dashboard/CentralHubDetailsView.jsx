import React, { useEffect, useState, useRef } from "react";
import "./centraldashboard.css";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { centralFolderDetails } from "../../../Pages/CENTRAL HUB/Api";
import CentralHubImagePrint from "../CentralHubImagePrint/CentralHubImagePrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";

const CentralHubDetailsView = ({ CentralFolderDetails, sidebarExpanded }) => {
  const printRef = useRef();

  function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const handlePrint = useReactToPrint({
    content: printRef.current,
  });
  //   console.log(CentralFolderDetails, "cetasdlfkje");
  return (
    <div
      className="parentCentral"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {CentralFolderDetails.map((item) => (
            <>
              <div className="New_Design_card">
                <div className="Card_Details">
                  <div
                    className="Card_img"
                    style={{ borderBottom: "0px", minHeight: "180px" }}
                  >
                    <img src={item.file_2d} alt="" />
                  </div>
                  <div className="Card_Details_Inner_cad_Hub">
                    <p
                      className="Hub_head"
                      style={{ fontSize: "13px", padding: "5px 0px" }}
                    >
                      posted on : {formatDate(item.created_at)}
                    </p>

                    <button className="Download_btn_hub">
                      DOWNLOAD
                      <GoDownload />
                    </button>
                  </div>
                </div>
              </div>
              <div className="New_Design_card">
                <div className="Card_Details">
                  <div
                    className="Card_img"
                    style={{ borderBottom: "0px", minHeight: "180px" }}
                  >
                    <img src={item.file_3d} alt="" />
                  </div>
                  <div className="Card_Details_Inner_cad_Hub">
                    <p
                      className="Hub_head"
                      style={{ fontSize: "13px", padding: "5px 0px" }}
                    >
                      posted on : {formatDate(item.created_at)}
                    </p>
                    {/* <button className="Prinit_btn_hub">
                      Print
                      <IoPrintOutline />
                    </button> */}
                    <ReactToPrint
                      trigger={() => (
                        <div
                          className="Prinit_btn_hub"
                          onClick={handlePrint}

                        >
                          <LuPrinter /> Print
                        </div>
                      )}
                      content={() => printRef.current}
                    />
                    <div style={{display:'none'}}>
                      <CentralHubImagePrint
                        CentralFolderDetails={CentralFolderDetails}
                        ref={printRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentralHubDetailsView;
