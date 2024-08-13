import React, { useState, useEffect, useCallback } from "react";
import "./DesignerDashboard.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";

import { CircularProgress, Pagination } from "@mui/material";
import LazyLoad from "react-lazy-load";
import {
  list_uploaded_designs,
  upload_designs_items,
  uplodedDesignPagination,
} from "./Api";

import MultipleImageUpload from "../../MultipleImageUploadModal/MultipleImageUpload";
import { useLocation, Link, useNavigate } from "react-router-dom";
const DesignerDashboard = ({ sidebarExpanded }) => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [uploadedDesigns, setUploadedDesigns] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [multipleImageModalOpen, setMultipleImageModalOpen] = useState(false);
  const navigate = useNavigate();
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);

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

  const formData = new FormData();
  formData.append("image", uploadImage);

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     // Display the new image immediately
  //     const newImage = {
  //       image: URL.createObjectURL(file),
  //       designcode: "Loading...",
  //       name: "Uploading...",
  //       created_at: new Date().toLocaleString(),
  //     };
  //     setUploadedDesigns((prevDesigns) => [newImage, ...prevDesigns]);

  //     // Upload the image and refresh the list
  //     // await upload_designs_items(setIsLoading, file, setUploadedDesigns);
  //     // await list_uploaded_designs(setIsLoading, setUploadedDesigns);
  //   }
  // };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files); // Get the list of selected files
    const previews = files.map((file) => ({
      previewUrl: URL.createObjectURL(file),
      file,
    })); // Create image previews using Object URLs

    setPreviewImages(previews);
    setMultipleImageModalOpen(true); // Update state with previews
  };
  const handleFileSelect = (index, event) => {
    const file = event.target.files[0]; // Get the new file
    const updatedImages = [...previewImages]; // Create a copy of the current images
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Create a new preview URL
      updatedImages[index] = { previewUrl, file }; // Update the specific image
      setPreviewImages(updatedImages); // Update state
    }
  };

  // useEffect(() => {
  //   list_uploaded_designs(setIsLoading, setUploadedDesigns);
  // }, []);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   uplodedDesignPagination(setIsLoading, setCurrentItems, currentPage);
  // }, [currentPage]);

  const fetchDesigns = useCallback(async () => {
    await uplodedDesignPagination(setIsLoading, setCurrentItems, currentPage);
  }, [currentPage]);

  useEffect(() => {
    list_uploaded_designs(setIsLoading, setUploadedDesigns);
  }, []);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  // const itemsPerPage = 10;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = uploadedDesigns.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log("uploadImage-->", uploadedDesigns);

  return (
    <div>
      <div
        className="DesignerDashboard"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="Design_FileUpload">
          {uploadInstructionsVisible ? (
            <>
              <div>
                <p className="D__fileUpload">Upload file</p>
                <p className="D__fileUpload2">you can upload file here </p>
              </div>
              <div className="File____uploadbtn">
                <button
                  // onClick={() => document.getElementById("fileInput").click()}
                  onClick={() => setMultipleImageModalOpen(true)}
                >
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
                  Upload Image
                  <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
                </button>
              </div>
            </div>
          )}

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
        <div className="Uploaded___list">
          <DesignBtn
            toggleDownloadOptions={toggleDownloadOptions}
            selectButtonLabel={selectButtonLabel}
            toggleRadioButtons={toggleRadioButtons}
            toggleMoveOptions={toggleMoveOptions}
            showDownloadOptions={showDownloadOptions}
            showMoveOptions={showMoveOptions}
            setGrid={setGrid}
            setDetail={setDetail}
            setTiles={setTiles}
            grid={grid}
            detail={detail}
            tiles={tiles}
          />
          <div className="DesignerDashboardcard">
            <h3 className="HeadNewdesign">Uploaded</h3>

            {isLoading ? (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{
                    color: "#000000",
                    // padding: "8px 10px",
                    marginLeft: "15%",
                  }}
                />
              </div>
            ) : (
              <>
                {grid && (
                  <>
                    <div className="Card_Design_Parent">
                      {currentItems.map((item, index) => (
                        <div className="New_Design_card" key={index}>
                          <div className="Card_img">
                            <LazyLoad height={200} offset={100}>
                              <img src={item.image} alt="" />
                            </LazyLoad>
                          </div>
                          <div className="Card_Details_Designer">
                            <h3>ID : {item.designcode}</h3>
                            <div className="Card_Details_Inner">
                              <div className="Inner_Left">
                                <p>{item.name}</p>
                                <p>{item.created_at}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {detail && (
                  <>
                    <div className="Card_Design_Parent">
                      {currentItems.map((item, index) => (
                        <div className="New_Design_card_deatail" key={index}>
                          <LazyLoad height={50} offset={90}>
                            <img
                              className="Card_img_deatail"
                              src={item.image}
                              alt=""
                            />
                          </LazyLoad>
                          <div className="Card_Designer_deatail">
                            <h3>ID : {item.designcode}</h3>
                            <p>{item.name}</p>
                            <p>{item.created_at}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tiles && (
                  <>
                    <div className="Card_Design_Parent2">
                      {currentItems.map((item, index) => (
                        <div className="New_Design_card_deatail2" key={index}>
                          <img
                            className="Card_img_deatail2"
                            src={img1}
                            alt=""
                          />
                          <div className="Card_Designer_deatail2">
                            <h3>ID : {item.designcode}</h3>
                            {/* <p>{item.name}</p>
                            <p>{item.created_at}</p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <MultipleImageUpload
          open={multipleImageModalOpen}
          onClose={() => setMultipleImageModalOpen(false)}
          previewImages={previewImages}
          handleFileSelect={handleFileSelect}
          setUploadedDesigns={setUploadedDesigns}
          setMultipleImageModalOpen={setMultipleImageModalOpen}
          upDateUploadImagesView= {()=>  uplodedDesignPagination(setIsLoading, setCurrentItems, currentPage)}
        />
        <div className="pagination">
          <Pagination
            count={Math.ceil(uploadedDesigns.length / 20)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignerDashboard;
