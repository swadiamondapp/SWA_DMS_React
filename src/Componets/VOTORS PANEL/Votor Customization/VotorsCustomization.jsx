import React, { useState, useEffect, useRef } from "react";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomiseRequest from "../../CustomiseRequest/CustomiseRequiest";
import { voters_customization_list, delete_customization } from "../Api";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";

const VotorsCustomization = () => {
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
  const [DeleteID, setDeleteId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    voters_customization_list(setIsLoading, setData);
  }, []);

  const handleDeleteCustomization = (cuzId) => {
    setDeleteId(cuzId);
    setDeleteConfirmationOpen(true);
    // delete_customization(setIsLoading, setData, cuzId);
  };
  const handleEditCustomization = () => {
    // edit_customization(setIsLoading, formData, setCutomizationList, userId);
  };
  const handleEyeClick = (id) => {
    setIsModalOpen(true);
    setUserId(id);
    // customization_details(setIsLoading, setCustomization, userId);
  };

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

  return (
    <div className="ParentVotors">
      <div className="votors_btns">
        <DesignBtn votersSetData={setData} />
      </div>
      <div className="VotorsCustomizationTable">
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
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>Outlet</th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Mobile number
                </th>
                <th style={{ borderRight: "0.5px solid #E7EDF4" }}>
                  Product type
                </th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index) => (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td>{item.created_at}</td>
                  <td>{item.customizationcode}</td>
                  <td>{item.outlet}</td>
                  <td>
                    <div className="view_password">{item.mobile_number}</div>
                  </td>
                  <td>{item.product_type}</td>
                  {/* <td>
                    <div className="active_sendmail">
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td> */}

                  <td style={{ position: "relative" }}>
                    <div className="status_votors">
                      {/* <button className="requested_btn">Requested</button> */}
                      <button className="updated_btn">{item.status}</button>
                      <IoEye
                        style={{
                          color: "#A7BED7",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEyeClick(item.id)}
                      />
                      <BsThreeDotsVertical
                        className="Action_dots"
                        onClick={() =>
                          setShowEditDelete(
                            showEditDelete === index ? null : index
                          )
                        }
                      />
                    </div>
                    {showEditDelete === index && (
                      <div ref={dropdownRef} className="Edit_delete_btn_user">
                        {/* <p
                          className="Edit_btn_user"
                          onClick={() => handleEditCustomization(item.id)}
                        >
                          Edit
                        </p> */}
                        <p
                          className="Delete_btn_user"
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
      </div>
      <CustomiseRequest
        open={IsModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        setData={setData}
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
    </div>
  );
};

export default VotorsCustomization;
