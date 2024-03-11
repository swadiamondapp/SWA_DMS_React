import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import UsersList from "../../Componets/Users/UsersList";

const Users = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Sidebar />
      <Header />
      <UsersList />
    </div>
  );
};

export default Users;
