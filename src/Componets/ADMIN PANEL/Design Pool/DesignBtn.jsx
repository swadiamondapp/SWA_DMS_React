import React, { useState, useRef, useEffect } from "react";
import { TbDownload } from "react-icons/tb";
import { MdViewModule, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { RiFilter3Line } from "react-icons/ri";
import "./DesignPool.css";
import { Link, useLocation } from "react-router-dom";
import BasicDetailModal from "../../BasicDetails/BasicDetailModal";
import AssignToModal from "../../AssignToModal/AssignToModal";
import CreateCustomisation from "../../CreateCustomisation/CreateCustomisation";
import { move_to_folder } from "../../Assignment Panel/Api";
import { useParams } from "react-router-dom";
import AssignmentModal from "../../AssignmentModal/AssignmentModal";
import { View } from "@react-three/drei";
import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";
// import DesignerFilterModal from "../../DesignerFilterModal/DesignerFilterModal";

const DesignBtn = ({
  votersSetData,
  toggleDownloadOptions,
  selectButtonLabel,
  toggleRadioButtons,
  toggleMoveOptions,
  showDownloadOptions,
  showMoveOptions,
  moveSelectedDesign,
  getSelectedDesign,
  selectedAssignment,
  setAssignmentFolder,
  userId,
  selectedDesign,
  folderId,
  assignToCadId,
  list_id,
  setFolderDetails,
  list_designer_folderDetails_new,
  setSelectedAssignment,
  setIsOpen,
  open,
  setData,
  setSelectedDesigns,
  setShowRadioButtons,
  setSelectButtonLabel,
  setcreateFolderModal,
  handleCreatedFolder,
  handleSortByDesigner,
  handleSortByAdmin,
  handleSortByAll,
  selectedImages,
  setSelectedImages,
  setAllSelected,
  setShowDownloadOptions,
  selectAllDesigns,
  setGrid,
  setDetail,
  setTiles,
  grid,
  detail,
  tiles,
  assignmentFolder,
  downRefff,
  assignmentDownRef,
  delteItemsFromDesignPool,
  setDeleteConfirmationOpen,
  SelectedIdsForDelet,
  setSelectedIdsForDelet,
  openFilterModal,
  setOpenFilterModal,
  filter,
  setFilter,
  activeFilter,
  Data,
  handleDeselectAll,
  handleSelectAll,
  showRadioButtons,
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState(false);
  const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);
  const [sort, setSort] = useState(false);
  const [view, setView] = useState(false);

  // const [createFolderModal, setcreateFolderModal] = useState(false);

  // const handleCreatedFolder = () => {
  //   setcreateFolderModal(true)
  //   setIsModalOpen(true);
  // };
  const handleAssignment = () => {
    setIsModalOpenAssign(false);
  };
  const { id } = useParams();

  console.log("selectedAssignmentbtnnnnnn", setSelectedAssignment);

  const handleSort = () => {
    setSort(!sort);
  };

  const handleFilter = () => {
    setFilter(true);
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

  const handleDownloadMultiple = (imageUrls) => {
    imageUrls.forEach((imageUrl, index) => {
      fetch(imageUrl, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          // Use index or extract the image name from the URL to create a unique file name
          link.download = `design_pool_${index}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => console.error("Error downloading the image:", error));
    });
    setSelectedImages([]);
    setAllSelected([]);
    setSelectedDesigns([]);

    setSelectButtonLabel("Select");
    setShowRadioButtons(false);
    setShowDownloadOptions(false);
  };

  const handleAllDownload = () => {
    selectAllDesigns();
  };
  const handleDesignPoolDelet = () => {
    // delteItemsFromDesignPool()
    setDeleteConfirmationOpen(true);
  };
  const handleFilderModal = () => {
    setOpenFilterModal(true);
  };

  return (
    <div
      style={
        location.pathname === "/unassigneddesigner" ? { marginTop: "18px" } : {}
      }
    >
      <div
        className="DesignPool_btns"
        style={{ position: "relative", display: "flex", justifyContent: "end" }}
      >
        {location.pathname === "/unassigneddesigner" && (
          <h4 style={{ marginRight: "59%" }}>Not Started Assignments</h4>
        )}
        {/* <div
          className=""
          style={{
            display: "flex",
            gap: "6px",
            position: "absolute",
            right: "0%",
            top: "-10px",
          }}
        > */}
        {location.pathname === "/designpool" &&
          SelectedIdsForDelet.length > 0 && (
            <div className="Download_ParentD">
              <button
                className="D_downlodBtn"
                style={{ background: "red" }}
                onClick={handleDesignPoolDelet}
              >
                Delete
              </button>
            </div>
          )}
        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
          location.pathname !== "/designerassignview" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== "/finishedProject" &&
          location.pathname !== "/unassigneddesigner" &&
          location.pathname !== `/designerassignview/${id}` && (
            <div className="Download_ParentD" ref={downRefff}>
              <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
                Download <TbDownload />
              </button>
              {showDownloadOptions && (
                <div className="Download_Sub">
                  <p onClick={handleAllDownload}>All</p>
                  <p onClick={() => handleDownloadMultiple(selectedImages)}>
                    Selected
                  </p>
                </div>
              )}
            </div>
          )}
        {location.pathname !== "/designdashboard" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== "/unassigneddesigner" &&
          location.pathname !== "/finishedProject" && (
            <button className="D_selectBtn" onClick={toggleRadioButtons}>
              {selectButtonLabel}
            </button>
          )}
        {showRadioButtons && (
          <div style={{ width: "200px" }}>
            <button
              style={{
                padding: "9px 15px",
                color: "white",
                backgroundColor: "#0464D5",
                border: "none",
                fontSize: "13px",
                fontWeight: "900",
                marginRight: "10px",
                borderRadius: "30px",
              }}
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              style={{
                padding: "9px 15px",
                color: "white",
                backgroundColor: "#FF4C4C",
                border: "none",
                fontSize: "13px",
                fontWeight: "900",
                borderRadius: "30px",
              }}
              onClick={handleDeselectAll}
            >
              Deselect All
            </button>
          </div>
        )}

        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" &&
          location.pathname === "/designpool" &&
          selectButtonLabel === "Unselect" &&
          getSelectedDesign.length > 0 &&
          location.pathname !== "/designerassignview" &&
          location.pathname !== "/votorscustomization" &&
          location.pathname !== `/designerassignview/${id}` &&
          location.pathname !== "/finishedProject" && (
            <div className="Parent_MoveTo" ref={assignmentDownRef}>
              <button className="D_moveBtn" onClick={toggleMoveOptions}>
                Move to <MdOutlineKeyboardArrowDown />
              </button>
              {showMoveOptions && (
                <Link style={{ textDecoration: "none", cursor: "pointer" }}>
                  <div
                    className="Sub_AssignmentPanel"
                    onClick={() => moveSelectedDesign()}
                  >
                    <p style={{ color: "#000" }}>Assignment panel</p>
                  </div>
                </Link>
              )}
            </div>
          )}
        {location.pathname === `/designerassignview/${id}` &&
          selectedDesign.length > 0 &&
          selectButtonLabel === "Unselect" && (
            <div className="Parent_MoveTo">
              <button
                className="D_moveBtn"
                onClick={() => setIsModalOpenAssign(true)}
              >
                Assign To
              </button>
            </div>
          )}
        {location.pathname === "/assignmentpanel" &&
          selectedAssignment.length > 0 &&
          selectButtonLabel === "Unselect" && (
            <div className="Parent_MoveTo">
              <button className="D_moveBtn" onClick={handleCreatedFolder}>
                Create folder
              </button>
            </div>
          )}
        {location.pathname !== "/votorscustomization" &&
          location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/unassigneddesigner" &&
          location.pathname !== "/designpool" &&
          // location.pathname === "/renderCard" &&
          location.pathname === "/designdashboard" && (
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
          )}
        {location.pathname === "/assignmentpanel" && (
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
        )}
        {location.pathname === "/designpool" && (
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
        )}
        {location.pathname === "/designdashboard" && (
          <button
            //  onClick={handleSort}
            className="D_View_Sort_Filter"
            style={{ position: "relative" }}
          >
            <LuArrowUpDown /> Sort
          </button>
        )}
        {location.pathname === "/assignmentpanel" && (
          <button
            onClick={handleSort}
            className="D_View_Sort_Filter"
            style={{ position: "relative" }}
          >
            <LuArrowUpDown /> Sort
            {sort && (
              <div className="sortData">
                <span
                  className={activeFilter === "all" ? "setcolor" : ""}
                  onClick={handleSortByAll}
                >
                  All
                </span>
                <span
                  className={activeFilter === "designer" ? "setcolor2" : ""}
                  onClick={handleSortByDesigner}
                >
                  Designer added
                </span>
                <span
                  className={activeFilter === "admin" ? "setcolor3" : ""}
                  onClick={handleSortByAdmin}
                >
                  Admin added
                </span>
              </div>
            )}
          </button>
        )}

        {location.pathname === `/unassigneddesigner` && (
          <button className="D_View_Sort_Filter" onClick={handleFilderModal}>
            <RiFilter3Line /> Filter
          </button>
        )}

        {location.pathname === `/designdashboard` && (
          <button className="D_View_Sort_Filter" onClick={handleFilderModal}>
            <RiFilter3Line /> Filter
          </button>
        )}
        {location.pathname === `/designerassignview/${id}` && (
          <button className="D_View_Sort_Filter" onClick={handleFilderModal}>
            <RiFilter3Line /> Filter
          </button>
        )}
        {location.pathname === `/designpool` && (
          <button className="D_View_Sort_Filter" onClick={handleFilter}>
            <RiFilter3Line /> Filter
          </button>
        )}
        {location.pathname === "/assignmentpanel" && (
          <button className="D_View_Sort_Filter" onClick={handleFilter}>
            <RiFilter3Line /> Filter
          </button>
        )}

        {location.pathname === "/votorscustomization" && (
          <button
            className="D_downlodBtn"
            onClick={() => setIsCreateCustomizeModalOpen(true)}
          >
            Create Customization
          </button>
        )}
        {/* </div> */}
      </div>
      <BasicDetailModal
        open={open}
        onClose={() => setIsOpen(false)}
        selectedAssignment={selectedAssignment}
        setAssignmentFolder={setAssignmentFolder}
        setSelectedAssignment={setSelectedAssignment}
        getSelectedDesign={getSelectedDesign}
        setData={setData}
        setSelectedDesigns={setSelectedDesigns}
        setShowRadioButtons={setShowRadioButtons}
        setSelectButtonLabel={setSelectButtonLabel}
        setSelectedIdsForDelet={setSelectedIdsForDelet}
        Data={Data}
      />
      <AssignToModal
        open={isModalOpenAssign}
        onClose={() => handleAssignment()}
        assignToCadId={assignToCadId}
        selectedDesign={selectedDesign}
        setSelectedDesigns={setSelectedDesigns}
        list_id={list_id}
        list_designer_folderDetails_new={list_designer_folderDetails_new}
        setSelectedAssignment={setSelectedAssignment}
        setSelectButtonLabel={setSelectButtonLabel}
        setShowRadioButtons={setShowRadioButtons}
      />
      <CreateCustomisation
        open={isModalOpenCreateCutomize}
        onClose={() => {
          setIsCreateCustomizeModalOpen(false);
        }}
        votersSetData={votersSetData}
      />

      {/* <AssignmentModal
      open={openAdminFolder}
      AdminUploadedIds={AdminUploadedIds}
      onClose={() => setOpenAdminFolder(false)}
      AdminBasicItemId={AdminBasicItemId}
      setAssignDesignerModalOpen={ setAssignDesignerModalOpen}
      setAdminBasicDetailsOpen={setAdminBasicDetailsOpen}
      setUploadedImage={setUploadedImage}
      setAssignedDesignerId={ setAssignedDesignerId}
    
      /> */}
    </div>
  );
};

export default DesignBtn;
