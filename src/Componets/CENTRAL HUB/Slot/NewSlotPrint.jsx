import React from "react";
import qr from "../../../assets/qr.png";

const NewSlotPrint = () => {
  return (
    <div className="NewSlotPrint">
      <div className="slot_items">
        <div className="print_head">
          <span>DMS</span>
          <span>ID : SWAD001503</span>
        </div>

        <div className="print_detail">
          <div className="qrsection">
            <div className="print_content">
              <span>Folder Name : </span>
              <span>Category : </span>
              <span>Cad Name : </span>
              <span>Metal Type : </span>
            </div>
            <div className="print_qr">
              <img
                style={{ width: "50px", height: "50px" }}
                src={qr}
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div className="img_section"></div>
        </div>
      </div>
      <div className="slot_items"></div>
      <div className="slot_items"></div>
      <div className="slot_items"></div>
    </div>
  );
};

export default NewSlotPrint;
