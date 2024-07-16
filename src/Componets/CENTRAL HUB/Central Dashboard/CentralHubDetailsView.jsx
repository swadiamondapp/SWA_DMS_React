import React, { useEffect, useState, useRef } from "react";
import "./centraldashboard.css";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { centralFolderDetails } from "../../../Pages/CENTRAL HUB/Api";
import CentralHubImagePrint from "../CentralHubImagePrint/CentralHubImagePrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import Base64Downloader from "react-base64-downloader";

const CentralHubDetailsView = ({ CentralFolderDetails, sidebarExpanded }) => {
  const [imageBlobConverted,setImageBlobConverted] = useState([])
  const base64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=";

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

  const handleDownloadImage = async (imageSrc, ImageName, forceDownload=false) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = ImageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    // const imageBlob = await fetch(imageSrc).then((response) => response.blob());
    const imageBlob = await fetch(imageSrc)
      .then((response) => response.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }));

    console.log(imageBlob, URL.createObjectURL(imageBlob), "imagebol");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    setImageBlobConverted(imageBlob)
    link.download = ImageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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

                    <button
                      className="Download_btn_hub"
                      onClick={() => {
                        handleDownloadImage(item.file_2d, "image_name2d");
                      }}
                    >
                      DOWNLOAD
                      <GoDownload />
                    </button>
                    {/* <Base64Downloader
                      className="Download_btn_hub"
                      base64={item.file_2d} // Ensure this is a Base64 string
                      downloadName="image_2d.png" // Change the file name as needed
                      onClick={() => {
                        handleDownloadImage(item.file_2d, "image_name2d");
                      }}
                    >
                      {/* <button> */}
                    {/* DOWNLOAD */}
                    {/* <GoDownload /> */}
                    {/* </button> */}
                    {/* </Base64Downloader> */}
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
                        <div className="Prinit_btn_hub" onClick={handlePrint}>
                          <LuPrinter /> Print
                        </div>
                      )}
                      content={() => printRef.current}
                    />
                    <div style={{ display: "none" }}>
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
