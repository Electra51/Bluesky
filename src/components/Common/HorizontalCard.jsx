import React from "react";
import { BsDot } from "react-icons/bs";
import Tags from "./Tags";
import CategoryName from "./CategoryName";
import moment from "moment";
import { Link } from "react-router-dom";

const HorizontalCard = ({ post, cardImgHeight, cardImgWidth, left, top }) => {
  console.log("post", post, cardImgHeight, cardImgWidth);
  return (
    <Link to={`/details/${post?._id}`}>
      <div
        key={post.id}
        className="round-curve border grid grid-cols-2 gap-5 relative"
        style={{
          height: cardImgHeight,
        }}>
        <div
          className={`rounded-s-[10px]`}
          style={{
            height: cardImgHeight,
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

        <div className="mt-3 px-1">
          <p className="text-[#ad47b6] text-[12px] flex justify-normal items-center">
            {post?.users?.nickname} <BsDot className="2xl" />
            {moment(post.createdAt).format("lll")}
          </p>
          {post?.title?.length > 30 ? (
            <p className="text-[16px] mt-2">
              {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") + "..."}
            </p>
          ) : (
            <p className="text-[16px] mt-2">
              {post?.title?.replace(/<[^>]*>/g, "")}
            </p>
          )}
          {/* <p className="text-[18px] mt-2">{post?.title}</p> */}
          {post?.description?.length > 150 ? (
            <p className="text-[13px] text-gray-500 mt-1.5 font-light">
              {post?.description?.slice(0, 150).replace(/<[^>]*>/g, "") + "..."}
            </p>
          ) : (
            <p className="text-[13px] text-gray-500 mt-2 font-light">
              {post?.description.replace(/<[^>]*>/g, "")}
            </p>
          )}
          {/* <p className="text-[14px] mt-0.5 text-gray-500">{post?.description}</p> */}
          <div className="flex flex-wrap gap-3 mt-2">
            {post?.tagnames?.slice(0, 2)?.map((tag, index) => (
              <Tags tag={tag} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
