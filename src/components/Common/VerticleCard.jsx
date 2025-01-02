import React from "react";
import { BsDot } from "react-icons/bs";
import CategoryName from "./CategoryName";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
const VerticleCard = ({ cardHeight, recent_post, type }) => {
  console.log("rrrr", recent_post, type);
  return (
    <div className="round-curve relative group hover:bg-gray-50 hover:shadow-lg ">
      {type == "all_blog" ? (
        <div className={`h-[${cardHeight}px] rounded-[10px]`}>
          <img
            src={recent_post?.featuredImage}
            alt=""
            className="object fit h-full w-full rounded-t-[10px]"
          />
        </div>
      ) : (
        <div className={`h-[${cardHeight}px] rounded-[10px]`}>
          <img
            src={recent_post[0]?.featuredImage}
            alt=""
            className="object fit h-full w-full rounded-t-[10px]"
          />
        </div>
      )}
      {type == "all_blog" ? (
        <div className="absolute right-5 top-[10px]">
          <CategoryName title={recent_post?.category?.name} />
        </div>
      ) : (
        <div className="absolute right-5 top-[10px]">
          <CategoryName title={recent_post[0]?.category?.name} />
        </div>
      )}

      {type == "all_blog" ? (
        <div className="mt-4 group-hover:px-2 group-hover:pb-2">
          <p className="flex justify-normal items-center tracking-[0.5px]">
            <span className="text-[#ad47b6] text-[14px] underline">
              {recent_post?.users?.nickname}
            </span>{" "}
            <BsDot className="text-2xl text-[#ad47b6]" />
            <span className="text-[#7f5583] text-[14px] tracking-[0.5px]">
              {moment(recent_post?.users?.createdAt).format("lll")}
            </span>{" "}
          </p>

          {recent_post?.title?.length > 25 ? (
            <p className="text-[17px] mt-3 font-medium tracking-[1px]">
              {recent_post?.title?.slice(0, 25).replace(/<[^>]*>/g, "") + "..."}
            </p>
          ) : (
            <p className="text-[17px] mt-3 font-medium tracking-[1px]">
              {recent_post?.title}
            </p>
          )}

          {recent_post?.description?.length > 90 ? (
            <p className="text-[13px] tracking-[1px] text-gray-500 mt-1">
              {recent_post?.description?.slice(0, 90).replace(/<[^>]*>/g, "") +
                "..."}
            </p>
          ) : (
            <p className="text-[13px] tracking-[1px]">
              {recent_post?.description?.replace(/<[^>]*>/g, "")}
            </p>
          )}

          <Link
            to={`/details/${recent_post?._id}`}
            class="relative inline-flex items-center justify-center mt-3 px-3 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-500 rounded-full group">
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span class="absolute flex items-center gap-1 justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-[14px]">
              Read More
              <IoMdArrowRoundForward />
            </span>
            <span class="relative invisible">Button Text</span>
          </Link>
        </div>
      ) : (
        <div className="mt-7 group-hover:px-4 group-hover:pb-4">
          <p className="flex justify-normal items-center tracking-[0.5px]">
            <span className="text-[#ad47b6] text-[16px] underline">
              {recent_post[0]?.users?.nickname}
            </span>{" "}
            <BsDot className="text-2xl text-[#ad47b6]" />
            <span className="text-[#7f5583] text-[14px] tracking-[0.5px]">
              {moment(recent_post[0]?.users?.createdAt).format("lll")}
            </span>{" "}
          </p>
          <p className="text-xl mt-3 font-medium tracking-[1px]">
            {recent_post[0]?.title}
          </p>
          {recent_post[0]?.description?.length > 190 ? (
            <p className="text-[15px] tracking-[1px] text-gray-500 mt-3">
              {recent_post[0]?.description
                ?.slice(0, 190)
                .replace(/<[^>]*>/g, "") + "..."}
            </p>
          ) : (
            <p className="text-[15px] tracking-[1px]">
              {recent_post[0]?.description?.replace(/<[^>]*>/g, "")}
            </p>
          )}

          <Link
            to={`/details/${recent_post[0]?._id}`}
            class="relative inline-flex items-center justify-center mt-3 px-3 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-500 rounded-full group">
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span class="absolute flex items-center gap-1 justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-[14px]">
              Read More
              <IoMdArrowRoundForward />
            </span>
            <span class="relative invisible">Button Text</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerticleCard;
