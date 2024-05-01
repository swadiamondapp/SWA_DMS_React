import React, { useState, useRef } from "react";
import "../RenderCard/RenderCard.css";
import p from "../../assets/p1.png";
import { useLocation, Link } from "react-router-dom";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import UpIcon from "../../assets/uPicon.png";
import UploadFile from "../../Componets/UploadFile/UploadFile";

const RenderCard = () => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const location = useLocation();
  const dotsRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const card = [
    {
      id: "SWAD3456",
      product: p,
      date: "12TH JAN 2024",
    },
    {
      id: "SWAD3456",
      product: p,
      date: "12TH JAN 2024",
    },
    {
      id: "SWAD3456",
      product: p,
      date: "12TH JAN 2024",
    },
    {
      id: "SWAD3456",
      product: p,
      date: "12TH JAN 2024",
    },
  ];

  return (
    <div className="MainContainer">
      <div
        className="Design_FileUpload"
        // onClick={() => document.getElementById("fileInput").click()}
        onClick={() => setUploadModalOpen(true)}
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
                Upload File
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
      <div className="parentRendercard">
        {card.map((item, index) => {
          return (
            <div className="renderCardImage">
              <img src={item.product} alt="card_image" />
              <span className="idText">ID : {item.id}</span>
              <span className="posted">
                POSTED ON: <span className="postedOn_dataa">{item.date}</span>
              </span>
              <div>
                <button className="Counter_button">0:05:00</button>
              </div>
            </div>
          );
        })}
      </div>
      <UploadFile
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default RenderCard;
