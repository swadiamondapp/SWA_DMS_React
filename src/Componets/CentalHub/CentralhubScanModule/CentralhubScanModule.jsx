import React, { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import MastersModal from "../../MastersSection/MastersModal/MastersModal";
import {
  CentralHubnewScanProductScan,
  centralhubScanItemDelete,
  centralhubScanSearchFilter,
  centralHubScanTable,
  newScanProductScan,
  warehoueScanTable,
} from "../../ScanComponentWarehouse/ApiScan/ApiScan";
import {
  centralStatusTableData,
  whstatusTableData,
} from "../../MastersSection/ApiMasters/ApiMasters";
import searchimg from "../../../assets/search.png";
import searchblue from "../../../assets/bluesearch.png";
import dlt from "../../../assets/deleticon.png";
import scan from "../../../assets/scan.png";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";

const CentralhubScanModule = ({ sidebarExpanded }) => {
  const [open, setOpen] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");
  const [clickedProductIds, setClickedProductIds] = useState([]);
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [searchListId, setsearchListId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    centralStatusTableData(setStatus, setIsLoading);
    centralHubScanTable( setScanTableData);
  }, []);

  const openModal = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = (productId) => {
    if (clickedProductIds.includes(productId)) {
      setClickedProductIds(clickedProductIds.filter((id) => id !== productId));
    } else {
      setClickedProductIds([...clickedProductIds, productId]);
    }
  };

  const handleHeaderCheckboxChange = () => {
    const allProductIds = scanTableData.map((item) => item.id);
    if (clickedProductIds.length === allProductIds.length) {
      setClickedProductIds([]);
    } else {
      setClickedProductIds(allProductIds);
    }
  };

  const handleDeleteOpen = (pId) => {
    setDeleteConfirmationOpen(true);
    setDeleteId(pId);
  };

  const handleInputChange = (event) => {
    setsearchListId(event.target.value.toUpperCase());
  };

  const handleSearch = async () => {
    setIsLoading(true);
    if (searchListId === "") {
      setError("Enter Product ID");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        await CentralHubnewScanProductScan(
          setIsLoading,
          searchListId,
          setScanTableData,
          setsearchListId,
          setError,
          setSuccessModalOpen,
          setSuccessMessage,
          setTimeout(() => {
            setError("");
          }, 3000)
        );
      } catch (error) {
        console.error("Error searching scan list:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [filterSearchId, setFilterSearchId] = useState("");

  const handleFilterSearch = async (event) => {
    const { value } = event.target;
    setFilterSearchId(value.toUpperCase());

    await centralhubScanSearchFilter(value.toUpperCase(), setScanTableData);
  };

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  console.log(scanTableData,"scanTableData")

  return (
    <>
      <div
        className="scantable_main"
        style={{ marginLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="scantable_main_search">
          <div className="Search_User">
            <input
              className="searchblue_border"
              type="text"
              name="slot_id"
              placeholder="Search"
              value={filterSearchId}
              onChange={handleFilterSearch}
            />
            <img className="searchblue" src={searchblue} alt="" />
          </div>
          {/* {error && (
              <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
            )} */}

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <img
                  style={{
                    width: "16px",
                    height: "15px",
                    position: "absolute",
                    left: "15px",
                    top: "30%",
                  }}
                  src={scan}
                  alt=""
                />
                <input
                  style={{ paddingLeft: "40px" }}
                  type="text"
                  placeholder="Scan Product ID"
                  value={searchListId}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <img onClick={handleSearch} src={searchimg} alt="" style={{cursor:"pointer"}}/>
              </div>
              {error && (
                <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
              )}
            </div>
            <div className="Create_user">
              <button
                disabled={clickedProductIds.length === 0}
                onClick={openModal}
              >
                Change CH Status
              </button>
            </div>
          </div>
        </div>
        <div className="ScanTable">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ borderLeft: "none" }}>
                    <input
                    style={{cursor:"pointer"}}
                      type="checkbox"
                      onChange={handleHeaderCheckboxChange}
                      checked={
                        scanTableData.length > 0 &&
                        clickedProductIds.length === scanTableData.length
                      }
                    />
                  </th>
                  <th style={{ borderLeft: "none" }}>Sl No</th>
                  <th style={{ borderLeft: "none" }}>Product ID</th>
                  <th style={{ width: "40%", borderLeft: "none" }}>
                    Created Date
                  </th>
                  <th style={{ borderLeft: "none" }}>Product Category</th>
                  <th style={{ borderLeft: "none" }}>Status</th>
                  <th style={{ borderLeft: "none" }}>Weight</th>
                  <th style={{ borderLeft: "none" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {scanTableData  && scanTableData?.map((item, index) => (
                  <tr key={item.id} className="table_row">
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item.id)}
                        checked={clickedProductIds.includes(item.id)}
                      />
                    </td>
                    <td style={{ borderLeft: "none" }}>{index + 1}</td>
                    <td style={{ borderLeft: "none" }}>
                      {item.Productdetails?.designcode}
                    </td>
                    <td style={{ borderLeft: "none" }}>
                      {formatDate(item.created_at)}
                    </td>
                    <td style={{ borderLeft: "none" }}>
                      {item.Productdetails.product_category}
                    </td>
                    <td style={{ borderLeft: "none" }}>{item.status}</td>
                    <td style={{ borderLeft: "none" }}>
                      {item.Productdetails.approx_metal_weight} GM
                    </td>
                    <td style={{ borderLeft: "none" }}>
                      <img
                        onClick={() => handleDeleteOpen(item.id)}
                        style={{ width: "16px", height: "20px" }}
                        src={dlt}
                        alt="Delete"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  // filter={filter}
                  // setFilter={setFilter}
                  size={50}
                  sx={{
                    color: "#126e72",
                    padding: "8px 10px",
                    width: "35px",
                  }}
                />
              </div>
            )}

            {!isLoading && scanTableData.length === 0 && (
              <div
                className=""
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
          </div>
          <SuccessModal
            successModalOpen={successModalOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            successMessage={successMessage}
          />
        </div>

        {open && (
          <MastersModal
            modalHeading="Status"
            btnName="Add Finding"
            modalPage="centralhubscan"
            openModal={openModal}
            setOpen={setOpen}
            status={status}
            clickedProductIds={clickedProductIds}
            setScanTableData={setScanTableData}
            setSuccessModalOpen={setSuccessModalOpen}
            setSuccessMessage={setSuccessMessage}
            setClickedProductIds={setClickedProductIds}
          />
        )}
      </div>

      {DeleteConfirmationOpen && (
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          deleteFunction={() => {
            centralhubScanItemDelete(
              setScanTableData,
              deleteId,
              setDeleteConfirmationOpen,
              setSuccessMessage,
              setSuccessModalOpen
            );
          }}
        />
      )}
    </>
  );
};

export default CentralhubScanModule;
