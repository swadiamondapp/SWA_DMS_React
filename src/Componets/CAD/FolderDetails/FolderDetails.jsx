import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import CentalHub from "../../CentalHub/CentalHub";
import FolderDetailsCard from "./FolderDetailsCard";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { projectDetails, reUploadFile } from "../Api";

const FolderDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [folderDetails, setFolderDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState("");
  const [productCode, setProductCode] = useState("");
  const [itemId, setItemId] = useState("");
  const [imagesName, setImagesName] = useState({
    normalName: null,
    threeDName: null,
  });
  const [images, setImages] = useState({
    normal: null,
    threeD: null,
  });

  useEffect(() => {
    projectDetails(setIsLoading, setFolderDetails, id, setItemId);
  }, []);

  useEffect(() => {
    if (folderDetails[0]) {
      console.log("folderDetails[0]", folderDetails[0]);
      const extractFilename = (url) => {
        const parts = url?.split("/");
        return parts[parts?.length - 1];
      };

      setProductCode(folderDetails[0]?.designcode);
      setImages({
        normal: folderDetails[0]?.file_2d,
        threeD: folderDetails[0]?.file_3d,
      });
      setImagesName({
        normalName: extractFilename(folderDetails[0]?.file_2d),
        threeD: extractFilename(folderDetails[0]?.file_3d),
      });
    }
  }, [folderDetails[0]]);

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append("designcode", productCode);
    formData.append("file_2d", images.normal);
    formData.append("file_3d", images.threeD);
    reUploadFile(
      setIsLoading,
      formData,
      setSuccessModalOpen,
      setSuccessMessage,
      setIsModalOpen,
      setImages,
      setProductCode,
      itemId,
      () => {
        projectDetails(setIsLoading, setFolderDetails, id);
      }
    );
  };

  console.log("imagesName--->", imagesName);

  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header leftHeader={folderDetails[0]?.designcode} />
      <FolderDetailsCard
        folderDetails={folderDetails[0]}
        setIsModalOpen={setIsModalOpen}
      />
      <CentalHub
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productCode={productCode}
        images={images}
        setImages={setImages}
        handleUploadFile={handleUploadFile}
        folderDetails={folderDetails[0]}
        reUpload={true}
        imagesName={imagesName}
      />
      <SuccessModal
        successModalOpen={successModalOpen}
        handleOpen={() => setSuccessModalOpen(true)}
        handleClose={() => setSuccessModalOpen(false)}
        successMessage={successMessage}
      />
    </div>
  );
};

export default FolderDetails;
