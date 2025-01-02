import React, { useState } from "react";
import SectionHeader from "../../components/Common/SectionHeader";
import VerticleCard from "../../components/Common/VerticleCard";
import HorizontalCard from "../../components/Common/HorizontalCard";
import useFetchPosts from "../../hooks/useFetchPosts";
import Loader from "../../components/Common/Loader";

const RecentBlogs = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts",
    loading,
    setLoading
  );
  if (data.length < 1) {
    return <div className="container">No recent posts available.</div>;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <SectionHeader title={"Recent Blog Posts"} />

          <div className="grid grid-cols-2 gap-16 mt-5">
            <div className="border border-gray-50">
              <VerticleCard recent_post={data} cardHeight={300} />
            </div>
            <div className="flex flex-col gap-y-5">
              {data
                .filter((_, index) => index === 1 || index === 2 || index === 3)
                .map((post) => (
                  <HorizontalCard
                    key={post?._id}
                    left={"10"}
                    top={"10"}
                    post={post}
                    cardImgHeight={"160px"}
                    cardImgWidth={"640px"}
                    imgWidth={"290px"}
                    desWidth={"360px"}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentBlogs;
