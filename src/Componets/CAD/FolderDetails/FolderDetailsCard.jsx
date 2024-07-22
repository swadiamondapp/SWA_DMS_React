import React, { useRef } from "react";
import "./FolderDetails.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import CadPrint from "./CadPrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";

const FolderDetailsCard = ({
  folderDetails,
  setIsModalOpen,
  sidebarExpanded,
}) => {
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

  const handleDownload = () => {
    if (!folderDetails?.file_2d) return;

    const link = document.createElement("a");
    link.href = folderDetails.file_2d;
    link.download = "image.png"; // You can dynamically set the filename here
    link.click();
  };
 
  console.log("folderDetails",folderDetails)

  return (
    <div
      className="ParentCad"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div className="Design_FileUpload" onClick={() => setIsModalOpen(true)}>
        <div>
          <p className="D__fileUpload">Reupload</p>
          <p className="D__fileUpload2">
            Once any changes needed in the file you can reupload the file
          </p>
        </div>
        <div className="File____uploadbtn">
          <button>
            Re Upload File{" "}
            <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
          </button>
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="parentCentral" style={{ paddingLeft: "0px" }}>
        <div className="CadAssignmentCard">
          <div className="Card_Design_Parent">
            <div className="New_Design_card">
              <div className="Card_Details">
                <div
                  className="Card_img"
                  style={{ borderBottom: "0px", minHeight: "140px" }}
                >
                  <img src={folderDetails?.file_2d} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p
                    className="Hub_head"
                    style={{ fontSize: "13px", padding: "5px 0px" }}
                  >
                    Posted on : {formatDate(folderDetails?.created_at)}
                  </p>
                  <button className="Download_btn_hub" onClick={handleDownload}>
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
                  style={{ borderBottom: "0px", minHeight: "140px" }}
                >
                  <img src={folderDetails?.file_3d} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p
                    className="Hub_head"
                    style={{ fontSize: "13px", padding: "5px 0px" }}
                  >
                    Posted on : {formatDate(folderDetails?.created_at)}
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
                  />{" "}
                 
                  <div style={{ display: "none" }}>
                    <CadPrint ref={printRef} folderDetails={folderDetails} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderDetailsCard;
