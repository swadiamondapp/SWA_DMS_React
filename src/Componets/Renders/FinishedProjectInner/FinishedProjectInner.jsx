import React, { useEffect, useState } from "react";
import "./FinishedProjectInner.css";
import ShareIcon from "../../../assets/shareIcon.png";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UploadFile from "../../UploadFile/UploadFile";
import {
  createFinsishedProjects,
  finishedProjectList,
  reuploadFinishedProject,
} from "../../../Pages/Renders/Apis";
import { useLocation } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import InstructionModal from "../../InstructionModal/InstructionModal";
import SuccessModal from "../../SuccessModal/SuccessModal";

const FinishedProjectInner = (props) => {
  const location = useLocation();

  const { path } = location.state || "";
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [openModal, setOpenmodal] = useState(false);
  const [modalHeading, setmodalHeading] = useState("");
  const [modalTitle, setmodalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjectData, setFinishedProjectData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    finishedProjectList(setFinishedProjectData, setIsLoading);
  }, []);

  const handleopenModal = () => {
    setOpenmodal(!openModal);
    setmodalHeading("Add Render Instractions");
    setmodalTitle("instraction");
  };

  const handleOpenModal = () => {
    setUploadModalOpen(true);
  };

  const productId = props?.folderItem[0]?.designcode;
  const id = props?.id;

  return (
    <div
      className="MainContainer"
      style={{ marginLeft: props?.sidebarExpanded ? "225px" : "125px" }}
    >
      {!path && (
        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: "10px",
          }}
        >
          <div className="Design_FileUpload" style={{ width: "100%" }}>
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
          <button
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "black",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "4px",
            }}
            onClick={handleopenModal}
          >
            View Instraction{" "}
            <IoEye style={{ color: "white", fontSize: "20px" }} />
          </button>
        </div>
      )}

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

                  <button
                    style={{
                      padding: "3px 6px 3px 6px",
                      color: "#23A064",
                      border: "1px solid #23A064",
                      background: "#23A0641A",
                      width: "auto",
                      borderRadius: "32px",
                    }}
                  >
                    Approved
                  </button>
                  <div>
                    <button className="shareButton_finished">
                      <img src={ShareIcon} alt="Share icon" />
                      Share
                    </button>
                  </div>
                  {/* <select name="" id=""
                   style={{
                    padding: "6px 6px 6px 6px",
                    color: "#23A064",
                    border: "1px solid #23A064",
                    background: "#23A0641A",
                    width: "auto",
                    borderRadius: "32px",
                    outline:"none"
                  }}
                  >
                    <option value="">Pending</option>
                    <option value="">Accepted</option>
                    <option value="">Rejected</option>
                  </select> */}
                </div>
              );
            } else {
              return null;
            }
          })}

        {openModal && (
          <InstructionModal
            open={handleopenModal}
            setOpenmodal={setOpenmodal}
            modalHeading={modalHeading}
            modalTitle={modalTitle}
          />
        )}
      </div>

      {uploadModalOpen && (
        <UploadFile
          open={uploadModalOpen}
          setUploadModalOpen
          onClose={() => setUploadModalOpen(false)}
          createFinsishedProjects={reuploadFinishedProject}
          setFinishedProjectData={setFinishedProjectData}
          setSuccess={setSuccess}
          pid={productId}
          fid={id}
          setFolderItem={props?.setFolderItem}
          Images={props?.folderItem[0]?.images}
        />
      )}

      <SuccessModal
        successModalOpen={success}
        handleClose={() => setSuccess(false)}
        successMessage={"Files uploaded succesfully"}
      />
    </div>
  );
};

export default FinishedProjectInner;
