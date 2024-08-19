import React, { useState } from "react";
import "./FinishedProjectInner.css";
import ShareIcon from "../../../assets/shareIcon.png";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UploadFile from "../../UploadFile/UploadFile";
import { createFinsishedProjects } from "../../../Pages/Renders/Apis";

const FinishedProjectInner = (props) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleOpenModal = () => {
    setUploadModalOpen(true);
  };

  const productId =  props?.folderItem[0]?.designcode;

  return (
    <div
      className="MainContainer"
      style={{ marginLeft: props?.sidebarExpanded ? "225px" : "125px" }}
    >
      <div className="Design_FileUpload">
        <div>
          <p className="D__fileUpload">Reupload</p>
          <p className="D__fileUpload2">
            Once any changes needed in the file you can reupload the file
          </p>
        </div>
        <div className="File____uploadbtn">
          <button onClick={() => setUploadModalOpen(true)}>
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

      <div className="parentRendercard">
        {props?.folderItem &&
          props?.folderItem[0]?.images?.map((imgObj, index) => {
            const imageUrl = Object.values(imgObj)[0];
            const createdAt = imgObj.created_at;
            {
              console.log(imageUrl, "imageUrl");
            }
            if (imageUrl) {
              return (
                <div className="finishedCardContainer" key={index}>
                  <img src={imageUrl} alt="card_image" />
                  <span className="postedOn">
                    POSTED ON:{" "}
                    <span className="postedOn_data">{createdAt}</span>
                  </span>
                  <div>
                    <button className="shareButton_finished">
                      <img src={ShareIcon} alt="Share icon" />
                      Share
                    </button>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>

      {uploadModalOpen && (
        <UploadFile
          open={uploadModalOpen}
          setUploadModalOpen
          onClose={() => setUploadModalOpen(false)}
          createFinsishedProjects={createFinsishedProjects}
          pid={productId}
          
        />
      )}
    </div>
  );
};

export default FinishedProjectInner;
