import React from "react";
import folderimg from "../../assets/folder.png";

const CADuploadedFiles = ({sidebarExpanded }) => {
  return (
    <>
      <div
        className="RendersHome"
        style={{ marginLeft: sidebarExpanded ? "218px" : "120px" }}
      >
       
        {/* {designListData.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                size={50}
                sx={{
                  color: "#126e72",
                  padding: "8px 10px",
                  width: "35px",
                }}
              />
            </div>
          )} */}
        <div
          className="RendersHome_folders"
          style={{ width: sidebarExpanded ? "100%" : "110%" }}
        >
          <div className="folderCard_parent">
            <div
              className="folder__card"
              //   key={item.id}
              //   onClick={() => handleFolderClick(item)}
            >
              <img src={folderimg} alt="" />
              <p className="folder_name">SWAD001234</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CADuploadedFiles;
