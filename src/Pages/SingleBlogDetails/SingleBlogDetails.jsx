import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import ShareModal from "../../components/Common/ShareModal";
import ModatRating from "../../components/Common/ModatRating";
import { IoIosArrowBack } from "react-icons/io";
import BreadCrum from "../../components/Common/BreadCrum";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import RelatedBlogs from "./RelatedBlogs";
import Loader from "../../components/Common/Loader";

const SingleBlogDetails = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleforRating, setVisibleforRating] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage?.getItem("auth"))?.token;
  const [auth, setAuth] = useAuth();
  const userId = auth?.user?._id;
  const params = useParams();
  const postId = params.id;
  const [ratingValue, setRatingValue] = useState("");
  const [shareCount, setShareCount] = useState(post.shareCount || 0);
  const [ratingCount, setRatingCount] = useState(post.averageRating || 0);
  const [showLink, setShowLink] = useState(false);
  const [Error, setError] = useState();
  const [ErrorforReact, setErrorforReact] = useState();
  const [selectedReaction, setSelectedReaction] = useState(
    post?.reactions?.some(
      (reaction) =>
        reaction.userId === auth?.user?._id && reaction.type === "like"
    )
      ? "like"
      : null
  );
  console.log("ratingCount", ratingCount);
  // single post get api
  const getPostById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}`
      );
      if (response.status === 200) {
        const postData = response.data.post;
        setPost(postData);
        setShareCount(postData.shareCount || 0);
        setRatingCount(postData.averageRating || 0);
        setLoading(false);
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
    if (!token) {
      setErrorforReact(
        "You are not authenticated. Please log in for any react"
      );
      return;
    }
    try {
      const response = await axios.post(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}/toggleReaction`,
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
        setSelectedReaction((prev) =>
          prev === reactionType ? null : reactionType
        ); // Toggle reaction
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

  const handleCommentSubmit = async ({ postId, text, token, userId }) => {
    if (!text) {
      toast.error("Please provide a comment");
      return;
    }
    // if (!userId) {
    //   setError("Please login first.");
    //   return;
    // }
    try {
      const response = await axios.post(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}/add-comments`,
        { text, ratingValue, userId, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
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
      setError("You are not authenticated. Please log in for add comments.");
      return;
    }
    setLoading(true);
    // Call handleCommentSubmit with the token
    const result = await handleCommentSubmit({
      postId,
      text,
      ratingValue,
      token,
      userId,
    });

    if (result) {
      // Add the new comment to the state
      const newComment = {
        user: {
          profileImage: auth.user.profileImage, // Replace with actual user profile image
          nickname: auth.user.nickname, // Replace with actual nickname
          name: auth.user.name, // Replace with actual username
        },
        text,
        createdAt: new Date(), // Add current time
      };

      setPost((prevPost) => ({
        ...prevPost,
        comments: [newComment, ...(prevPost?.comments || [])],
      }));

      // Clear the input fields
      setText("");
      setRatingValue("");
      toast.success("Comment added successfully!");

      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const postUrl = `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      const response = await axios.post(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}/incrementShareCount`,
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

  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleSubmitRating = async () => {
    try {
      const response = await axios.post(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${postId}/add-rating`, // API endpoint for adding ratings
        {
          postId,
          ratingValue: ratingValue,
          userId: userId, // Assuming userId is passed as a prop or fetched via context
        }
      );

      if (response.status === 200) {
        const updatedRatingCount = response?.data?.post?.averageRating; // Assume API returns the updated count
        console.log("updatedRatingCount", response);
        setRatingCount(updatedRatingCount);
        // Handle successful rating submission (e.g., update UI, show toast message)
        toast.success(response?.data?.message);
        setVisibleforRating(false);
        setVisible(false);
        setIsRating(true);
      }
    } catch (error) {
      toast.error("Failed to submit rating.");
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="sm-container lg:container">
          {/* header */}
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
          <div>
            <div className="mt-[20px] grid grid-cols-3 gap-5 mx-auto items-start">
              <div className=" col-span-2">
                <LeftSide
                  setVisibleforRating={setVisibleforRating}
                  setShowLink={setShowLink}
                  submitComment={submitComment}
                  text={text}
                  setText={setText}
                  isShared={isShared}
                  shareCount={shareCount}
                  ratingCount={ratingCount}
                  userId={userId}
                  post={post}
                  selectedReaction={selectedReaction}
                  visible={visible}
                  isRating={isRating}
                  setVisible={setVisible}
                  showLink={showLink}
                  handleReaction={handleReaction}
                  loading={loading}
                  Error={Error}
                  ErrorforReact={ErrorforReact}
                />
              </div>
              <div className="flex flex-col justify-end">
                <RightSide post={post} />
              </div>
            </div>
            <div className="mt-10">
              <RelatedBlogs categoryId={post?.category?._id} post={post} />
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
              handleRatingChange={handleRatingChange}
              showLink={showLink}
              id={params.id}
              ratingValue={ratingValue}
              handleSubmitRating={handleSubmitRating}
              visible={visibleforRating}
              setVisible={setVisibleforRating}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SingleBlogDetails;
