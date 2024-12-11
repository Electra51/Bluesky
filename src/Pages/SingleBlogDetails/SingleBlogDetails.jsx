import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import ShareModal from "../../components/Common/ShareModal";
import ModalReact from "../../components/Common/ModalReact";
import { BiLike } from "react-icons/bi";
import { FaComments, FaRegComments, FaRegStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import like from "../../assets/emoji/like.jpg";
import love from "../../assets/emoji/love.png";
import angry from "../../assets/emoji/angry.png";
import wow from "../../assets/emoji/wow.png";
import happy from "../../assets/emoji/happy.png";
import DetailsofBlog from "./DetailsofBlog";
import ModatRating from "../../components/Common/ModatRating";

const SingleBlogDetails = () => {
  const [isShared, setIsShared] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleforReact, setVisibleforReact] = useState(false);
  const [visibleforRating, setVisibleforRating] = useState(false);
  const [auth, setAuth] = useAuth();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const params = useParams();
  const [post, setPost] = useState({});
  const postId = params.id;
  const userId = auth?.user?._id;
  const [text, setText] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const [shareCount, setShareCount] = useState(post.shareCount || 0);
  const [showLink, setShowLink] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  console.log("post", post);

  const getPostById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts/${params.id}`
      );
      if (response.status === 200) {
        const postData = response.data.post;
        setPost(postData);
        setShareCount(postData.shareCount || 0); // Update shareCount state
      } else {
        console.error("Failed to fetch blog post");
      }
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPostById();
    }
  }, [params?.id]);

  const handleReaction = async (reactionType) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/post/posts/${postId}/toggleReaction`,
        {
          postId,
          userId: auth?.user?._id,
          reactionType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Reaction updated!");
        setVisibleforReact(false);
        setSelectedReaction(reactionType);
        setPost((prevPost) => ({
          ...prevPost,
          reactions: response.data.reactions,
        }));
      }
    } catch (error) {
      toast.error("Failed to update reaction.");
      console.error("Error in handleReaction:", error);
    }
  };

  const handleAddCommentClick = () => {
    if (auth?.user?._id) {
      setShowCommentBox(true);
      setShowComments((prevState) => !prevState);
    } else {
      toast.error("Please log in to add a comment.");
    }
  };

  const handleCommentSubmit = async ({ postId, text, token, userId }) => {
    if (!text) {
      toast.error("Please provide a comment or a rating.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/post/posts/${postId}/add-comments`,
        { text, ratingValue, userId, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Comment and/or rating submitted successfully!");
        return response.data;
      }
    } catch (error) {
      console.error("Error submitting comment or rating:", error);
      if (error.response) {
        toast.error(
          error.response.data.error || "Error submitting comment or rating."
        );
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const submitComment = async () => {
    const userAuth = localStorage.getItem("auth");
    let token = null;

    if (userAuth) {
      try {
        const parsedData = JSON.parse(userAuth);
        token = parsedData.token; // Extract token
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        toast.error("Invalid user authentication data.");
        return;
      }
    }

    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }

    // Call handleCommentSubmit with the token
    const result = await handleCommentSubmit({
      postId,
      text,
      ratingValue,
      token,
      userId,
    });

    if (result) {
      setText("");
      setRatingValue("");
    }
  };

  const handleCopyLink = async () => {
    const postUrl = `http://localhost:8080/api/v1/post/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      const response = await axios.post(
        `http://localhost:8080/api/v1/post/posts/${postId}/incrementShareCount`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPostById();

      if (response.status === 200) {
        const updatedShareCount = response.data.shareCount; // Assume API returns the updated count
        setShareCount(updatedShareCount);
        setVisible(false);
        toast.success("Link copied to clipboard!");
        setIsShared(true); // Mark the post as
      }
    } catch (error) {
      if (error.response) {
        toast.error("Failed to update share count.");
      } else {
        toast.error("Failed to copy link.");
      }
    }
  };

  return (
    <div className="container">
      <DetailsofBlog post={post} />

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

              <span className="pl-3 text-[14px]">
                {post?.reactions?.length}+
              </span>
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
                    <img src={like} alt="like" width={40} />
                  ) : selectedReaction === "love" ? (
                    <img src={love} alt="love" width={40} />
                  ) : selectedReaction === "wow" ? (
                    <img src={wow} alt="wow" width={40} />
                  ) : selectedReaction === "funny" ? (
                    <img src={happy} alt="happy" width={40} />
                  ) : selectedReaction === "angry" ? (
                    <img src={angry} alt="angry" width={40} />
                  ) : (
                    <BiLike />
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
              <button className="" onClick={() => setVisibleforRating(true)}>
                <FaRegStar className="text-xl" />
              </button>
            </div>

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
                  <span className="text-blue-500 font-bold">Shared</span>
                ) : (
                  <FiShare2 className="text-xl" />
                )}
              </button>
            </div>
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
      {showLink && (
        <ShareModal
          handleCopyLink={handleCopyLink}
          postId={params.id}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      {visibleforRating && (
        <ModatRating
          showLink={showLink}
          id={params.id}
          handleReaction={handleReaction}
          visible={visibleforRating}
          setVisible={setVisibleforRating}
        />
      )}
      {visibleforReact && (
        <ModalReact
          showLink={showLink}
          id={params.id}
          handleReaction={handleReaction}
          visible={visibleforReact}
          setVisible={setVisibleforReact}
        />
      )}
    </div>
  );
};

export default SingleBlogDetails;
