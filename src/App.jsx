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

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<Users />} /> */}
          {/* <Route path="/" element={<OtherLoginPage />} /> */}
          {/* <Route path="/" element={<AssignmentViewPage />} /> */}
          <Route path="/" element={<DesignPoolView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
