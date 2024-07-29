import React, { useEffect, useState } from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import UsersList from "../../Componets/ADMIN PANEL/Users/UsersList";
import "./Users.css";
import { searchNamesAdmin } from "./Api";
import { list_all_users } from "../../Componets/ADMIN PANEL/Users/Api";

const Users = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [SearchWithName, setSearchWithName] = useState("");
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  console.log(SearchWithName, "nameSarchsss");
  useEffect(() => {
    searchNamesAdmin(setIsLoading, setUserList, SearchWithName);
  }, [SearchWithName]);
  useEffect(() => {
    list_all_users(setIsLoading, setUserList);
  }, []);

  const SearchedNamesGet = Data.filter((item) =>
    item.name.toLowerCase().includes(SearchWithName.toLowerCase())
  );
  console.log(Data, "searchedData");
  return (
    <div className="Parent_Userlist">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header
        sidebarExpanded={sidebarExpanded}
        setSearchWithName={setSearchWithName}
      />
      <UsersList
        sidebarExpanded={sidebarExpanded}
        SearchedNamesGet={SearchedNamesGet}
        userList={userList}
        setUserList={setUserList}
        IsLoading={IsLoading}
      />
    </div>
  );
};

export default Users;
