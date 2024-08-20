import React, { useContext, useEffect, useRef } from "react";
import "./RendersDetailPage.css";
import download from "../../../assets/download.png";
import print from "../../../assets/printer.png";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import RendersProductPrint from "../RendersProductPrint/RendersProductPrint";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ThreeDViewer from "../../ThreeDViewer/ThreeDViewer";
import { GoDownload } from "react-icons/go";

const RendersDetailPage = ({ folderDetails, sidebarExpanded }) => {
  const navigate = useNavigate();
  console.log("folderDetails", folderDetails);

  const printRef = useRef();

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

  const handleDownload = (imageUrl, fileName = "downloaded_file") => {
    fetch(imageUrl, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  const handleForlderDetailsVeiw = (id, designCode) => {
    navigate(`/assignmentviewsAll/${id}`, {
      state: {
        detailsViewFolderName: designCode,
renderMessage: true,
      },
    });
    console.log(designCode, "renderDesignCode");
  };

  return (
    <>
      {folderDetails?.map((item) => (
        <div
          className="RendersDetailPage"
          key={item.id}
          style={{ marginLeft: sidebarExpanded ? "218px" : "120px" }}
        >
<div className="Detail_Card">
            <img
              src={item.file_2d}
              alt=""
              onClick={() => handleForlderDetailsVeiw(item.id, item.designcode)}
            />
            <span>
              POSTED ON: <b>{formatDate(item.created_at)}</b>
            </span>
            <button
              className="Download_btn_hub"
              onClick={() => handleDownload(item.file_2d, "image_2d.jpg")}
            >
              DOWNLOAD
              <GoDownload />
            </button>
          </div>
          <div className="Detail_Card">
            <ThreeDViewer url={item.file_3d} />
            <span>
              POSTED ON: <b> {formatDate(item.created_at.split("T")[0])} </b>
            </span>
            <button
              className="Download_btn_hub"
              onClick={() => handleDownload(item.file_3d, "model_3d.3dm")}
            >
              DOWNLOAD
              <GoDownload />
            </button>
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
