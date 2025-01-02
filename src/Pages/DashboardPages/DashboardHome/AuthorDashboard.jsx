import React, { useEffect, useState } from "react";
import img1 from "../../../assets/1.png";
import img2 from "../../../assets/2.png";
import img3 from "../../../assets/3.png";
import img4 from "../../../assets/4.png";
import img5 from "../../../assets/5.png";
import img6 from "../../../assets/6.png";
import axios from "axios";
import { useAuth } from "../../../context/auth";

const AuthorDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const userId = auth?.user?._id;
  const [data, setData] = useState([]);
  const fetchGetData = async () => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/user/${userId}`
      );
      if (response.status === 200) {
        setData(response.data.posts);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchGetData();
    if (data) {
      filterBlogs(data);
    }
  }, [data]);

  // Filter posts based on status
  const filterBlogs = (data) => {
    const trending = data.filter((blog) => blog?.status[0] == "Trending"); // assuming 'trending' is a boolean field
    const featured = data.filter((blog) => blog?.status[0] == "Featured"); // assuming 'featured' is a boolean field
    const pending = data.filter((blog) => blog?.status[0] == "Pending"); // assuming 'status' is a field with values 'pending', 'approved', 'rejected'
    const rejected = data.filter((blog) => blog?.status[0] == "Rejected");

    setTrendingBlogs(trending);
    setFeaturedBlogs(featured);
    setPendingBlogs(pending);
    setRejectedBlogs(rejected);
  };

  console.log("data", data);

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img1} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Total Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{data?.length}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          {/* <FcApproval className="text-5xl pl-3 pt-3" /> */}
          <img src={img2} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Total Approved</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{0}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          {/* <MdOutlineTrendingUp className="text-5xl pl-3 pt-3" /> */}
          <img src={img3} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Trending Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{trendingBlogs?.length}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img4} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Featured Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{featuredBlogs?.length}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img5} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Pending Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{pendingBlogs?.length}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img6} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Rejected Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{rejectedBlogs?.length}</p>
      </div>
    </div>
  );
};

export default AuthorDashboard;
