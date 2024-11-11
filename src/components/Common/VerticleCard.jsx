import React from "react";
import Tags from "./Tags";
import { BsDot } from "react-icons/bs";
import CategoryName from "./CategoryName";

const VerticleCard = ({ cardHeight, recent_post }) => {
  return (
    <div className="round-curve relative">
      <div className={`h-[${cardHeight}px] rounded-[10px]`}>
        <img
          src={recent_post[0]?.featuredImage}
          alt=""
          className="object fit h-full w-full rounded-t-[10px]"
        />
      </div>
      <div className="absolute right-5 top-1">
        <CategoryName title={"Technology"} />
      </div>
      <div className="mt-7">
        <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
          {recent_post[0]?.authors?.name} <BsDot className="2xl" />
          {recent_post[0]?.authors?.publish_date}
        </p>
        <p className="text-xl mt-3">{recent_post[0]?.title}</p>
        <p className="text-[16px] mt-2 text-gray-500">
          {recent_post[0]?.description} Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s.
        </p>
        <div className="flex flex-wrap gap-3 mt-5 pb-2">
          {recent_post[0]?.tag.slice(0, 2).map((tag, index) => (
            <Tags tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticleCard;
