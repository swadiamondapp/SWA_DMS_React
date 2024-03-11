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

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Users />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
