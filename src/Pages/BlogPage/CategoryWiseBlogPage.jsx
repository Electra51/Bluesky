import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Tags from "../../components/Common/Tags";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import VerticleCard from "../../components/Common/VerticleCard";
import Pagination from "../../components/Common/Pagination";

const CategoryWiseBlogPage = () => {
  const [page, setPage] = useState(0);
  const { categoryId } = useParams();
  const navigate = useNavigate(); // For navigation
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryWisePosts, setCategoryWisePosts] = useState([]);

  // Fetch categories
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch category-wise posts
  const fetchCategoryWisePosts = async () => {
    setLoading(true);
    try {
      let url = `https://blue-sky-backend-umber.vercel.app/api/v1/post/category-wise-posts/${categoryId}`;
      if (categoryId == "All") {
        url = "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts";
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch category-wise posts");
      }

      const data = await response.json();
      setCategoryWisePosts(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWisePosts();
  }, [categoryId]);

  // Handle category button click
  const handleCategoryClick = (categoryId) => {
    navigate(`/blog/${categoryId}`);
  };

  return (
    <div className="sm-container lg:container mx-auto">
      <div className="sm-container lg:container flex items-center justify-between gap-10 text-[14px] font-medium bg-white h-[56px] px-4 py-3">
        <Link
          to="/"
          className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
          <IoIosArrowBack />
          Back
        </Link>
        <p className="text-[#5F5F5F]">Blogs</p>
      </div>
      <div className="grid grid-cols-4 gap-5 justify-normal items-start">
        {/* Sidebar with Categories */}
        <div className="bg-white rounded-md p-4">
          <p className="text-[16px] font-medium">Categories</p>
          <div className="mt-3 grid grid-cols-1 divide-y divide-[#E9E9E9] justify-start items-start pb-6">
            <p
              className={`category-list py-2 text-[14px] cursor-pointer ${
                categoryId === "All" ? "font-bold text-[#2477B6]" : ""
              }`}
              onClick={() => handleCategoryClick("All")}>
              All
            </p>
            {categories.map((category, index) => (
              <p
                key={index}
                className={`category-list py-2 text-[14px] cursor-pointer ${
                  categoryId === category._id ? "font-bold text-[#2477B6]" : ""
                }`}
                onClick={() => handleCategoryClick(category._id)}>
                {category.name}
              </p>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="col-span-3 gap-12 mt-7">
          {categoryWisePosts.length > 1 && (
            <Pagination
              length={categoryWisePosts.length}
              page={page}
              setPage={setPage}
            />
          )}
          {loading ? (
            "Loading..."
          ) : error ? (
            <p>Error loading posts: {error}</p>
          ) : !categoryWisePosts.length ? (
            "No posts found"
          ) : (
            <div className="grid grid-cols-3 gap-5 mt-5">
              {categoryWisePosts.map((post, i) => (
                // <Link to={`/details/${post?._id}`} key={post._id}>
                //   <div className="border rounded-[6px] flex flex-col gap-5">
                //     <div className="w-full h-[210px] rounded-t-[6px]">
                //       <img
                //         src={post?.featuredImage}
                //         alt=""
                //         className="object fit h-full w-full rounded-t-[6px]"
                //       />
                //     </div>
                //     <div className="mt-2 px-4">
                //       <p className="text-[#ad47b6] text-[13px] flex justify-normal items-center tracking-[0.5px]">
                //         <span className="text-[#ad47b6] text-[13px] underline">
                //           {post?.users?.nickname}
                //         </span>{" "}
                //         <BsDot className="text-2xl text-[#ad47b6]" />
                //         <span className="text-[#7f5583] text-[13px] tracking-[0.5px]">
                //           {moment(post?.users?.createdAt).format("lll")}
                //         </span>{" "}
                //       </p>
                //       <p className="text-[15px] font-medium text-black mt-2">
                //         {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") +
                //           "..."}
                //       </p>
                //       <p className="text-[13px] text-justify text-gray-600 mt-1 font-light tracking-[1px]">
                //         {post?.description
                //           ?.slice(0, 120)
                //           .replace(/<[^>]*>/g, "") + "..."}
                //       </p>
                //       <div className="flex flex-wrap gap-3 mt-2 pb-3">
                //         {post?.tagNames?.slice(0, 2)?.map((tag, index) => (
                //           <Tags tag={tag} key={index} />
                //         ))}
                //       </div>
                //     </div>
                //   </div>
                // </Link>

                <VerticleCard
                  key={i}
                  recent_post={post}
                  cardHeight={200}
                  type={"all_blog"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseBlogPage;
