// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../../Componets/Sidebar/Sidebar";
// import Header from "../../Componets/Header/Header";
// import { list_designer_folderDetails } from "../../Componets/DESIGNER PANEL/Designer Detail View/Api";
// import AssignmentPanelFolderCards from "../../Componets/Assignment Panel/AssignmentPanelFolderCards";
// import RendersDetailPage from "../../Componets/Renders/RendersDetailPage/RendersDetailPage";

// const DesignerAssignViewPage = () => {
//   const { id } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [folderDetails, setFolderDetails] = useState([]);
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);

//   useEffect(() => {
//     list_designer_folderDetails(setIsLoading, setFolderDetails, id);
//   }, []);

//   return (
//     <div className="DesignerDashboardPage">
//       <Sidebar />
//       <Header folderDetails={folderDetails} />
//       <Sidebar
//         sidebarExpanded={sidebarExpanded}
//         setSidebarExpanded={setSidebarExpanded}
//       />
//       <Header folderDetails={folderDetails} sidebarExpanded={sidebarExpanded} />
//       {/* <AssignmentPanelFolderCards
//         folderDetails={folderDetails}
//         id={id}
//         sidebarExpanded={sidebarExpanded}
//       /> */}
//       <RendersDetailPage folderDetails={folderDetails} />
//     </div>
//   );
// };

// export default DesignerAssignViewPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { list_designer_folderDetails } from "../../Componets/DESIGNER PANEL/Designer Detail View/Api";
import AssignmentPanelFolderCards from "../../Componets/Assignment Panel/AssignmentPanelFolderCards";
import RendersDetailPage from "../../Componets/Renders/RendersDetailPage/RendersDetailPage";

const DesignerAssignViewPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [folderDetails, setFolderDetails] = useState([]);

  useEffect(() => {
    list_designer_folderDetails(setIsLoading, setFolderDetails, id);
  }, []);

  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header folderDetails={folderDetails} />
      {/* <AssignmentPanelFolderCards folderDetails={folderDetails} id={id} /> */}
      <RendersDetailPage folderDetails={folderDetails} />
    </div>
  );
};

export default DesignerAssignViewPage;
