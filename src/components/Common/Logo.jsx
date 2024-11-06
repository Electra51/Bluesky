import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      <img src={logo} alt="BlueSky Logo" width={30} />
      <p className="text-2xl font-semibold mt-4 text-[#168326]">BlueSky</p>
    </div>
  );
};

export default Logo;
