import React, { useEffect, useState } from "react";
import Card from "../../components/Common/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import post1 from "../../assets/recent/recent1.png";
import post2 from "../../assets/recent/recent2.png";
import post3 from "../../assets/recent/recent3.png";
const AllBlog = () => {
  const [auth, setAuth] = useAuth();
  const [blogdata, setBlogdata] = useState();
  console.log("blogdata", blogdata);
  // content get data
  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts`
      );

      if (response.status === 200) {
        const PostData = response.data;
        setBlogdata(PostData.posts);
        console.log("postData", PostData.posts);
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

  const authData = localStorage.getItem("Auth");

  //logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };

  const recent_post = [
    {
      id: 1,
      featuredImage: post1,
      category: "Technology",
      title: "The Future of Artificial Intelligence",
      description:
        "Exploring the latest advancements in AI and how they shape our future.",
      date: "2024-10-15",
      tag: ["AI", "Machine Learning", "Innovation", "Future", "Tech Trends"],
      likes: 150,
      comments: 75,
      shares: 30,
      authors: {
        name: "Alice Smith",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-15",
      },
    },
    {
      id: 2,
      featuredImage: post2,
      category: "Health & Wellness",
      title: "Top 10 Benefits of a Plant-Based Diet",
      description:
        "Discover the health benefits of plant-based eating and how to start today.",
      date: "2024-10-12",
      tag: ["Health", "Wellness", "Diet", "Nutrition", "Lifestyle"],
      likes: 220,
      comments: 40,
      shares: 65,
      authors: {
        name: "Mark Lee",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-12",
      },
    },
    {
      id: 3,
      featuredImage: post3,
      category: "Travel",
      title: "Exploring Hidden Gems in Europe",
      description:
        "A guide to uncovering Europe’s best-kept secrets for adventurous travelers.",
      date: "2024-10-08",
      tag: ["Travel", "Adventure", "Europe", "Guides", "Hidden Gems"],
      likes: 180,
      comments: 55,
      shares: 45,
      authors: {
        name: "Sarah Brown",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-08",
      },
    },
    {
      id: 4,
      featuredImage: post1,
      category: "Finance",
      title: "How to Start Investing in 2024",
      description:
        "Learn the basics of investing and tips for building a strong financial future.",
      date: "2024-10-01",
      tag: ["Finance", "Investing", "Wealth", "Money Management", "2024"],
      likes: 305,
      comments: 90,
      shares: 75,
      authors: {
        name: "David Johnson",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-01",
      },
    },
  ];
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

      <div className="py-20">
        <div className="card1 border flex gap-5">
          <div className="w-[640px] h-[300px] rounded">
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
        <div className="grid grid-cols-3 gap-12 mt-10">
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
          </div>
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
