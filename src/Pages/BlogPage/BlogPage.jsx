import React, { useEffect, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import Tags from "../../components/Common/Tags";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: allPosts,
    loading,
    error,
  } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts"
  );

  const [categories, setCategories] = useState([]);
  const [categoryWisePosts, setCategoryWisePosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchCategories = async () => {
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

  const fetchCategoryWisePosts = async (categoryId) => {
    try {
      const response = await fetch(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/category-wise-posts/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category-wise posts");
      }
      const data = await response.json();
      setCategoryWisePosts(data.data || []);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
      fetchCategoryWisePosts(categoryId);
    } else {
      setSelectedCategory("All");
      setCategoryWisePosts(allPosts);
    }
  }, [categoryId, allPosts]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "All") {
      navigate("/blog");
    } else {
      navigate(`/blog/${categoryId}`);
    }
  };

  return (
    <div className="container pb-20">
      <div className="grid grid-cols-4 gap-5 justify-normal items-start">
        {/* Sidebar with Categories */}
        <div className="mt-7">
          <p className="py-2 font-medium">Categories:</p>
          <div className="mt-3 flex flex-col justify-normal items-start space-y-3">
            <button
              className={`category-list ${
                selectedCategory === "All" ? "font-bold text-purple-600" : ""
              }`}
              onClick={() => handleCategoryClick("All")}>
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-list ${
                  selectedCategory === category._id
                    ? "font-bold text-purple-600"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category._id)}>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="col-span-3 gap-12 mt-7">
          {loading ? (
            "Loading..."
          ) : error ? (
            "Error loading posts"
          ) : !categoryWisePosts.length ? (
            "No posts found"
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {categoryWisePosts.map((post) => (
                <Link to={`/details/${post?._id}`} key={post._id}>
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
                      <p className="text-[18px] font-medium text-black mt-2">
                        {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") +
                          "..."}
                      </p>
                      <p className="text-[16px] text-gray-600 mt-2">
                        {post?.description
                          ?.slice(0, 120)
                          .replace(/<[^>]*>/g, "") + "..."}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 pb-3">
                        {post?.tagNames?.slice(0, 2)?.map((tag, index) => (
                          <Tags tag={tag} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
