import React from "react";
import blogImg from "../../assets/blog-img.png";
const Subscribe = () => {
  return (
    <div className="bg-[#f5fff1f5] h-[500px] flex items-center justify-center">
      <div className="container grid grid-cols-2 gap-9 items-center">
        <div>
          <p className="text-3xl font-semibold">Subscribe to our Newsletter</p>
          <p className="mb-10  mt-2">
            Subscribe to our email newsletter to get the latest posts delivered
            right to your email.
          </p>
          <input
            type="text"
            className="border px-3 py-2"
            placeholder="Enter your email"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Subscribe
          </button>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <img src={blogImg} alt="" width={700} />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
