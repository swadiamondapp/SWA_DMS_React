import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import "./MastersMainPage.css";
import MastersTable from "../MastersTable/MastersTable";
import { Outlet } from "react-router-dom";

const MastersMainPage = () => {
  return (
    <div className="MastersMainPage">
      <Sidebar />
      <Header />
      <MastersTable />
    </div>
  );
};

export default MastersMainPage;
