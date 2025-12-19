/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./StatusSection.css";
import Stepper from "./Stepper";
import ComingSoon from "../VOTORS PANEL/Votors Panel/ComingSoon";

const StatusSection = ({ sidebarExpanded,code }) => {    
const [showModal, setShowModal] = useState(false);

useEffect(() => {
  setShowModal(true); // opens whenever component renders
}, []);
  return (
    <div  className={`ParentVotors ${showModal ? "page_blurred" : ""}`}>
    <div
      className="RendersHome"
      style={{
        marginLeft: sidebarExpanded ? "225px" : "128px",
      
      }}
    >
      <div className="status_stepper">
        <Stepper code={code}/>
      </div>
          <ComingSoon
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Photo Coming Soon 📸"
        description="High-quality product photos will be available shortly."
      />
    </div>
    </div>
  );
};

export default StatusSection;
