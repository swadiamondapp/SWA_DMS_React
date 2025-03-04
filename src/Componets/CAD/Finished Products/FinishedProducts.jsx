import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import folderimg from "../../../assets/folder.png";
import greenFolder from "../../../assets/greenFolder.png";
import { finishedProjectFolder } from "../Api";
import { CircularProgress } from "@mui/material";

const FinishedProducts = ({ sidebarExpanded, SearchWithName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjects, setFinishedProjects] = useState([]);

  useEffect(() => {
    finishedProjectFolder(setIsLoading, setFinishedProjects, SearchWithName);
  }, [SearchWithName]);

  const handleFolderClick = (id) => {
    navigate(`/folderdetails/${id}`);
  };

  return (
    <div
      className="ParentCad"
      style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
    >
      <div
        className="CadAssignmentCard"
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
              width: "100%",
              height: "100%",
            }}
          >
            <CircularProgress
              size={50} // Set the desired size
              sx={{
                color: "#126e72",
                padding: "8px 10px",
                width: "35px",
              }}
            />
          </div>
        )}

        {isLoading === false && finishedProjects.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // background:"red",
              width: "100%",
            }}
          >
            <span style={{ marginTop: "100px" }}>No Data Found</span>
          </div>
        )}

        {finishedProjects &&
          finishedProjects.map((item) => (
            <div className="folderCard_parent">
              <div
                className="folder__card"
                onClick={() => handleFolderClick(item.id)}
              >
                {/* <img
                  src={
                    item.completion_status === "Completed"
                      ? greenFolder
                      : folderimg
                  }
                  alt=""
                /> */}
                {item.finished_items.length > 0 && (
                  <img
                    src={item.finished_items[0].file_2d}
                    alt={item.finished_items[0].designcode}
                    className="folder_thumbnail_cad"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                      minHeight: "150px",
                      minHeight: "150px",
                    }}
                  />
                )}
                <p>{item.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FinishedProducts;
