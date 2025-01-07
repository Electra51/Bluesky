import axios from "axios";
import React, { useEffect, useState } from "react";
import VerticleCard from "../../components/Common/VerticleCard";

const RelatedBlogs = ({ categoryId, post }) => {
  console.log("first", categoryId);
  const [relatedPost, setRelatedPost] = useState([]);
  const fetchRelatedPosts = async () => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/related/${categoryId}`
      );
      if (response.status === 200) {
        const postData = response?.data?.relatedPosts?.filter(
          (e) => e?._id !== post?._id
        );

        console.log("response.data.post", postData);
        setRelatedPost(postData);
      } else {
        console.error("Failed to fetch blog post");
      }
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };
  useEffect(() => {
    fetchRelatedPosts();
  }, [categoryId]);
  console.log("relatedPost", relatedPost);
  return (
    <div>
      {relatedPost?.length > 0 ? (
        <>
          <p className="font-medium text-black text-[16px]">Related Blogs</p>
          <hr className="py-2" />
          <div className="grid grid-cols-5 gap-5 mt-5 pb-20">
            {relatedPost?.map((p, i) => (
              <VerticleCard
                key={i}
                recent_post={p}
                cardHeight={200}
                type={"all_blog"}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default RelatedBlogs;
