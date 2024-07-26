import React from "react";
import { isAuthenticated } from "./Common";
import { Navigate, Outlet } from "react-router-dom";

const usertype = localStorage.getItem("Usertype");

useEffect(() => {
  if (usertype === "ADMIN") {
    navigate("/");
  } else if (usertype === "DESIGNER") {
    navigate("/designdashboard");
  } else if (usertype === "VOTERS") {
    navigate("/votorspanal");
  } else if (usertype === "CAD") {
    navigate("/CadAssignment");
  } else if (usertype === "CENTRAL HUB") {
    navigate("/centralDashboard");
  } else if (usertype === "RENDERS") {
    navigate("/renderCard");
  } else if (usertype === "WAREHOUSE") {
    navigate("/wareHouse");
  }
}, [usertype]);

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
