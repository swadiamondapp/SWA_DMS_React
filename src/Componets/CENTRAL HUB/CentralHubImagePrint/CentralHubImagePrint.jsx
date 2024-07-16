import React, { forwardRef } from "react";
import "./CentralHubImagePrint.css";

const CentralHubImagePrint= forwardRef(({CentralFolderDetails  }, ref) => {
  return (
    <div ref={ref} className="RendersProductPrint">
      {CentralFolderDetails.map((item,index) => (
        <div >
          <img src={item.file_3d} alt=""  key={index}/>
        </div>
      ))}
    </div>
  );
});

export default CentralHubImagePrint;
