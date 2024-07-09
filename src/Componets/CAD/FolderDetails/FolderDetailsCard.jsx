import React from "react";
import "./FolderDetails.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";

const FolderDetailsCard = ({ folderDetails, setIsModalOpen }) => {
  function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  }
  return (
    <div className="ParentCad">
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
                  <button className="Prinit_btn_hub">
                    Print
                    <IoPrintOutline />
                  </button>
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
