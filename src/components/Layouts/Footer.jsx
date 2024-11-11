import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import navLogo from "../../assets/logo.png";
const Footer = () => {
  return (
    <div className="border-t border-[#ECECEC] pt-7">
      <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-[100px] max-w-[1200px] mx-auto pt-[79px] ">
        <div className="flex flex-col justify-center items-center lg:block">
          <img src={navLogo} alt="" className="w-[120px] lg:w-[150px]" />
          <h3 className="text-[#565656] text-[14px] mt-[27px] w-[333px] text-center lg:text-start">
            It is a long established fact that a reader will be distracted
            lookings.
          </h3>
          <div className="flex justify-normal items-center gap-4 mt-[32px]">
            <div className="h-9 w-9 rounded-full bg-[#3B5998] flex justify-center items-center">
              <FaFacebookF className="text-white text-2xl" />
            </div>
            <div className="h-9 w-9 rounded-full bg-[#55acee] flex justify-center items-center">
              <FaTwitter className="text-white text-2xl" />
            </div>
            <div className="h-9 w-9 rounded-full bg-[#267ab9] flex justify-center items-center">
              <FaLinkedinIn className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 -mt-3 lg:mt-0 lg:flex gap-[50px] lg:gap-[80px]">
          <div className=" text-center lg:text-start">
            <h1 className="font-bold text-[18px] mt-1">Services</h1>
            <div className="leading-[30px] mt-[27px] font-normal text-[14px] text-[#4D5053]">
              <p>Kitchan</p>
              <p>Living Area</p>
              <p>Bathroom</p>
              <p>Dinning Hall</p>
              <p>Utility</p>
              <p>Bedroom</p>
            </div>
          </div>
          <div className="text-center lg:text-start">
            <h1 className="font-bold text-[18px] mt-1">Pages</h1>
            <div className="leading-[30px] mt-[27px] font-normal text-[14px] text-[#4D5053]">
              <p>Profile</p>
              <p>Favorite</p>
              <p>My Collections</p>
              <p>Settings</p>
            </div>
          </div>
          <div className="w-[364px] sm:col-span-2 sm:mx-auto">
            {" "}
            <h1 className="font-bold text-[18px] mt-1">Contact</h1>
            <div className="leading-[30px] mt-[27px] font-normal text-[14px] text-[#4D5053]">
              <p>55 East Birchwood Ave. Brooklyn, New York 11201e</p>
              <p className="my-4">contact@selhono.com</p>
              <p>(123) 456 - 7890</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-[#A4A4A4] text-[14px] mt-[29px] lg:mt-[69px] border-t border-[#F4F4F4] pt-[15px] pb-6 text-center max-w-[1200px] mx-auto">
        Copyright © 2023 safayet
      </h3>
    </div>
  );
};

export default Footer;
