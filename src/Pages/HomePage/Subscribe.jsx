import React from "react";
import blogImg from "../../assets/blog-img.png";
import { FaBell } from "react-icons/fa";
import SocialIcon from "../../components/Common/SocialIcon";
const Subscribe = () => {
  return (
    <div className="bg-[#f5fff1f5] h-[500px] flex items-center justify-center">
      <div className="container grid grid-cols-2 gap-9 items-center">
        <div>
          <p className="text-3xl font-semibold tracking-[1px]">
            Subscribe to our Newsletter
          </p>
          <p className="mb-10 mt-3 text-[14px] tracking-[0.5px] text-gray-600 text-justify">
            Stay updated with the latest trends, tips, and insights! Subscribe
            to our email newsletter to receive exclusive content, expert advice,
            and the latest posts delivered straight to your inbox. Don’t miss
            out on the opportunity to stay informed and inspired—sign up now and
            join our growing community
          </p>

          <div className="flex justify-normal items-center">
            <input
              type="text"
              className="border border-blue-500 h-10 rounded-s"
              placeholder="Enter your email"
            />
            <button className="h-10 w-28 bg-blue-500 text-white rounded-r flex justify-center items-center gap-1">
              Subscribe
              <FaBell className="motion-safe:animate-pulse" />
            </button>
          </div>
          <div className="mt-8">
            <SocialIcon />
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <img src={blogImg} alt="" width={700} />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
