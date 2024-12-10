// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import axios from "axios";
// import Logo from "../../components/Common/Logo";
// import BreadCrum from "../../components/Common/BreadCrum";
// import AuthInstruction from "../../components/Common/AuthInstruction";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [value, setValue] = useState({
//     email: "",
//     password: "",
//   });
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState("");

//   // Login function
//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     const { email, password } = value;

//     if (!email || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
//         email,
//         password,
//       });

//       if (res && res.data.success) {
//         const user = res.data.user;

//         // Check if the account is verified
//         if (user.role === 1 && !user.isVerified) {
//           setMsg(
//             "Your account is not verified. Please wait for admin approval."
//           );
//           return;
//         }

//         // Clear the message and proceed with login
//         setMsg("");

//         setAuth({
//           ...auth,
//           user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));

//         toast.success("Login successful");
//         navigate("/dashboard/profile");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   // Navigate if already logged in
//   useEffect(() => {
//     if (auth?.token) {
//       navigate("/dashboard/profile");
//     }
//   }, [auth?.token, navigate]);

//   return (
//     <div>
//       {/* Show message only for role 1 and if not verified */}
//       {msg && <p className="bg-green-400 text-center py-2 text-white">{msg}</p>}
//       <div className="w-full max-w-[350px] mx-auto py-6 mt-20">
//         <Logo />
//         <BreadCrum prev={"Home"} still={"Login"} link={"/"} />
//         <form
//           className="bg-white border border-gray-200 shadow-sm rounded px-8 pt-8 pb-8 mb-4"
//           onSubmit={handleSignIn}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-[15px] font-semibold mb-1"
//               htmlFor="email">
//               Email
//             </label>
//             <input
//               className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//               id="email"
//               type="email"
//               value={value.email}
//               onChange={(e) =>
//                 setValue((prev) => ({ ...prev, email: e.target.value }))
//               }
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-[15px] font-semibold mb-1"
//               htmlFor="password">
//               Password
//             </label>
//             <input
//               className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
//               id="password"
//               type="password"
//               value={value.password}
//               onChange={(e) =>
//                 setValue((prev) => ({ ...prev, password: e.target.value }))
//               }
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="flex justify-end mb-4">
//             <Link
//               to="/forgot-password"
//               className="text-[14px] text-blue-600 cursor-pointer">
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="flex flex-col items-center justify-center mt-5">
//             <button
//               className="bg-[#0077B6] hover:bg-[#C5A4EB] text-white font-medium py-1.5 px-4 rounded-full focus:outline-none focus:shadow-outline w-full text-[15px]"
//               type="submit">
//               Log In
//             </button>
//             <AuthInstruction
//               title={"Don't have an account?"}
//               link={"/user-select"}
//               route_name={"Sign Up"}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Logo from "../../components/Common/Logo";
import BreadCrum from "../../components/Common/BreadCrum";
import AuthInstruction from "../../components/Common/AuthInstruction";
import toast from "react-hot-toast";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login function
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = value;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state?.from || "/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (auth?.token) navigate("/dashboard");
  }, [auth?.token, navigate]);

  return (
    <div className="w-full max-w-[350px] mx-auto py-6 mt-20">
      <Logo />
      <BreadCrum prev={"Home"} still={"Login"} link={"/"} />
      <form
        className="bg-white border border-gray-200 shadow-sm rounded px-8 pt-8 pb-8 mb-4"
        onSubmit={handleSignIn}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-[15px] font-semibold mb-1"
            htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[14px]"
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
        <div className="flex justify-end mb-4">
          <Link
            to="/forgot-password"
            className="text-[14px] text-blue-600 cursor-pointer">
            Forgot Password?
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <button
            className="bg-[#0077B6] hover:bg-[#C5A4EB] text-white font-medium py-1.5 px-4 rounded-full focus:outline-none focus:shadow-outline w-full text-[15px]"
            type="submit">
            Log In
          </button>
          <AuthInstruction
            title={"Don't have an account?"}
            link={"/user-select"}
            route_name={"Sign Up"}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
