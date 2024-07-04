import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import folderimg from "../../../assets/folder.png";
import { finishedProjectFolder } from "../Api";

const FinishedProducts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjects, setFinishedProjects] = useState([]);

  useEffect(() => {
    finishedProjectFolder(setIsLoading, setFinishedProjects);
  }, []);

  const handleFolderClick = (id) => {
    navigate(`/folderdetails/${id}`);
  };

  return (
    <div className="ParentCad">
      <div
        className="CadAssignmentCard"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {finishedProjects &&
          finishedProjects.map((item) => (
            <div className="folderCard_parent">
              <div
                className="folder__card"
                onClick={() => handleFolderClick(item.id)}
              >
                <img src={folderimg} alt="" />
                <p>{item.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FinishedProducts;
