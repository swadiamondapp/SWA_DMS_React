import React ,{useState} from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import Chat from "../../Componets/Chat/Chat";
import "./ChatPage.css";

const ChatPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="Parent_ChatPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded} />
      <Chat   sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default ChatPage;
