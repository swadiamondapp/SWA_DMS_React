import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import product from "../../assets/p1.png";
// import "./assignmentviewsAll.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
import {
  DEATAILS_SATUS_UPDATE,
  FOLDER_DETAIL_API,
} from "../../Pages/Services/EndPoints";
import axios from "axios";
import {
  diamond_type_dropdown_basicDetails,
  findings_List_basicDetails,
  listFolderDetailVeiwAssignmentPanel,
  list_folderDetails,
  metal_type_dropdown_basicDetails,
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";
import BasicDetailModal from "../BasicDetails/BasicDetailModal";
import BasicDetialsEditModal from "../BasicDetails/BasicDetialsEditModal";
import EdiIcon from "../../assets/EditBasic.png";
import {
  choose_outlet_drop_down,
  metal_type_drop_down,
  product_type_drop_down,
} from "../ADMIN PANEL/Api_dropDown";
import {
  detailsViewOfItems,
  detailsViewOfItemsRenders,
  rendersDetailByCode,
  updateImageStatuses,
} from "./Api";
import { GoDownload } from "react-icons/go";
import ThreeDViewer from "../ThreeDViewer/ThreeDViewer";
import InstructionModal from "../InstructionModal/InstructionModal";
import ShareIcon from "../../assets/shareIcon.png";
import { Select } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import SuccessModal from "../SuccessModal/SuccessModal";

const AssignmentDetailsViewsAll = ({ sidebarExpanded }) => {
  const location = useLocation();
  const { id } = useParams();
  const { detailsViewFolderName, renderMessage, cardDatas, page } =
    location.state || {};
  const [folderDetails, setFolderDetails] = useState([]);
  const [folderDetailView, setFolderDetailsView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setIsOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  //   const designId = queryParams.get("design_id");
  const { designId } = location.state || {};
  const [MetalTypeDropDown, setMetalTypeDropDown] = useState([]);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [ProductTypeDropDown, setProductTypeDropDown] = useState([]);
  const [diamonType, setDiamondType] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [FindingsList, setFindingsList] = useState([]);
  const [DetailsData, setDetailsData] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [modalHeading, setmodalHeading] = useState("");
  const [rendesrDetail, setRendesrDetail] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  // const [renderRemark, setRenderRemark] = useState("");
  // const [cadRemark, setCadRemark] = useState("");

  const handleopenModal = () => {
    setOpenmodal(!openModal);
    setmodalHeading("Add cad Instractions");
  };

  const handleopenModalRender = () => {
    setOpenmodal(!openModal);
    setmodalHeading("Add Render Instractions");
  };

  useEffect(() => {
    if (renderMessage === true) {
      detailsViewOfItemsRenders(setIsLoading, setFolderDetailsView, id);
    } else {
      detailsViewOfItems(setIsLoading, setFolderDetailsView, id);
    }

    // list_folderDetails(setIsLoading,setFolderDetails,id)
  }, [id, renderMessage]);

  useEffect(() => {
    rendersDetailByCode(setIsLoading, setRendesrDetail, detailsViewFolderName);
  }, [id]);

  const handleDownload = (imageUrl, fileName = "downloaded_file") => {
    fetch(imageUrl, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };

  useEffect(() => {
    if (folderDetailView) {
      setFolderDetails({
        assignment_details: folderDetailView["assignment_details"],
        itemDetails: folderDetailView["item_details"],
      });
      //   setHeaderDetials(folderDetailView["item_details"]);
    }
  }, [folderDetailView]);
  const { assignment_details, itemDetails } = folderDetails;

  const productId = itemDetails?.id || "";
  const productCode = itemDetails?.designcode || "";
  // const designCode = itemDetails?.paper_design?.designcode || detailsViewFolderName ;

  // console.log(detailsViewFolderName, "productId");

  const handleEditBasicDetails = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    metal_type_drop_down(setMetalTypeDropDown);
    product_type_drop_down(setProductTypeDropDown);
    choose_outlet_drop_down(setOutLetDropDown);
    // diamond_colours(setSelectDiamondColor);
    // diamond_clarity_choice(setSelectDiamondClarity);
    metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    diamond_type_dropdown_basicDetails(setDiamondType);
    product_category_basicDetails(setListProductCategory);

    tag_List_basicDetails(setSelectedTags);
    findings_List_basicDetails(setFindingsList);
  }, []);

  const findMetalNameById = (id) => {
    const item = MetalTypeDropDown.find((entry) => entry.id === id);
    return item ? item.metal_name : "Not found";
  };

  const findOutLetNameByID = (id) => {
    const item = outLetDropDown.find((entry) => entry.id === id);
    return item ? item.name : "Note Found";
  };
  // const productCategoryByID = (id) => {
  //   const item = ProudctCategory.find((entry) => entry.id === id);
  //   return item ? item.name : "Note Found";
  // };
  const findDiamondNameById = (id) => {
    const item = diamonType.find((entry) => entry.id === id);
    return item ? item.name : "Not found";
  };

  const findFindingsNameById = (id) => {
    const item = FindingsList.find((entry) => entry.id === id);
    return item ? item.find_name : "Not found";
  };

  const findNamesByIds = (ids) => {
    return ids.map((id) => findFindingsNameById(id));
  };

  const findTagsNameById = (id) => {
    const item = selectedTags.find((entry) => entry.id === id);
    return item ? item.name : "Not found";
  };

  useEffect(() => {
    product_category_basicDetails(setListProductCategory);
  }, []);

  const productCategoryByID = (id) => {
    const item = ProudctCategory.find((entry) => entry.id === id);
    console.log("kkkkkk", item);
    return item ? item.name : "Note Found";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const initialStatuses = rendesrDetail?.images
    ?.filter((imgObj) => {
      const [key, value] = Object.entries(imgObj)[0] || [];
      return value && !key.includes("_status");
    })
    .reduce((acc, imgObj) => {
      const [key] = Object.entries(imgObj)[0];
      const imgKey = key.replace(/\d+/g, "");
      acc[`${key}_status`] = "Pending";
      return acc;
    }, {});

  const [status, setStatus] = useState(initialStatuses);

  const handleChange = async (imgKey, value) => {
    let updatedStatus;
    setStatus((prevStatus) => {
      updatedStatus = {
        ...prevStatus,
        [`${imgKey}_status`]: value,
      };
      return updatedStatus;
    });

    await updateImageStatuses(
      setIsLoading,
      updatedStatus,
      setFolderDetailsView,
      detailsViewFolderName,
      setRendesrDetail,
      setSuccessModalOpen
    );
  };

  // const updateImageStatuses = async (updatedStatus) => {
  //   const body = {
  //     ...updatedStatus,
  //     remark: ""
  //   };
  //   try {
  //     setIsLoading(true);
  //     const response = await apiService.patch(`${DEATAILS_SATUS_UPDATE}${detailsViewFolderName}`, body);
  //     if (checkApiStatus(response)) {
  //       setFolderDetailsView(response.data.results.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  console.log("cardDatas", cardDatas);

  console.log(rendesrDetail?.images, "rendesrDetail");

  return (
    <div>
      <div
        className="Parent_AssignmentView"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="AssignmentView">
          <div className="detail_left_part">
            <div className="Left_img_View">
              <img
                src={itemDetails?.paper_design?.image || itemDetails?.image}
                alt=""
              />
            </div>
            {page === "CADdetail" && (
              <div className="cad_uploaded_admin">
                <div
                  className=""
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    fontSize: "18px",
                  }}
                >
                  <h4>Cad Output file</h4>
                  <button
                    style={{
                      padding: "10px 16px 10px 16px",
                      background: "#0464D5",
                      color: "white",
                      borderRadius: "30px",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={handleopenModal}
                  >
                    Add instraction
                  </button>
                </div>
                <div
                  className=""
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="Detail_Card"
                    style={{ width: "48%", height: "300px", gap: "5px" }}
                  >
                    <img
                      src={cardDatas[0]?.file_2d}
                      alt=""
                      // onClick={() => handleForlderDetailsVeiw(item.id, item.designcode)}
                    />
                    <span>
                      POSTED ON:
                      <b>{formatDate(cardDatas[0]?.created_at)}</b>
                    </span>
                    <button
                      className="Download_btn_hub"
                      onClick={() =>
                        handleDownload(cardDatas[0]?.file_2d, "image_2d.jpg")
                      }
                    >
                      DOWNLOAD
                      <GoDownload />
                    </button>
                    <button
                      style={{
                        padding: "3px 6px 3px 6px",
                        color: "#23A064",
                        border: "1px solid #23A064",
                        background: "#23A0641A",
                        width: "auto",
                        borderRadius: "32px",
                      }}
                    >
                      {cardDatas[0]?.file2d_status}
                    </button>
                  </div>
                  <div
                    className="Detail_Card"
                    style={{ width: "48%", height: "300px", gap: "10px" }}
                  >
                    <ThreeDViewer url={cardDatas[0]?.file_3d} />
                    <span>
                      POSTED ON:
                      <b> {formatDate(cardDatas[0]?.created_at)} </b>
                    </span>
                    <button
                      className="Download_btn_hub"
                      onClick={() =>
                        handleDownload(cardDatas[0]?.file_3d, "model_3d.3dm")
                      }
                      style={{ background: "#126E72" }}
                    >
                      DOWNLOAD
                      <GoDownload />
                    </button>
                    <button
                      style={{
                        padding: "13px 6px ",
                        color: "#23A064",
                        border: "1px solid #23A064",
                        background: "#23A0641A",
                        width: "auto",
                        borderRadius: "32px",
                      }}
                    >
                      {cardDatas[0]?.file3d_status}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right_Assignment_View">
            {/* <div
              className="editContainer"
              onClick={() => handleEditBasicDetails()}
            >
              <img src={EdiIcon} alt="" />
              <p>Edit</p>
            </div> */}
            <div className="Assignment_contents">
              <div
                className=""
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3>Basic details</h3>

                <button
                  className="btn_scan"
                  onClick={() => handleEditBasicDetails()}
                >
                  <AiOutlineEdit
                    style={{ color: "#0464D5" }}
                    className="btn_scan_img1"
                  />{" "}
                  <span>Edit Details</span>
                </button>
              </div>

              <div className="Assignment_Details">
                <div className="A1_text">
                  <p>Product Id</p>
                  <p>
                    {itemDetails?.paper_design?.designcode ||
                      detailsViewFolderName}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Category</p>
                  <p>
                    {productCategoryByID(
                      Number(assignment_details?.product_category)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Length</p>
                  <p>{assignment_details?.length} </p>
                </div>
                <div className="A1_text">
                  <p>Width</p>
                  <p>{assignment_details?.width} </p>
                </div>
                <div className="A1_text">
                  <p>Height</p>
                  <p>{assignment_details?.height} </p>
                </div>
                <div className="A1_text">
                  <p>Type of metal</p>
                  <p>
                    {findMetalNameById(
                      Number(assignment_details?.type_of_metal)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Dimond Type</p>
                  <p>
                    {findDiamondNameById(
                      Number(assignment_details?.diamond_type)
                    )}
                  </p>
                </div>
                <div className="A1_text">
                  <p>APPROX DIAMOND WEIGHT</p>
                  <p>{assignment_details?.approx_diamond_weight} ct</p>
                </div>
                <div className="A1_text">
                  <p>Findings</p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {assignment_details?.findings?.map((findingId, index) => (
                        <p
                          className="tagsInBasicDetals"
                          key={index}
                          style={{ zIndex: "" }}
                        >
                          {/* {findFindingsNameById(Number(findingId))} */}
                          {findFindingsNameById(Number(findingId))}
                          {index < assignment_details.findings.length - 1
                            ? ", "
                            : ""}
                        </p>
                      ))}
                      {/* {findFindingsNameById(Number(basicDetails?.findings))} */}
                    </div>
                  </div>
                </div>
                <div className="A1_text">
                  <p>Approx Metal Weight</p>
                  <p>{assignment_details?.approx_metal_weight} g</p>
                </div>
                <div className="A1_text">
                  <p>Approx Price</p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <LiaRupeeSignSolid />
                    {assignment_details?.approx_price}
                  </p>
                </div>
                <div className="A1_text">
                  <p>Tags</p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {assignment_details?.tag?.map((findingId, index) => (
                        <p className="tagsInBasicDetals" key={index}>
                          {/* {findFindingsNameById(Number(findingId))} */}
                          {findTagsNameById(Number(findingId))}
                          {index < assignment_details.tag.length - 1
                            ? ", "
                            : ""}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* <span>{basicDetails?.tag}</span> */}
                </div>
                <div className="A1_text" style={{ borderBottom: "0px" }}>
                  <p>Note</p>
                  <p>{assignment_details?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {page === "CADdetail" && rendesrDetail && (
          <div
            className=""
            handleopenModalRender
            style={{
              width: "100%",
              display: "flex",
              gap: "6px",
              // flexWrap: "wrap",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <div
              className=""
              style={{
                width: "57%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                fontSize: "18px",
              }}
            >
              <h4>Render Output file</h4>
              <button
                style={{
                  padding: "10px 16px 10px 16px",
                  background: "#0464D5",
                  color: "white",
                  borderRadius: "30px",
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={handleopenModalRender}
              >
                Add instraction
              </button>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "4px",
                flexWrap: "wrap",
                height: "auto",
                paddingBottom: "10px",
              }}
            >
              {/* {rendesrDetail &&
                rendesrDetail?.images?.map((imgObj, index) => {
                  const imageUrl = Object.values(imgObj)[0];
                  const createdAt = imgObj.created_at;
                  console.log("imgurl---->", imageUrl);
                  if (imageUrl) {
                    return (
                      <div className="finishedCardContainer2">
                        <img src={imageUrl} alt="card_image" />
                        <span className="postedOn">
                          POSTED ON:{" "}
                          <span className="postedOn_data">
                            {new Date(createdAt).toLocaleDateString("en-GB")}{" "}
                          </span>
                        </span>
                        <Select
                          defaultValue="lucy"
                          style={{
                            width: 12  const initialStatuses = rendesrDetail?.images
  ?.filter((imgObj) => {
    const [key, value] = Object.entries(imgObj)[0] || [];
    return value && !key.includes("_status");
  })
  .reduce((acc, imgObj) => {
    const [key] = Object.entries(imgObj)[0];
    const imgKey = key.replace(/\d+/g, ''); // Remove digits to match img status keys
    acc[`${imgKey}_status`] = 'Pending'; // Default status
    return acc;
  }, {});

const [status, setStatus] = useState(initialStatuses);

// Update image statuses in the API
const updateImageStatuses = async () => {
  const body = {
    ...status,
    remark: "" // Add remark if needed
  };

  try {
    setIsLoading(true);
    const response = await apiService.post(`${DEATAILS_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

const handleChange = (imgKey, value) => {
  setStatus(prevStatus => ({
    ...prevStatus,
    [`${imgKey}_status`]: value
  }));
};

console.log("Initial", status);0,
                            padding: "6px 6px 6px 2px",
                            color: "#23A064",
                            border: "1px solid #23A064",
                            background: "#23A0641A",
                            borderRadius: "32px",
                          }}
                          onChange={handleChange}
                          options={[
                            { value: "jack", label: "Jack" },
                            { value: "lucy", label: "Lucy" },
                            { value: "Yiminghe", label: "Yiminghe" },
                            {
                              value: "disabled",
                              label: "Disabled",
                              disabled: true,
                            },
                          ]}
                        />
                      </div>
                    );
                  }
                })} */}

              {rendesrDetail?.images?.map((imgObj, index) => {
                const [imageKey, imageUrl] = Object.entries(imgObj).find(
                  ([key, value]) =>
                    key.startsWith("img") && !key.endsWith("_status")
                );

                const statusKey = `${imageKey}_status`;
                const statusValue = imgObj[statusKey];

                if (!imageUrl) return null;

                return (
                  <div key={index} className="finishedCardContainer2">
                    <img src={imageUrl} alt="card_image" />
                    <span className="postedOn">
                      POSTED ON:{" "}
                      <span className="postedOn_data">
                        {new Date(imgObj.created_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </span>
                    <Select
                      value={statusValue}
                      style={{
                        width: 120,
                        padding: "6px 6px 6px 2px",
                        color: "#23A064",
                        border: "1px solid #23A064",
                        background: "#23A0641A",
                        borderRadius: "32px",
                      }}
                      onChange={(value) => handleChange(imageKey, value)}
                      options={[
                        { value: "Approved", label: "Approved" },
                        { value: "Rejected", label: "Rejected" },
                      ]}
                    />
                  </div>
                );
              })}

              {/* <button onClick={updateImageStatuses}>Update Status</button> */}

              {rendesrDetail.length === 0 && (
                <span>No Renders uploaded Currespond to this Product</span>
              )}
            </div>
          </div>
        )}
      </div>

      <BasicDetailModal
        name={"editbasicDetails"}
        open={open}
        onClose={() => setIsOpen(false)}
        folderIdA={id}
        // designId={designId}
        designId={productId}
        DetailsProductId={itemDetails?.paper_design?.designcode}
        basicDetails={assignment_details}
        updateEditFunction={() =>
          listFolderDetailVeiwAssignmentPanel(
            setIsLoading,
            setFolderDetailsView,
            id,
            designId
          )
        }
      />

      {openModal && (
        <InstructionModal
          open={handleopenModal}
          setOpenmodal={setOpenmodal}
          modalHeading={modalHeading}
          setSuccessModalOpen={setSuccessModalOpen}
          setIsLoading={setIsLoading}
          detailsViewFolderName={detailsViewFolderName}
          // setCadRemark={setCadRemark}
          // setRenderRemark={setRenderRemark}
          // renderRemark={renderRemark}
        />
      )}

      <SuccessModal
        successModalOpen={successModalOpen}
        // handleOpen={handleOpen}
        // handleClose={handleClose}
        successMessage={"Updated Successfully"}
      />
    </div>
  );
};

export default AssignmentDetailsViewsAll;
