import React, { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import MastersModal from "../../MastersSection/MastersModal/MastersModal";
import {
  CentralHubnewScanProductScan,
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

const CentralhubScanModule = ({ sidebarExpanded }) => {
  const [open, setOpen] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");
  const [clickedProductIds, setClickedProductIds] = useState([]);
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [searchListId, setsearchListId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    centralStatusTableData(setStatus);
    centralHubScanTable(setScanTableData);
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
      setError("Enter slot ID");
    } else {
      try {
        await CentralHubnewScanProductScan(
          setIsLoading,
          searchListId,
          setScanTableData,
          setsearchListId,
          setError
        );
      } catch (error) {
        console.error("Error searching scan list:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log("central hub scanTableData", scanTableData);
  console.log("clickedProductIds", clickedProductIds);

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
                />
                <img onClick={handleSearch} src={searchimg} alt="" />
              </div>
              {error && (
                <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
              )}
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Change CH Status</button>
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
                      type="checkbox"
                      onChange={handleHeaderCheckboxChange}
                      checked={
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
                {scanTableData.map((item, index) => (
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
                    <td style={{ borderLeft: "none" }}>{item.created_at}</td>
                    <td style={{ borderLeft: "none" }}>
                      {item.Productdetails.product_category}
                    </td>
                    <td style={{ borderLeft: "none" }}>
                      {item.Productdetails.status}
                    </td>
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
          </div>
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
          />
        )}
      </div>

      {DeleteConfirmationOpen && (
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          // deleteFunction={() => {
          //   delete_finding_data(
          //     setTableData,
          //     deleteId,
          //     setDeleteConfirmationOpen,
          //     setSuccessMessage,
          //     setSuccessModalOpen
          //   );
          // }}
        />
      )}
    </>
  );
};

export default CentralhubScanModule;
