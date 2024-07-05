import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import BasicDetailView from "../../Componets/Basic Detail View/BasicDetailView";
import { getBasicDetails } from "../../Componets/CAD/Api";

const BasicDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [basicDetails, setBasicDetails] = useState([]);

  useEffect(() => {
    getBasicDetails(setIsLoading, setBasicDetails, id);
  }, [id]);
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header basicDetails={basicDetails[0]} />
      <BasicDetailView basicDetails={basicDetails[0]} />
    </div>
  );
};

export default BasicDetails;
