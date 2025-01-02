import React from "react";
import { BsDot } from "react-icons/bs";
import CategoryName from "./CategoryName";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";

const HorizontalCard = ({
  post,
  cardImgHeight,
  left,
  top,
  imgWidth,
  desWidth,
  type,
  cardType,
}) => {
  console.log("cardType", type);
  return (
    <Link to={`/details/${post?._id}`}>
      <div
        key={post.id}
        className="round-curve border flex justify-normal items-start gap-7 relative hover:shadow-md hover:bg-gray-50"
        style={{
          height: cardImgHeight,
        }}>
        <div
          className={`rounded-s-[10px]`}
          style={{
            height: cardImgHeight,
            width: imgWidth,
          }}>
          <img
            src={post?.featuredImage}
            alt=""
            className="object-fill h-full w-full rounded-s-[10px]"
          />
          <div
            className={`absolute`}
            style={{ left: `${left}px`, top: `${top}px`, right: 0 }}>
            <CategoryName title={post?.category?.name} />
          </div>
        </div>

        <div
          className="px-2 py-2"
          style={{
            width: desWidth,
          }}>
          <p
            className={`text-[#ad47b6] text-[14px] flex justify-normal items-center tracking-[0.5px] ${
              type == "all_blog" ? "mt-4" : ""
            }`}>
            <span className="text-[#ad47b6] text-[13px] underline">
              {post?.users?.nickname}
            </span>{" "}
            <BsDot className="text-2xl text-[#ad47b6]" />
            <span className="text-[#7f5583] text-[13px] tracking-[0.5px]">
              {moment(post?.users?.createdAt).format("lll")}
            </span>{" "}
          </p>

          {type == "trending" ? (
            <>
              {post?.title?.length > 40 ? (
                <p className="text-[17px] mt-2 font-medium tracking-[1px]">
                  {post?.title?.slice(0, 40).replace(/<[^>]*>/g, "") + "..."}
                </p>
              ) : (
                <p className="text-[17px] mt-2 font-medium tracking-[1px]">
                  {post?.title?.replace(/<[^>]*>/g, "")}
                </p>
              )}
              {post?.description?.length > 190 ? (
                <p className="text-[13px] tracking-[1px] text-gray-500 mt-1 font-normal text-justify">
                  {post?.description?.slice(0, 190).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[13px] tracking-[1px] text-gray-500 mt-2 font-normal text-justify">
                  {post?.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </>
          ) : type == "all_blog" ? (
            <>
              {post?.title?.length > 400 ? (
                <p className="text-xl mt-3 font-medium tracking-[1px]">
                  {post?.title?.slice(0, 400).replace(/<[^>]*>/g, "") + "..."}
                </p>
              ) : (
                <p className="text-xl mt-3 font-medium tracking-[1px]">
                  {post?.title?.replace(/<[^>]*>/g, "")}
                </p>
              )}
              {post?.description?.length > 430 ? (
                <p className="text-[14px] tracking-[1px] text-gray-500 mt-2 font-normal text-justify">
                  {post?.description?.slice(0, 430).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[14px] tracking-[1px] text-gray-500 mt-2 font-normal text-justify">
                  {post?.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </>
          ) : (
            <>
              {post?.title?.length > 30 ? (
                <p className="text-[16px] mt-2 font-medium tracking-[1px]">
                  {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") + "..."}
                </p>
              ) : (
                <p className="text-[16px] mt-2 font-medium tracking-[1px]">
                  {post?.title?.replace(/<[^>]*>/g, "")}
                </p>
              )}
              {post?.description?.length > 150 ? (
                <p className="text-[12px] tracking-[1px] text-gray-500 mt-1 font-normal text-justify">
                  {post?.description?.slice(0, 150).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[12px] tracking-[1px] text-gray-500 mt-2 font-normal text-justify">
                  {post?.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </>
          )}

          {type == "trending" ? (
            <Link
              to={`/details/${post?._id}`}
              class="relative inline-flex items-center justify-center mt-2 px-3 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-500 rounded-full group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
                <svg
                  class="w-4 h-4"
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
              <span class="absolute flex items-center gap-1 justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-[12px]">
                Read More
                <IoMdArrowRoundForward />
              </span>
              <span class="relative invisible">Button Text</span>
            </Link>
          ) : type == "all_blog" ? (
            <Link
              to={`/details/${post?._id}`}
              class="relative inline-flex items-center justify-center mt-5 px-4 py-1.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-500 rounded-full group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
                <svg
                  class="w-4 h-4"
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
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
