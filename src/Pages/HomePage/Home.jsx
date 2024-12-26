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
      <div className="mt-10">
        <Hero />
        <div className="mt-60">
          <RecentBlogs />
        </div>

        <div className="mt-32">
          <TrendingBlog />
        </div>
        <div className="mt-32">
          {" "}
          <Subscribe />
        </div>
        <div className="mt-32">
          <AllBlog />
        </div>

        <div className="mt-32">
          <PopularAuthor />
        </div>
        <div className="mt-32">
          <InstraPhoto />
        </div>
        <LastPart />
      </div>
    </div>
  );
};

export default Home;
