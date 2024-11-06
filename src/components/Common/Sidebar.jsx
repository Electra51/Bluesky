import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { sidebarData } from "./data";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="w-[260px] bg-[#FFFFFF] h-[100vh] relative">
      <Link to="/" className="flex items-center justify-center gap-2 py-10">
        <img src={logo} alt="" width={30} />
        <p className="text-2xl font-semibold">BlueSKy</p>
      </Link>
      <div>
        {sidebarData?.map((e, i) => {
          return (
            <div key={i}>
              <NavLink
                to={e?.link}
                className={`active ${
                  e?.label == "Blog"
                    ? "flex justify-normal items-center gap-3 w-[212px] h-[40px] mx-auto rounded-[4px] pl-4 bg-[#76C4EB]"
                    : ""
                }`}>
                <img src={e?.img} className="border" />
                <p
                  className={`${
                    e?.label == "Blog"
                      ? "text-white"
                      : "text-[#5F5F5F] pl-[68px] py-2"
                  }  text-[14px]`}>
                  {" "}
                  {e?.label}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-8 left-4">
        <div className="flex justify-between items-center gap-4">
          {auth.user && (
            <div className="flex justify-normal gap-2 items-center">
              {" "}
              <div className="h-[36px] w-[36px] rounded-full bg-[#FFF6D8] border border-[#e8cd75] flex justify-center items-center">
                {auth.user.name.substring(0, 1)}
              </div>
              <p className="text-[#11233A] text-[14px] font-medium text-nowrap">
                {auth.user.name}
              </p>
            </div>
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
