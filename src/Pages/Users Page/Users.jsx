import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import UsersList from "../../Componets/Users/UsersList";
import "./Users.css";
import { useLocation } from "react-router-dom";

const Users = () => {
  return (
    <div className="Parent_Userlist">
      <Sidebar />
      <Header />
      <UsersList />
    </div>
  );
};

export default Users;
