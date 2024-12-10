import React from "react";
import Logo from "../../components/Common/Logo";
import BreadCrum from "../../components/Common/BreadCrum";
import "./sign.css";
import { Link } from "react-router-dom";
const SignUpUserSelect = () => {
  return (
    <div className="w-full max-w-[550px] mx-auto py-6 mt-20">
      <Logo />
      <BreadCrum prev={"Home"} still={"SignUp"} link={"/"} />

      <div className="pt-8 grid grid-cols-2 gap-10">
        <Link to={"/signup/0"}>
          {" "}
          <div className="user-card h-[300px] round-curve shadow-sm border w-full flex flex-col justify-center items-center cursor-pointer">
            <p>SignUp as a</p>
            <p className="text-[#0077B6] font-semibold text-xl mt-2">
              Normal User
            </p>
          </div>
        </Link>
        <Link to={"/signup/1"}>
          <div className="author-card h-[300px] round-curve shadow-sm border w-full flex flex-col justify-center items-center cursor-pointer">
            <p>SignUp as an</p>
            <p className="text-[#c86fd6] font-semibold text-xl mt-2">Author</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUpUserSelect;
