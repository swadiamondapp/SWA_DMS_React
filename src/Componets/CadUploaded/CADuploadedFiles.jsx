import React, { useEffect, useState } from "react";
import folderimg from "../../assets/folder.png";
import { useNavigate } from "react-router-dom";
import { MdViewModule } from "react-icons/md";
import sort from "../../assets/sort.png";
import filter from "../../assets/filter.png";
import { cadDesignList } from "../../Pages/Renders/Apis";
import { CircularProgress } from "@mui/material";

const CADuploadedFiles = ({sidebarExpanded }) => {
  const [view, setView] = useState(false);
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);

  const [designListData, setDesignListData] = useState([]);

  useEffect(() => {
    cadDesignList(setDesignListData);
  }, []);


  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    navigate(`/rendersdetailing/${item.id}`, {
      state: {
        folderName: item.name,
        page:"CADdetail"
      },
    });
  };
  const handleView = () => {
    setView(!view);
  };
  const gridView = () => {
    setGrid(true);
    setDetail(false);
    setTiles(false);
  };

  const detailView = () => {
    setGrid(false);
    setDetail(true);
    setTiles(false);
  };

  const tileView = () => {
    setGrid(false);
    setDetail(false);
    setTiles(true);
  };

  return (
    <div
      className="RendersHome"
      style={{ marginLeft: sidebarExpanded ? "218px" : "120px" }}
    >
      <div className="RendersHome_butns">
        <button
          className="D_View_Sort_Filter"
          onClick={handleView}
          style={{ position: "relative" }}
        >
          <MdViewModule /> View
          {view && (
            <div className="sortData" style={{ left: "-20px" }}>
              <span
                className={grid === true ? "setcolor" : ""}
                onClick={gridView}
              >
                Grid
              </span>
              <span
                className={detail === true ? "setcolor2" : ""}
                onClick={detailView}
              >
                Details
              </span>
              <span
                className={tiles === true ? "setcolor3" : ""}
                onClick={tileView}
              >
                Tiles
              </span>
            </div>
          )}
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
      {designListData.length === 0 && (
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
      )}
      <div
        className="RendersHome_folders"
        style={{ width: sidebarExpanded ? "100%" : "110%" }}
      >
        {grid && (
          <>
            {designListData.map((item) => (
              <div className="folderCard_parent" style={{ cursor: "pointer" }}>
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
          </>
        )}
        {tiles && (
          <>
            {designListData.map((item) => (
              <div className="folderCard_parent">
                <div
                  className="folder__card"
                  style={{ display: "flex", width: "110px" }}
                  key={item.id}
                  onClick={() => handleFolderClick(item)}
                >
                  <img src={folderimg} alt="" style={{ width: "26px" }} />
                  <p className="folder_name" style={{ fontSize: "9px" }}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
        {detail && (
          <>
            {designListData.map((item) => (
              <div className="folderCard_parent">
                <div
                  className="folder__card"
                  style={{ display: "flex", width: "140px" }}
                  key={item.id}
                  onClick={() => handleFolderClick(item)}
                >
                  <img src={folderimg} alt="" style={{ width: "40px" }} />
                  <p className="folder_name" style={{ fontSize: "11px" }}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CADuploadedFiles;
