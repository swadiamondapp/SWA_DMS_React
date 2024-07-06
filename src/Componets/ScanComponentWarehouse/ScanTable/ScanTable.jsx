import React, { useEffect, useState } from "react";
import "./ScanTable.css";
import searchimg from "../../../assets/search.png";
import ThreeDot from "../../../assets/three.png";
import ScanModal from "../ScanModal/ScanModal";
import { MenuItem, Select } from "@mui/material";
import {
  scan_list_datas,
  scan_list_search,
  scan_table_status_change,
  scan_table_status_get,
  // scan_table_status_change,
} from "../../../Pages/WareHousePageView/Api";
import { IoEye } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BiSolidUpArrow } from "react-icons/bi";

const ScanTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setstatus] = useState([]);
  const [searchListId, setsearchListId] = useState("");
  const [statusId, setstatusId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const [clickedProductId, setclickedProductId] = useState("");

  // console.log("iId",clickedProductId)

  const handleopenModal = (itemId) => {
    setclickedProductId(itemId);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    scan_list_datas(setIsLoading, setScanTableData);
    scan_table_status_get(setIsLoading, setstatus);
  }, []);

  const handleInputChange = (event) => {
    setsearchListId(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      await scan_list_search(
        setIsLoading,
        searchListId,
        setScanTableData,
        setsearchListId
      );
    } catch (error) {
      console.error("Error searching scan list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (slotId, selectedStatusId) => {
    setIsLoading(true);
    // console.log("getting id",slotId)
    try {
      await scan_table_status_change(slotId, selectedStatusId);
      await scan_list_datas(setIsLoading, setScanTableData);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("search id", searchListId);
  console.log("data", scanTableData);

  return (
    <div className="scantable_main">
      <div className="Search_Admin scan_search">
        <div className="Search_User">
          <input
            type="text"
            name="slot_id"
            placeholder="Scan Slot ID"
            value={searchListId}
            onChange={handleInputChange}
          />
          <img onClick={handleSearch} src={searchimg} alt="" />
        </div>
      </div>
      <div className="ScanTable">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ borderLeft: "none" }}>Sl No</th>
                <th>Created Date</th>
                <th style={{ width: "40%" }}>Slot ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scanTableData.map((item, index) => (
                <tr className="table_row">
                  <td style={{ borderLeft: "none" }}>{index + 1}</td>
                  <td style={{ borderLeft: "none" }}>{item.created_at}</td>
                  <td style={{ borderLeft: "none" }}>{item.slot.slotnumber}</td>

                  <td style={{ borderLeft: "none" }}>
                    <select
                      className="scan_select"
                      value={item?.slot?.status?.id}
                      onChange={(e) =>
                        handleStatusChange(item.slot.slot_id, e.target.value)
                      }
                    >
                      <option value="">Active</option>
                      {status.map((status) => (
                        <option
                          onChange={() => scan_table_status_change(status.id)}
                          key={status.id}
                          value={status.id}
                        >
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td style={{ borderLeft: "none" }}>
                    <div className="scan_btn_div">
                      <button
                        className="btn_scan"
                        onClick={() => handleopenModal(item.slot.slot_id)}
                      >
                        <IoEye className="btn_scan_img1" />
                      </button>
                      <button className="btn_scan">
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

      {openModal && (
        <ScanModal
          setOpenModal={setOpenModal}
          clickedProductId={clickedProductId}
        />
      )}
    </div>
  );
};

export default ScanTable;
