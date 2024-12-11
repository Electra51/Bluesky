import moment from "moment";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const AuthorDetailsForPost = ({ post }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="my-5 flex justify-between items-center gap-2 border-0 border-b border-t py-1">
        <div className="flex justify-normal items-start gap-1">
          <div className="h-10 w-10 rounded-full">
            <img
              src={post?.users?.profileImage}
              alt=""
              className="w-full h-full object-fill rounded-full"
            />
          </div>
          <div>
            <p className="text-[#ad47b6] text-[16px] flex justify-normal items-center">
              {post?.users?.nickname}{" "}
              <span className="text-gray-600 text-[15px] pl-2">
                {" "}
                @{post?.users?.name}
              </span>{" "}
            </p>
            <p className="text-[15px]">
              {moment(post?.users?.createdAt).format("lll")}
            </p>
          </div>
        </div>
        <div className="flex justify-normal items-center gap-2">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailsForPost;
