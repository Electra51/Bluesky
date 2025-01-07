import React, { useEffect, useState } from "react";
import img1 from "../../../assets/1.png";
import img2 from "../../../assets/2.png";
import img3 from "../../../assets/3.png";
import img4 from "../../../assets/4.png";
import img5 from "../../../assets/5.png";
import img6 from "../../../assets/6.png";
import imgC from "../../../assets/c.png";
import imgt from "../../../assets/t.png";
import imga from "../../../assets/a.png";
import useFetchPosts from "../../../hooks/useFetchPosts";
import axios from "axios";
import Loader from "../../../components/Common/Loader";

const AdminDashboard = () => {
  const blogData = localStorage.getItem("blogsLength");
  const [allAuthor, setAllauthor] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts",
    loading,
    setLoading
  );

  const fetchAllAuthors = async () => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/auth/users/authors`
      );
      setAllauthor(response?.data?.authors);
    } catch (error) {
      console.log(error.message || "Error fetching user details");
    } finally {
    }
  };
  const fetchAllCategoryData = async () => {
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
  const fetchTagData = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/tag/tags"
      );

      if (response.status === 200) {
        setTags(response.data);
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Filter posts based on status
  const filterBlogs = (data) => {
    const trending = data.filter((blog) => blog?.status[0] == "Trending"); // assuming 'trending' is a boolean field
    const featured = data.filter((blog) => blog?.status[0] == "Featured"); // assuming 'featured' is a boolean field
    const pending = data.filter((blog) => blog?.status[0] == "Pending"); // assuming 'status' is a field with values 'pending', 'approved', 'rejected'
    const rejected = data.filter((blog) => blog?.status[0] == "Rejected");

    setTrendingBlogs(trending);
    setFeaturedBlogs(featured);
    setPendingBlogs(pending);
    setRejectedBlogs(rejected);
  };

  // Fetch posts data and filter blogs
  useEffect(() => {
    fetchAllAuthors();
    fetchAllCategoryData();
    fetchTagData();

    if (data) {
      filterBlogs(data);
    }
  }, [data]);

  // useEffect(() => {
  //   fetchAllAuthors();
  //   fetchAllCategoryData();
  //   fetchTagData();
  // }, []);
  console.log("data", data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 gap-5">
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={img1} alt="" className="w-16 p-2 pt-3" />{" "}
              <p className="text-[16px] font-medium pl-3.5 pb-3">Total Blogs</p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">{data?.length}</p>
          </div>
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              {/* <FcApproval className="text-5xl pl-3 pt-3" /> */}
              <img src={imga} alt="" className="w-16 p-2 pt-3" />{" "}
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Total Author
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">{allAuthor?.length}</p>
          </div>
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              {/* <MdOutlineTrendingUp className="text-5xl pl-3 pt-3" /> */}
              <img src={imgC} alt="" className="w-16 p-2 pt-3" />{" "}
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Total Category
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">
              {categories?.length}
            </p>
          </div>
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={imgt} alt="" className="w-16 p-2 pt-3" />{" "}
              <p className="text-[16px] font-medium pl-3.5 pb-3">Total Tags</p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">{tags?.length}</p>
          </div>
          {/* Pending Blogs Block */}
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={img5} alt="" className="w-16 p-2 pt-3" />
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Pending Blogs
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">
              {pendingBlogs?.length}
            </p>
          </div>

          {/* Rejected Blogs Block */}
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={img6} alt="" className="w-16 p-2 pt-3" />
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Rejected Blogs
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">
              {rejectedBlogs?.length}
            </p>
          </div>

          {/* Trending Blogs Block */}
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={img3} alt="" className="w-16 p-2 pt-3" />
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Trending Blogs
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">
              {trendingBlogs?.length}
            </p>
          </div>

          {/* Featured Blogs Block */}
          <div className="border rounded-md h-[150px] grid grid-cols-2 hover:shadow-md hover:bg-[#f3f4fc]">
            <div className="flex flex-col justify-between">
              <img src={img4} alt="" className="w-16 p-2 pt-3" />{" "}
              <p className="text-[16px] font-medium pl-3.5 pb-3">
                Featured Blogs
              </p>
            </div>
            <p className="text-right text-4xl pr-3 pt-3">
              {featuredBlogs?.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
