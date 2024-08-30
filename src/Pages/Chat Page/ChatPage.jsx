import React ,{useContext, useState} from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import Chat from "../../Componets/Chat/Chat";
import "./ChatPage.css";
import { ContextTime } from "../CAD PANAL/TimerContext";
import { cadLogut } from "../../Componets/CAD/Api";

const ChatPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  const {cadTime , setCadTime} = useContext(ContextTime)

  const handleCADLogout =()=>{
    cadLogut(cadTime)
  }
 

  return (
    <div className="Parent_ChatPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded} handleCADLogout={handleCADLogout}/>
      <Chat   sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default ChatPage;
