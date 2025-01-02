import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Logo from "../../components/Common/Logo";
import BreadCrum from "../../components/Common/BreadCrum";
import AuthInstruction from "../../components/Common/AuthInstruction";
import toast from "react-hot-toast";

const SignUp = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role = id } = value;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      role === undefined
    ) {
      toast.error("All fields are required");
      return;
    }
    // check for password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `https://blue-sky-backend-umber.vercel.app/api/v1/auth/register`,
        {
          name,
          email,
          password,
          confirmPassword,
          role: id,
        }
      );

      if (res && res.data.success) {
        toast.success(res?.data?.message);
        const updatedUser = {
          ...res.data.user,
          isVarified: false,
        };

        const authData = {
          user: updatedUser,
          token: res.data.token,
        };

        setAuth(authData);
        localStorage.setItem("auth", JSON.stringify(authData));

        if (id === 1) {
          const token = res.data.token;
          const verificationRes = await axios.post(
            `https://blue-sky-backend-umber.vercel.app/api/v1/auth/author/request-verification`,
            { userId: res.data.user._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verificationRes && verificationRes.data.success) {
            toast.success("Verification request sent to admin.");
            updatedUser.isVarified = true;

            const newAuthData = {
              user: updatedUser,
              token: res.data.token,
            };
            setAuth(newAuthData);
            localStorage.setItem("auth", JSON.stringify(newAuthData));
          } else {
            toast.error(
              verificationRes?.data?.message ||
                "Failed to send verification request."
            );
          }
        }

        navigate("/dashboard/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[350px] mx-auto py-6 mt-20">
      <div className="flex justify-center items-center mb-2">
        <Logo />
      </div>
      <BreadCrum prev={"Home"} still={"SignUp"} link={"/"} />
      <form
        className="bg-white border border-gray-200 shadow-sm round-curve px-8 pt-8 pb-8 mb-4"
        onSubmit={handleSignUp}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="name">
            Name
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
            id="name"
            type="text"
            value={value.name}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
            id="email"
            type="text"
            value={value.email}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
            id="password"
            type="password"
            value={value.password}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
            id="confirmPassword"
            type="password"
            value={value.confirmPassword}
            onChange={(e) => {
              setValue((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
              if (confirmPasswordError) setConfirmPasswordError("");
            }}
            placeholder="Confirm Password"
          />
        </div>
        {confirmPasswordError && (
          <p className="text-red-500 text-sm mb-2">{confirmPasswordError}</p>
        )}
        <div className="flex flex-col items-center justify-center mt-5">
          <button
            className={`bg-[#0077B6] hover:bg-[#C5A4EB] text-white font-medium py-1.5 px-4 rounded-full focus:outline-none focus:shadow-outline w-full text-[15px] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-xs">
                Loading{" "}
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          <AuthInstruction
            title={"Already have an account?"}
            link={"/login"}
            route_name={"Login"}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
