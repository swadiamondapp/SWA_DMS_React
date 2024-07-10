import React, { useContext, useEffect } from "react";
import "./RendersDetailPage.css";
import download from "../../../assets/download.png";
import print from "../../../assets/printer.png";
import { RenderCreateContext } from "../RendersContext/RendersContext";

const RendersDetailPage = ({ folderDetails }) => {
  console.log("folderDetails", folderDetails);

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
            <button className="Detail_Card_print">
              Print <img className="img_detail" src={print} alt="" srcset="" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default RendersDetailPage;
