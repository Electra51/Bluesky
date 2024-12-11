import moment from "moment";
import React from "react";
import { BiLike } from "react-icons/bi";
import { FaComments, FaRegComments, FaRegStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import like from "../../assets/emoji/like.jpg";
import love from "../../assets/emoji/love.png";
import angry from "../../assets/emoji/angry.png";
import wow from "../../assets/emoji/wow.png";
import happy from "../../assets/emoji/happy.png";
const LikeCommentSection = ({
  post,
  setVisibleforReact,
  selectedReaction,
  showComments,
  handleAddCommentClick,
  showLink,
  setShowLink,
  setVisible,
  showCommentBox,
  submitComment,
  text,
  setText,
  shareCount,
  visible,
}) => {
  return (
    <div>
      <div className="">
        <div className="grid grid-cols-2 justify-normal items-center gap-1">
          <div className="flex justify-normal items-center gap-2.5 -space-x-5">
            {post?.reactions?.map((e, i) => {
              return (
                <div className="" key={i}>
                  {e?.type == "angry" ? (
                    <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-100 ">
                      <img
                        src={angry}
                        alt=""
                        className="h-full w-full object-cover rounded-full  border-2 border-gray-100"
                      />
                    </div>
                  ) : e?.type == "like" ? (
                    <div className="w-[26px] h-[26px] rounded-full">
                      <img
                        src={like}
                        alt=""
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                  ) : e?.type == "love" ? (
                    <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-50">
                      <img
                        src={love}
                        alt=""
                        className="h-full w-full object-fill border-2 border-white rounded-full"
                      />
                    </div>
                  ) : e?.type == "wow" ? (
                    <div className="w-[30px] h-[30px] rounded-full border-2 border-red-400">
                      <img
                        src={wow}
                        alt=""
                        className="h-full w-full object-fill border-2 border-white rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[30px] h-[30px] rounded-full border-2 border-red-400">
                      <img
                        src={happy}
                        alt=""
                        className="h-full w-full object-fill border-2 border-white rounded-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <span className="pl-3 text-[14px]">{post?.reactions?.length}+</span>
          </div>
          <span className="flex justify-end items-center">
            {shareCount} Share
          </span>
        </div>
        <div className="grid grid-cols-4 justify-normal items-center border border-gray-500 gap-2 divide-x-2 mt-2">
          <div className="flex justify-center items-center">
            {/* Like button */}
            <button onClick={() => setVisibleforReact(true)} className="">
              {selectedReaction ? (
                selectedReaction === "like" ? (
                  <img src={like} alt="" width={40} />
                ) : selectedReaction === "love" ? (
                  "💖"
                ) : selectedReaction === "wow" ? (
                  "😍"
                ) : selectedReaction === "funny" ? (
                  "🤣"
                ) : (
                  "😡"
                )
              ) : (
                <BiLike />
              )}
            </button>
          </div>
          <div className="flex justify-center items-center py-2">
            <button className="" onClick={handleAddCommentClick}>
              {showComments ? (
                <FaRegComments className="text-xl" />
              ) : (
                <FaComments className="text-xl" />
              )}
            </button>
          </div>
          <div className="flex justify-center items-center py-2">
            <button className="">
              <FaRegStar className="text-xl" />
            </button>
          </div>
          {visible ? (
            <div className="flex justify-center items-center py-2 text-white bg-blue-300">
              <button
                onClick={() => {
                  setShowLink(!showLink);
                  setVisible(true);
                }}
                className="">
                <FiShare2 className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center py-2">
              <button
                onClick={() => {
                  setShowLink(!showLink);
                  setVisible(true);
                }}
                className="">
                <FiShare2 className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
      {showCommentBox ? (
        <div className="mt-5">
          <label className="mb-0.5">Add Your Comments</label>
          <textarea
            placeholder="Type Comments... "
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-400 rounded-sm w-full p-1"
          />

          <button
            onClick={submitComment}
            className="bg-blue-500 rounded-sm text-white px-2 py-1">
            Submit
          </button>
        </div>
      ) : (
        ""
      )}
      <h2 className="mt-2 border-0 border-b">All Comments</h2>
      <div>
        {post?.comments?.map((comment, index) => (
          <div key={index} className="border-b pb-2 mb-2">
            <p>
              <strong>{comment.user?.nickname}</strong>: {comment.text}
            </p>
            <p className="text-sm text-gray-500">
              {moment(comment.createdAt).format("lll")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikeCommentSection;
