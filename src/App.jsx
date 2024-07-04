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
import RendersPage from "./Pages/Renders/FinishedProjectInner/RendersPage";
import FinishedProjectPage from "./Pages/Renders/FinishedProject/FinishedProjectPage";
import RenderCardPage from "../src/Pages/Renders/RendersCardPage/RendersCardPage";
import WareHousePage from "./Pages/WareHousePageView/WareHouse/WareHousePage";
import WareHouseTablePage from "./Pages/WareHousePageView/WareHouseTable/WareHouseTablePage";

import WareHouseDetailsPage from "./Pages/WareHousePageView/WareHouseDetailPage/WareHouseDetailsPage";
import FinishedProductsPage from "./Pages/CAD PANAL/Finished Products Page/FinishedProductsPage";
import CentralHubDashboard from "./Pages/CENTRAL HUB/Central Hub dashboard Page/CentralHubDashboard";
import HubSlot from "./Pages/CENTRAL HUB/Central Hub Slot/HubSlot";
import PrivateRoute from "./Pages/Utils/PrivateRoute";
import AssignmentPanelFolderCards from "./Componets/Assignment Panel/AssignmentPanelFolderCards";
import AssignmentPanelFolderCardPage from "./Pages/AssignmentPanelFolderDetailsCardsPage/AssignmentPanelFolderCardPage";
import ForgotPassword from "./Componets/ForgotPassword/ForgetPassword";
import ForgotPassOtp from "./Componets/ForgotPassword/ForgotPassOtp";
import CreateNewPassword from "./Componets/ForgotPassword/CreateNewPassword";
import PasswordResetComplete from "./Componets/ForgotPassword/PasswordResetComplete";
import UnAssignedDesignerView from "./Pages/DESIGNER PANEL/UnAssignedDesignerPage/UnAssignedDesignerView";
import CentralFolderDetailsPage from "./Pages/CENTRAL HUB/Central Hub Details Page/CentralFolderDetailsPage";
import TransferPage from "./Pages/CENTRAL HUB/Transfer Page/TransferPage";
import FolderDetails from "./Componets/CAD/FolderDetails/FolderDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Users />} />
            <Route path="/otherlogin" element={<OtherLoginPage />} />
            <Route
              path="/assignmentview/:id"
              element={<AssignmentViewPage />}
            />
            <Route path="/designpool" element={<DesignPoolView />} />
            <Route path="/assignmentpanel" element={<AssignmentPanalPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route
              path="/designdashboard"
              element={<DesignerDashboardPage />}
            />
            <Route
              path="/designerassign"
              element={<DesignerAsignmentPanelPage />}
            />
            <Route
              path="/designerassignview/:id"
              element={<DesignerAssignViewPage />}
            />
            <Route
              path="/assignmentpaneldetailsview/:id"
              element={<AssignmentPanelFolderCardPage />}
            />
             <Route path="/centralfolderdetails/:id" element={<CentralFolderDetailsPage />} />
             <Route path="/centralhubtransfer" element={<TransferPage />} />
            <Route path="/Customizedorder" element={<CustomizedOrderPage />} />
            <Route path="/unassigneddesigner" element={<UnAssignedDesignerView />} />
            <Route path="/votorspanal" element={<VotorsPanalPage />} />
            <Route
              path="/votorscustomization"
              element={<VotorCustomization />}
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/CadAssignment" element={<CadAssignmentPage />} />
            <Route path="/finished/:id" element={<RendersPage />} />
            <Route path="/finishedProject" element={<FinishedProjectPage />} />
            <Route path="/renderCard" element={<RenderCardPage />} />
            <Route path="/wareHouse" element={<WareHousePage />} />
            <Route
              path="/customRequestTable"
              element={<WareHouseTablePage />}
            />
            <Route
              path="/wareHouseDetails"
              element={<WareHouseDetailsPage />}
            />
            <Route
              path="/CadAssignmentcard"
              element={<CadAssignmentCardPage />}
            />
            <Route path="/FinishedProduct" element={<FinishedProductsPage />} />
            <Route path="/folderdetails/:id" element={<FolderDetails />} />
            <Route path="/centralDashboard" element={<CentralHubDashboard />} />
            <Route path="/slot" element={<HubSlot />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<ForgotPassOtp />} />
          <Route path="/createnewpassword" element={<CreateNewPassword />} />
          <Route path="/resetcomplete" element={<PasswordResetComplete />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
