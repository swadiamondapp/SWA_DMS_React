import React from "react";
import "./DesignPoolView.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import DesignPool from "../../Componets/Design Pool/DesignPool";

const DesignPoolView = () => {
  return (
    <div className="Parent_DesignPoolPage">
      <Sidebar />
      <Header />
      <DesignPool />
    </div>
  );
};

export default DesignPoolView;
