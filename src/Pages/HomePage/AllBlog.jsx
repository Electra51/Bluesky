import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import Tags from "../../components/Common/Tags";
import HorizontalCard from "../../components/Common/HorizontalCard";
import VerticleCard from "../../components/Common/VerticleCard";
import Loader from "../../components/Common/Loader";

const AllBlog = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts",
    loading,
    setLoading
  );

  if (data.length < 1) {
    return <div className="container">No recent posts available.</div>;
  }

  const authData = localStorage.getItem("Auth");

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col justify-between ">
              <h2 className="text-[25px] font-semibold text-center lg:text-left">
                Explore All Blogs
              </h2>
              <p className="text-[16px] text-gray-800 font-normal text-center lg:text-left">
                Discover the Depths of Knowledge and Inspiration in Every Post
              </p>
            </div>

            <Link to="/details">
              <p className="text-[16px] font-medium text-blue-500 mt-4">
                See All
              </p>
            </Link>
          </div>

          <div className="pb-20 pt-10">
            <HorizontalCard
              left={"10"}
              top={"10"}
              post={data[0]}
              cardImgHeight={"300px"}
              cardImgWidth={"1400px"}
              imgWidth={"620px"}
              desWidth={"780px"}
              type={"all_blog"}
            />

            <div className="grid grid-cols-4 gap-12 mt-10">
              {data
                .filter(
                  (_, index) =>
                    index === 1 || index === 2 || index === 3 || index === 4
                )
                .map((post) => {
                  return (
                    <VerticleCard
                      recent_post={post}
                      cardHeight={200}
                      type={"all_blog"}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBlog;
