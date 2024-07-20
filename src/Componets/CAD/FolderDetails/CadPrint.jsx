import React, { forwardRef } from "react";
import "./CadPrint.css";

const CadPrint = forwardRef(({ folderDetails }, ref) => {
  console.log(folderDetails, "sdfasdfsprint");
  return (
    <div ref={ref} className="RendersProductPrint">
      {folderDetails && folderDetails.length > 0 ? (
        folderDetails.map((item, index) => (
          <img key={index} src={item?.file_3d} alt="" />
        ))
      ) : (
        <p>No items to display</p>
      )}
    </div>
  );
});

export default CadPrint;
