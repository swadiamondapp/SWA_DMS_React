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
import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";
// import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";

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
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filteredDta, setFilteredData] = useState([]);
  const [dd, setDd] = useState();
  const [hide, sethide] = useState(false);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTrack = (item, designCode) => {
    navigate(`/statusPage/${item.id}`, {
      state: {
        code: designCode,
      },
    });
  };
  const formatDateTwo = (isoString) => {
    if (!isoString) {
      return "";
    }

    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  console.log("uploadImage-->", uploadedDesigns);

  return (
    <div>
      <div
        className="DesignerDashboard"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            position: "sticky",
            width: "100%",
            top: "0px",
            zIndex: "99",
            backgroundColor: "#F6F5F1",
            height: "160px",
            paddingBottom: "10px",
          }}
        >
          <div className="Design_FileUpload" style={{ marginTop: "20px" }}>
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
            openFilterModal={openFilterModal}
            setOpenFilterModal={setOpenFilterModal}
          />
        </div>

        <div className="Uploaded___list">
          <div className="DesignerDashboardcard">
            <h3 className="HeadNewdesign">
              Uploaded (&nbsp; {currentItems.length}&nbsp; )
            </h3>

            {!isLoading && currentItems.length === 0 && (
              <span>No Data Found</span>
            )}
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
                  size={40}
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
                            <div
                              className=""
                              style={{ display: "flex", gap: "5px" }}
                            >
                              <span
                                style={{ color: "#23A064", fontSize: "13px" }}
                              >
                                Track status :{" "}
                                <span
                                  style={{ color: "black", fontSize: "12px" }}
                                >
                                  {item?.currentstatus_track && item?.currentstatus_track[0]?.current_status}
                                  </span>
                                  {/* {formatDateTwo(
                                    item?.currentstatus_track[0]?.date
                                  )} */}
                              </span>
                            </div>
                            <span
                              style={{ color: "#23A064", fontSize: "12px" }}
                            >
                              CAD status :{" "}
                              <span
                                style={{ color: "black", fontSize: "12px" }}
                              >
                                {item.timer_status}
                                {item.timer_status !== "on-going" &&
                                  ` - ${item.timer_value}`}
                              </span>
                            </span>
                            <div className="Card_Details_Inner">
                              <div className="Inner_Left">
                                <p>{item.name}</p>
                                <p>{item.created_at}</p>
                              </div>
                              <button
                                style={{
                                  padding: "7px 10px ",
                                  borderRadius: "4px",
                                  color: "white",
                                  backgroundColor: "#0464D5",
                                  border: "none",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                                onClick={() =>
                                  handleTrack(item, item.designcode)
                                }
                              >
                                Track
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {detail && (
                  <>
                    <div className="Card_Design_Parent3">
                      {currentItems.map((item, index) => (
                        <div className="New_Design_card" key={index}>
                          <div className="Card_img">
                            <LazyLoad height={200} offset={100}>
                              <img src={item.image} alt="" />
                            </LazyLoad>
                          </div>
                          <div className="Card_Details_Designer">
                            <div
                              className=""
                              style={{ display: "flex", gap: "5px" }}
                            ></div>
                            <h3>ID : {item.designcode}</h3>
                            <div className="Card_Details_Inner">
                              <div className="Inner_Left">
                                <div
                                  className=""
                                  style={{ display: "flex", gap: "5px" }}
                                >
                                  <span
                                    style={{
                                      color: "#23A064",
                                      fontSize: "13px",
                                    }}
                                  >
                                    Track status :{" "}
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {
                                        item?.currentstatus_track[0]
                                          ?.current_status
                                      }{" "}
                                      {formatDateTwo(
                                        item?.currentstatus_track[0]?.date
                                      )}
                                    </span>
                                  </span>
                                </div>
                                <span
                                  style={{ color: "#23A064", fontSize: "12px" }}
                                >
                                  CAD status :{" "}
                                  <span
                                    style={{ color: "black", fontSize: "12px" }}
                                  >
                                    {item.timer_status} - {item.timer_value}
                                  </span>
                                </span>

                                <p>{item.name}</p>
                                <p style={{ fontSize: "12px", color: "gray" }}>
                                  {item.created_at}
                                </p>
                              </div>

                              <button
                                style={{
                                  padding: "7px 10px ",
                                  borderRadius: "4px",
                                  color: "white",
                                  backgroundColor: "#0464D5",
                                  border: "none",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                                onClick={() =>
                                  handleTrack(item, item.designcode)
                                }
                              >
                                Track
                              </button>
                            </div>
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
                        <div className="New_Design_card_3" key={index}>
                          <div
                            className=""
                            style={{
                              width: "100%",
                              height: "70vh",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              style={{
                                backgroundSize: "contain",
                                width: "90%",
                                height: "100%",
                              }}
                              src={item.image}
                              alt=""
                            />
                            {/* <LazyLoad height={900} offset={100}>
                             </LazyLoad> */}
                          </div>
                          <div
                            className="parent_border"
                            style={{ width: "100%" }}
                          ></div>
                          <div className="Card_Details_Designer_3">
                            <h3>ID : {item.designcode}</h3>
                            <div
                              className=""
                              style={{ display: "flex", gap: "5px" }}
                            ></div>
                            <div className="Card_Details_Inner">
                              <div className="Inner_Left">
                                <div
                                  className=""
                                  style={{ display: "flex", gap: "5px" }}
                                >
                                  <span
                                    style={{
                                      color: "#23A064",
                                      fontSize: "13px",
                                    }}
                                  >
                                    Track status :{" "}
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {
                                        item?.currentstatus_track[0]
                                          ?.current_status
                                      }{" "}
                                      {formatDateTwo(
                                        item?.currentstatus_track[0]?.date
                                      )}
                                    </span>
                                  </span>
                                </div>
                                <span
                                  style={{ color: "#23A064", fontSize: "12px" }}
                                >
                                  CAD status :{" "}
                                  <span
                                    style={{ color: "black", fontSize: "12px" }}
                                  >
                                    {item.timer_status} - {item.timer_value}
                                  </span>
                                </span>
                                <p>{item.name}</p>
                                <p style={{ fontSize: "12px", color: "gray" }}>
                                  {item.created_at}
                                </p>
                                <button
                                  style={{
                                    padding: "7px 10px ",
                                    borderRadius: "4px",
                                    color: "white",
                                    backgroundColor: "#0464D5",
                                    border: "none",
                                    fontSize: "15px",
                                    fontWeight: "900",
                                  }}
                                  onClick={() =>
                                    handleTrack(item, item.designcode)
                                  }
                                >
                                  Track
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {!hide && (
            <div className="pagination">
              <Pagination
                count={Math.ceil(uploadedDesigns.length / 20)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </div>
        <MultipleImageUpload
          open={multipleImageModalOpen}
          onClose={() => setMultipleImageModalOpen(false)}
          previewImages={previewImages}
          handleFileSelect={handleFileSelect}
          setUploadedDesigns={setUploadedDesigns}
          setMultipleImageModalOpen={setMultipleImageModalOpen}
          upDateUploadImagesView={() =>
            uplodedDesignPagination(setIsLoading, setCurrentItems, currentPage)
          }
        />
      </div>

      {openFilterModal && (
        <DesignerFilterModal
          open={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          setOpenFilterModal={setOpenFilterModal}
          setFolderDetails={setCurrentItems}
          onClearCall={() => fetchDesigns()}
          // folderDetails={props.folderDetails}
          setFilteredData={setFilteredData}
          setDd={setDd}
          dd={dd}
          page="designerDashboard"
          sethide={sethide}
        />
      )}
    </div>
  );
};

export default DesignerDashboard;
