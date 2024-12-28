import React from "react";
import NewImage from "../../assets/cover.png";
import { Link } from "react-router-dom";
const LastPart = () => {
  return (
    <div
      className="hero h-[430px] bg-fixed"
      style={{
        backgroundImage: `url(${NewImage})`,
      }}>
      <div className="hero-overlay bg-opacity-30"></div>

      <div>
        <h1 className="font-medium text-[25px] lg:text-[50px] text-center text-white">
          Wanna join the BlueSky?
        </h1>
        <p className="text-[18px] font-normal tracking-[1px] text-gray-100 text-center">
          It is a long established fact will be distracted.
        </p>

        <Link to="/contact" className=" flex justify-center items-cente mt-5">
          <button className="border border-white rounded-[5px] px-2 py-1 text-white hover:bg-blue-500 hover:text-white hover:border-blue-600 transition duration-300 tracking-[1px]">
            Contact With Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LastPart;
