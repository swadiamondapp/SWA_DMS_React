import React, { useEffect, useState } from "react";
import folderimg from "../../assets/folder.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdViewModule } from "react-icons/md";
import sort from "../../assets/sort.png";
import filter from "../../assets/filter.png";
import {
  cadApprovalByDesinger,
  cadDesignList,
  cadUpLoadedCategoriesList,
  cadUpLoadedImgeFoldersList,
  cadUpLoadedList,
} from "../../Pages/Renders/Apis";
import { CircularProgress, Skeleton } from "@mui/material";
import greenFolder from "../../assets/greenFolder.png";
import DownloadImageModal from "../DownloadImageModal/DownloadImageModal";
import { IoMdArrowRoundBack } from "react-icons/io";

const CADuploadedFiles = ({
  sidebarExpanded,
  SearchWithName,
  setSelectedCadName,
  setSelectedCategory,
  selectedCadName,
  selectedCategory,
  currentLevel,
  setCurrentLevel,
}) => {
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [grid, setGrid] = useState(true);
  const [detail, setDetail] = useState(false);
  const [tiles, setTiles] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectedCadFolder, setSelectedCadFolder] = useState([]);
  const [selectedCadFolderName, setSelectedCadFolderName] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileType, setFyleType] = useState("");
  const [is2DSelected, setIs2DSelected] = useState(false);
  const [is3DSelected, setIs3DSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);

  const [cadNames, setCadNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [searchParams] = useSearchParams();
  const cadName = searchParams.get("cad_name");
  const category = searchParams.get("category");

  // useEffect(() => {
  //   cadDesignList(setDesignListData,SearchWithName);
  // }, [SearchWithName]);

  useEffect(() => {
    if (!cadName && !category) {
      cadUpLoadedList(setCadNames, setIsLoading, SearchWithName);
    }
  }, [SearchWithName, cadName, category]);

  useEffect(() => {
    if (cadName && !category) {
      cadUpLoadedCategoriesList(
        setCategories,
        cadName,
        setIsLoading,
        SearchWithName
      );
      setCurrentLevel("categories");
    }
  }, [cadName, category, SearchWithName]);

  useEffect(() => {
    if (cadName && category) {
      cadUpLoadedImgeFoldersList(
        setItems,
        cadName,
        category,
        setIsLoading,
        SearchWithName
      );
      setCurrentLevel("items");
    }
  }, [cadName, category, SearchWithName]);

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
    if (showRadioButtons) {
      setSelectedCadFolder([]);
    }
  };

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
    setIs3DSelected(false);
    setIs2DSelected(false);
    setFyleType("");
    setIsModalOpen(false);
  };

  const handleCadNameClick = (cadName) => {
    setSelectedCadName(cadName);
    setSelectedCategory("");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    if (currentLevel === "categories") {
      setCurrentLevel("cad_names");
      setSelectedCadName("");
    } else if (currentLevel === "items") {
      setCurrentLevel("categories");
      setSelectedCategory("");
    }
  };
  console.log(selectedCadFolder, selectedCadFolderName, "selectedCard");
  console.log(designListData, "designListData");
  console.log(selectedCadName, "selectedCadName>>");
  console.log(currentLevel, "currentLevel>>");

  return (
    <div
      className="RendersHome"
      style={{ marginLeft: sidebarExpanded ? "218px" : "120px" }}
    >
      <div className="RendersHome_butns">
        {currentLevel !== "cad_names" && (
          <div
            className="RendersHome_butns"
            style={{ justifyContent: "start" }}
          >
            <button onClick={handleBackClick}>
              {" "}
              <IoMdArrowRoundBack style={{ fontSize: "20px" }} />
            </button>
          </div>
        )}
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
            {location.pathname !== "/caduploaded" && (
              <>
                <button
                  style={{
                    backgroundColor: "rgba(18, 110, 114, 1)",
                    color: "#ffff",
                  }}
                  onClick={() => ApproveCadDesign("Approve")}
                >
                  {" "}
                  Approve
                </button>
                <button
                  style={{ backgroundColor: "red", color: "#ffff" }}
                  onClick={() => ApproveCadDesign("Reject")}
                >
                  {" "}
                  Reject
                </button>
              </>
            )}
            <button
              style={{
                backgroundColor: "rgba(18, 110, 114, 1)",
                color: "#ffff",
              }}
              onClick={() => setIsModalOpen(true)}
            >
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

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
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
      ) : (
        <div
          className="RendersHome_folders"
          style={{ width: sidebarExpanded ? "100%" : "110%" }}
        >
          {grid && (
            <>
              {/* {designListData.map((item) => (
              <div className="folderCard_parent" style={{ cursor: "pointer" }}>
                <div className="folder__card" key={item.id}>
                  <img
                    src={
                      item.completion_status === "Completed"
                        ? greenFolder
                        : folderimg
                    }
                    alt=""
                    onClick={() => handleFolderClick(item)}
                  />
                  <p className="folder_name">{item.cad_name}</p>
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
            ))} */}
              {/* {currentLevel !== "cad_names" && (
              <button onClick={handleBackClick}>Back</button>
            )} */}

              {currentLevel === "cad_names" && (
                <>
                  {!isLoading && cadNames.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                      }}
                    >
                      <h4>No data found</h4>
                    </div>
                  ) : (
                    <div
                      className="folderCard_parent"
                      style={{ cursor: "pointer" }}
                    >
                      <>
                        {cadNames.map((cad, index) => (
                          <div className="folder__card">
                            <img
                              src={folderimg}
                              alt=""
                              onClick={() => handleCadNameClick(cad.cad_name)}
                            />
                            <p className="folder_name"> {cad.cad_name}</p>
                            <div className="folderInnerCount">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {cad.category_count_inside}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  )}
                </>
              )}

              {currentLevel === "categories" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {categories.map((category, index) => (
                    <>
                      <div className="folder__card">
                        <img
                          src={folderimg}
                          alt=""
                          onClick={() => handleCategoryClick(category.category)}
                        />
                        <p className="folder_name"> {category.category}</p>
                        <div className="folderInnerCount">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {category.item_count}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}

              {currentLevel === "items" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {items.map((item) => (
                    <div
                      className="folder__card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      {item?.file_2d ? (
                        <img
                          style={{
                            width: "118px",
                            height: "87px",
                          }}
                          src={item?.file_2d || folderimg}
                          alt=""
                          // onClick={() => handleCategoryClick(category)}
                          onClick={() => handleFolderClick(item)}
                        />
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={118}
                          height={87}
                        />
                      )}
                      <p className="folder_name"> {item.name}</p>
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
                  ))}
                </div>
              )}
            </>
          )}
          {tiles && (
            // <>
            //   {designListData.map((item) => (
            //     <div className="folderCard_parent">
            //       <div
            //         className="folder__card"
            //         style={{ display: "flex", width: "110px" }}
            //         key={item.id}
            //       >
            //         <img
            //           src={greenFolder}
            //           alt=""
            //           style={{ width: "26px" }}
            //           onClick={() => handleFolderClick(item)}
            //         />
            //         <p className="folder_name" style={{ fontSize: "9px" }}>
            //           {item.cad_name}
            //         </p>
            //         <div style={{ position: "absolute", right: 0 }}>
            //           {showRadioButtons && (
            //             <input
            //               className="Radio_select"
            //               type="checkbox"
            //               id={item.id}
            //               name="fav_language"
            //               value={item.id}
            //               onChange={() =>
            //                 handleCheckboxChange(item.id, item.name)
            //               }
            //               // checked={selectedDesigns.includes(item.designcode)}
            //             ></input>
            //           )}
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </>
            <>
              {currentLevel === "cad_names" && (
                <>
                  <div
                    className="folderCard_parent"
                    style={{ cursor: "pointer" }}
                  >
                    {cadNames.map((cad, index) => (
                      <div
                        className="folder__card"
                        style={{ display: "flex", width: "110px" }}
                      >
                        <img
                          src={folderimg}
                          style={{ width: "26px" }}
                          alt=""
                          onClick={() => handleCadNameClick(cad.cad_name)}
                        />
                        <p className="folder_name" style={{ fontSize: "9px" }}>
                          {" "}
                          {cad.cad_name}
                        </p>
                        <div
                          className="folderInnerCount"
                          style={{
                            right: "100px",
                            top: "-10px",
                            background: "#2466a4",
                            width: "18px",
                            height: "18px",
                            padding: "2px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "10px",
                            }}
                          >
                            {cad.category_count_inside}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentLevel === "categories" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {categories.map((category, index) => (
                    <>
                      <div
                        className="folder__card"
                        style={{ display: "flex", width: "110px" }}
                      >
                        <img
                          src={folderimg}
                          style={{ width: "26px" }}
                          alt=""
                          onClick={() => handleCategoryClick(category.category)}
                        />
                        <p className="folder_name" style={{ fontSize: "9px" }}>
                          {" "}
                          {category.category}
                        </p>
                        <div
                          className="folderInnerCount"
                          style={{
                            right: "100px",
                            top: "-10px",
                            background: "#2466a4",
                            width: "18px",
                            height: "18px",
                            padding: "2px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "10px",
                            }}
                          >
                            {category.item_count}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}

              {currentLevel === "items" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {items.map((item) => (
                    <div
                      className="folder__card"
                      style={{ display: "flex", width: "110px", gap: "5px" }}
                    >
                      <img
                        style={{ width: "26px" }}
                        src={item?.file_2d ? item?.file_2d : folderimg}
                        alt=""
                        // onClick={() => handleCategoryClick(category)}
                        onClick={() => handleFolderClick(item)}
                      />
                      <p className="folder_name" style={{ fontSize: "9px" }}>
                        {" "}
                        {item.name}
                      </p>
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
                  ))}
                </div>
              )}
            </>
          )}
          {detail && (
            // <>
            //   {designListData.map((item) => (
            //     <div className="folderCard_parent">
            //       <div
            //         className="folder__card"
            //         style={{ display: "flex", width: "140px" }}
            //         key={item.id}
            //       >
            //         <img
            //           src={greenFolder}
            //           alt=""
            //           style={{ width: "40px" }}
            //           onClick={() => handleFolderClick(item)}
            //         />
            //         <p className="folder_name" style={{ fontSize: "11px" }}>
            //           {item.cad_name}
            //         </p>
            //         <div style={{ position: "absolute", left: 0 }}>
            //           {showRadioButtons && (
            //             <input
            //               className="Radio_select"
            //               type="checkbox"
            //               id={item.id}
            //               name="fav_language"
            //               value={item.id}
            //               onChange={() =>
            //                 handleCheckboxChange(item.id, item.name)
            //               }
            //               // checked={selectedDesigns.includes(item.designcode)}
            //             ></input>
            //           )}
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </>
            <>
              {currentLevel === "cad_names" && (
                <>
                  <div
                    className="folderCard_parent"
                    style={{ cursor: "pointer" }}
                  >
                    {cadNames.map((cad, index) => (
                      <div
                        className="folder__card"
                        style={{ display: "flex", width: "140px" }}
                      >
                        <img
                          src={folderimg}
                          style={{ width: "40px" }}
                          alt=""
                          onClick={() => handleCadNameClick(cad.cad_name)}
                        />
                        <p className="folder_name" style={{ fontSize: "11px" }}>
                          {" "}
                          {cad.cad_name}
                        </p>
                        <div
                          className="folderInnerCount"
                          style={{
                            right: "130px",
                            top: "-10px",
                            background: "#2466a4",
                            width: "18px",
                            height: "18px",
                            padding: "2px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "10px",
                            }}
                          >
                            {cad.category_count_inside}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentLevel === "categories" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {categories.map((category, index) => (
                    <>
                      <div
                        className="folder__card"
                        style={{ display: "flex", width: "140px" }}
                      >
                        <img
                          src={folderimg}
                          style={{ width: "40px" }}
                          alt=""
                          onClick={() => handleCategoryClick(category.category)}
                        />
                        <p className="folder_name" style={{ fontSize: "11px" }}>
                          {" "}
                          {category.category}
                        </p>
                        <div
                          className="folderInnerCount"
                          style={{
                            right: "130px",
                            top: "-10px",
                            background: "#2466a4",
                            width: "18px",
                            height: "18px",
                            padding: "2px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "10px",
                            }}
                          >
                            {category.item_count}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}

              {currentLevel === "items" && (
                <div
                  className="folderCard_parent"
                  style={{ cursor: "pointer" }}
                >
                  {items.map((item) => (
                    <div
                      className="folder__card"
                      style={{ display: "flex", width: "140px", gap: "5px" }}
                    >
                      <img
                        style={{ width: "40px" }}
                        src={item?.file_2d ? item?.file_2d : folderimg}
                        alt=""
                        // onClick={() => handleCategoryClick(category)}
                        onClick={() => handleFolderClick(item)}
                      />
                      <p className="folder_name" style={{ fontSize: "11px" }}>
                        {" "}
                        {item.name}
                      </p>
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
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
      <DownloadImageModal
        open={isModalOpen}
        onClose={onCloseDownloadModal}
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
