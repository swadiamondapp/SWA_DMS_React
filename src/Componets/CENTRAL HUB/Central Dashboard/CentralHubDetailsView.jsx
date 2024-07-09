import React, { useEffect, useState } from "react";
import "./centraldashboard.css";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { centralFolderDetails } from "../../../Pages/CENTRAL HUB/Api";

const CentralHubDetailsView = ({CentralFolderDetails}) => {




  function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  }
//   console.log(CentralFolderDetails, "cetasdlfkje");
  return (
    <div className="parentCentral">
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {CentralFolderDetails.map((item) => (
            <>
              <div className="New_Design_card">
                <div className="Card_Details">
                  <div className="Card_img" style={{ borderBottom: "0px",minHeight:'140px' }}>
                    <img src={item.file_2d} alt="" />
                  </div>
                  <div className="Card_Details_Inner_cad_Hub">
                    <p className="Hub_head" style={{fontSize:"13px",padding:'5px 0px'}}>
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
                  <div className="Card_img" style={{ borderBottom: "0px" ,minHeight:'140px'}}>
                    <img src={item.file_3d} alt="" />
                  </div>
                  <div className="Card_Details_Inner_cad_Hub">
                    <p className="Hub_head" style={{fontSize:"13px",padding:'5px 0px'}}>
                      posted on : {formatDate(item.created_at)}
                    </p>
                    <button className="Prinit_btn_hub">
                      Print
                      <IoPrintOutline />
                    </button>
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
