import React, { useEffect, useState } from "react";
import Card from "../../components/Common/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import post1 from "../../assets/recent/recent1.png";
import post2 from "../../assets/recent/recent2.png";
import post3 from "../../assets/recent/recent3.png";
import HorizontalCard from "../../components/Common/HorizontalCard";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import Tags from "../../components/Common/Tags";
const AllBlog = () => {
  const [auth, setAuth] = useAuth();
  // const [blogdata, setBlogdata] = useState([]);

  // // content get data
  // const fetchPostData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/v1/post/posts`
  //     );

  //     if (response.status === 200) {
  //       const PostData = response.data;
  //       setBlogdata(PostData.posts);
  //     } else {
  //       console.error("Failed to fetch category data for editing");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchPostData();
  // }, []);
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

  // //logout function
  // const handleLogout = () => {
  //   setAuth({
  //     ...auth,
  //     user: null,
  //     token: "",
  //   });
  //   localStorage.removeItem("auth");
  //   toast.success("logout successfully");
  // };

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col justify-between ">
          <h2 className="text-[25px] font-semibold text-center lg:text-left">
            Explore All Blogs
          </h2>
          <p className="text-[16px] font-normal text-center lg:text-left">
            Discover the Depths of Knowledge and Inspiration in Every Post
          </p>
        </div>

        <Link to="/details">
          <p className="text-[16px] font-medium text-[#76C4EB]">See All</p>
        </Link>
      </div>

      <div className="pb-20 pt-10">
        <Link to={`/details/${data[0]?._id}`}>
          <div className="grid grid-cols-2 border rounded-[6px] gap-5">
            <div className="w-full h-[300px] rounded-l-[6px]">
              <img
                src={data[0]?.featuredImage}
                alt=""
                className="object fit h-full w-full rounded-l-[6px]"
              />
            </div>
            <div className="mt-3">
              <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
                {data[0]?.users?.nickname} <BsDot className="2xl" />
                {moment(data[0]?.users?.createdAt).format("lll")}
              </p>
              <p className="text-2xl mt-3">{data[0]?.title}</p>
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

        <div className="grid grid-cols-3 gap-12 mt-7">
          {data
            .filter((_, index) => index === 1 || index === 2 || index === 3)
            .map((post) => {
              return (
                <Link to={`/details/${post?._id}`}>
                  <div className="border rounded-[6px] flex flex-col gap-5">
                    <div className="w-full h-[260px] rounded-t-[6px]">
                      <img
                        src={post?.featuredImage}
                        alt=""
                        className="object fit h-full w-full rounded-t-[6px]"
                      />
                    </div>
                    <div className="mt-3  px-4">
                      <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
                        {post?.users?.nickname} <BsDot className="2xl" />
                        {moment(post?.users?.createdAt).format("lll")}
                      </p>
                      {post?.title?.length > 40 ? (
                        <p className="text-[18px] font-medium text-black mt-4">
                          {post?.title?.slice(0, 40).replace(/<[^>]*>/g, "") +
                            "..."}
                        </p>
                      ) : (
                        <p className="text-[18px] font-medium text-black mt-4">
                          {post?.title.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      {post?.description?.length > 180 ? (
                        <p className="text-[16px] text-gray-600 mt-3">
                          {post?.description
                            ?.slice(0, 180)
                            .replace(/<[^>]*>/g, "") + "..."}
                        </p>
                      ) : (
                        <p className="text-[16px]">
                          {post?.description.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2 pb-3">
                        {post?.tagNames?.slice(0, 2)?.map((tag, index) => {
                          return <Tags tag={tag} key={index} />;
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* <div className="border flex flex-col gap-5">
            <div className="w-full h-[260px] rounded">
              <img src={post1} alt="" className="object fit h-full w-full" />
            </div>
            <div className="mt-3">
              <p>asd . 10.09.2020</p>
              <p className="text-2xl">Thusko</p>
              <p>scv</p>
              <div className="flex flex-wrap gap-3">
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
              </div>
            </div>
          </div>
          <div className="border flex flex-col gap-5">
            <div className="w-full h-[260px] rounded">
              <img src={post1} alt="" className="object fit h-full w-full" />
            </div>
            <div className="mt-3">
              <p>asd . 10.09.2020</p>
              <p className="text-2xl">Thusko</p>
              <p>scv</p>
              <div className="flex flex-wrap gap-3">
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
                <p className="text-[#333] px-2 border bg-red-400">sdfvbg</p>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center lg:justify-items-start gap-[20px] justify-center items-center mt-[24px]">
          {blogdata?.slice(0, 3).map((e, i) => {
            return <Card data={e} key={i} />;
          })}
        </div> */}
      </div>
    </div>
  );
};

export default AllBlog;
