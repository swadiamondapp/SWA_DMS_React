import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../FinishedProject/FinishedProject.css";
import folderimg from "../../assets/folder.png";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UploadFile from "../UploadFile/UploadFile";
import { createFinsishedProjects } from "../../Pages/Renders/Apis";
import SuccessModal from "../SuccessModal/SuccessModal";

const FinishedProjects = (props) => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeDesignCode, setActiveDesignCode] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timerInterval;
    if (activeDesignCode) {
      timerInterval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [activeDesignCode]);

  useEffect(() => {
    if (!activeDesignCode) {
      setElapsedTime(0);
    }
  }, [activeDesignCode]);

  const handleCardClick = (designCode) => {
    setActiveDesignCode(designCode);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };

  const handleFolderClick = (item) => {
    navigate(`/finished/${item.id}`, {
      state: {
        folderName: item.name,
      },
    });
  };

  console.log("props?.finishedProjectData", props?.finishedProjectData);

  return (
    <>
      <div
        className="Parant_FinishedProject"
        style={{ marginLeft: props?.sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="filter_Container">
          <DesignBtn
            toggleDownloadOptions={toggleDownloadOptions}
            selectButtonLabel={selectButtonLabel}
            toggleRadioButtons={toggleRadioButtons}
            toggleMoveOptions={toggleMoveOptions}
            showDownloadOptions={showDownloadOptions}
            showMoveOptions={showMoveOptions}
          />
        </div>

        <div
          className="Design_FileUpload"
          onClick={() => setUploadModalOpen(true)}
        >
          {uploadInstructionsVisible ? (
            <>
              <div>
                <p className="D__fileUpload">Submit design</p>
                <p className="D__fileUpload2">Upload your finished Projects</p>
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
                  Upload File
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
        <div className="folderCard_parent RendersHome_folders_top">
          {props?.finishedProjectData?.map((item, index) => (
            <div
              className="folder__card"
              onClick={() => handleFolderClick(item)}
            >
              <img src={folderimg} alt="" />

              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <UploadFile
        open={uploadModalOpen}
        setUploadModalOpen
        onClose={() => setUploadModalOpen(false)}
        createFinsishedProjects={createFinsishedProjects}
        setSuccess={setSuccess}
        setFinishedProjectData={props?.setFinishedProjectData}
      />
      <SuccessModal
        successModalOpen={success}
        handleClose={() => setSuccess(false)}
        successMessage={"Files uploaded succesfully"}
      />
    </>
  );
};

export default FinishedProjects;
