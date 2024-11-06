// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import axios from "axios";
// import Logo from "../../components/Common/Logo";
// import BreadCrum from "../../components/Common/BreadCrum";
// import AuthInstruction from "../../components/Common/AuthInstruction";
// import toast from "react-hot-toast";
// import { ProgressSpinner } from "primereact/progressspinner";

// const SignUp = () => {
//   const [value, setValue] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   //signup function
//   // const handleSignUp = async (e) => {
//   //   e.preventDefault();

//   //   const { name, email, password, confirmPassword } = value;
//   //   console.log("sign in value-------", value);
//   //   if (!name || !email || !password || !confirmPassword) {
//   //     toast.error("All fields are required");
//   //     return;
//   //   }

//   //   if (password !== confirmPassword) {
//   //     toast.error("Passwords do not match");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await axios.post(
//   //       `http://localhost:8080/api/v1/auth/register`,
//   //       { name, email, password, confirmPassword }
//   //     );

//   //     if (res && res.data.success == "true") {
//   //       toast.success(res?.data?.message);
//   //       setAuth({
//   //         ...auth,
//   //         user: res.data.user,
//   //         token: res.data.token,
//   //       });
//   //       localStorage.setItem("auth", JSON.stringify(res.data));
//   //       navigate(location.state?.from || "/dashboard/profile");
//   //     } else {
//   //       toast.error(res.data.message);
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     toast.error("Registration failed. Please try again.");
//   //   }
//   // };

//   // Signup function
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword } = value;

//     if (!name || !email || !password || !confirmPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     // Reset the error message before checking
//     setConfirmPasswordError("");

//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match"); // Set error message
//       return;
//     }

//     setLoading(true); // Set loading to true before the API call

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/v1/auth/register`,
//         { name, email, password, confirmPassword }
//       );

//       // Check if the response was successful
//       if (res && res.data.success) {
//         toast.success(res?.data?.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));

//         // Redirect to the login page after success
//         navigate("/dashboard/profile");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Registration failed. Please try again.");
//     } finally {
//       setLoading(false); // Set loading to false after the API call completes
//     }
//   };

//   return (
//     <div className="w-full max-w-[350px] mx-auto py-6">
//       <Logo />
//       <BreadCrum prev={"Home"} still={"SignUp"} link={"/"} />
//       <form
//         className="bg-white border border-gray-200 shadow-sm rounded px-8 pt-8 pb-8 mb-4"
//         onSubmit={handleSignUp}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-[15px] font-semibold mb-1"
//             htmlFor="name">
//             Name
//           </label>
//           <input
//             className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//             id="name"
//             type="text"
//             value={value.name}
//             onChange={(e) =>
//               setValue((prev) => ({ ...prev, name: e.target.value }))
//             }
//             placeholder="Name"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-[15px] font-semibold mb-1"
//             htmlFor="email">
//             Email
//           </label>
//           <input
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//             id="email"
//             type="text"
//             value={value.email}
//             onChange={(e) =>
//               setValue((prev) => ({ ...prev, email: e.target.value }))
//             }
//             placeholder="Email"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-[15px] font-semibold mb-1"
//             htmlFor="password">
//             Password
//           </label>
//           <input
//             className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//             id="password"
//             type="password"
//             value={value.password}
//             onChange={(e) =>
//               setValue((prev) => ({ ...prev, password: e.target.value }))
//             }
//             placeholder="Password"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-[15px] font-semibold mb-1"
//             htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//             id="confirmPassword"
//             type="password"
//             value={value.confirmPassword}
//             onChange={(e) =>
//               setValue((prev) => ({
//                 ...prev,
//                 confirmPassword: e.target.value,
//               }))
//             }
//             placeholder="Confirm Password"
//           />
//         </div>
//         <div className="flex flex-col items-center justify-center mt-5">
//           {/* <button
//             className="bg-[#168326] hover:bg-[#2473b9] text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full text-[15px]"
//             type="submit">
//             Sign Up
//           </button> */}
//           <button
//             className={`bg-[#168326] hover:bg-[#2473b9] text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full text-[15px] ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={loading} // Disable the button when loading
//           >
//             {loading ? <ProgressSpinner /> : "Sign Up"}
//           </button>

//           {confirmPasswordError && ( // Show error message if exists
//             <p className="text-red-500 text-sm font-medium my-1">
//               {confirmPasswordError}
//             </p>
//           )}
//           <AuthInstruction
//             title={"Already have an account?"}
//             link={"/login"}
//             route_name={"Login"}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // New error state

  // Signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = value;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    // Check for password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match"); // Set error message
      return;
    } else {
      setConfirmPasswordError(""); // Reset error message if passwords match
    }

    setLoading(true); // Set loading to true before the API call

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/register`,
        { name, email, password, confirmPassword }
      );

      // Check if the response was successful
      if (res && res.data.success) {
        toast.success(res?.data?.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Redirect to the login page after success
        navigate("/dashboard/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  return (
    <div className="w-full max-w-[350px] mx-auto py-6">
      <Logo />
      <BreadCrum prev={"Home"} still={"SignUp"} link={"/"} />
      <form
        className="bg-white border border-gray-200 shadow-sm rounded px-8 pt-8 pb-8 mb-4"
        onSubmit={handleSignUp}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="name">
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
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
            className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
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
            className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
            id="confirmPassword"
            type="password"
            value={value.confirmPassword}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirm Password"
          />
        </div>
        {confirmPasswordError && ( // Show error message if exists
          <p className="text-red-500 text-sm mb-2">{confirmPasswordError}</p>
        )}
        <div className="flex flex-col items-center justify-center mt-5">
          <button
            className={`bg-[#168326] hover:bg-[#2473b9] text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full text-[15px] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading} // Disable the button when loading
          >
            {loading ? <ProgressSpinner /> : "Sign Up"}
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
