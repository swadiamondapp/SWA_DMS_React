import React from "react";
import "./WorkDone.css";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import WorkDoneTable from "../WorkDoneTable/WorkDoneTable";

const WorkDone = () => {
  return (
    <div className="WorkDone">
      <Sidebar />
      <Header />
      <WorkDoneTable />
    </div>
  );
};

export default WorkDone;
