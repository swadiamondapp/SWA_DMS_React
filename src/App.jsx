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
        </Routes>
      </Router>
    </>
  );
}

export default App;
