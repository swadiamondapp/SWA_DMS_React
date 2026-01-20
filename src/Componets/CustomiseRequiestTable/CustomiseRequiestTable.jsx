/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import "../../Componets/CustomiseRequiestTable/CustomiseRequiestTable.css";
import PrintIcon from "../../assets/printIcon.png";
import EyeIcon from "../../assets/eyeIcon.png";
import ThreeDot from "../../assets/threeDots.png";
import CustomiseRequest from "../../Componets/CustomiseRequest/CustomiseRequiest";
import {
  customization_details_view_warehouse,
  customizationApprove,
  customizaztion_list_wareHouse,
  delete_customization_warehouse,
  get_customization_tracking,
} from "../../Pages/WareHousePageView/Api";
import {
  customization_details,
  delete_customization,
} from "../VOTORS PANEL/Api";
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import ScanTablePrint from "../ScanComponentWarehouse/ScanTablePrint/ScanTablePrint";
import CustomizationListDataPrint from "./CustomizationListDataPrint";
import { choose_outlet_drop_down } from "../ADMIN PANEL/Api_dropDown";
import { product_category_basicDetails } from "../Assignment Panel/Api";
import { useLocation } from "react-router-dom";
import TrackModal from "../VOTORS PANEL/Votor Customization/TrackModal";
import { apiService } from "../../Pages/Services/ApiInstants";
import { Update } from "@mui/icons-material";
const STATUS_CONFIG = {
  Received: {
    color: "#FFBA18",
    bg: "#FFBA181A",
  },
  Updated: {
    color: "#0464D5",
    bg: "#0464D51A",
  },
  Approved: {
    color: "#19DE51",
    bg: "#19DE511A",
  },
  "Work Started": {
    color: "#0E04D5",
    bg: "#0E04D51A",
  },
  "50% Completed": {
    color: "#BCCB20",
    bg: "#BCCB202B",
  },
  Rejected: {
    color: "#FF1C1C",
    bg: "#FF1C1C2B",
  },
};
const STATUS_MAP = {
  Pending: "Received",
  "MRP Updated": "Updated",
};


const data = [
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
  {
    date: "11/2/2023",
    customizationId: "SWACO4535",
    outlet: "Swa diamonds valanchery",
    mobileNumber: "+919995674444",
    productType: "Bangles",
  },
];

const CustomizationTable = (props) => {
  const printRef = useRef();
  const location = useLocation();
  const [openCRModal, setOpenCRModal] = useState(false);
  const [wareHouseuserId, setWareHouseUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [userId, setUserId] = useState([]);
const [openStatusIndex, setOpenStatusIndex] = useState(null);
const [trackOpen, setTrackOpen] = useState(false);
const [trackLoading, setTrackLoading] = useState(false);
const [trackData, setTrackData] = useState([]);
  //const [Data, setData] = useState([]);
  const [approveId, setApproveId] = useState("");
  const [CustomizationWareHouseData, setCustomizationWareHouseData] = useState(
    []
  );
  const [CustomizationListData, setCustomizationListData] = useState([]);
  const [printItem, setPrintItem] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [isPrintLoad, setIsPrintLoad] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const dropdownRefs = useRef([]);
const fetchCustomizationList = () => {
  customizaztion_list_wareHouse(
    setIsLoading,
    (data) => {
      const filteredData = data.filter(item => item.wh_status !== null);
      setCustomizationListData(filteredData);
    },
    props.SearchWithName
  );
};


useEffect(() => {
  fetchCustomizationList();
}, [props.SearchWithName]);


  console.log(CustomizationListData, "CustomizationListData");
  const handleEyeClick = (wareHouseId) => {
    setOpenCRModal(true);
    setWareHouseUserId(wareHouseId);
    if (location.pathname === "/customRequestTable") {
      customization_details(
        setIsLoadingDetail,
        setCustomizationWareHouseData,
        wareHouseId
      );
    } else {
      customization_details_view_warehouse(
        setIsLoadingDetail,
        setCustomizationWareHouseData,
        wareHouseId
      );
    }
  };

  const handleDeleteCustomization = (userId) => {
    setUserId(userId);
    setDeleteConfirmationOpen(true);
    // delete_customization_warehouse(
    //   setIsLoading,
    //   userId,
    //   setCustomizationListData,
    //   setDeleteConfirmationOpen,
    //   setSuccessModalOpen,
    //   setSuccessMessage
    // );
  };

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        // Click occurred outside the dropdown, so close it
        setShowEditDelete(null);
      } else {
        // Click occurred inside the dropdown, track it
        clickedInsideRef.current = true;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApprove = async (aId) => {
    try {
      setApproveId(aId);
      await customizationApprove(
        setIsLoading,
        aId,
        setCustomizationListData,
        setSuccessModalOpen,
        setSuccessMessage
      );
    } catch (error) {
      console.error("Approve Failed", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: printRef.current,
  });

  const handlePrintClick = (item) => {
    setPrintItem(item);
  };
  useEffect(() => {
    choose_outlet_drop_down(setOutLetDropDown);

    product_category_basicDetails(setListProductCategory);
  }, []);

  const findOutLetNameByID = (id) => {
    const item = outLetDropDown.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };
  const productCategoryByID = (id) => {
    const item = ProudctCategory.find((entry) => entry.id === id);
    return item ? item.name : "Not Found";
  };

  let clickedId;
  const onLoadWareHousePrint = async (wareHouseId) => {
    // Set loading state
    setIsPrintLoad(true);
    setLoadingItemId(wareHouseId);

    // Fetch the data and wait until it's done
    await customization_details_view_warehouse(
      setIsLoading,
      setPrintData,
      wareHouseId
    );

    // Ensure the state update is processed
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Unset loading state
    setIsPrintLoad(false);
  };

  console.log("location>>>", location.pathname);
  const updateWarehouseStatus = async (id, newStatus) => {
  try {
    await apiService.patch(
      `/warehouse/update-customization/${id}`,
      { wh_status: newStatus }
    );
     fetchCustomizationList();

    // Update UI locally
    setCustomizationListData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );

    setOpenStatusIndex(null);
  } catch (error) {
    console.error("Status update failed", error);
  }
};
const statusDropdownRef = useRef(null);
const WAREHOUSE_PROGRESS_STATUSES = [
  "Work Started",
  "50% Completed",
  "Completed",
];
const DROPDOWN_VISIBLE_STATUSES = [
  "Approved",
  "Work Started",
  "50% Completed",
];

const renderStatusDropdown = (status, index, itemId, item) => {
  const mappedStatus = STATUS_MAP[status] || status;
  const config = STATUS_CONFIG[mappedStatus];

  const showDropdown = DROPDOWN_VISIBLE_STATUSES.includes(mappedStatus);

  // ❌ No dropdown
  if (!showDropdown) {
    return (
      <span
        style={{
          background: config?.bg || "#eee",
          color: config?.color || "#999",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {mappedStatus || "N/A"}
      </span>
    );
  }

  // ✅ Allowed transitions
  const getNextStatuses = (current) => {
    if (current === "Approved") return ["Work Started"];
    if (current === "Work Started") return ["50% Completed"];
    if (current === "50% Completed") return ["Completed"];
    return [];
  };

  const nextStatuses = getNextStatuses(mappedStatus);

  return (
    <div
      ref={openStatusIndex === index ? statusDropdownRef : null}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div
        onClick={() =>
          setOpenStatusIndex(openStatusIndex === index ? null : index)
        }
        style={{
          background: config.bg,
          color: config.color,
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
      >
        {mappedStatus}
        <span style={{ fontSize: "10px" }}>▼</span>
      </div>

      {openStatusIndex === index && nextStatuses.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: 0,
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            padding: "6px",
            minWidth: "160px",
            zIndex: 100,
          }}
        >
          {nextStatuses.map((key) => (
            <div
              key={key}
              onClick={() => updateWarehouseStatus(itemId, key)}
              style={{
                padding: "6px 10px",
                fontSize: "12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      statusDropdownRef.current &&
      !statusDropdownRef.current.contains(event.target)
    ) {
      setOpenStatusIndex(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={70} // Set the desired size
            sx={{
              color: "#126e72",
              padding: "8px 10px",
              width: "35px",
              marginTop: "100px",
              marginLeft: "100px",
            }}
          />
        </div>
      ) : (
        <div
          className="Parant_CustomTable"
          style={{ paddingLeft: props.sidebarExpanded ? "225px" : "130px" }}
        >
          <div className="TableContainer">
            <table>
              <thead>
                <tr style={{ backgroundColor: "#fff" }}>
                  <th>Date</th>
                  <th>Customization ID</th>
                  <th>Outlet</th>
                  <th>Mobile number</th>
                  <th>Product type</th>
                  <th>Actual MRP</th>
                  <th>Status</th>
                  <th>Track</th>
                  <th
                    style={{
                      borderBottom: "1px solid #ddd",
                      borderRight: "none",
                    }}
                  >
                    Action
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ddd",
                      borderRight: "none",
                    }}
                  ></th>
                  <th
                    style={{
                      borderBottom: "1px solid #ddd",
                      borderRight: "none",
                      borderLeft: "none",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
{CustomizationListData.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
                    }}
                  >
                    <td>{item.created_at}</td>
                    <td>{item.customizationcode}</td>
                    <td>{findOutLetNameByID(Number(item.outlet))}</td>
                    <td>{item.mobile_number}</td>
                    <td> {                productCategoryByID(Number(item.product_type))}</td>
                    <td>
                      <div className="actual_mrp">
                      {item.actual_price || "N/A"}
                      </div>
                      </td>
                    <td>
                        {renderStatusDropdown(item.wh_status, index, item.id, item)}
                      </td>


                      <td>
                        <button
                                                className="track_btn"
                                                onClick={() => {
                                                  get_customization_tracking(
                                                    setTrackLoading,
                                                    setTrackData,
                                                    item.id
                                                  );
                                                  setTrackOpen(true);
                                                }}
                                              >
                                                Track
                                              </button>
                      </td>
                    <td >
                      <button
                        className="PrintButton_CT"
                        // onClick={() => handlePrintClick(item)}
                      >
                        <ReactToPrint
                          trigger={() => (
                            <div className="scan_list">
                              {isPrintLoad && loadingItemId === item.id ? (
                                <div className="" style={{ width: "40px" }}>
                                  <CircularProgress
                                    size={15}
                                    sx={{
                                      color: "white",
                                      width: "100px",
                                    }}
                                  />
                                </div>
                              ) : (
                                <>
                                  <LuPrinter style={{ fontSize: "14px" }} />{" "}
                                  Print
                                </>
                              )}
                            </div>
                          )}
                          content={() => printRef.current}
                          // onBeforePrint={()=>onLoadWareHousePrint(item.id)}
                          onBeforeGetContent={() =>
                            onLoadWareHousePrint(item.id)
                          }
                        />
                      </button>

                      <div style={{ display: "none" }}>
                        <CustomizationListDataPrint
                          ref={printRef}
                          dataToDisplay={printData}
                        />
                      </div>

                     
                    </td>

                    <td onClick={() => handleEyeClick(item.id)}>
                      <img src={EyeIcon} />
                    </td>

                    <td
                      onClick={() =>
                        setShowEditDelete(
                          showEditDelete === index ? null : index
                        )
                      }
                    >
                      <img src={ThreeDot} />
                      {showEditDelete === index && (
                        <div
                          ref={(el) => (dropdownRefs.current[index] = el)}
                          className="Edit_delete_btn_user_warehouse"
                        >
                          {/* <p
                        className="Edit_btn_user"
                        onClick={() => handleEditCustomization(item.id)}
                      >
                        Edit
                      </p> */}
                          <p
                            className="Delete_btn_user"
                            style={{ padding: "10px" }}
                            onClick={() => handleDeleteCustomization(item.id)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CustomiseRequest
            open={openCRModal}
            onClose={() => setOpenCRModal(false)}
            wareHouseuserId={wareHouseuserId}
            CustomizationWareHouseData={CustomizationWareHouseData}
            isLoadingDetail={isLoadingDetail}
              onConfirmSuccess={fetchCustomizationList}
          />
          <DeleteConfirmationModal
            DeleteConfirmationOpen={DeleteConfirmationOpen}
            handleDeleteClose={handleDeleteClose}
            setDeleteConfirmationOpen={setDeleteConfirmationOpen}
            handleDeleteOpen={handleDeleteOpen}
            isLoading={isLoading}
            deleteFunction={() => {
              delete_customization_warehouse(
                setIsLoading,
                userId,
                setCustomizationListData,
                setDeleteConfirmationOpen,
                setSuccessModalOpen,
                setSuccessMessage
              );
            }}
          />
          <SuccessModal
            successModalOpen={successModalOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            successMessage={successMessage}
          />
                <TrackModal
                    open={trackOpen}
                    onClose={() => setTrackOpen(false)}
                    data={trackData}
                  />
        </div>
      )}
    </>
  );
};

export default CustomizationTable;
