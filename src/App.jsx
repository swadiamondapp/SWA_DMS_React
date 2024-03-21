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

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<Users />} /> */}
          {/* <Route path="/" element={<OtherLoginPage />} /> */}
          <Route path="/assignmentview" element={<AssignmentViewPage />} />
          <Route path="/" element={<DesignPoolView />} />
          <Route path="/assignmentpanel" element={<AssignmentPanalPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
