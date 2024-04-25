import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import FinishedProducts from "../../../Componets/CAD/Finished Products/FinishedProducts";

const FinishedProductsPage = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <FinishedProducts />
    </div>
  );
};

export default FinishedProductsPage;
