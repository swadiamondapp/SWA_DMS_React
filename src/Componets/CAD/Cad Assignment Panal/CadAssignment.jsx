import React, { useEffect, useState } from "react";
import "./CadAssignment.css";
import { useNavigate } from "react-router-dom";
import { TbDownload } from "react-icons/tb";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../../assets/folder.png";
import { list_assigned_cad_design } from "../Api";
const CadAssignment = ({
  designList,
  onButtonClick,
  timer,
  setIsModalOpen,
  sidebarExpanded,
}) => {
  const navigate = useNavigate();
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [assignedCadDesign, setAssignedCadDesign] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timers, setTimers] = useState({});
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    list_assigned_cad_design(setIsLoading, setAssignedCadDesign);
  }, []);

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

  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  const extractFilename = (url) => {
    const parts = url?.split("/");
    return parts[parts?.length - 1];
  };

  return (
    <div className="ParentCad" style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
      <div
        className="Design_FileUpload"
        // onClick={() => document.getElementById("fileInput").click()}
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
              <button onClick={() => setIsModalOpen(true)}>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div>
          </>
        ) : (
          <div className="De__file">
            <p>File uploaded successfully!</p>
            {/* <div className="File____uploadbtn">
              <button>
                Upload File{" "}
                <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
              </button>
            </div> */}
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
      {/* cad folder */}
      <div className="CadFolder">
        <div
          className="Parent_Folder_section_Designer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "30px",
          }}
        >
          {designList?.map((item, index) => (
            <div
              className="New_Design_card"
              onClick={(e) => {
                if (
                  e.target.tagName.toLowerCase() !== "button" &&
                  e.target.tagName.toLowerCase() !== "svg" &&
                  e.target.tagName.toLowerCase() !== "path"
                ) {
                  // Your card onClick functionality here
                  navigate(`/Details/${item.item_id}`);
                }
              }}
              key={index}
            >
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px" }}>
                  <img src={item.design_image} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <h3>ID : {item.design_code}</h3>
                  <p>POSTED ON: {item.created_at}</p>
                  <span
                    className={
                      item.timer_status === "Completed"
                        ? "completed"
                        : item.timer_status === "on-going"
                        ? "ongoing"
                        : "notstarted"
                    }
                  >
                    {item.timer_status.charAt(0) +
                      item.timer_status.slice(1).toLowerCase()}
                  </span>
                  {item.timer_status === "Completed" ? (
                    <button
                      className="Download_btn_hub"
                      style={{ background: "#0464D5" }}
                    >
                      {item.timer_value}
                    </button>
                  ) : item.timer_status === "on-going" ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <button
                        className="Download_btn_hub"
                        // onClick={() => onButtonClick(item.item_id)}
                      >
                        {timer}
                      </button>
                      <button
                        className="Download_btn_hub"
                        style={{
                          background: "#0464D5",
                          padding: "12px 20px",
                        }}
                        onClick={() =>
                          download(
                            item.design_image,
                            extractFilename(item.design_image)
                          )
                        }
                        // onClick={() => downloadImage(item.design_image)}
                      >
                        <TbDownload />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="Download_btn_hub"
                      style={{ background: "#006E7F" }}
                      onClick={() => onButtonClick(item.item_id)}
                      disabled={designList.some(
                        (d) => d.timer_status === "on-going"
                      )}
                    >
                      START
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CadAssignment;
