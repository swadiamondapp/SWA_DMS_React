import React from "react";
import { isAuthenticated } from "./Common";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
    