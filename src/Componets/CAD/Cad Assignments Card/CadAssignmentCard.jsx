import React, { useState } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import ring from "../../../assets/ring.png";
import { GoDownload } from "react-icons/go";
import CentalHub from "../../CentalHub/CentalHub";

const CadAssignmentCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const card = [
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
  ];
  return (
    <div className="ParentCad">
      <div className="Design_FileUpload" onClick={() => setIsModalOpen(true)}>
        <div>
          <p className="D__fileUpload">Submit design</p>
          <p className="D__fileUpload2">
            Upload your finished file as png and 3.dm file format
          </p>
        </div>
        <div className="File____uploadbtn">
          <button>
            Upload File <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
          </button>
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="CadAssignmentCard">
        <div className="Card_Design_Parent">
          {card.map((item) => (
            <div className="New_Design_card">
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px" }}>
                  <img src={ring} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <h3>ID : {item.product}</h3>
                  <p>POSTED ON: {item.date}</p>

                  <select name="cars" id="cars">
                    <option value="Notstarted">Not started</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>

                  <button className="Download_btn_hub">
                    DOWNLOAD
                    <GoDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CentalHub open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CadAssignmentCard;
