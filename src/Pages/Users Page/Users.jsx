import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import UsersList from "../../Componets/ADMIN PANEL/Users/UsersList";
import "./Users.css";

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
