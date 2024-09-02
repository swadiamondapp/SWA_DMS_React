import React, { useRef, useState } from "react";
import "./FolderDetails.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { GoDownload } from "react-icons/go";
import { IoEye, IoPrintOutline } from "react-icons/io5";
import CadPrint from "./CadPrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import axios from "axios";
import fileDownload from "js-file-download";
import { CircularProgress } from "@mui/material";
import ThreeDViewer from "../../ThreeDViewer/ThreeDViewer";
import InstructionModal from "../../InstructionModal/InstructionModal";
import { Select } from "antd";
import {
  Cad2DUpdateImage,
  Cad3DUpdateImage,
} from "../../AssignmentDetailsViewsAll/Api";
import SuccessModal from "../../SuccessModal/SuccessModal";

const FolderDetailsCard = ({
  folderDetails,
  setIsModalOpen,
  sidebarExpanded,
  setImages,
  // isLoading,
}) => {
  const printRef = useRef();
  const [openModal, setOpenmodal] = useState(false);
  const [modalHeading, setmodalHeading] = useState("");
  const [modalTitle, setmodalTitle] = useState("");
  const [file2d_status, setFile2d_status] = useState("");
  const [file3d_status, setFile3d_status] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  console.log("file2d_status", file2d_status);

  const handleopenModal = () => {
    setOpenmodal(!openModal);
    setmodalHeading("CAD Instructions");
    setmodalTitle("instruction");
  };

  const handlePrint = useReactToPrint({
    content: printRef.current,
  });

  const handleDownload = (imageUrl, model) => {
    fetch(imageUrl, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download =
          model === "2d" ? "downloaded_image.jpg" : "downloaded_image.3dm";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading the image:", error));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "3d_model.png";
    link.click();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setImages({
      normal: null,
      threeD: null,
    });
  };

  function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const handle2DChange = async (value) => {
    setFile2d_status(value);
    let updatedStatus = value;

    await Cad2DUpdateImage(
      setIsLoading,
      updatedStatus,
      folderDetails?.designcode,
      setSuccessModalOpen
    );
  };

  const handle3DChange = async (value) => {
    setFile3d_status(value);
    let updatedStatus = value;

    await Cad3DUpdateImage(
      setIsLoading,
      updatedStatus,
      folderDetails?.designcode,
      setSuccessModalOpen
    );
  };

  return (
    <div
      className="ParentCad"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
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
            <button onClick={handleOpenModal}>
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

      {folderDetails?.length === 0 && (
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

      <div className="parentCentral" style={{ paddingLeft: "0px" }}>
        <div className="CadAssignmentCard">
          <div className="Card_Design_Parent">
            <div className="New_Design_card" style={{ width: "280px" }}>
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
                    Posted on : {formatDate(folderDetails?.updated_at)}
                  </p>
                  <button
                    className="Download_btn_hub"
                    onClick={() => handleDownload(folderDetails?.file_2d, "2d")}
                  >
                    DOWNLOAD
                    <GoDownload />
                  </button>

                  {/* <Select
                    value={
                      file2d_status
                        ? file2d_status
                        : folderDetails?.file2d_status
                    }
                    style={{
                      width: 120,
                      padding: "6px 6px 6px 2px",
                      color: "#23A064",
                      border: "1px solid #23A064",
                      background: "#23A0641A",
                      borderRadius: "32px",
                      marginTop: "13px",
                    }}
                    onChange={(value) => handle2DChange(value)}
                    options={[
                      { value: "Approved", label: "Approved" },
                      { value: "Rejected", label: "Rejected" },
                    ]}
                  /> */}

                  <button
                    style={{
                      width: 120,
                      padding: "6px 6px 6px 2px",
                      color:
                      folderDetails?.file2d_status === 'Approved' 
                      ? '#23A064' 
                      : folderDetails?.file2d_status === 'Rejected'
                        ? 'red' 
                        : '#0464D5', 
                      border: `1px solid ${folderDetails?.file2d_status === 'Approved' 
                        ? '#23A064' 
                        : folderDetails?.file2d_status === 'Rejected'
                          ? '#FA3838' 
                          : '#0464D5'}`,
                      background: 
                      folderDetails?.file2d_status === 'Approved' 
                        ? '#23A0641A' 
                        : folderDetails?.file2d_status === 'Rejected'
                          ? '#FA38381A' 
                          : '#0464D51A',
                      borderRadius: "32px",
                      fontWeight:"600",
                      marginTop: "13px",
                    }}
                  >
                    {folderDetails?.file2d_status}
                  </button>
                </div>
              </div>
            </div>
            <div className="New_Design_card" style={{ width: "280px" }}>
              <div className="Card_Details">
                <div
                  className="Card_img"
                  style={{ borderBottom: "0px", minHeight: "140px" }}
                >
                  {/* <img src={folderDetails?.file_3d} alt="" /> */}
                  <ThreeDViewer url={folderDetails?.file_3d} />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p
                    className="Hub_head"
                    style={{ fontSize: "13px", padding: "5px 0px" }}
                  >
                    Posted on : {formatDate(folderDetails?.updated_at)}
                  </p>
                  <button
                    className="Download_btn_hub"
                    style={{ background: "#126E72" }}
                    onClick={() => handleDownload(folderDetails?.file_3d, "3d")}
                  >
                    DOWNLOAD
                    <GoDownload />
                  </button>

                  {/* <Select
                    value={
                      file3d_status
                        ? file3d_status
                        : folderDetails?.file3d_status
                    }
                    style={{
                      width: 120,
                      padding: "6px 6px 6px 2px",
                      color: "#23A064",
                      border: "1px solid #23A064",
                      background: "#23A0641A",
                      borderRadius: "32px",
                      marginTop: "13px",
                    }}
                    onChange={(value) => handle3DChange(value)}
                    options={[
                      { value: "Approved", label: "Approved" },
                      { value: "Rejected", label: "Rejected" },
                    ]}
                  /> */}

                  <button
                    style={{
                      width: 120,
                      padding: "6px 6px 6px 2px",
                      color:
                      folderDetails?.file3d_status === 'Approved' 
                      ? '#23A064' 
                      : folderDetails?.file3d_status === 'Rejected'
                        ? 'red' 
                        : '#0464D5', 
                      border: `1px solid ${folderDetails?.file3d_status === 'Approved' 
                        ? '#23A064' 
                        : folderDetails?.file3d_status === 'Rejected'
                          ? '#FA3838' 
                          : '#0464D5'}`,
                      background: 
                      folderDetails?.file3d_status === 'Approved' 
                        ? '#23A0641A' 
                        : folderDetails?.file3d_status === 'Rejected'
                          ? '#FA38381A' 
                          : '#0464D51A',
                      borderRadius: "32px",
                      fontWeight:"600",
                      marginTop: "13px",
                    }}
                  >
                    {folderDetails?.file3d_status}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <InstructionModal
          open={handleopenModal}
          setOpenmodal={setOpenmodal}
          modalHeading={modalHeading}
          modalTitle={modalTitle}
          remarkData={folderDetails?.remark}
        />
      )}

      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={"Status Updated successfully"}
      />
    </div>
  );
};

export default FolderDetailsCard;
