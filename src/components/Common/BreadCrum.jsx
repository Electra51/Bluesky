import React from "react";
import { Link } from "react-router-dom";

const BreadCrum = ({ prev, still, link }) => {
  return (
    <div className="flex justify-center items-center gap-2 pt-2 pb-6">
      <Link
        to={link}
        className="text-gray-500 hover:text-[#202020] cursor-pointer text-[15px]">
        {prev}
      </Link>{" "}
      / <p className="text-[15px]">{still}</p>
    </div>
  );
};

export default BreadCrum;
