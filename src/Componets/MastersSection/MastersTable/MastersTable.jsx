import React from "react";
import "./MastersTable.css";
import searchimg from "../../../assets/search.png";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import { Link, Outlet, useLocation } from "react-router-dom";

const MastersTable = () => {
  const location = useLocation();

  return (
    <>
      <div className="MastersTable">
        <div className="table_header">
          <Link to="/masterspage/findings">
            <h3
              className={
                location.pathname === "/masterspage/findings" ? "active" : ""
              }
            >
              Findings
            </h3>
          </Link>
          <Link to="/masterspage/tag">
            <h3
              className={
                location.pathname === "/masterspage/tag" ? "active" : ""
              }
            >
              Tags
            </h3>
          </Link>
          <Link to="/masterspage/metal">
            <h3
              className={
                location.pathname === "/masterspage/metal" ? "active" : ""
              }
            >
              Metal type
            </h3>
          </Link>
          <Link to="/masterspage/diamond">
            <h3
              className={
                location.pathname === "/masterspage/diamond" ? "active" : ""
              }
            >
              Diamond type
            </h3>
          </Link>
          <Link to="/masterspage/valueedition">
            <h3
              className={
                location.pathname === "/masterspage/valueedition"
                  ? "active"
                  : ""
              }
            >
              Value addition master
            </h3>
          </Link>
          <Link to="/masterspage/whstatus">
            <h3
              className={
                location.pathname === "/masterspage/whstatus" ? "active" : ""
              }
            >
              Warehouse status
            </h3>
          </Link>
          <Link to="/masterspage/chstatus">
            <h3
              className={
                location.pathname === "/masterspage/chstatus" ? "active" : ""
              }
            >
              Central hub status
            </h3>
          </Link>
          <Link to="/masterspage/productcategory">
            <h3
              className={
                location.pathname === "/masterspage/productcategory"
                  ? "active"
                  : ""
              }
            >
              Product Category{" "}
            </h3>
          </Link>
          <Link to="/masterspage/outlet">
            <h3
              className={
                location.pathname === "/masterspage/outlet" ? "active" : ""
              }
            >
              Outlet  
            </h3>
          </Link>
        </div>

        <div className="masetrs_section">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MastersTable;
