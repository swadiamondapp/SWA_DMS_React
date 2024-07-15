import React, { forwardRef } from "react";
import "./RendersProductPrint.css";

const RendersProductPrint = forwardRef(({ folderDetails }, ref) => {
  return (
    <div ref={ref} className="RendersProductPrint">
      {folderDetails.map((item) => (
        <>
          <img src={item.file_3d} alt="" />
          <span>
            POSTED ON: <b>{item.created_at.split("T")[0]} </b>
          </span>
        </>
      ))}
    </div>
  );
});

export default RendersProductPrint;
