import React, { useState, useEffect } from "react";
import "../RenderCard/RenderCard.css";
import p from "../../assets/p1.png";
import { useLocation, Link } from "react-router-dom";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UpIcon from "../../assets/uPicon.png";
import UploadFile from "../../Componets/UploadFile/UploadFile";
import SuccessModal from "../SuccessModal/SuccessModal";
import { createFinsishedProjects } from "../../Pages/Renders/Apis";

const RenderCard = (props) => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeDesignCode, setActiveDesignCode] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const formatElapsedTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="MainContainer">
      <div
        className="Design_FileUpload"
        onClick={() => setUploadModalOpen(true)}
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
      <div className="parentRendercard">
        {props?.designListData?.map((item, index) => (
          <div className="renderCardImage">
            <img src={item.file1} alt="card_image" />
            <span className="idText">ID : {item.designcode}</span>
            <span className="posted">
              POSTED ON:{" "}
              <span className="postedOn_dataa">{item.created_at}</span>
            </span>
            {/* <div>
              {activeDesignCode === item.designcode ? (
                <button className="Counter_button">
                  {`${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, "0")}`}
                </button>
              ) : (
                <button className="Counter_button" onClick={() => !activeDesignCode && handleCardClick(item.designcode)} disabled={!!activeDesignCode}>
                  DOWNLOAD
                </button>
              )}
            </div> */}
            <div>
              {activeDesignCode === item.designcode ? (
                <button className="Counter_button">
                  {formatElapsedTime(elapsedTime)}
                </button>
              ) : (
                <button
                  className={
                    activeDesignCode && activeDesignCode != item.designcode
                      ? "blur-Counter_button"
                      : "Counter_button"
                  }
                  onClick={() => handleCardClick(item.designcode)}
                >
                  DOWNLOAD
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <UploadFile
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        createFinsishedProjects={createFinsishedProjects}
      />
      <SuccessModal
        // successModalOpen={}
        // handleClose={}
        successMessage={"Files uploaded succesfully"}
      />
    </div>
  );
};

export default RenderCard;
