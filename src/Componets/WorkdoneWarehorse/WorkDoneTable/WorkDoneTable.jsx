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

const WorkDoneTable = () => {
  const [open, setOpen] = useState(false);
  const [openLeftbar, setOpenLeftbar] = useState(false);
  const [workTableData, setworkTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchListId, setsearchListId] = useState("");
  const [clickedProductId, setclickedProductId] = useState("");

  useEffect(() => {
    workDone_list_datas(setIsLoading, setworkTableData);
  }, []);

  const handleInputChange = (event) => {
    setsearchListId(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      await workDone_list_search(
        setIsLoading,
        searchListId,
        setworkTableData,
        setsearchListId
      );
    } catch (error) {
      console.error("Error searching scan list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("workTableData", clickedProductId);

  const openModal = (productId) => {
    setclickedProductId(productId);
    setOpen(true);
  };

  const handleopenLeftBar = (productId) => {
    setclickedProductId(productId);
    setOpenLeftbar(true);
  };

  return (
    <div className="scantable_main">
      <div className="Search_Admin scan_search">
        <div className="Search_User">
          <input
            type="text"
            name="slot_id"
            placeholder="Scan Product ID"
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
                  <td style={{ borderLeft: "none" }}>{item.created_at}</td>
                  <td style={{ borderLeft: "none" }}>{item.productID}</td>

                  <td style={{ borderLeft: "none" }}>
                    <div className="completed_wd"> completed</div>
                  </td>

                  <td style={{ borderLeft: "none" }}>
                    <div className="scan_btn_div">
                      <button
                        className="btn_scan"
                        onClick={() => handleopenLeftBar(item.id)}
                      >
                        <AiOutlineEdit
                          style={{ color: "#0464D5" }}
                          className="btn_scan_img1"
                        />{" "}
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => openModal(item.id)}
                        className="btn_scan"
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

      {open && (
        <WorkDoneModal clickedProductId={clickedProductId} setOpen={setOpen} />
      )}
      {openLeftbar && (
        <WorkdoneEditModal
          setOpenLeftbar={setOpenLeftbar}
          clickedProductId={clickedProductId}
        />
      )}
    </div>
  );
};

export default WorkDoneTable;
