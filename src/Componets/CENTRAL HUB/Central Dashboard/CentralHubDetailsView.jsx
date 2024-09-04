import React, { useEffect, useState, useRef } from "react";
import "./centraldashboard.css";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { centralFolderDetails } from "../../../Pages/CENTRAL HUB/Api";
import CentralHubImagePrint from "../CentralHubImagePrint/CentralHubImagePrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import Base64Downloader from "react-base64-downloader";
import { useNavigate } from "react-router-dom";
import ThreeDViewer from "../../ThreeDViewer/ThreeDViewer";

const CentralHubDetailsView = ({ CentralFolderDetails, sidebarExpanded }) => {
  const navigate = useNavigate();
  const [imageBlobConverted, setImageBlobConverted] = useState([]);
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

  // const handleDownload = (imageUrl) => {
  //   fetch(imageUrl, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const blobUrl = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = blobUrl;
  //       link.download = "downloaded_image.jpg";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch((error) => console.error("Error downloading the image:", error));
  // };

  const handleDownload = (imageUrl, fileName = "downloaded_file", code) => {
  
    const fullFileName = code ? `${code}_${fileName}` : fileName;
  
    fetch(imageUrl, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fullFileName; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setImages({
      normal: null,
      threeD: null,
    });
  };

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.id}`, {
      state: {
        code: designCode,
      },
    });
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

                    <div
                      className=""
                      style={{
                        display: "flex",
                        // gap: "px",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems:"center"
                      }}
                    >
                      <span style={{ color: "#23A064",fontSize:"13px" }}>Status :</span>
                      <span  style={{fontSize:"13px" }}>{item.current_status[0]?.current_status || ""}</span>

                      <button
                        style={{
                          padding: "7px 10px ",
                          borderRadius: "4px",
                          color: "white",
                          backgroundColor: "#0464D5",
                          border: "none",
                          fontSize: "15px",
                          fontWeight: "900",
                        }}
                        onClick={() => handleTrack(item, item.designcode)}
                      >
                        Track
                      </button>
                    </div>

                    <button
                      className="Download_btn_hub"
                      onClick={() =>
                        handleDownload(item.file_2d, "image_2d.jpg",item.designcode)
                      }
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
                    <ThreeDViewer url={item.file_3d} />
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
                    <button
                      className="Download_btn_hub"
                      onClick={() => handleDownload(item.file_3d, "model_3d.3dm",item.designcode)}
                    >
                      DOWNLOAD
                      <GoDownload />
                    </button>
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
