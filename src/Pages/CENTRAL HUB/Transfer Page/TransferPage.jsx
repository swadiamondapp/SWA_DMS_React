import React ,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Transfer from "../../../Componets/CENTRAL HUB/Transfer/Transfer";

const TransferPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="centralhubDashboard">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} />

      <Transfer sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default TransferPage;
