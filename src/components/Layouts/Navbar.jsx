import React, { useEffect, useState } from "react";
import Logo from "../Common/Logo";
import { MdOutlineAccountCircle, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import useFetchUserDetails from "../../hooks/useFetchUserDetails";
import axios from "axios";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const toggleMegaMenu = () => {
    setShowMegaMenu(!showMegaMenu);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/categories"
      );

      if (response.status === 200) {
        setCategories(response.data);
        // console.log("response.dataresponse.dataresponse.data", response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authData = localStorage.getItem("Auth");
  const { userDetails, loading } = useFetchUserDetails(auth?.user?.email);
  //logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };
  const menus = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <details>
          <summary onClick={toggleMegaMenu} className="cursor-pointer">
            Category
          </summary>
        </details>
      </li>
      <li>
        <Link to={"/blog"}>Blogs</Link>
      </li>
      <li>
        <Link to={"/contact"}>Contact</Link>
      </li>
    </>
  );

  return (
    <div
      className={`${
        showMegaMenu
          ? "border-0 border-b border-green-50 bg-[#e5f6fe] py-1.5 shadow-sm"
          : "border-0 border-b border-green-50 bg-white py-1.5 shadow-sm"
      }`}>
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
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
          <div className="flex justify-normal items-center relative">
            <input
              type="text"
              className="px-2 py-1 h-9 border border-gray-200 rounded-full"
            />
            <MdSearch className="absolute top-2 right-3 text-xl" />
          </div>
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
                {/* <div className="bg-[#FFF6D8] border border-[#e8cd75] rounded-full w-8">
                  <span className="text-xs">
                    {auth?.user?.name.substring(0, 1)}
                  </span>
                </div> */}
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
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 py-2 shadow dropdown-content bg-base-100 rounded-md w-52">
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
        <div className="mega-menu mb-16 sm:mb-0 shadow-xl bg-[#e5f6fe] absolute left-1/2 transform -translate-x-1/2 transition-all z-10">
          <div class="container mx-auto w-full grid grid-cols-5 gap-3 justify-between p-6">
            {categories?.map((e, i) => {
              return (
                <div className="cursor-pointer border border-gray-100 hover:bg-gray-300 hover:text-white rounded-[5px] px-3 py-2">
                  <p className="text-[16px] font-medium">{e?.name}</p>
                  <p className="text-[14px] font-normal mt-1">
                    {e?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
