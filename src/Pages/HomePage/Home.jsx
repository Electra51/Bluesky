import React, { useEffect, useState } from "react";
import Card from "../../components/Common/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [blogdata, setBlogdata] = useState();

  // content get data
  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts`
      );

      if (response.status === 200) {
        const PostData = response.data;
        setBlogdata(PostData.posts);
        console.log("postData", PostData.posts);
      } else {
        console.error("Failed to fetch category data for editing");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);

  const authData = localStorage.getItem("Auth");

  //logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };

  return (
    <div className="py-20 max-w-[1120px] mx-auto h-[100vh]">
      <div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-[40px] font-semibold text-center lg:text-left">
            Explore Our Blogs
          </h2>
          {auth.user == null ? (
            <Link to="/login">
              <button className="bg-[#76C4EB] px-3 py-1 text-white text-[14px] font-medium rounded-[4px]">
                Admin Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar placeholder cursor-pointer">
                <div className="bg-[#FFF6D8] border border-[#e8cd75] rounded-full w-8">
                  <span className="text-xs">
                    {auth?.user?.name.substring(0, 1)}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 py-2 shadow dropdown-content bg-base-100 rounded-md w-52">
                <li className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]">
                  <Link to="/dashboard/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li
                  className="hover:bg-[#76C4EB] px-5 py-1 rounded-[4px]"
                  onClick={handleLogout}>
                  <Link to="/">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-[16px] font-normal text-center lg:text-left">
            Discover the Depths of Knowledge and Inspiration in Every Post
          </p>
          <Link to="/details">
            <p className="text-[16px] font-medium text-[#76C4EB]">See All</p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center lg:justify-items-start gap-[20px] justify-center items-center mt-[24px]">
        {blogdata?.slice(0, 3).map((e, i) => {
          return <Card data={e} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Home;
