import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDetailView from "../../../Componets/DESIGNER PANEL/Designer Detail View/DesignerDetailView";
import { list_designer_folderDetails } from "../../../Componets/DESIGNER PANEL/Designer Detail View/Api";

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
      <DesignerDetailView folderDetails={folderDetails} id={id} list_designer_folderDetails={()=>{list_designer_folderDetails(setIsLoading, setFolderDetails, id)}}/>
    </div>
  );
};

export default DesignerAssignViewPage;
