import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({allowedRoles}) {
    const role=localStorage.getItem("role");
  return allowedRoles.includes(role)? <Outlet/> : <Navigate to="/unauthorized" />;
}

export default PrivateRoute;
