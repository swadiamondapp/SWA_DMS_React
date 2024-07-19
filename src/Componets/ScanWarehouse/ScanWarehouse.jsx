import React, { useEffect, useState } from "react";
import searchimg from "../../assets/search.png";
import searchblue from "../../assets/bluesearch.png";
import dlt from "../../assets/deleticon.png";
import scan from "../../assets/scan.png";
import "./ScanWarehouse.css";
import MastersModal from "../MastersSection/MastersModal/MastersModal";
import { whstatusTableData } from "../MastersSection/ApiMasters/ApiMasters";
import { warehoueScanTable } from "../ScanComponentWarehouse/ApiScan/ApiScan";

const ScanWarehouse = ({ sidebarExpanded }) => {
  const [open, setOpen] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");
  const [clickedProductIds, setClickedProductIds] = useState([]);

  useEffect(() => {
    whstatusTableData(setStatus);
    warehoueScanTable(setScanTableData);
  }, []);

  const openModal = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = (productId) => {
    if (clickedProductIds.includes(productId)) {
      setClickedProductIds(clickedProductIds.filter(id => id !== productId));
    } else {
      setClickedProductIds([...clickedProductIds, productId]);
    }
  };

  const handleHeaderCheckboxChange = () => {
    const allProductIds = scanTableData.map(item => item.productId);
    if (clickedProductIds.length === allProductIds.length) {
      setClickedProductIds([]);
    } else {
      setClickedProductIds(allProductIds);
    }
  };

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
          {error && (
            <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
          )}

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
                />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Change WH Status</button>
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
                      checked={clickedProductIds.length === scanTableData.length}
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
                  <tr key={item.productId} className="table_row">
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item.productId)}
                        checked={clickedProductIds.includes(item.productId)}
                      />
                    </td>
                    <td style={{ borderLeft: "none" }}>{index + 1}</td>
                    <td style={{ borderLeft: "none" }}>{item.productId}</td>
                    <td style={{ borderLeft: "none" }}>{item.createdDate}</td>
                    <td style={{ borderLeft: "none" }}>{item.productCategory}</td>
                    <td style={{ borderLeft: "none" }}>{item.status}</td>
                    <td style={{ borderLeft: "none" }}>{item.weight}</td>
                    <td style={{ borderLeft: "none" }}>
                      <img
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
            modalPage="newscanmodule"
            openModal={openModal}
            setOpen={setOpen}
            inputData={inputData}
            status={status}
          />
        )}
      </div>
    </>
  );
};

export default ScanWarehouse;
