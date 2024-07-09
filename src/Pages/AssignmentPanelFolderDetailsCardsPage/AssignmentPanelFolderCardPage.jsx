import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { list_designer_folderDetails } from "../../Componets/DESIGNER PANEL/Designer Detail View/Api";
import AssignmentPanelFolderCards from "../../Componets/Assignment Panel/AssignmentPanelFolderCards";

const DesignerAssignViewPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [folderDetails, setFolderDetails] = useState([])

  useEffect(() => {
    list_designer_folderDetails(setIsLoading, setFolderDetails, id);
  }, []);

  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header />
      <AssignmentPanelFolderCards folderDetails={folderDetails} id={id} />
    </div>
  );
};

export default DesignerAssignViewPage;
