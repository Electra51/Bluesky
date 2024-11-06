import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // <div className="max-h-screen mx-auto">
    <Outlet />
    // </div>
  );
};

export default MainLayout;
