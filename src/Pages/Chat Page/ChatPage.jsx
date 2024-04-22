import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import Chat from "../../Componets/Chat/Chat";
import "./ChatPage.css";

const ChatPage = () => {
  return (
    <div className="Parent_ChatPage">
      <Sidebar />
      <Header />
      <Chat />
    </div>
  );
};

export default ChatPage;
