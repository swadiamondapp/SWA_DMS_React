import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";

const RendersPage = () => {
  return (
    <div className="Parent_RendersCard">
      <Sidebar />
      <Header />
      <RenderCard />
    </div>
  );
};

export default RendersPage;
