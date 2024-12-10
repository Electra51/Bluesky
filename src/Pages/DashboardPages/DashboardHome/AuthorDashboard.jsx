import React from "react";
import img1 from "../../../assets/1.png";
import img2 from "../../../assets/2.png";
import img3 from "../../../assets/3.png";
import img4 from "../../../assets/4.png";
import img5 from "../../../assets/5.png";
import img6 from "../../../assets/6.png";

const AuthorDashboard = () => {
  const blogData = localStorage.getItem("blogsLength");
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img1} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Total Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          {/* <FcApproval className="text-5xl pl-3 pt-3" /> */}
          <img src={img2} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Total Approved</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          {/* <MdOutlineTrendingUp className="text-5xl pl-3 pt-3" /> */}
          <img src={img3} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Trending Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img4} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Featured Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img5} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Pending Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
      <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
        <div className="flex flex-col justify-between">
          <img src={img6} alt="" className="w-16 p-2 pt-3" />{" "}
          <p className="text-[16px] font-medium pl-3.5 pb-3">Rejected Blogs</p>
        </div>
        <p className="text-right text-4xl pr-3 pt-3">{blogData}</p>
      </div>
    </div>
  );
};

export default AuthorDashboard;
