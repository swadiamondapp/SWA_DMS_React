import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDetailView from "../../../Componets/DESIGNER PANEL/Designer Detail View/DesignerDetailView";
import { list_designer_folderDetails, list_designer_folderDetails_new } from "../../../Componets/DESIGNER PANEL/Designer Detail View/Api";

const DesignerAssignViewPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [folderDetails, setFolderDetails] = useState([])
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  useEffect(() => {
    list_designer_folderDetails_new(setIsLoading, setFolderDetails, id);
  }, [id]);

  return (
    <div className="DesignerDashboardPage">
      <Sidebar sidebarExpanded={sidebarExpanded}  setSidebarExpanded={ setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}  />
      <DesignerDetailView folderDetails={folderDetails} id={id} list_designer_folderDetails_new={()=>{list_designer_folderDetails_new(setIsLoading, setFolderDetails, id)}} sidebarExpanded={sidebarExpanded} setFolderDetails={setFolderDetails} onClearCall={()=>  list_designer_folderDetails_new(setIsLoading, setFolderDetails, id)}/>
    </div>
  );
};

export default DesignerAssignViewPage;
