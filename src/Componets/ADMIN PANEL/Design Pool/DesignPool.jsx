import React, { useState, useEffect, useRef } from "react";
import "./DesignPool.css";
import like from "../../../assets/like.png";
import ring from "../../../assets/ring.png";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import {
  all_Designs,
  unvoted_design,
  moveSelectedDesign,
  designPoolSearchById,
  deleteItemFromDesignPool,
} from "./Api";
import { MOVE_TO_ASSIGNMENT } from "../../../Pages/Services/EndPoints";
import { apiService } from "../../../Pages/Services/ApiInstants";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "../../../LottiAnimation";
import BasicDetailModal from "../../BasicDetails/BasicDetailModal";
import { CircularProgress } from "@mui/material";
import AnnotationModalDesignPool from "./AnnotationModalDesignPool/AnnotationModalDesignPool";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";

const DesignPool = ({ sidebarExpanded, setData, Data }) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unvotedData, setUnvotedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [anotationModal, setanotationModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);
  const [IdOfDeleteDesignPool, setIdOfDeleteDesignPool] = useState();
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [SelectedIdsForDelet, setSelectedIdsForDelet] = useState([]);
  const assignmentDownRef = useRef(null); // Ref for the dropdown element
  const clickedInsideRef = useRef(false);

  const navigate = useNavigate();
  const dropdownRefDD = useRef(null);
  const dropdownRef = useRef(null);
  const dotsRef = useRef(null);
  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
    if (showRadioButtons) {
      // If toggling to "Unselect", clear the selected designs
      setSelectedDesigns([]);
    }
    if (SelectedIdsForDelet) {
      setSelectedIdsForDelet([]);
    }
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };
  const OpenAnntaitionmodal = (Item) => {
    setanotationModal(!anotationModal);
    setSelectedDesign(Item);
  };

  useEffect(() => {
    all_Designs(setIsLoading, setData);
    unvoted_design(setIsLoading, setUnvotedData);
    // moveSelectedDesign(setIsLoading,setSelectedDesigns)
  }, []);

  console.log(Data, "datat========d==>");

  console.log(SelectedIdsForDelet, "selectedImages");
  console.log(selectedDesigns, "selectedImages");
  console.log(selectedImages, "selectedImages");

  const handleCheckboxChange = (designcode, image, id) => {
    if (selectedDesigns.includes(designcode)) {
      setSelectedDesigns(selectedDesigns.filter((item) => item !== designcode));
      setSelectedImages(selectedImages.filter((img) => img !== image));
      setSelectedIdsForDelet(SelectedIdsForDelet.filter((item) => item !== id));
    } else {
      setSelectedDesigns([...selectedDesigns, designcode]);
      setSelectedImages([...selectedImages, image]);
      setSelectedIdsForDelet([...SelectedIdsForDelet, id]);
    }
  };

  // const handleCheckboxChange = (designcode) => {
  //   setSelectedDesigns(prevState => ({
  //     ...prevState,
  //     [designcode]: !prevState[designcode] // Toggle the value of the selected design
  //   }));
  // };
  const moveSelectedDesigns = async () => {
    setIsOpen(true);
    setShowMoveOptions(false);

    // try {
    //  const res =  await moveSelectedDesign(setIsLoading,selectedDesigns);
    //  console.log("ressssssss-->",res)
    //  if (res) {
    //   navigate('/assignmentpanel');
    //  }
    // } catch (error) {
    //   console.error("Error moving selected designs:", error);
    // }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefDD.current &&
        !dropdownRefDD.current.contains(event.target)
      ) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown
        setShowDownloadOptions(false);
      }
      if (
        assignmentDownRef.current &&
        !assignmentDownRef.current.contains(event.target)
      ) {
        // Click occurred outside the dropdown
        setShowMoveOptions(false);
      }
    };

    // Add a click event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownloadMultiple = async (imageData) => {
    for (const { image, designcode } of imageData) {
      try {
        const response = await fetch(image, {
          method: "GET",
          mode: "cors",
        });
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `designPool_${designcode}.jpg`; // Use design code in filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    }
    // Optionally reset selections after download
    setSelectedImages([]);
    setAllSelected(false);
    setSelectedDesigns([]);
    setSelectButtonLabel("Select");
    setShowRadioButtons(false);
    setShowDownloadOptions(false);
  };

  const selectAllDesigns = () => {
    if (allSelected) {
      setSelectedDesigns([]);
      setSelectedImages([]);
    } else {
      setSelectedDesigns(Data.map((item) => item.designcode));
      setSelectedImages(Data.map((item) => item.image));
      handleDownloadMultiple(
        Data.map((item) => ({ image: item.image, designcode: item.designcode }))
      );
    }
    setAllSelected(!allSelected);
  };

  console.log("selectedDesign====>", selectedDesign);
  console.log("imageData", Data);

  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
    // setSelectedIdsForDelet([]);
  };
  const handleDeleteOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const toggleDeleteMoveButtons = (id) => {
    if (activeCardId === id) {
      setActiveCardId(null);
      setShowOverlay(false);
    } else {
      setActiveCardId(id);
      setShowOverlay(true);
    }
  };
  const delteItemsFromDesignPool = (item) => {
    setIdOfDeleteDesignPool(item);
    // setDeleteConfirmationOpen(true);
    // deleteItemFromAssignmentPanel(
    //   setIsLoading,
    //   IdOfDeleteAssignment,
    //   setData,
    //   setSuccessModalOpen,
    //   setSuccessMessage,
    //   setActiveCardId
    // );
    // deleteItemFromDesignPool(
    //   setIsLoading,
    //   SelectedIdsForDelet,
    //   setSuccessModalOpen,
    //   setSuccessMessage,
    //   setDeleteConfirmationOpen
    // );
  };

  const handleDeleteSingle = (item) => {
    setSelectedIdsForDelet([item]);
    setIdOfDeleteDesignPool(item);
    setDeleteConfirmationOpen(true);
  };

  return (
    <div>
      <div
        className="Parent_DesignView"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        {/* <div className="DesignPool_btns">
          <div className="Download_ParentD">
            <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
              Download <TbDownload />
            </button>
            {showDownloadOptions && (
              <div className="Download_Sub">
                <p>All</p>
                <p>Selected</p>
              </div>
            )}
          </div>
          <button className="D_selectBtn" onClick={toggleRadioButtons}>
            {selectButtonLabel}
          </button>
          <div className="Parent_MoveTo">
            <button className="D_moveBtn" onClick={toggleMoveOptions}>
              Move to <MdOutlineKeyboardArrowDown />
            </button>
            {showMoveOptions && (
              <div className="Sub_AssignmentPanel">
                <p>Assignment panel</p>
              </div>
            )}
          </div>
          <button className="D_View_Sort_Filter">
            <MdViewModule /> View
          </button>
          <button className="D_View_Sort_Filter">
            <LuArrowUpDown /> Sort
          </button>
          <button className="D_View_Sort_Filter">
            <RiFilter3Line /> Filter
          </button>
        </div> */}
        {/* Use the DesignButtons component */}
        <DesignBtn
          toggleDownloadOptions={toggleDownloadOptions}
          selectButtonLabel={selectButtonLabel}
          setSelectButtonLabel={setSelectButtonLabel}
          toggleRadioButtons={toggleRadioButtons}
          toggleMoveOptions={toggleMoveOptions}
          showDownloadOptions={showDownloadOptions}
          showMoveOptions={showMoveOptions}
          moveSelectedDesign={moveSelectedDesigns}
          getSelectedDesign={selectedDesigns}
          setSelectedDesigns={setSelectedDesigns}
          setIsOpen={setIsOpen}
          open={open}
          setData={setData}
          setShowRadioButtons={setShowRadioButtons}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          setAllSelected={setAllSelected}
          setShowDownloadOptions={setShowDownloadOptions}
          selectAllDesigns={selectAllDesigns}
          downRefff={dropdownRef}
          assignmentDownRef={assignmentDownRef}
          delteItemsFromDesignPool={delteItemsFromDesignPool}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          SelectedIdsForDelet={SelectedIdsForDelet}
          setSelectedIdsForDelet={ setSelectedIdsForDelet}
        />
        {/* new design section */}
        {/* new design section */}
        <div className="Parent_NewDesign">
          <h3 className="HeadNewdesign">New design ( {Data.length} )</h3>
          {Data.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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

          <div className="Card_Design_Parent">
            {Data.map((item, index) => (
              <>
                <div className="New_Design_card" key={item.id}>
                  <div
                    className="Card_img"
                    style={{
                      marginTop: "12px",
                      height: "170px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="image"
                      onClick={() => OpenAnntaitionmodal(item)}
                    />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.user_name}</p>
                        <p>{item.created_at}</p>
                      </div>
                      <div className="Inner_Right">
                        <p>
                          {item.likes_count} <img src={like} alt="" />
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* radio btn */}
                  {showRadioButtons && (
                    <input
                      className="Radio_select"
                      type="checkbox"
                      id={item.designcode}
                      name="fav_language"
                      value={item.designcode}
                      onChange={() =>
                        handleCheckboxChange(
                          item.designcode,
                          item.image,
                          item.id
                        )
                      }
                      checked={selectedDesigns.includes(item.designcode)}
                    ></input>
                  )}
                  {/* {!showRadioButtons && location.pathname === "/designpool" && (
                    <div
                      onClick={() => toggleDeleteMoveButtons(item.id)}
                      ref={dotsRef}
                    >
                      <BsThreeDotsVertical
                        className="A_dots"
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  )} */}
                  {/* {activeCardId === item.id && (
                    <div
                      className="Dots_Delete_DesignPool_btns"
                      ref={dropdownRefDD}
                    >
                      <p onClick={() => handleDeleteSingle(item.id)}>Delete</p>
                     
                    </div>
                  )} */}
                  {/* radio btn */}
                </div>
              </>
            ))}
          </div>

          {anotationModal && (
            <AnnotationModalDesignPool
              setanotationModal={setanotationModal}
              anotationModal={anotationModal}
              selectedDesign={selectedDesign}
              setSuccessModalOpen={setSuccessModalOpen}
              setSuccessMessage={setSuccessMessage}
              setData={setData}
            />
          )}

          <SuccessModal
            successModalOpen={successModalOpen}
            // handleOpen={handleOpen}
            // handleClose={handleClose}
            successMessage={successMessage}
          />

          {/* unvoted design */}
          <div className="Parent_unvoted">
            <h3 className="HeadNewdesign">
              Unvoted (&nbsp; {unvotedData.length}&nbsp; )
            </h3>
            <div className="Card_Design_Parent">
              {unvotedData.map((item) => (
                <div className="New_Design_card">
                  <div className="Card_img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.user_name}</p>
                        <p>{item.created_at}</p>
                      </div>
                      <div className="Inner_Right">
                        <p>
                          {item.likes_count} <img src={like} alt="" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* unvoted design */}
        </div>
        {/* new design section */}
      </div>
      <DeleteConfirmationModal
        DeleteConfirmationOpen={DeleteConfirmationOpen}
        handleDeleteClose={handleDeleteClose}
        setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        handleDeleteOpen={handleDeleteOpen}
        isLoading={isLoading}
        setSelectedIdsForDelet={setSelectedIdsForDelet}
        deleteFunction={() => {
          deleteItemFromDesignPool(
            setIsLoading,
            SelectedIdsForDelet,
            setSuccessModalOpen,
            setSuccessMessage,
            setDeleteConfirmationOpen,
            setData,
            setSelectedDesigns,
            setShowRadioButtons,
            setSelectButtonLabel,
            setSelectedIdsForDelet
          );
        }}
      />
      <BasicDetailModal />
    </div>
  );
};

export default DesignPool;
