import React from "react";
import { BsDot } from "react-icons/bs";
import Tags from "./Tags";
import CategoryName from "./CategoryName";

const HorizontalCard = ({ post, cardImgHeight, cardImgWidth }) => {
  return (
    <div key={post.id} className="round-curve border flex gap-5 relative">
      <div className="absolute left-36 top-[-10px]">
        <CategoryName title={"Technology"} />
      </div>
      <div
        className={`w-[${cardImgWidth}px] h-[${cardImgHeight}px] rounded-[10px]`}>
        <img
          src={post.featuredImage}
          alt=""
          className="object fit h-full w-full rounded-s-[10px]"
        />
      </div>
      <div className="mt-3">
        <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
          {post.authors.name} <BsDot className="2xl" />
          {post.date}
        </p>
        <p className="text-[18px] mt-2">{post.title}</p>
        <p className="text-[14px] mt-0.5 text-gray-500">{post.description}</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {post.tag.slice(0, 2).map((tag, index) => (
            <Tags tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
