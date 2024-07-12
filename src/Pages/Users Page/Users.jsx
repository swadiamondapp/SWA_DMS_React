import React,{useState} from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import UsersList from "../../Componets/ADMIN PANEL/Users/UsersList";
import "./Users.css";

const Users = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="Parent_Userlist">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <UsersList sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default Users;
