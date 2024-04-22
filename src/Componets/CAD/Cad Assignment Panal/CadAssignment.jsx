import React, { useState } from "react";
import "./CadAssignment.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../../assets/folder.png";

const CadAssignment = () => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="ParentCad">
      <div
        className="Design_FileUpload"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {uploadInstructionsVisible ? (
          <>
            <div>
              <p className="D__fileUpload">Submit design</p>
              <p className="D__fileUpload2">
                Upload your finished file as png and 3.dm file format
              </p>
            </div>
            <div className="File____uploadbtn">
              <button>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div>
          </>
        ) : (
          <div className="De__file">
            <p>File uploaded successfully!</p>
            <div className="File____uploadbtn">
              <button>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>
      {/* cad folder */}
      <div className="CadFolder">
        <div className="Parent_Folder_section_Designer">
          <h3 className="HeadNewdesign">Folders</h3>
          <div className="folderCard_parent">
            <div className="folder__card">
              <Link to="/CadAssignmentcard">
                <img src={folderimg} alt="" />
              </Link>

              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
          </div>
        </div>
        <div className="Finished_Items">
          <div className="Parent_Folder_section_Designer">
            <h3 className="HeadNewdesign">Finished items</h3>
            <div className="folderCard_parent">
              <div className="folder__card">
                <Link to="">
                  <img src={folderimg} alt="" />
                </Link>

                <p>Akshayathithiya</p>
              </div>
              <div className="folder__card">
                <Link to="">
                  <img src={folderimg} alt="" />
                </Link>
                <p>Akshayathithiya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadAssignment;
