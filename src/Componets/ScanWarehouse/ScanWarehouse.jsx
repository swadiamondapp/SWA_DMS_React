import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import searchimg from "../../assets/search.png";
import searchblue from "../../assets/bluesearch.png";
import dlt from "../../assets/deleticon.png";
import scan from "../../assets/scan.png";
import "./ScanWarehouse.css";
import ScanModal from "../ScanComponentWarehouse/ScanModal/ScanModal";
import MastersModal from "../MastersSection/MastersModal/MastersModal";
import { centralStatusTableData } from "../MastersSection/ApiMasters/ApiMasters";

const ScanWarehouse = ({ sidebarExpanded }) => {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setstatus] = useState([]);
  const [searchListId, setsearchListId] = useState("");
  const [statusId, setstatusId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [clickedProductId, setclickedProductId] = useState("");
  const [inputData, setInputData] = useState([]);

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    centralStatusTableData(setstatus)
  },[])
 
  console.log("ch status",status)

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
              // value={searchListId}
              // onChange={handleInputChange}
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
                  //   value={searchListId}
                  //   onChange={handleInputChange}
                />
                <img src={searchimg} alt="" />
              </div>
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
                    <input type="checkbox" />
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
                {/* {scanTableData.map((item, index) => ( */}
                <tr className="table_row">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td style={{ borderLeft: "none" }}>1</td>
                  <td style={{ borderLeft: "none" }}>SWA234</td>
                  <td style={{ borderLeft: "none" }}>23-03-24</td>
                  <td style={{ borderLeft: "none" }}>Bangle</td>
                  <td style={{ borderLeft: "none" }}>Status name here</td>
                  <td style={{ borderLeft: "none" }}>8.GM</td>
                  <td style={{ borderLeft: "none" }}>
                    <img style={{ width: "16px", height: "20px" }} src={dlt} />
                  </td>
                </tr>
                {/* //   ))} */}
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
