import React, { useEffect, useState } from "react";
import folderimg from "../../assets/folder.png";
import { useNavigate } from "react-router-dom";
import { MdViewModule } from "react-icons/md";
import sort from "../../assets/sort.png";
import filter from "../../assets/filter.png";
import { cadApprovalByDesinger, cadDesignList } from "../../Pages/Renders/Apis";
import { CircularProgress } from "@mui/material";
import greenFolder from "../../assets/greenFolder.png";
import DownloadImageModal from "../DownloadImageModal/DownloadImageModal";

const CADuploadedFiles = ({ sidebarExpanded }) => {
  const [view, setView] = useState(false);
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectedCadFolder, setSelectedCadFolder] = useState([]);
  const [selectedCadFolderName, setSelectedCadFolderName] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileType,setFyleType] = useState("")
    const [is2DSelected, setIs2DSelected] = useState(false);
    const [is3DSelected, setIs3DSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [designListData, setDesignListData] = useState([]);

  useEffect(() => {
    cadDesignList(setDesignListData);
  }, []);

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
    if (showRadioButtons) {
      setSelectedCadFolder([]);
    }
  };

  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    navigate(`/rendersdetailing/${item.id}`, {
      state: {
        folderName: item.name,
        page: "CADdetail",
        fid: item.id,
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

  const handleCheckboxChange = (id, name) => {
    if (selectedCadFolder.includes(id)) {
      setSelectedCadFolder(selectedCadFolder.filter((item) => item !== id));
      setSelectedCadFolderName(
        selectedCadFolderName.filter((name) => name !== name.name)
      );
    } else {
      setSelectedCadFolder([...selectedCadFolder, id]);
      setSelectedCadFolderName([...selectedCadFolderName, name]);
    }
  };

  const ApproveCadDesign = (status) => {
    cadApprovalByDesinger(setIsLoading, status);
  };
  // const handleApprove = (someid) => {
  //   const status = "Approve";
  //   const id = someId; // Replace `someId` with actual value
  //   cadApprovalByDesinger(setIsLoading, status, id);
  // };

  const onCloseDownloadModal = () => {
    setIs3DSelected(false)
    setIs2DSelected(false)
    setFyleType("")
    setIsModalOpen(false)


  }

  console.log(selectedCadFolder, selectedCadFolderName, "selectedCard");
  console.log(designListData, "designListData");

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
        {selectedCadFolder.length > 0 && (
          <>
            <button style={{backgroundColor:"rgba(18, 110, 114, 1)",color:"#ffff"}} onClick={() => ApproveCadDesign("Approve")}>
              {" "}
              Approve
            </button>
            <button style={{backgroundColor:'red',color:'#ffff'}} onClick={() => ApproveCadDesign("Reject")}>
              {" "}
              Reject
            </button>
            <button style={{backgroundColor:"rgba(18, 110, 114, 1)",color:"#ffff"}} onClick={() => setIsModalOpen(true)}>
              {" "}
            download
            </button>

          </>
        )}
        <button onClick={toggleRadioButtons}> {selectButtonLabel}</button>
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
                <div className="folder__card" key={item.id}>
                  <img
                    src={folderimg}
                    alt=""
                    onClick={() => handleFolderClick(item)}
                  />
                  <p className="folder_name">{item.name}</p>
                  <div style={{ position: "absolute", top: 0, right: 0 }}>
                    {showRadioButtons && (
                      <input
                        className="Radio_select"
                        type="checkbox"
                        id={item.id}
                        name="fav_language"
                        value={item.id}
                        onChange={() =>
                          handleCheckboxChange(item.id, item.name)
                        }
                        // checked={selectedDesigns.includes(item.designcode)}
                      ></input>
                    )}
                  </div>
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
                >
                  <img src={greenFolder} alt="" style={{ width: "26px" }}
                  onClick={() => handleFolderClick(item)}
                  />
                  <p className="folder_name" style={{ fontSize: "9px" }}>
                    {item.name}
                  </p>
                  <div style={{ position: "absolute",right:0 }}>
                    {showRadioButtons && (
                      <input
                        className="Radio_select"
                        type="checkbox"
                        id={item.id}
                        name="fav_language"
                        value={item.id}
                        onChange={() =>
                          handleCheckboxChange(item.id, item.name)
                        }
                        // checked={selectedDesigns.includes(item.designcode)}
                      ></input>
                    )}
                  </div>
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
                >
                  <img src={greenFolder} alt="" style={{ width: "40px" }}  
                  onClick={() => handleFolderClick(item)}
                  
                  />
                  <p className="folder_name" style={{ fontSize: "11px" }}>
                    {item.name}
                  </p>
                  <div style={{ position: "absolute",left:0 }}>
                    {showRadioButtons && (
                      <input
                        className="Radio_select"
                        type="checkbox"
                        id={item.id}
                        name="fav_language"
                        value={item.id}
                        onChange={() =>
                          handleCheckboxChange(item.id, item.name)
                        }
                        // checked={selectedDesigns.includes(item.designcode)}
                      ></input>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <DownloadImageModal
        open={isModalOpen}
        onClose={ onCloseDownloadModal}
        setFyleType={setFyleType}
        fileType={fileType}
        designListData={designListData}
        selectedCadFolder={selectedCadFolder}
        is3DSelected={is3DSelected}
        is2DSelected={is2DSelected}
        setIs3DSelected={setIs3DSelected}
        setIs2DSelected={setIs2DSelected}
        // onDownload={handleDownload}
      />
    </div>
  );
};

export default CADuploadedFiles;
