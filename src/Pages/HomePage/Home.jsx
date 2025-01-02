import React from "react";
import Hero from "./Hero";
import RecentBlogs from "./RecentBlogs";
import Subscribe from "./Subscribe";
import TrendingBlog from "./TrendingBlog";
import AllBlog from "./AllBlog";
import PopularAuthor from "./PopularAuthor";
import LastPart from "./LastPart";
import InstraPhoto from "./InstraPhoto";

const Home = () => {
  return (
    <div>
      <div className="mt-6 lg:mt-10">
        <Hero />
      </div>
      <div className="mt-32 lg:mt-[200px]">
        <RecentBlogs />
      </div>
      <div className="mt-32 lg:mt-[200px]">
        <TrendingBlog />
      </div>
      <div className="mt-32 lg:mt-[200px]">
        <Subscribe />
      </div>
      <div className="mt-32 lg:mt-[200px]">
        <AllBlog />
      </div>
      <div className="mt-32 lg:mt-[200px]">
        <PopularAuthor />
      </div>
      <div className="mt-32 lg:mt-[200px] mb-32">
        <InstraPhoto />
      </div>
      <LastPart />
    </div>
  );
};

export default Home;
