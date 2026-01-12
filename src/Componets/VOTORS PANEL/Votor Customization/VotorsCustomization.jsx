/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomiseRequest from "../../CustomiseRequest/CustomiseRequiest";
import {
  //edit_customization,
  voters_customization_list,
  delete_customization,
  confirVotersStatus,
   customization_details
} from "../Api";
//import {edit_customizaion_warehouse} from "../../../Pages/WareHousePageView/Api";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import CircularProgress from "@mui/material/CircularProgress";
import { choose_outlet_drop_down } from "../../ADMIN PANEL/Api_dropDown";
import { product_category_basicDetails } from "../../Assignment Panel/Api";
import TrackModal from "./TrackModal";
import { get_customization_tracking } from "../../../Pages/WareHousePageView/Api";
import CreateCustomisation from "../../CreateCustomisation/CreateCustomisation";

const VotorsCustomization = ({ sidebarExpanded, SearchWithName }) => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState([]);
  const [customization, setCustomization] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [outLetDropDown, setOutLetDropDown] = useState([]);
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [DeleteID, setDeleteId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const dropdownRef = useRef(null);
  const [status, setStatus] = useState("");
const [trackOpen, setTrackOpen] = useState(false);
const [trackData, setTrackData] = useState([]);
 const [isModalOpenCreateCutomize, setIsCreateCustomizeModalOpen] =
    useState(false);
//const [trackId, setTrackId] = useState(null);
const [trackLoading, setTrackLoading] = useState(false);
const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    voters_customization_list(setIsLoading, setData, SearchWithName, status);
  }, [SearchWithName, status, refreshKey]);
const refreshVotersList = () => {
  setRefreshKey(prev => prev + 1);
};

  const handleDeleteCustomization = (cuzId) => {
    setDeleteId(cuzId);
    setDeleteConfirmationOpen(true);
     delete_customization(setIsLoading, setData, cuzId);
  };
  const handleEditCustomization = (id) => {
    
    customization_details(setIsLoading, setCustomization, id);
    setIsCreateCustomizeModalOpen(true);

  };
    //edit_customizaion_warehouse(setIsLoading, formData, setCutomizationList, userId);
  const handleEyeClick = (id) => {
    // setSubmitMode("DRAFT");
    setUserId(id);
   setIsModalOpen(true);

  };

   //  customization_details(setIsLoading, setCustomization, userId);
    //  console.log(setCustomization, "check customization details");
  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown, so close it
        setShowEditDelete(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  const handleOpen = () => {
    setSuccessModalOpen(true);
  };

  console.log(Data, "votersCuz");

  const handleConfirmButton = (userId) => {
    setStatus("Confirmed");
    confirVotersStatus(setIsLoading, userId, setStatus );
  };
const handleCancelOrder = (userId) => {
    setStatus("Cancelled");
    confirVotersStatus(setIsLoading, userId, setStatus);
  }
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
  const showOrderActions = ["Cancelled", "Confirmed", "Updated"];
const [submitMode, setSubmitMode] = useState("DRAFT");

const sendToWarehouse = (id) => {

    setSubmitMode("SEND_TO_WH");   // 🔥 important
    handleEyeClick(id);       // open edit modal
};



  return (
    <>
      <div className="votors_btns">
        <DesignBtn votersSetData={setData} setStatus={setStatus} />
      </div>
      <div
        className="ParentVotors"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="VotorsCustomizationTable">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
              }}
            >
              <CircularProgress
                size={50} // Set the desired size
                sx={{
                  color: "#126e72",
                  // padding: "8px 10px",
                  // width: "35px",
                }}
              />
            </div>
          ) : (
            <div className="Users_Table_List">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr style={{ color: "#455173" }}>
                    <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Created Date
                    </th>
                    <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Customization ID
                    </th>
                    <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Outlet
                    </th>
                    <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Mobile number
                    </th>
                     <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Actual MRP
                    </th>
                    <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                      Product type
                    </th>
                    <th>Order</th>
                    <th>Status</th>
                     <th>Track</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((item, index) => (
                    <tr key={index} style={{ color: "#2E364C" }}>
                      <td>{item.created_at}</td>
                      <td>{item.customizationcode}</td>
                      <td>{findOutLetNameByID(Number(item.outlet))}</td>
                      <td>
                        <div className="view_password">
                          {item.mobile_number}
                        </div>
                      </td>
                      <td>
                        <div className="actual_mrp">
                         {item.actual_price}
                        </div>
                      </td>
                      <td> {productCategoryByID(Number(item.product_type))}</td>
              
               
      {/* Actions (Cancel / Confirm) */}
      <td>
        {item.wh_status === "MRP Updated" && (
          <div className="order_btns">
           <button
            className="cancel_btn"
            onClick={() => confirVotersStatus(setIsLoading, item.id, "Rejected", setData)}
          >
            Cancel
          </button>

          <button
          className="updated_btn"
          onClick={() => confirVotersStatus(setIsLoading, item.id, "Confirmed", setData)}
        >
          Confirm
        </button>
          </div>
        )}
      </td>

      {/* Status column */}
    {/* Status column */}
<td style={{ position: "relative" }}>
  <div className="status_votors">
    <button
      className={
        item.wh_status === "MRP Updated"
          ? "updated_btn_votors"
          : item.status === "Drafted"
          ? "send_wh_btn"
          : item.status === "Requested"
          ? "requested_btn_votors"
          : item.status === "Confirmed"
          ? "confirmed_btn_votors"
          : item.status === "Canceled"
          ? "canceled_btn_votors"
          : ""
      }
      onClick={() => {
        if (item.status === "Drafted") {
          sendToWarehouse(item.id);
        }
      }}
      disabled={item.status !== "Drafted"}
    >
      {item.wh_status === "MRP Updated"
        ? "Updated"
        : item.status === "Drafted"
        ? "Send to WH"
        : item.status}
    </button>
  </div>
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

                      <td>  <IoEye
                            style={{
                              color: "#A7BED7",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEyeClick(item.id)}
                          />
                         {item.status !== "Confirmed" && (
                                      <>
                                        <BsThreeDotsVertical
                                          className="Action_dots"
                                          onClick={() =>
                                            setShowEditDelete(showEditDelete === index ? null : index)
                                          }
                                        />

                                        {showEditDelete === index && (
                                          <div
                                            ref={dropdownRef}
                                            className="Edit_delete_btn_user"
                                          >
                                            <p
                                              className="Edit_btn_user"
                                              onClick={() => handleEditCustomization(item.id)}
                                            >
                                              Edit
                                            </p>

                                            <p
                                              className="Delete_btn_user"
                                              onClick={() => handleDeleteCustomization(item.id)}
                                            >
                                              Delete
                                            </p>
                                          </div>
                                        )}
                                      </>
                                    )}

                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          {!isLoading && Data.length === 0 && <div style={{width:"100%",height:"50vh",display:"flex",alignItems:"center",justifyContent:"center"}}> No Data found</div>}
        <CustomiseRequest
          open={IsModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={userId}
          setData={setCustomization}
            submitMode={submitMode} 
              refreshList={refreshVotersList}
        />
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteClose={handleDeleteClose}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          isLoading={isLoading}
          deleteFunction={() => {
            delete_customization(
              setIsLoading,
              setData,
              DeleteID,
              setDeleteConfirmationOpen,
              setSuccessMessage,
              setSuccessModalOpen
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
  <CreateCustomisation
        open={isModalOpenCreateCutomize}
        onClose={() => setIsCreateCustomizeModalOpen(false)}
        dataToDisplaytomodal={customization}
        userId={userId}
        displayEditDetailsById={customization?.id}
        // wareHouseuserId={wareHouseuserId}
        setData={setData}
        setCustomization={setCustomization}
        name="editModalOpen"
        customizationFunction={() =>
          customization_details(setIsLoading, setCustomization, userId)
        }
          submitMode={submitMode} 
      />
      </div>
    </>
  );
};

export default VotorsCustomization;


        {/* <td>  
                    <div className="active_sendmail">
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td>
                    
                        {item.status === "Updated" && (
                          <button
                            className={
                              item.customer_response === "Confirmed"
                                ? "updated_btn"
                                : "votersConfirm_btn"
                            }
                            onClick={() => handleConfirmButton(item.id)}
                          >
                            {item.customer_response === "Confirmed"
                              ? "Confirmed"
                              : "Confirm"}
                          </button>
                        )} */}