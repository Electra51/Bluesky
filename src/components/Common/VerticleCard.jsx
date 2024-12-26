import React from "react";
import Tags from "./Tags";
import { BsDot } from "react-icons/bs";
import CategoryName from "./CategoryName";
import moment from "moment";
import { Link } from "react-router-dom";
const VerticleCard = ({ cardHeight, recent_post }) => {
  return (
    <Link to={`/details/${recent_post[0]?._id}`}>
      <div className="round-curve relative">
        <div className={`h-[${cardHeight}px] rounded-[10px]`}>
          <img
            src={recent_post[0]?.featuredImage}
            alt=""
            className="object fit h-full w-full rounded-t-[10px]"
          />
        </div>
        <div className="absolute right-5 top-[10px]">
          <CategoryName title={recent_post[0]?.category?.name} />
        </div>
        <div className="mt-7">
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
            <p className="text-[15px] tracking-[1px] text-gray-600 mt-3">
              {recent_post[0]?.description
                ?.slice(0, 190)
                .replace(/<[^>]*>/g, "") + "..."}
            </p>
          ) : (
            <p className="text-[15px] tracking-[1px]">
              {recent_post[0]?.description?.replace(/<[^>]*>/g, "")}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-5 pb-2">
            {recent_post[0]?.tagNames?.map((tag, index) => (
              <Tags tag={tag} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VerticleCard;
