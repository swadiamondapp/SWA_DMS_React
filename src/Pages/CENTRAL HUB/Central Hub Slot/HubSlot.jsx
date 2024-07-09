import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Slots from "../../../Componets/CENTRAL HUB/Slot/Slots";

const HubSlot = () => {
  return (
    <div className="centralhubDashboard">
      <Sidebar />
      <Header />

      <Slots />
    </div>
  );
};

export default HubSlot;
