import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcon = () => {
  return (
    <div className="mt-4 flex justify-normal items-center gap-5">
      <div className="h-10 w-10 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
        <FaFacebookF className="text-xl group-hover:text-white" />
      </div>
      <div className="h-10 w-10 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
        <FaLinkedinIn className="text-xl group-hover:text-white" />
      </div>
      <div className="h-10 w-10 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
        <FaInstagram className="text-xl group-hover:text-white" />
      </div>
      <div className="h-10 w-10 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
        <FaXTwitter className="text-xl group-hover:text-white" />
      </div>
    </div>
  );
};

export default SocialIcon;
