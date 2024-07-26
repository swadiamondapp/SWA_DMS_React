import React, { useEffect, useState } from "react";
import "./ScanTable.css";
import searchimg from "../../../assets/search.png";
import ThreeDot from "../../../assets/three.png";
import ScanModal from "../ScanModal/ScanModal";
import searchblue from "../../../assets/bluesearch.png";
import { MenuItem, Select } from "@mui/material";
import {
  scan_list_datas,
  scan_list_search,
  scan_table_status_change,
  scan_table_status_get,
  scanSearchFilter,
  // scan_table_status_change,
} from "../../../Pages/WareHousePageView/Api";
import { IoEye } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BiSolidUpArrow } from "react-icons/bi";

const ScanTable = ({ sidebarExpanded}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scanTableData, setScanTableData] = useState([]);
  const [status, setstatus] = useState([]);
  const [searchListId, setsearchListId] = useState("");
  const [statusId, setstatusId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [clickedProductId, setclickedProductId] = useState("");
  const [filterSearchId, setFilterSearchId] = useState("");

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
    setsearchListId(event.target.value.toUpperCase());
  };

  const handleSearch = async () => {
    setIsLoading(true);
    if(searchListId === ""){
      setError("Enter slot ID")
      setTimeout(() => {
        setError("");
      }, 3000);
    }else{
    try {
      await scan_list_search(
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

  // const handleFilterSearch = (event) => {
  //   const { value } = event.target;
  //   setFilterSearchId(value);
  //   scanSearchFilter(
  //     filterSearchId,
  //     setScanTableData,
  //     setFilterSearchId
  //   );
  // };

  const handleFilterSearch = async (event) => {
    const { value } = event.target;
    setFilterSearchId(value.toUpperCase()); 

    await scanSearchFilter(value.toUpperCase(), setScanTableData);
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  console.log("search id", searchListId);
  console.log("data", scanTableData);

  return (
       <div className="scantable_main"  style={{ marginLeft: sidebarExpanded ? "225px" : "130px" }}>
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

          <div className="secton_search" style={{flexDirection:"column",alignItems:"start"}}>
          <div className="Search_User">
          <input
            type="text"
            name="slot_id"
            placeholder="Scan Product ID"
            value={searchListId}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <img onClick={handleSearch} src={searchimg} alt="" />
        </div>
        {error && <span style={{color:"red",fontSize:"10px"}}>{error}</span>}
          </div>
          </div>
      
      <div className="ScanTable">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ borderLeft: "none" }}>Sl No</th>
                <th>Created Date</th>
                <th style={{ width: "40%" }}>Product ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scanTableData.map((item, index) => (
                <tr className="table_row">
                  <td style={{ borderLeft: "none" }}>{index + 1}</td>
                  <td style={{ borderLeft: "none" }}>{formatDate(item.created_at)}</td>
                  <td style={{ borderLeft: "none" }}>{item.finisheditem.designcode}</td>

                  <td style={{ borderLeft: "none" }}>
                    {/* <select
                      className="scan_select"
                      value={item?.slot?.status?.id}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
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
                    </select> */}
                    {/* <span className="scan_select_span">{item.status}</span> */}
                    <span className="scan_select_span">Recived</span>
                  </td>

                  <td style={{ borderLeft: "none" }}>
                    <div className="scan_btn_div">
                      {/* <button
                        className="btn_scan"
                        onClick={() => handleopenModal(item.finisheditem.finisheditem_id)}
                      >
                        <IoEye className="btn_scan_img1" />
                      </button> */}
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
      {scanTableData.length === 0 && (
              <div className="" style={{width:"100%",height:"200px",display:"flex",alignItems:"center",justifyContent:"center"}}>

                <span>No Data Found</span>
              </div>
            )}

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
