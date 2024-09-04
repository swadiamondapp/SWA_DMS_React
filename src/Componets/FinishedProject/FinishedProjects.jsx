import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../FinishedProject/FinishedProject.css";
import folderimg from "../../assets/folder.png";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UploadFile from "../UploadFile/UploadFile";
import { createFinsishedProjects } from "../../Pages/Renders/Apis";
import SuccessModal from "../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";
import { MdViewModule } from "react-icons/md";
import sort from "../../assets/sort.png";
import filter from "../../assets/filter.png";

const FinishedProjects = (props) => {
  const navigate = useNavigate();

  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeDesignCode, setActiveDesignCode] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [success, setSuccess] = useState(false);

  const [view, setView] = useState(false);
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);

  const handleView = () => {
    setView(!view);
  };
  const gridView = () => {
    setGrid(true);
    setDetail(false);
    setTiles(false);
  };

  const detailView = () => {
    setGrid(false);
    setDetail(true);
    setTiles(false);
  };

  const tileView = () => {
    setGrid(false);
    setDetail(false);
    setTiles(true);
  };

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
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  sort;
  console.log("props?.finishedProjectData", props?.finishedProjectData);
  console.log("loading", props?.isLoading);

  return (
    <>
      <div
        className="Parant_FinishedProject"
        style={{ marginLeft: props?.sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="Design_FileUpload" style={{ marginTop: "10px" }}>
          {uploadInstructionsVisible ? (
            <>
              <div>
                <p className="D__fileUpload">Submit design</p>
                <p className="D__fileUpload2">Upload your finished Projects</p>
              </div>
              <div
                className="File____uploadbtn"
                onClick={() => setUploadModalOpen(true)}
              >
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

        <div className="RendersHome_butns" style={{ marginTop: "10px" }}>
          <button
            className="D_View_Sort_Filter"
            onClick={handleView}
            style={{ position: "relative" }}
          >
            <MdViewModule /> View
            {view && (
              <div className="sortData" style={{ left: "-20px" }}>
                <span
                  className={grid === true ? "setcolor" : ""}
                  onClick={gridView}
                >
                  Grid
                </span>
                <span
                  className={detail === true ? "setcolor2" : ""}
                  onClick={detailView}
                >
                  Details
                </span>
                <span
                  className={tiles === true ? "setcolor3" : ""}
                  onClick={tileView}
                >
                  Tiles
                </span>
              </div>
            )}
          </button>
          <button>
            {" "}
            <img className="RendersHome_img" src={sort} alt="" srcset="" /> Sort
          </button>
          <button>
            {" "}
            <img
              className="RendersHome_img"
              src={filter}
              alt=""
              srcset=""
            />{" "}
            Filter
          </button>
        </div>

        {/* <DesignBtn
            toggleDownloadOptions={toggleDownloadOptions}
            selectButtonLabel={selectButtonLabel}
            toggleRadioButtons={toggleRadioButtons}
            toggleMoveOptions={toggleMoveOptions}
            showDownloadOptions={showDownloadOptions}
            showMoveOptions={showMoveOptions}
          /> */}

        {props?.isLoading && props?.finishedProjectData?.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress
              size={50} // Set the desired size
              sx={{
                color: "#126e72",
                padding: "8px 10px",
                width: "35px",
              }}
            />
          </div>
        )}
           
        { props?.isLoading === false && props?.finishedProjectData?.length === 0 && (
        <div className="" style={{width:"100%",
          height:"400px",display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <span>No Data found</span>
          </div>
        )}  

        <div className="folderCard_parent RendersHome_folders_top">
          {props?.finishedProjectData?.map((item, index) => (
            <>
              {grid && (
                <>
                  <div
                    style={{ cursor: "pointer" }}
                    className="folder__card"
                    onClick={() => handleFolderClick(item)}
                  >
                    <img src={folderimg} alt="" />

                    <p className="text-truncate">
                      {truncateText(item.name, 10)}
                    </p>
                    <span className="text-truncate_hover">{item.name}</span>
                  </div>
                </>
              )}
              {/* 
<div className="folderCard_parent">
            <div
              className="folder__card"
              style={{display:"flex",width:"110px"}}
              key={item.id}
              onClick={() => handleFolderClick(item)}
            >
              <img src={folderimg} alt="" style={{width:"26px"}}/>
              <p className="folder_name" style={{fontSize:"9px"}}>{item.name}</p>
            </div>
          </div> */}

              {tiles && (
                <>
                  <div
                    className="folder__card"
                    onClick={() => handleFolderClick(item)}
                    style={{ display: "flex", width: "110px",cursor:"pointer" }}
                  >
                    <img src={folderimg} alt="" style={{ width: "26px" }} />

                    <p className="text-truncate">
                      {truncateText(item.name, 10)}
                    </p>
                    <span className="text-truncate_hover">{item.name}</span>
                  </div>
                </>
              )}
              {detail && (
                <>
                  <div
                    className="folder__card"
                    onClick={() => handleFolderClick(item)}
                    style={{ display: "flex", width: "140px",cursor:"pointer" }}
                  >
                    <img src={folderimg} alt="" style={{ width: "40px" }} />

                    <p className="text-truncate">
                      {truncateText(item.name, 10)}
                    </p>
                    <span
                      className="text-truncate_hover"
                      style={{ fontSize: "11px" }}
                    >
                      {item.name}
                    </span>
                  </div>
                </>
              )}
            </>
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
