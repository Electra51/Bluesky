import React from "react";
import { Link } from "react-router-dom";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import Tags from "../../components/Common/Tags";

const AllBlog = () => {
  const { data, loading, error } = useFetchPosts(
    "http://localhost:8080/api/v1/post/posts"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if posts array has content before reducing
  if (!data.length) {
    return <div>No recent posts available.</div>;
  }
  console.log("data", data);
  const authData = localStorage.getItem("Auth");

  return (
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
          <p className="text-[16px] font-medium text-[#76C4EB]">See All</p>
        </Link>
      </div>

      <div className="pb-20 pt-10">
        <Link to={`/details/${data[0]?._id}`}>
          <div className="flex justify-normal items-start border rounded-[6px] gap-7">
            <div className="w-[620px] h-[300px] rounded-l-[6px]">
              <img
                src={data[0]?.featuredImage}
                alt=""
                className="object fit h-full w-full rounded-l-[6px]"
              />
            </div>
            <div className="mt-5 w-[780px]">
              <p className="text-[#ad47b6] text-[14px] flex justify-normal items-center tracking-[0.5px]">
                <span className="text-[#ad47b6] text-[14px] underline">
                  {data[0]?.users?.nickname}
                </span>{" "}
                <BsDot className="text-2xl text-[#ad47b6]" />
                <span className="text-[#7f5583] text-[14px] tracking-[0.5px]">
                  {moment(data[0]?.users?.createdAt).format("lll")}
                </span>{" "}
              </p>
              <p className="text-2xl font-medium tracking-[1px] mt-3">
                {data[0]?.title}
              </p>
              {data[0]?.description?.length > 240 ? (
                <p className="text-[16px] text-gray-600 mt-3">
                  {data[0]?.description?.slice(0, 240).replace(/<[^>]*>/g, "") +
                    "..."}
                </p>
              ) : (
                <p className="text-[16px]">
                  {data[0]?.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-wrap gap-3 mt-5 pb-2">
                  {data[0]?.tagNames?.map((tag, index) => (
                    <Tags tag={tag} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-4 gap-12 mt-7">
          {data
            .filter(
              (_, index) =>
                index === 1 || index === 2 || index === 3 || index === 4
            )
            .map((post) => {
              return (
                <Link to={`/details/${post?._id}`}>
                  <div className="border rounded-[6px] flex flex-col gap-5">
                    <div className="w-full h-[220px] rounded-t-[6px]">
                      <img
                        src={post?.featuredImage}
                        alt=""
                        className="object fit h-full w-full rounded-t-[6px]"
                      />
                    </div>
                    <div className="mt-1 h-[220px] px-4">
                      <p className="text-[#ad47b6] text-[13px] flex justify-normal items-center tracking-[0.5px]">
                        <span className="text-[#ad47b6] text-[13px] underline">
                          {post?.users?.nickname}
                        </span>{" "}
                        <BsDot className="text-2xl text-[#ad47b6]" />
                        <span className="text-[#7f5583] text-[13px] tracking-[0.5px]">
                          {moment(post?.users?.createdAt).format("lll")}
                        </span>{" "}
                      </p>
                      {post?.title?.length > 25 ? (
                        <p className="text-[18px] tracking-[1px] font-medium text-black mt-4">
                          {post?.title?.slice(0, 25).replace(/<[^>]*>/g, "") +
                            "..."}
                        </p>
                      ) : (
                        <p className="text-[18px] font-medium text-black mt-4">
                          {post?.title.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      {post?.description?.length > 140 ? (
                        <p className="text-[14px] text-gray-500 mt-2">
                          {post?.description
                            ?.slice(0, 140)
                            .replace(/<[^>]*>/g, "") + "..."}
                        </p>
                      ) : (
                        <p className="text-[14px]">
                          {post?.description.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-4 pb-3">
                        {post?.tagNames?.slice(0, 2)?.map((tag, index) => {
                          return <Tags tag={tag} key={index} />;
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllBlog;
