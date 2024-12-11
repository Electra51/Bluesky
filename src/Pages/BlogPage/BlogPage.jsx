import React, { useEffect, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import Tags from "../../components/Common/Tags";
import CategoryName from "../../components/Common/CategoryName";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { data, loading, error } = useFetchPosts(
    // "http://localhost:8080/api/v1/post/posts"
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts"
  );
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/category/categories"
      );

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container pb-20">
      <div className="grid grid-cols-4 gap-5 justify-normal items-start">
        <div className="mt-7">
          <p className="py-2 font-medium">Categories:</p>
          <div className="mt-3 flex flex-col space-y-3">
            {categories.map((e, i) => {
              return (
                <CategoryName title={e?.name} p={"category-list"} key={i} />
              );
            })}
          </div>
        </div>
        <div className="col-span-3 gap-12 mt-7">
          <div className="grid grid-cols-3 gap-5">
            {data.map((post) => {
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
                    <div className="mt-2 px-4">
                      <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
                        {post?.users?.nickname} <BsDot className="2xl" />
                        {moment(post?.users?.createdAt).format("lll")}
                      </p>
                      {post?.title?.length > 30 ? (
                        <p className="text-[18px] font-medium text-black mt-2">
                          {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") +
                            "..."}
                        </p>
                      ) : (
                        <p className="text-[18px] font-medium text-black mt-2">
                          {post?.title.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      {post?.description?.length > 120 ? (
                        <p className="text-[16px] text-gray-600 mt-2">
                          {post?.description
                            ?.slice(0, 120)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
