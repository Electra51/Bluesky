import React from "react";
import { useAuth } from "../../../context/auth";
import useFetchUserDetails from "../../../hooks/useFetchUserDetails";
import AuthorDashboard from "./AuthorDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  const { userDetails, loading } = useFetchUserDetails(auth?.user?.email);

  return (
    <div>
      <p className="text-[#11233A] pl-7 text-[18px] font-medium text-nowrap text-left  mt-10">
        Hello,{" "}
        <span className="text-[#c86fd6]">
          {userDetails ? userDetails?.nickname : auth?.user?.name}{" "}
        </span>
        !
      </p>

      <h1 className="text-left text-xl pl-7 font-semibold mt-1">
        Welcome to Dashboard
      </h1>

      <div className="pl-7 mt-16 w-[1400px]">
        {auth?.user?.role == 1 ? (
          <AuthorDashboard />
        ) : auth?.user?.role == 2 ? (
          <AdminDashboard />
        ) : (
          <>p</>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
