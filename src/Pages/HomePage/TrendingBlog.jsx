import React from "react";
import post1 from "../../assets/recent/recent1.png";
import post2 from "../../assets/recent/recent2.png";
import post3 from "../../assets/recent/recent3.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMdFastforward,
} from "react-icons/io";

const TrendingBlog = () => {
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
      <h2 className="text-[25px] font-semibold text-center lg:text-left mb-7">
        Trending Blogs
      </h2>
      <div className=" grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div>
            {recent_post?.map((e, i) => {
              return (
                <div key={e.id} className="card1 border flex gap-5 mt-4">
                  <div className="w-[340px] h-full rounded">
                    <img
                      src={e.featuredImage}
                      alt=""
                      className="object fit h-full w-full"
                    />
                  </div>
                  <div className="mt-3">
                    <p>
                      {e.authors.name} . {e.date}
                    </p>
                    <p className="text-2xl">{e.title}</p>
                    <p>{e.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {e.tag.slice(0, 2).map((tag, index) => (
                        <p
                          key={index}
                          className="text-[#333] px-2 border bg-red-400">
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mt-4  border rounded px-4 py-2">
            <p>Explore Categories or Topics</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
              <p className="text-[#333] px-2 border bg-red-400">Category</p>
              <p className="text-[#333] px-2 border bg-red-400">Topic</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Features Posts</p>
            <div className=" mt-4  relative">
              <div className="h-[300px] w-full rounded">
                <img
                  src={post1}
                  alt=""
                  className="h-full w-full object-fill rounded"
                />
              </div>
              <div className="absolute top-6 left-10">
                <button className="bg-[#478428] rounded-md px-2 py-0.5 text-white mt-5">
                  Technology
                </button>
                <div className="mt-32">
                  <p>Topic Title:</p>
                  <p className="text-[#333]">Post Title</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p>Stay With Us</p>
            <div className=" mt-4 flex justify-normal items-center gap-10">
              <div className="h-8 w-8 rounded-full border flex justify-center items-center">
                <IoLogoFacebook />
              </div>
              <div className="h-8 w-8 rounded-full border flex justify-center items-center">
                <IoLogoLinkedin />
              </div>
              <div className="h-8 w-8 rounded-full border flex justify-center items-center">
                <IoLogoInstagram />
              </div>
              <div className="h-8 w-8 rounded-full border flex justify-center items-center">
                <IoLogoTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingBlog;
