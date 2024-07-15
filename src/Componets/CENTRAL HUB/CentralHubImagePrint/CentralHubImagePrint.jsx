import React, { forwardRef } from "react";
import "./CentralHubImagePrint.css";

const CentralHubImagePrint= forwardRef(({CentralFolderDetails  }, ref) => {
  return (
    <div ref={ref} className="RendersProductPrint">
      {CentralFolderDetails.map((item,index) => (
        <>
          <img src={item.file_3d} alt=""  key={index}/>
          <span>
            POSTED ON: <b>{item.created_at.split("T")[0]} </b>
          </span>
        </>
      ))}
    </div>
  );
});

export default CentralHubImagePrint;
