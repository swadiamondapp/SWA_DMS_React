import React from "react";
import "./FolderDetails.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

const FolderDetailsCard = ({ folderDetails, setIsModalOpen }) => {
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
      <div
        className="Parent_Folder_section_Designer"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "30px",
        }}
      >
        <div className="New_Design_card">
          <div className="Card_Details">
            <div className="Card_img" style={{ borderBottom: "0px" }}>
              <img src={folderDetails?.file_2d} alt="" />
            </div>
            <div className="Card_Details_Inner_cad_Hub">
              <p>POSTED ON: {folderDetails?.created_at}</p>
            </div>
          </div>
        </div>
        <div className="New_Design_card">
          <div className="Card_Details">
            <div className="Card_img" style={{ borderBottom: "0px" }}>
              <img src={folderDetails?.file_3d} alt="" />
            </div>
            <div className="Card_Details_Inner_cad_Hub">
              <p>POSTED ON: {folderDetails?.created_at}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderDetailsCard;
