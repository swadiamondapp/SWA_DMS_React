import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Gallery from "../../../Componets/VOTORS PANEL/Gallery/Gallery";
const GalleryPage = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <Gallery />
    </div>
  );
};

export default GalleryPage;
