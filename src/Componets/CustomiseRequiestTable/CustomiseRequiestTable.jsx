import React, { useEffect, useState, useRef } from "react";
import "../../Componets/CustomiseRequiestTable/CustomiseRequiestTable.css";
import PrintIcon from "../../assets/printIcon.png";
import EyeIcon from "../../assets/eyeIcon.png";
import ThreeDot from "../../assets/threeDots.png";
import CustomiseRequest from "../../Componets/CustomiseRequest/CustomiseRequiest";
import {
  customization_details_view_warehouse,
  customizaztion_list_wareHouse,
  delete_customization_warehouse,
} from "../../Pages/WareHousePageView/Api";
import { delete_customization } from "../VOTORS PANEL/Api";
import DeleteConfirmationModal from "../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../SuccessModal/SuccessModal";

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
  const [openCRModal, setOpenCRModal] = useState(false);
  const [wareHouseuserId, setWareHouseUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userId, setUserId] = useState([]);

  const [Data, setData] = useState([]);
  const [CustomizationWareHouseData, setCustomizationWareHouseData] = useState(
    []
  );
  const [CustomizationListData, setCustomizationListData] = useState([]);
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

  return (
    <div className="Parant_CustomTable">
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
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
              >
                Action
              </th>
              <th
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
              ></th>
              <th
                style={{ borderBottom: "1px solid #ddd", borderRight: "none" }}
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
                <td>{item.outlet}</td>
                <td>{item.mobile_number}</td>
                <td>{item.product_type}</td>
                <td>
                  <button className="PrintButton_CT">
                    Print <img src={PrintIcon} />
                  </button>
                </td>

                <td onClick={() => handleEyeClick(item.id)}>
                  <img src={EyeIcon} />
                </td>

                <td
                  onClick={() =>
                    setShowEditDelete(showEditDelete === index ? null : index)
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
  );
};

export default CustomizationTable;
