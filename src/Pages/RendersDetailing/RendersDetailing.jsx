import React, { useEffect, useState } from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import RendersDetailPage from "../../Componets/Renders/RendersDetailPage/RendersDetailPage";
import { useParams } from "react-router-dom";
import { renderFolderDetails } from "../../Componets/DESIGNER PANEL/Designer Detail View/Api";
import Header from "../../Componets/Header/Header";

const RendersDetailing = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [folderDetails, setFolderDetails] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    renderFolderDetails(setIsLoading, setFolderDetails, id);
  }, []);

  return (
    <div className="DesignerDashboardPage">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} folderDetails={folderDetails} />
      {/* <AssignmentPanelFolderCards folderDetails={folderDetails} id={id} /> */}
      <RendersDetailPage
        folderDetails={folderDetails}
        sidebarExpanded={sidebarExpanded}
      />
    </div>
  );
};

export default RendersDetailing;
