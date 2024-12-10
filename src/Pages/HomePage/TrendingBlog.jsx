import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import SectionHeader from "../../components/Common/SectionHeader";
import HorizontalCard from "../../components/Common/HorizontalCard";
import CategoryName from "../../components/Common/CategoryName";
import axios from "axios";
import useFetchPosts from "../../hooks/useFetchPosts";
import { BsDot } from "react-icons/bs";
import moment from "moment";

const TrendingBlog = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [categories, setCategories] = useState([]);
  const [trendingItem, setTrendingItem] = useState([]);
  const [featured, setFeaturedItem] = useState([]);
  const { data, loading, error } = useFetchPosts(
    "http://localhost:8080/api/v1/post/posts"
  );

  console.log("data", data);
  useEffect(() => {
    const trendingItems = data.filter((item) =>
      item?.status?.includes("Trending")
    );
    const featuredItems = data.filter((item) =>
      item?.status?.includes("Featured")
    );
    setTrendingItem(trendingItems);
    setFeaturedItem(featuredItems);
  }, [data]);

  console.log("featured", featured);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/categories"
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

  console.log("categories", categories);

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
      <SectionHeader title={"Trending Blogs"} />
      <div className=" grid grid-cols-3 gap-10">
        <div className="col-span-2 ">
          <div className="flex flex-col justify-normal gap-1">
            {trendingItem?.map((e, i) => {
              return (
                <HorizontalCard
                  key={i}
                  left={"10"}
                  top={"10"}
                  post={e}
                  cardImgHeight={180}
                  cardImgWidth={340}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="border round-curve px-4 py-2">
            <p className="text-gray-700 mt-1 text-[16px]">
              Explore Categories or Topics
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-1 pb-3">
              {categories.map((e, i) => {
                return <CategoryName title={e?.name} p={"category-list"} />;
              })}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 mt-1 text-[16px]">Features Posts</p>
            <Slider {...settings}>
              {featured?.map((e, i) => {
                console.log("e", e);
                return (
                  <div>
                    <h3>
                      {" "}
                      <div className=" mt-4 rounded-md relative px-1">
                        <div className="h-[300px] w-full rounded-md">
                          <img
                            src={e?.featuredImage}
                            alt=""
                            className="h-full w-full object-fill rounded-md"
                          />
                        </div>
                        <div className="absolute top-3 left-3">
                          <CategoryName title={e?.category?.name} />
                          <div className="mt-48">
                            <p className="text-gray-200 text-[12px] flex justify-normal items-center">
                              {e?.users?.nickname} <BsDot className="2xl" />
                              {moment(e.createdAt).format("lll")}
                            </p>
                            <div className="flex justify-normal items-center gap-1 mt-2">
                              <p className="text-white">Topic Title:</p>
                              {e?.title?.length > 30 ? (
                                <p className="text-[16px] text-white">
                                  {e?.title
                                    ?.slice(0, 30)
                                    .replace(/<[^>]*>/g, "") + "..."}
                                </p>
                              ) : (
                                <p className="text-[16px] text-white">
                                  {e?.title?.replace(/<[^>]*>/g, "")}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </h3>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 mt-1 text-[16px]">Stay With Us</p>
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
