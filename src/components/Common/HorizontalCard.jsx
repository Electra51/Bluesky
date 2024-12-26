import React from "react";
import { BsDot } from "react-icons/bs";
import CategoryName from "./CategoryName";
import moment from "moment";
import { Link } from "react-router-dom";
import Tags from "./Tags";

const HorizontalCard = ({
  post,
  cardImgHeight,
  left,
  top,
  imgWidth,
  desWidth,
  type,
}) => {
  return (
    <Link to={`/details/${post?._id}`}>
      <div
        key={post.id}
        className="round-curve border flex justify-normal items-start gap-7 relative"
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
          className="px-1 py-2"
          style={{
            width: desWidth,
          }}>
          <p className="text-[#ad47b6] text-[14px] flex justify-normal items-center tracking-[0.5px]">
            <span className="text-[#ad47b6] text-[13px] underline">
              {post?.users?.nickname}
            </span>{" "}
            <BsDot className="text-2xl text-[#ad47b6]" />
            <span className="text-[#7f5583] text-[13px] tracking-[0.5px]">
              {moment(post?.users?.createdAt).format("lll")}
            </span>{" "}
          </p>

          {type ? (
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
                <p className="text-[13px] tracking-[1px] text-gray-500 mt-1 font-normal">
                  {post?.description?.slice(0, 190).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[13px] tracking-[1px] text-gray-500 mt-2 font-normal">
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
                <p className="text-[12px] tracking-[1px] text-gray-500 mt-1 font-normal">
                  {post?.description?.slice(0, 150).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[12px] tracking-[1px] text-gray-500 mt-2 font-normal">
                  {post?.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </>
          )}

          {type ? (
            <div className="flex justify-normal items-center gap-2 mt-4">
              {post?.tagNames?.slice(0, 1)?.map((tag, index) => {
                return <Tags tag={tag} key={index} />;
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
