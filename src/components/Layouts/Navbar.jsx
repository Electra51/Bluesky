import React, { useEffect, useState } from "react";
import Logo from "../Common/Logo";
import { MdMenu, MdOutlineAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import useFetchUserDetails from "../../hooks/useFetchUserDetails";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import categoryImagebg from "../../assets/category.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userDetails } = useFetchUserDetails(auth?.user?.email);
  const navigate = useNavigate();

  const toggleMegaMenu = () => {
    setShowMegaMenu(!showMegaMenu);
  };

  const allCategoryDataGet = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/category/categories"
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    allCategoryDataGet();
  }, []);

  //logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
    navigate("/login");
  };

  const menus = (
    <>
      <li>
        <Link to="/" className="!rounded-none">
          Home
        </Link>
      </li>
      <li>
        <div onClick={toggleMegaMenu} className="cursor-pointer !rounded-none">
          Category
          <FaAngleDown className={`${showMegaMenu ? "rotate-180" : ""}`} />
        </div>
      </li>
      <li>
        <Link to={"/blog"} className="!rounded-none">
          Blogs
        </Link>
      </li>
      <li>
        <Link to={"/contact"} className="!rounded-none">
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`${
        showMegaMenu
          ? "border-0 border-b border-green-50 bg-[#8DBEC1] py-1.5 shadow-sm"
          : "border-0 border-b border-green-50 bg-white py-1.5 shadow-sm"
      }`}>
      <div className="navbar sm-container lg:container">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="pr-2 lg:hidden">
              <MdMenu className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {menus}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menus}</ul>
        </div>
        <div className="navbar-end gap-6">
          {!userDetails ? (
            <Link
              to="/login"
              className="flex justify-normal items-center gap-1 border border-gray-300 rounded-full px-3 py-1 shadow-sm cursor-pointer hover:bg-[#0077B6] hover:text-white hover:font-medium">
              <MdOutlineAccountCircle className="text-xl" />
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar placeholder cursor-pointer">
                <div className="flex justify-normal gap-2 items-center">
                  <div className="h-[36px] w-[36px] rounded-full bg-[#FFF6D8] border border-[#e8cd75] flex justify-center items-center shadow-md">
                    {userDetails?.profileImage ? (
                      <img
                        src={userDetails?.profileImage}
                        alt=""
                        className="h-full w-full object-fill rounded-full"
                      />
                    ) : userDetails?.nickname ? (
                      <p>{userDetails?.nickname?.substring(0, 1)}</p>
                    ) : (
                      <p>{userDetails?.name?.substring(0, 1)}</p>
                    )}
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[999] p-2 py-2 shadow dropdown-content bg-base-100 rounded-md w-52">
                <li className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]">
                  <Link to="/dashboard/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]">
                  <Link to="/dashboard/dashboard">Dashboard</Link>
                </li>
                <li
                  className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]"
                  onClick={handleLogout}>
                  <Link to="/">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mega Menu */}
      {showMegaMenu && (
        <div className="mega-menu w-[100%] mb-16 sm:mb-0 shadow-xl bg-[#8DBEC1] absolute left-1/2 transform -translate-x-1/2 transition-all z-10">
          <div className="container flex p-3 gap-1 ">
            <div className="h-[200px] w-[400px] bg-red-500 mt-5 relative">
              <img
                src={categoryImagebg}
                alt=""
                className="w-full h-full object-fill "
              />
              <button className="border border-blue-500 px-3 py-0.5 rounded-[5px] text-[14px] text-white absolute bottom-2 right-3 hover:bg-blue-500">
                Read Now
              </button>
            </div>
            <div className="grid grid-cols-6 gap-y-5 gap-x-4 justify-between p-6">
              {categories?.map((e, i) => {
                return (
                  <Link
                    to={`/blog/${e?._id}`}
                    onClick={() => setShowMegaMenu(false)}
                    key={i}
                    className="cursor-pointer hover:bg-[#2477B6] hover:text-white rounded-none px-3 py-1 border-0 border-l border-[#f0e3fb]">
                    <p className="text-[16px] font-medium">{e?.name}</p>
                    {e?.description?.length > 10 ? (
                      <p className="text-[16px] mt-2 text-nowrap">
                        {e?.description?.slice(0, 10).replace(/<[^>]*>/g, "") +
                          "..."}
                      </p>
                    ) : (
                      <p className="text-[16px] mt-2">
                        {e?.description?.replace(/<[^>]*>/g, "")}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
