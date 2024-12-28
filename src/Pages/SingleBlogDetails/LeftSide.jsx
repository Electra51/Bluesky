import moment from "moment";
import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { MdOutlineReply } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import Tags from "../../components/Common/Tags";
import BlogDescription from "../../components/Common/BlogDescription";
import { GoDotFill } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import { HiOutlineUser } from "react-icons/hi2";

const LeftSide = ({
  post,
  selectedReaction,
  visible,
  isRating,
  userId,
  ratingCount,
  shareCount,
  isShared,
  text,
  submitComment,
}) => {
  const hasUserRated = (userId) => {
    const userRating = post?.ratings?.find((rating) => rating.user === userId);
    return userRating ? true : false;
  };
  return (
    <div className="col-span-2">
      <div className="h-[569px]">
        <img
          src={post?.featuredImage}
          alt=""
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex justify-normal items-center gap-4 py-3 border-0 border-b border-t my-6">
        <div className="flex justify-normal items-center gap-2">
          <HiOutlineUser className="font-medium" />
          <p className=" uppercase text-[15px]">
            BY <span className=" underline">{post?.users?.nickname}</span>
          </p>
        </div>{" "}
        <GoDotFill />
        <div className="flex justify-normal items-center gap-2">
          <SlLike className="font-medium" />
          <p className=" uppercase text-[15px]">
            Like
            <span className="pl-1">
              {post?.reactions?.filter((r) => r.type === "like").length}
            </span>
          </p>
        </div>
        <GoDotFill />
        <div className="flex justify-normal items-center gap-2">
          <FaRegStar className="font-medium" />
          <p className=" uppercase text-[15px]">
            Rating
            <span className="pl-1">{post?.averageRating}</span>
          </p>
        </div>
        <GoDotFill />
        <div className="flex justify-normal items-center gap-2">
          <RiChat3Line className="font-medium" />
          <p className=" uppercase text-[15px]">
            Comments <span className="">{post?.comments?.length}</span>
          </p>
        </div>
        <GoDotFill />
        <div className="flex justify-normal items-center gap-2">
          <FiShare2 className="font-medium" />
          <p className=" uppercase text-[15px]">
            Share <span className="">{post?.shareCount}</span>
          </p>
        </div>
      </div>
      <BlogDescription description={post.description} />
      <hr className="mt-10" />
      <div className="flex gap-5 justify-start py-5 items-center">
        {post?.tags?.map((e, i) => {
          return <Tags tag={e.name} key={i} />;
        })}
      </div>
      <div>
        <div className="">
          <div className="flex justify-between items-center gap-6">
            <div className="flex justify-normal items-center gap-6">
              <div className="flex justify-center items-center">
                <BiLike
                  onClick={() => handleReaction("like")}
                  className={`cursor-pointer text-2xl ${
                    selectedReaction === "like"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="ml-2">
                  {post?.reactions?.filter((r) => r.type === "like").length}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={`flex justify-center items-center py-2 px-2 ${
                    visible ? "text-white bg-blue-300" : ""
                  }`}>
                  <button
                    onClick={() => {
                      setVisibleforRating(true);
                    }}
                    className="">
                    {isRating || hasUserRated(userId) ? (
                      <div className="flex justify-normal items-center gap-3">
                        <FaStar className="text-orange-500 text-[16px] mt-[-3px]" />
                      </div>
                    ) : (
                      <FaRegStar className="text-xl" />
                    )}
                  </button>
                </div>
                {ratingCount}
              </div>
            </div>

            <div className="flex justify-normal items-center gap-8">
              <span className="flex justify-end items-center gap-1">
                <RiChat3Line className="text-[16px]" /> {post?.comments?.length}{" "}
                Comments
              </span>

              <span className="flex justify-end items-center">
                {shareCount} Share
              </span>
              <div
                className={`flex justify-center items-center py-2 ${
                  visible ? "text-white bg-blue-300" : ""
                }`}>
                <button
                  onClick={() => {
                    setShowLink(!showLink);
                    setVisible(true);
                  }}
                  className="">
                  {isShared || post?.sharedUsers?.includes(userId) ? (
                    <span className="text-blue-500 font-bold">
                      {" "}
                      Already Shared
                    </span>
                  ) : (
                    <FiShare2 className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-10">
          <div className="">
            <h2 className="border-0 border-b mt-10">All Comments</h2>
            {post?.comments?.map((comment, index) => {
              return (
                <div key={index} className="border-b pb-2 mb-2">
                  <div className="flex justify-normal items-start gap-3 py-3">
                    <div className="h-[90px] w-40">
                      <img
                        src={comment?.user?.profileImage}
                        alt=""
                        className="h-full w-full object-fill"
                      />
                    </div>
                    <div>
                      <p className="text-[16px] mt-[-3px] font-medium text-gray-900">
                        {comment.user?.nickname}{" "}
                        <span className="text-[12px] text-gray-500">
                          @{comment?.user?.name}
                        </span>
                      </p>
                      <p className="text-[15px] text-gray-600">
                        {comment.text} Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Delectus, recusandae itaque! Magni
                        quos a eos facilis esse soluta ad beatae delectus quam
                        nihil labore, debitis iusto nemo sit repudiandae vero!
                      </p>
                      <div className="flex justify-normal items-center gap-10 mt-2">
                        <p className="text-[12px] text-gray-500">
                          {moment(comment.createdAt).format("lll")}
                        </p>
                        <p className="text-[12px] text-gray-500 flex justify-normal items-center gap-2">
                          <MdOutlineReply />
                          Reply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 pb-10">
            <label className="mb-1">Add Your Comments</label>
            <textarea
              placeholder="Type Comments... "
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-gray-400 rounded-sm w-full p-1 h-40 mt-3"
            />

            <button
              onClick={submitComment}
              className="bg-blue-500 rounded-sm text-white px-2 py-1">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
