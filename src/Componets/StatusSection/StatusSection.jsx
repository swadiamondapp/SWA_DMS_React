import React from "react";
import "./StatusSection.css";
import Stepper from "./Stepper";

const StatusSection = ({ sidebarExpanded }) => {    

  return (
    <div
      className="RendersHome"
      style={{
        marginLeft: sidebarExpanded ? "225px" : "128px",
        padding: "0px !important",
      }}
    >
      <div className="status_stepper">
        <Stepper />
      </div>
    </div>
  );
};

export default StatusSection;
