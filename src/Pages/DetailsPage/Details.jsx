import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Card from "../../components/Common/Card";
import { IoSearchOutline } from "react-icons/io5";
import Pagination from "../../components/Common/Pagination";
import axios from "axios";

const Details = () => {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryData, setCategoryData] = useState();
  const [blogdata, setBlogdata] = useState();

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
    <div className="pt-[60px]">
      <div className="mt-[60px] text-[14px] font-medium bg-white h-[56px] flex">
        <div className="max-w-[1120px] ml-[20px] lg:ml-[387px] flex items-center gap-10">
          <Link
            to="/"
            className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
            <IoIosArrowBack />
            Back
          </Link>
          <p className="text-[#5F5F5F]">Blogs</p>
        </div>
      </div>
      <div className="mt-[32px] grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1120px] mx-auto">
        <div>
          <div className="h-[377px] w-[360px] bg-white rounded-md p-4">
            <p className="text-[16px] font-medium">Categories</p>
            <div className="grid grid-cols-1 divide-y divide-[#E9E9E9] mt-3 overflow-y-auto h-[305px]">
              {" "}
              {categoryData?.map((e, i) => {
                return (
                  <p
                    className={`text-[14px] font-normal py-4 cursor-pointer ${
                      selectedCategory === e ? "text-[#76C4EB] font-medium" : ""
                    }`}
                    key={i}
                    onClick={() => handleCategoryClick(e)}>
                    {e?.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="h-[400px] w-[360px] bg-white rounded-md p-4 mt-5">
            <form className="border rounded-lg">
              <div class="relative text-[#f1f1f1] focus-within:text-gray-400">
                <span class="absolute inset-y-0 right-2 flex items-center pl-2">
                  <IoSearchOutline className="text-[#f1f1f1]" />
                </span>
                <input
                  type="search"
                  name="q"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  class="py-2 rounded-md focus:outline-none focus:bg-base-200"
                  placeholder="Search..."
                  autocomplete="off"
                />
              </div>
            </form>
            <p className="text-[16px] font-medium pt-4">Recent posts</p>
            {filteredTitles.length > 0 && (
              <ul>
                {filteredTitles.map((title, index) => (
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

        <div className="col-span-2 pb-20">
          {filteredBlogData.length === 0 ? (
            <p className="text-[18px] font-medium text-center text-red-500 pt-20">
              No Content found under this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] justify-center items-center">
              {filteredBlogData.slice(6 * page, 6 * (page + 1)).map((e, i) => (
                <Card data={e} key={i} />
              ))}
            </div>
          )}
          {filteredBlogData.length > 1 && (
            <Pagination
              length={filteredBlogData.length}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
