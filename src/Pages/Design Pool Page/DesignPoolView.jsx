import React, { useEffect, useState } from "react";
import "./DesignPoolView.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import DesignPool from "../../Componets/ADMIN PANEL/Design Pool/DesignPool";
import {
  all_Designs,
  designPoolSearchById,
} from "../../Componets/ADMIN PANEL/Design Pool/Api";

const DesignPoolView = () => {

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [Data, setData] = useState([]);
  const [searchListId, setsearchListId] = useState("");

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value.toUpperCase());

    await designPoolSearchById(value.toUpperCase(), setData);
  };


  console.log(searchListId, "searchListId");

  return (
    <div className="Parent_DesignPoolPage">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header
        sidebarExpanded={sidebarExpanded}
        searchListId={searchListId}
        handleInputChange={handleInputChange}
      />
      <DesignPool
        sidebarExpanded={sidebarExpanded}
        setData={setData}
        Data={Data}
      />
    </div>
  );
};

export default DesignPoolView;

// const handleInputChange = (event) => {
//   const value = event.target.value;
//   setsearchListId(value.toUpperCase());

//   if (searchListId === "") {
//     console.log("Search field is empty");
//     useEffect(()=>{
//       all_Designs( searchListId,setData);
//     },[searchListId])
//   }
// };

// const handleSearchDesignPoool = () => {
//   designPoolSearchById( searchListId,setData);
// };
