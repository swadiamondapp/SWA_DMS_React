import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import CentalHub from "../../CentalHub/CentalHub";
import FolderDetailsCard from "./FolderDetailsCard";
import { projectDetails } from "../Api";

const FolderDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [folderDetails, setFolderDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    projectDetails(setIsLoading, setFolderDetails, id);
  }, []);

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
        folderDetails={folderDetails[0]}
        reUpload={true}
      />
    </div>
  );
};

export default FolderDetails;
