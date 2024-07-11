import React, { useContext, useEffect } from "react";
import "./RendersHome.css";
import view from "../../../assets/view.png";
import sort from "../../../assets/sort.png";
import filter from "../../../assets/filter.png";
import folderimg from "../../../assets/folder.png";
import { Link, useNavigate } from "react-router-dom";
import { RenderCreateContext } from "../RendersContext/RendersContext";

const RendersHome = ({ designListData }) => {
  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    navigate(`/assignmentpaneldetailsview/${item.id}`, {
      state: {
        folderName: item.name,
      },
    });
  };

  return (
    <div className="RendersHome">
      <div className="RendersHome_butns">
        <button>
          <img className="RendersHome_img" src={view} alt="" srcset="" />
          View
        </button>
        <button>
          {" "}
          <img className="RendersHome_img" src={sort} alt="" srcset="" /> Sort
        </button>
        <button>
          {" "}
          <img className="RendersHome_img" src={filter} alt="" srcset="" />{" "}
          Filter
        </button>
      </div>
      <div className="RendersHome_folders">
        {designListData.map((item) => (
          <div className="folderCard_parent">
            <div
              className="folder__card"
              key={item.id}
              onClick={() => handleFolderClick(item)}
            >
              <img src={folderimg} alt="" />
              <p className="folder_name">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RendersHome;
