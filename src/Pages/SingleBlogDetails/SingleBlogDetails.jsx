import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import moment from "moment";
import BreadCrum from "../../components/Common/BreadCrum";
import {
  FaComments,
  FaFacebook,
  FaInstagram,
  FaRegStar,
  FaTwitter,
} from "react-icons/fa";
import Tags from "../../components/Common/Tags";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { FiShare2 } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import ShareModal from "../../components/Common/ShareModal";
import ModalReact from "../../components/Common/ModalReact";
import BlogDescription from "../../components/Common/BlogDescription";
import { FaRegComments } from "react-icons/fa6";
import like from "../../assets/emoji/like.jpg";
import love from "../../assets/emoji/love.png";
import angry from "../../assets/emoji/angry.png";
import wow from "../../assets/emoji/wow.png";
import happy from "../../assets/emoji/happy.png";
const SingleBlogDetails = () => {
  const [visible, setVisible] = useState(false);
  const [visibleforReact, setVisibleforReact] = useState(false);
  const [auth, setAuth] = useAuth();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const params = useParams();
  const [post, setPost] = useState({});
  const postId = params.id;
  const userId = auth?.user?._id;
  const [text, setText] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const token = JSON.parse(localStorage.getItem("auth")).token; // Replace 'auth' with your actual key
  const [shareCount, setShareCount] = useState(post.shareCount || 0);
  const [showLink, setShowLink] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  console.log("post", post);
  const [showComments, setShowComments] = useState(false);
  // Function to handle copy action
  const handleCopyLink = async () => {
    const postUrl = `http://localhost:8080/api/v1/post/posts/${postId}`; // Replace with your post URL
    navigator.clipboard
      .writeText(postUrl)
      .then(async () => {
        // Update the share count in the backend
        try {
          const response = await axios.post(
            `http://localhost:8080/api/v1/post/posts/${postId}/incrementShareCount`,
            { postId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setShareCount(shareCount + 1); // Increment the share count locally
            toast.success("Link copied to clipboard!");
          }
        } catch (error) {
          toast.error("Failed to update share count.");
        }
      })
      .catch((err) => {
        toast.error("Failed to copy link.");
      });
  };

  const getPostById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts/${params.id}`
      );
      if (response.status === 200) {
        setPost(response.data.post);
        setLiked(response?.data?.post?.likes?.includes(userId));
        setLoved(response?.data?.post?.loves?.includes(userId));
        setShareCount(response?.data?.post?.shareCount);
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
            Authorization: `Bearer ${token}`, // Add the user's token for authentication
          },
        }
      );

      if (response.status === 200) {
        toast.success("Comment and/or rating submitted successfully!");
        return response.data; // Return the updated post data if needed
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
    const userAuth = localStorage.getItem("auth"); // Fetch from localStorage
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

  return (
    <div className="container">
      <div className="text-[14px] font-medium bg-white h-[56px] flex justify-between items-center">
        <Link
          to="/blog"
          className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
          <IoIosArrowBack />
          Back
        </Link>

        <div className="flex justify-normal items-center gap-2">
          <BreadCrum prev={"Blog"} still="Blog Details" link="/" />
        </div>
      </div>
      <div className="mt-[20px]  mx-auto">
        <div className="container h-[569px]">
          {" "}
          <img
            src={post?.featuredImage}
            alt=""
            className="h-full w-full object-fill"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="my-5 flex justify-between items-center gap-2 border-0 border-b border-t py-1">
            <div className="flex justify-normal items-start gap-1">
              <div className="h-10 w-10 rounded-full">
                <img
                  src={post?.users?.profileImage}
                  alt=""
                  className="w-full h-full object-fill rounded-full"
                />
              </div>
              <div>
                <p className="text-[#ad47b6] text-[16px] flex justify-normal items-center">
                  {post?.users?.nickname}{" "}
                  <span className="text-gray-600 text-[15px] pl-2">
                    {" "}
                    @{post?.users?.name}
                  </span>{" "}
                </p>
                <p className="text-[15px]">
                  {moment(post?.users?.createdAt).format("lll")}
                </p>
              </div>
            </div>
            <div className="flex justify-normal items-center gap-2">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>
        </div>

        <BlogDescription description={post.description} />

        <hr className="mt-10" />

        <div className="flex gap-5 justify-start py-5 items-center">
          {post?.tags?.map((e, i) => {
            return <Tags tag={e.name} />;
          })}
        </div>
        <hr className="pt-5 pb-3" />
      </div>

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
                    <img src={like} alt="" />
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
          id={params.id}
          handleCopyLink={handleCopyLink}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      {visibleforReact && (
        <ModalReact
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
