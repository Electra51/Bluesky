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

      <h1 className="font-medium text-[25px] lg:text-[50px] text-center text-white">
        Wanna join the interno?
      </h1>
      <p className="mt-24 text-[22px] font-medium text-white text-center">
        It is a long established fact will be distracted.
      </p>

      <Link to="/contact" className="mt-48 flex justify-center items-center">
        <button title={"Contact With Us"} />
      </Link>
    </div>
  );
};

export default LastPart;
