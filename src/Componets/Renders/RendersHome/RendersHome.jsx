import React, { useCallback, useEffect, useState } from "react";
import "./RendersHome.css";
import view from "../../../assets/view.png";
import sort from "../../../assets/sort.png";
import filter from "../../../assets/filter.png";
import folderimg from "../../../assets/folder.png";
import greenFolder from "../../../assets/greenFolder.png";

import { Link, useNavigate } from "react-router-dom";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import { CircularProgress } from "@mui/material";
import { MdViewModule } from "react-icons/md";
import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";
import { cadDesignListApproved } from "../../../Pages/Renders/Apis";

const RendersHome = ({
  designListData,
  sidebarExpanded,
  setDesignListData,
}) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [view, setView] = useState(false);
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dd, setDd] = useState();
  const [hide, sethide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [designCode, setDesignCode] = useState("");
  const [Time, setTime] = useState(null);

  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    navigate(`/rendersdetailing/${item.id}`, {
      state: {
        folderName: item.name,
        page: "renders",
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

  const handleFilderModal = () => {
    setOpenFilterModal(true);
  };

  const fetchDesigns = useCallback(async () => {
    await cadDesignListApproved(setIsLoading, setDesignListData);
  }, []);

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
        {/* <button>
          {" "}
          <img className="RendersHome_img" src={sort} alt="" srcset="" /> Sort
        </button> */}
        <button onClick={handleFilderModal}>
          {" "}
          <img className="RendersHome_img" src={filter} alt="" srcset="" />{" "}
          Filter
        </button>
      </div>
      {isLoading && designListData.length !== 0 && (
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
          <span>No Data Found</span>
        </div>
      )}
      {!isLoading && designListData.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>No Data Found</span>
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
                  <img
                    src={
                      item.completion_status === "Completed"
                        ? greenFolder
                        : folderimg
                    }
                    alt=""
                  />
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

      {openFilterModal && (
        <DesignerFilterModal
          open={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          setOpenFilterModal={setOpenFilterModal}
          setFolderDetails={setDesignListData}
          onClearCall={() => fetchDesigns()}
          // folderDetails={props.folderDetails}
          // setFilteredData={setFilteredData}
          page="renderPage"
          setStartTime={setStartTime}
          startTime={startTime}
          endTime={endTime}
          setEndTime={setEndTime}
          setDd={setDd}
          dd={dd}
          sethide={sethide}
          designCode={designCode}
          setDesignCode={setDesignCode}
          Time={Time}
          setTime={setTime}
        />
      )}
    </div>
  );
};

export default RendersHome;
