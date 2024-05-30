import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import VotorsCustomization from "../../../Componets/VOTORS PANEL/Votor Customization/VotorsCustomization";

const VotorCustomization = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <VotorsCustomization />
    </div>
  );
};

export default VotorCustomization;
