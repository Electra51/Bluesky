import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SectionHeader from "../../components/Common/SectionHeader";
import HorizontalCard from "../../components/Common/HorizontalCard";
import CategoryName from "../../components/Common/CategoryName";
import axios from "axios";
import useFetchPosts from "../../hooks/useFetchPosts";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import SocialIcon from "../../components/Common/SocialIcon";

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

  return (
    <div className="container">
      <SectionHeader title={"Trending Blogs"} />
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 ">
          <div className="flex flex-col justify-normal gap-1 gap-y-5">
            {trendingItem?.map((e, i) => {
              return (
                <HorizontalCard
                  key={i}
                  left={"10"}
                  top={"10"}
                  post={e}
                  cardImgHeight={180}
                  cardImgWidth={340}
                  imgWidth={"350px"}
                  desWidth={"600px"}
                  type={"trending"}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="border round-curve px-4 py-2">
            <p className="text-gray-700 font-semibold mt-1 text-[16px]">
              Explore Categories or Topics
            </p>
            <div className="flex flex-wrap gap-3 mt-4 pt-1 pb-3">
              {categories.map((e, i) => {
                return (
                  <CategoryName
                    title={e?.name}
                    p={"category-list"}
                    categoryId={e?._id}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-gray-700 font-semibold mt-1 text-[16px]">
              Features Posts
            </p>
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
          <div className="mt-10">
            <p className="text-gray-700 font-semibold mt-1 text-[16px]">
              Stay With Us
            </p>
            <SocialIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingBlog;
