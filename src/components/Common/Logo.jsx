import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"}>
      {" "}
      <div className="flex items-center justify-normal gap-2">
        <img src={logo} alt="BlueSky Logo" width={20} />
        <p className="text-2xl font-semibold mt-0 text-[#0077B6] mb-[-2px]">
          BlueSky
        </p>
      </div>
    </Link>
  );
};

export default Logo;
