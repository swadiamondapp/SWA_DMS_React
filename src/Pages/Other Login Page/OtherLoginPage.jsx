import React from "react";
import "./OtherLoginPage.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import OtherLogin from "../../Componets/Other Login/OtherLogin";

const OtherLoginPage = () => {
  return (
    <div className="Parent_OtherLoginPage">
      <Sidebar />
      <Header />
      <OtherLogin />
    </div>
  );
};

export default OtherLoginPage;
