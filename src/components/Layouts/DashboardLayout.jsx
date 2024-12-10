import React from "react";
import Sidebar from "../Common/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full pl-5 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
