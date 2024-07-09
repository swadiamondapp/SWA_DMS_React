import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomizedOrder from "../../../Componets/DESIGNER PANEL/Customized Order/CustomizedOrder";

const CustomizedOrderPage = () => {
  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header />
      <CustomizedOrder />
    </div>
  );
};

export default CustomizedOrderPage;
