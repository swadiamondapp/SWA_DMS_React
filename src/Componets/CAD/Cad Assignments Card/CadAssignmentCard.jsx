import React, { useState } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import ring from "../../../assets/ring.png";

const CadAssignmentCard = () => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
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
      <div
        className="Design_FileUpload"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {uploadInstructionsVisible ? (
          <>
            <div>
              <p className="D__fileUpload">Submit design</p>
              <p className="D__fileUpload2">
                Upload your finished file as png and 3.dm file format
              </p>
            </div>
            <div className="File____uploadbtn">
              <button>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div>
          </>
        ) : (
          <div className="De__file">
            <p>File uploaded successfully!</p>
            <div className="File____uploadbtn">
              <button>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
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
                <div className="Card_Details_Inner_cad">
                  <h3>ID : {item.product}</h3>
                  <p>POSTED ON: {item.date}</p>

                  <button onClick={() => setIsModalOpen(true)}>
                    Make order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CadAssignmentCard;
