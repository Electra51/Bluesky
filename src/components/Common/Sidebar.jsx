import React, { useEffect, useState } from "react";
import { sidebarData } from "./data";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import Logo from "./Logo";
import axios from "axios";
import useFetchUserDetails from "../../hooks/useFetchUserDetails";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { userDetails, loading } = useFetchUserDetails(auth?.user?.email);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
    navigate(location.state?.from || "/");
  };
  console.log("userDetails", userDetails);
  return (
    <div className="w-[270px] bg-[#f3f4fc] h-[100vh] relative">
      <Link
        to="/"
        className="flex items-start justify-start pl-5 gap-2 pt-7 pb-4">
        <Logo />
      </Link>
      <div className="mt-2">
        {sidebarData
          .filter(
            (item) =>
              !item.role || // If no role specified, show for all users
              item.role === auth?.user?.role // Show only for the matching role
          )
          .map((item, index) => (
            <div key={index}>
              <NavLink
                to={item?.link}
                className={({ isActive }) =>
                  `flex items-center pl-5 py-2 text-[14px] hover:bg-[#76C4EB] hover:text-white ${
                    isActive ? "bg-[#0077B6] text-white" : "text-[#5F5F5F]"
                  }`
                }>
                {item?.icon && <span className="mr-2">{item.icon}</span>}
                <p>{item?.label}</p>
              </NavLink>
            </div>
          ))}
      </div>
      <div className="absolute bottom-8 left-4">
        <div className="flex justify-between items-center gap-4">
          {userDetails ? (
            <div className="flex justify-normal gap-2 items-center">
              {" "}
              <div className="h-[36px] w-[36px] rounded-full bg-[#FFF6D8] border border-[#e8cd75] flex justify-center items-center shadow-md">
                {userDetails?.profileImage ? (
                  <img
                    src={userDetails?.profileImage}
                    alt=""
                    className="h-full w-full object-fill rounded-full"
                  />
                ) : (
                  <p>{userDetails?.nickname?.substring(0, 1)}</p>
                )}
              </div>
              <p className="text-[#11233A] text-[14px] font-medium text-nowrap">
                {userDetails?.nickname}
              </p>
            </div>
          ) : auth?.user ? (
            <div className="flex justify-normal gap-2 items-center">
              {" "}
              <div className="h-[36px] w-[36px] rounded-full bg-[#FFF6D8] border border-[#e8cd75] flex justify-center items-center">
                {auth?.user?.name?.substring(0, 1)}
              </div>
              <p className="text-[#11233A] text-[14px] font-medium text-nowrap">
                {auth?.user?.name}
              </p>
            </div>
          ) : (
            ""
          )}

          <IoLogOutOutline
            className="text-xl cursor-pointer"
            // onClick={handleLogout}
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
      <ConfirmationModal
        setVisible={setVisible}
        visible={visible}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
