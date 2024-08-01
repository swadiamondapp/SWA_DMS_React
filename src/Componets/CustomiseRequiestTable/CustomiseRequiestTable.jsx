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
} from "../../Pages/WareHousePageView/Api";
import { delete_customization } from "../VOTORS PANEL/Api";
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import ScanTablePrint from "../ScanComponentWarehouse/ScanTablePrint/ScanTablePrint";
import CustomizationListDataPrint from "./CustomizationListDataPrint";
import { choose_outlet_drop_down } from "../ADMIN PANEL/Api_dropDown";
import { product_category_basicDetails } from "../Assignment Panel/Api";

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
  const [openCRModal, setOpenCRModal] = useState(false);
  const [wareHouseuserId, setWareHouseUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [userId, setUserId] = useState([]);

  const [Data, setData] = useState([]);
  const [approveId, setApproveId] = useState("");
  const [CustomizationWareHouseData, setCustomizationWareHouseData] = useState(
    []
  );
  const [CustomizationListData, setCustomizationListData] = useState([]);
  const [printItem, setPrintItem] = useState(null);

  const dropdownRefs = useRef([]);

  useEffect(() => {
    customizaztion_list_wareHouse(setIsLoading, setCustomizationListData);
  }, []);

  console.log(CustomizationListData, "CustomizationListData");
  const handleEyeClick = (wareHouseId) => {
    setOpenCRModal(true);
    setWareHouseUserId(wareHouseId);
    customization_details_view_warehouse(
      setIsLoading,
      setCustomizationWareHouseData,
      wareHouseId
    );
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
      await customizationApprove(setIsLoading, aId, setCustomizationListData);
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

  console.log("printItem", printItem);

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
                    <td> {productCategoryByID(Number(item.product_type))}</td>

                    <td style={{width:'23%'}}>
                      <button
                        className="PrintButton_CT"
                        onClick={() => handlePrintClick(item)}
                      >
                        <ReactToPrint
                          trigger={() => (
                            <div className="scan_list">
                              <LuPrinter /> Print
                            </div>
                          )}
                          content={() => printRef.current}
                        />
                      </button>

                      <div style={{ display: "none" }}>
                        <CustomizationListDataPrint
                          ref={printRef}
                          dataToDisplay={printItem}
                        />
                      </div>

                      {item?.customer_response === "Confirmed" &&
                      item?.status === "Confirmed" ? (
                        <span
                          disabled
                          className="inactive_btn"
                          style={{ fontWeight: "300", marginLeft: "20px" }}
                        >
                          Approved
                        </span>
                      ) : item?.customer_response === "Confirmed" ? (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="active_btn"
                          style={{
                            backgroundColor: "#23a06496",
                            color: "white",
                            cursor: "pointer",
                            marginLeft: "20px",
                          }}
                        >
                          Approve
                        </button>
                      ) : null}
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
        </div>
      )}
    </>
  );
};

export default CustomizationTable;
