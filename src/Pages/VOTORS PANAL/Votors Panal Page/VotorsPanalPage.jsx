import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import VotorsPanal from "../../../Componets/VOTORS PANEL/Votors Panel/VotorsPanal";
import "./VotorsPanalPage.css";

const VotorsPanalPage = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <VotorsPanal />
    </div>
  );
};

export default VotorsPanalPage;
