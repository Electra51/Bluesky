import React, { useState } from "react";
import Logo from "../Common/Logo";
import { MdOutlineAccountCircle, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const toggleMegaMenu = () => {
    setShowMegaMenu(!showMegaMenu);
  };

  const menus = (
    <>
      <li>
        <a>Home</a>
      </li>

      <li>
        <details>
          <summary onClick={toggleMegaMenu} className="cursor-pointer">
            Category
          </summary>
        </details>
      </li>
      <li>
        <a>Blogs</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
    </>
  );

  return (
    <div className="border border-green-50 py-1.5 shadow-sm">
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
          <Link
            to="/login"
            className="flex justify-normal items-center gap-1 border border-gray-300 rounded-full px-3 py-1 shadow-sm cursor-pointer hover:bg-[#0077B6] hover:text-white hover:font-medium">
            <MdOutlineAccountCircle className="text-xl" />
            Login
          </Link>
        </div>
      </div>

      {/* Mega Menu */}
      {showMegaMenu && (
        <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-teal-700 absolute left-1/2 transform -translate-x-1/2 transition-all z-10">
          <div class="container mx-auto w-full flex flex-wrap justify-between ">
            <div class="w-full text-white mb-8 text-center">
              <h2 class="font-bold text-2xl">
                Listen, why don’t you wait out by the speeder.
              </h2>
              <p>
                our droids. They’ll have to wait outside. We don’t want them
                here.
              </p>
            </div>
            <ul class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
              <div class="flex items-center">
                <svg
                  class="h-8 mb-3 mr-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                </svg>
                <h3 class="font-bold text-xl text-white text-bold mb-2">
                  Tatooine
                </h3>
              </div>
              <p class="text-gray-100 text-sm">
                Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra
                twi'lek tund polis gen'dai sola tarpals.
              </p>
              <div class="flex items-center py-3">
                <svg
                  class="h-6 pr-3 fill-current text-teal-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                </svg>
                <a
                  href="#"
                  class="text-white bold border-b-2 border-teal-300 hover:text-teal-900">
                  Find out more...
                </a>
              </div>
            </ul>
            <ul class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
              <div class="flex items-center">
                <svg
                  class="h-8 mb-3 mr-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                </svg>
                <h3 class="font-bold text-xl text-white text-bold mb-2">
                  Cantonica
                </h3>
              </div>
              <p class="text-gray-100 text-sm">
                Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra
                twi'lek tund polis gen'dai sola tarpals.
              </p>
              <div class="flex items-center py-3">
                <svg
                  class="h-6 pr-3 fill-current text-teal-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                </svg>
                <a
                  href="#"
                  class="text-white bold border-b-2 border-teal-300 hover:text-teal-900">
                  Find out more...
                </a>
              </div>
            </ul>
            <ul class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
              <div class="flex items-center">
                <svg
                  class="h-8 mb-3 mr-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                </svg>
                <h3 class="font-bold text-xl text-white text-bold mb-2">
                  Yavin 4
                </h3>
              </div>
              <p class="text-gray-100 text-sm">
                Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra
                twi'lek tund polis gen'dai sola tarpals.
              </p>
              <div class="flex items-center py-3">
                <svg
                  class="h-6 pr-3 fill-current text-teal-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                </svg>
                <a
                  href="#"
                  class="text-white bold border-b-2 border-teal-300 hover:text-teal-900">
                  Find out more...
                </a>
              </div>
            </ul>
            <ul class="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
              <div class="flex items-center">
                <svg
                  class="h-8 mb-3 mr-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                </svg>
                <h3 class="font-bold text-xl text-white text-bold mb-2">
                  Alderaan
                </h3>
              </div>
              <p class="text-gray-100 text-sm">
                Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra
                twi'lek tund polis gen'dai sola tarpals.
              </p>
              <div class="flex items-center py-3">
                <svg
                  class="h-6 pr-3 fill-current text-teal-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                </svg>
                <a
                  href="#"
                  class="text-white bold border-b-2 border-teal-300 hover:text-teal-900">
                  Find out more...
                </a>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
