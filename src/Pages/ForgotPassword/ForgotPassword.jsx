import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  //signin function
  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        { email }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for authentication
  useEffect(() => {
    if (auth?.token) handleForgot();
  }, [auth?.token]);

  return (
    <div className="pt-48">
      {" "}
      <div className="bg-white shadow-md shadow-slate-300 max-w-[350px] mx-auto">
        <p className="text-center py-5 text-[19px] font-medium">
          Forgot Password
        </p>
        <div className="flex justify-center items-center gap-2 pt-0 pb-10">
          <Link
            to="/"
            className="text-gray-500 hover:text-[#202020] cursor-pointer">
            Home
          </Link>
          /{" "}
          <Link
            to="/login"
            className="text-gray-500 hover:text-[#202020] cursor-pointer">
            Login
          </Link>
          / <p>Forgot Password</p>
        </div>
        <form
          className="bg-white shadow-sm rounded px-8 pt-5 pb-8 mb-4"
          onSubmit={handleForgot}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#76C4EB] hover:bg-[#76C4EB] text-white text-[14px] font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
