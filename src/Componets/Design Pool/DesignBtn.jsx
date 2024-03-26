import React, { useState } from "react";
import { TbDownload } from "react-icons/tb";
import { MdViewModule, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { RiFilter3Line } from "react-icons/ri";
import "./DesignPool.css";
import { Link, useLocation } from "react-router-dom";
import BasicDetailModal from "../BasicDetails/BasicDetailModal";

const DesignBtn = ({
  toggleDownloadOptions,
  selectButtonLabel,
  toggleRadioButtons,
  toggleMoveOptions,
  showDownloadOptions,
  showMoveOptions,
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="DesignPool_btns">
        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" && (
            <div className="Download_ParentD">
              <button className="D_downlodBtn" onClick={toggleDownloadOptions}>
                Download <TbDownload />
              </button>
              {showDownloadOptions && (
                <div className="Download_Sub">
                  <p>All</p>
                  <p>Selected</p>
                </div>
              )}
            </div>
          )}
        {location.pathname !== "/designdashboard" && (
          <button className="D_selectBtn" onClick={toggleRadioButtons}>
            {selectButtonLabel}
          </button>
        )}

        {location.pathname !== "/assignmentpanel" &&
          location.pathname !== "/designdashboard" && (
            <div className="Parent_MoveTo">
              <button className="D_moveBtn" onClick={toggleMoveOptions}>
                Move to <MdOutlineKeyboardArrowDown />
              </button>
              {showMoveOptions && (
                <div className="Sub_AssignmentPanel">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/assignmentpanel"
                  >
                    <p style={{ color: "#000" }}>Assignment panel</p>
                  </Link>
                </div>
              )}
            </div>
          )}
        {location.pathname === "/assignmentpanel" && (
          <div className="Parent_MoveTo">
            <button className="D_moveBtn" onClick={() => setIsModalOpen(true)}>
              Create folder
            </button>
          </div>
        )}

        <button className="D_View_Sort_Filter">
          <MdViewModule /> View
        </button>
        <button className="D_View_Sort_Filter">
          <LuArrowUpDown /> Sort
        </button>
        <button className="D_View_Sort_Filter">
          <RiFilter3Line /> Filter
        </button>
      </div>
      <BasicDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DesignBtn;
