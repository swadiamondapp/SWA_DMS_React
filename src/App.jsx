import React from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Componets/Login/Login";
import Users from "./Pages/Users Page/Users";
import OtherLoginPage from "./Pages/Other Login Page/OtherLoginPage";
import AssignmentViewPage from "./Pages/Assignment Folder View/AssignmentViewPage";
import DesignPoolView from "./Pages/Design Pool Page/DesignPoolView";
import AssignmentPanalPage from "./Pages/Assignment Panel View/AssignmentPanalPage";
import ChatPage from "./Pages/Chat Page/ChatPage";
import DesignerDashboardPage from "./Pages/DESIGNER PANEL/DesignerDashboad Page/DesignerDashboardPage";
import DesignerAsignmentPanelPage from "./Pages/DESIGNER PANEL/Designer Assignment Panel Page/DesignerAsignmentPanelPage";
import DesignerAssignViewPage from "./Pages/DESIGNER PANEL/Designer Assignview Page/DesignerAssignViewPage";
import CustomizedOrderPage from "./Pages/DESIGNER PANEL/Customized Order Page/CustomizedOrderPage";
import VotorsPanalPage from "./Pages/VOTORS PANAL/Votors Panal Page/VotorsPanalPage";
import VotorCustomization from "./Pages/VOTORS PANAL/Votors Customization Page/VotorCustomization";
import GalleryPage from "./Pages/VOTORS PANAL/Gallery Page/GalleryPage";
import CadAssignmentPage from "./Pages/CAD PANAL/Cad Assignment Page/CadAssignmentPage";
import CadAssignmentCardPage from "./Pages/CAD PANAL/Cad AssignmentCard Page/CadAssignmentCardPage";
import FinishedProductsPage from "./Pages/CAD PANAL/Finished Products Page/FinishedProductsPage";
import CentralHubDashboard from "./Pages/CENTRAL HUB/Central Hub dashboard Page/CentralHubDashboard";
import HubSlot from "./Pages/CENTRAL HUB/Central Hub Slot/HubSlot";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/otherlogin" element={<OtherLoginPage />} />
          <Route path="/assignmentview" element={<AssignmentViewPage />} />
          <Route path="/designpool" element={<DesignPoolView />} />
          <Route path="/assignmentpanel" element={<AssignmentPanalPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/designdashboard" element={<DesignerDashboardPage />} />
          <Route
            path="/designerassign"
            element={<DesignerAsignmentPanelPage />}
          />
          <Route
            path="/designerassignview"
            element={<DesignerAssignViewPage />}
          />
          <Route path="/Customizedorder" element={<CustomizedOrderPage />} />
          <Route path="/votorspanal" element={<VotorsPanalPage />} />
          <Route path="/votorscustomization" element={<VotorCustomization />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/CadAssignment" element={<CadAssignmentPage />} />
          <Route
            path="/CadAssignmentcard"
            element={<CadAssignmentCardPage />}
          />
          <Route path="/FinishedProduct" element={<FinishedProductsPage />} />
          <Route path="/centralDashboard" element={<CentralHubDashboard />} />
          <Route path="/slot" element={<HubSlot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
