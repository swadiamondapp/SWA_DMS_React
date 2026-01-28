import React, { useEffect, useState } from "react";
import searchimg from "../../../assets/search.png";
import ThreeDot from "../../../assets/three.png";
// import ScanModal from "../ScanModal/ScanModal";
import { IoEye } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import WorkDoneModal from "../WorkDoneModal/WorkDoneModal";
import WorkdoneEditModal from "../WorkdoneEditModal/WorkdoneEditModal";
import {
  workDone_list_datas,
  workDone_list_search,
} from "../../../Pages/WareHousePageView/Api";
import SuccessModal from "../../SuccessModal/SuccessModal";
import ComingSoon from "../../VOTORS PANEL/Votors Panel/ComingSoon";

const WorkDoneTable = ({ sidebarExpanded }) => {
  const [open, setOpen] = useState(false);
  const [openLeftbar, setOpenLeftbar] = useState(false);
  const [workTableData, setworkTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchListId, setsearchListId] = useState("");
  const [clickedProductId, setclickedProductId] = useState("");
  const [error, setError] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    workDone_list_datas(setIsLoading, setworkTableData);
  }, []);

  const handleInputChange = (event) => {
    setsearchListId(event.target.value.toUpperCase());
  };

  const handleSearch = async () => {
    if (searchListId === "") {
      setError("Enter a Product Id");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    try {
      await workDone_list_search(
        setIsLoading,
        searchListId,
        setworkTableData,
        setsearchListId,
        setError,
        setSuccessModalOpen,
        setSuccessMessage
      );
    } catch (error) {
      console.error("Error searching scan list:", error);
    }
  };

  console.log("workTableData", workTableData);

  const openModal = (productId) => {
    setclickedProductId(productId);
    setOpen(true);
  };

  const handleopenLeftBar = (productId) => {
    setclickedProductId(productId);
    setOpenLeftbar(true);
  };

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
const [showModal, setShowModal] = useState(false);

useEffect(() => {
  setShowModal(true); // opens whenever component renders
}, []);
  console.log("eroor", error);
  return (
     <div className={`ParentVotors ${showModal ? "page_blurred" : ""}`} style={{width:"100%"}}>
    <div
      className="scan_wrap"
      style={{
        marginLeft: sidebarExpanded ? "225px" : "130px"
      }}
    >
      <div className="Search_Admin scan_search">
        <div className="Search_User">
          <input
            type="text"
            name="slot_id"
            placeholder="Scan Product ID"
            value={searchListId}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <img
            onClick={handleSearch}
            src={searchimg}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
        {error && (
          <p style={{ color: "red", fontSize: "10px", marginTop: "3px" }}>
            {error}
          </p>
        )}
      </div>
      <div className="ScanTable">
        <div className="table-container" style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th style={{ borderLeft: "none" }}>Sl No</th>
                <th>Completed Date</th>
                <th style={{ width: "40%" }}>Product ID</th>
                <th>Status</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {workTableData.map((item, index) => (
                <tr className="table_row">
                  <td style={{ borderLeft: "none" }}>{index + 1}</td>
                  <td style={{ borderLeft: "none" }}>
                    {formatDate(item.created_at)}
                  </td>
                  <td style={{ borderLeft: "none" }}>{item.productID}</td>

                  <td style={{ borderLeft: "none" }}>
                    <div
                      className="completed_wd"
                      style={{
                        backgroundColor:
                          item.status === "pending" ? "red" : "green",
                      }}
                    >
                      {item.status}
                    </div>
                  </td>

                  <td style={{ borderLeft: "none" }}>
                    <div
                      className="scan_btn_div"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn_scan1"
                        onClick={() => handleopenLeftBar(item.id)}
                      >
                        <AiOutlineEdit
                          style={{ color: "#0464D5" }}
                          className="btn_scan_img1"
                        />{" "}
                        <span style={{ color: "#216CD8" }}>Edit Details</span>
                      </button>
                      <button
                        onClick={() => openModal(item.id)}
                        className="btn_scan1"
                      >
                        <IoEye className="btn_scan_img1" />
                      </button>
                      <button className="btn_scan1">
                        <img
                          className="btn_scan_img2"
                          src={ThreeDot}
                          alt=""
                          srcset=""
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {workTableData.length === 0 && (
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>No Data Found</span>
        </div>
      )}

      {open && (
        <WorkDoneModal clickedProductId={clickedProductId} setOpen={setOpen} />
      )}
      {openLeftbar && (
        <WorkdoneEditModal
          setOpenLeftbar={setOpenLeftbar}
          clickedProductId={clickedProductId}
          setSuccessMessage={setSuccessMessage}
          setSuccessModalOpen={setSuccessModalOpen}
          refreshList={() =>
            workDone_list_datas(setIsLoading, setworkTableData)
          }
        />
      )}

      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
    </div>
       <ComingSoon
      open={showModal}
      onClose={() => setShowModal(false)}
      title="Photo Coming Soon 📸"
      description="High-quality product photos will be available shortly."
    />
    </div>
  );
};

export default WorkDoneTable;
