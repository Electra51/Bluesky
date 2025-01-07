import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import Pagination from "../../components/Common/Pagination";
import axios from "axios";
import VerticleCard from "../../components/Common/VerticleCard";
import Loader from "../../components/Common/Loader";

const Details = () => {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryData, setCategoryData] = useState();
  const [blogdata, setBlogdata] = useState();
  const [loading, setLoading] = useState(false);

  //category get function
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/category/categories"
      );

      if (response.status === 200) {
        setCategoryData(response.data);
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

  // content get data
  const fetchPostData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts`
      );

      if (response.status === 200) {
        const PostData = response.data;
        setBlogdata(PostData.posts);
      } else {
        console.error("Failed to fetch category data for editing");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);

  //filter by category
  const filteredBlogData = blogdata
    ? selectedCategory
      ? blogdata?.filter(
          (blog) =>
            blog?.category?.name === selectedCategory.name &&
            blog?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : blogdata.filter((blog) =>
          blog?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  // Fetch blog titles that match the search term
  const filteredTitles = blogdata
    ? blogdata
        .filter((blog) =>
          blog?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((blog) => blog.title)
    : [];

  //category select function
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(0);
    setSearchTerm("");
  };

  return (
    <div className="">
      <div className="sm-container lg:container flex items-center justify-between gap-10 text-[14px] font-medium bg-white h-[56px] px-4 py-3">
        <Link
          to="/"
          className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
          <IoIosArrowBack />
          Back
        </Link>
        <p className="text-[#5F5F5F]">Blogs</p>
      </div>

      <div className="mt-[32px] grid grid-cols-1 lg:grid-cols-4 gap-12 sm-container lg:container mx-auto">
        <div className="">
          <div className="bg-white rounded-md p-4">
            <p className="text-[16px] font-medium">Categories</p>
            <div className="grid grid-cols-1 divide-y divide-[#E9E9E9] mt-3">
              {" "}
              {categoryData?.map((e, i) => {
                return (
                  <p
                    className={`text-[14px] font-normal py-2 cursor-pointer ${
                      selectedCategory === e
                        ? "text-[#2477B6] font-semibold"
                        : ""
                    }`}
                    key={i}
                    onClick={() => handleCategoryClick(e)}>
                    {e?.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-md p-3 mt-5">
            <form className="border border-gray-400 rounded-sm">
              <div class="relative text-[#f1f1f1] focus-within:text-gray-400">
                <span class="absolute inset-y-0 right-2 flex items-center pl-2">
                  <IoSearchOutline className="text-[#0a0202] text-xl" />
                </span>
                <input
                  type="search"
                  name="q"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  class="px-2 py-1 w-[90%] rounded-sm focus:outline-none "
                  placeholder="Search..."
                  autocomplete="off"
                />
              </div>
            </form>
            <p className="text-[16px] font-medium pt-4">Recent posts</p>
            {filteredTitles.length > 0 && (
              <ul>
                {filteredTitles.slice(0, 9).map((title, index) => (
                  <li
                    className="border-0 border-b border-[#E9E9E9] py-2"
                    key={index}>
                    {title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="col-span-3 pb-20">
            {filteredBlogData.length > 1 && (
              <Pagination
                length={filteredBlogData.length}
                page={page}
                setPage={setPage}
              />
            )}
            {filteredBlogData.length == 0 ? (
              <p className="text-[18px] font-medium text-center text-red-500 pt-20">
                No Content found under this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[50px] justify-center items-center mt-5">
                {filteredBlogData
                  .slice(9 * page, 9 * (page + 1))
                  .map((e, i) => (
                    <VerticleCard
                      key={i}
                      recent_post={e}
                      cardHeight={200}
                      type={"all_blog"}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
