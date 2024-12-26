import React from "react";
import img1Logo from "../../assets/heroImg5.png";
import CategoryName from "../../components/Common/CategoryName";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { Link } from "react-router-dom";

const Hero = () => {
  const { data } = useFetchPosts("http://localhost:8080/api/v1/post/posts");
  return (
    <div className="container relative">
      <div className="h-[600px] w-full round-curve">
        <img
          src={img1Logo}
          alt="hero"
          className="h-full w-full object-fit round-curve"
        />
        <div className="absolute top-32 left-[70px] text-white w-[37%]">
          <p className="text-[46px] font-bold mt-3 leading-[40px] tracking-[1px]">
            Welcome to Our Blog!
          </p>
          <p className="text-justify text-[17px] mt-4 text-gray-200">
            Explore a world of insights, ideas, and inspiration. Dive into
            articles that spark curiosity, fuel knowledge, and connect you with
            a community of like-minded readers. Happy reading!
          </p>
        </div>
      </div>

      <Link
        to={`/details/${data[0]?._id}`}
        className="w-[598px] h-[304px] round-curve bg-[#f7fafc] border border-[#f3f3f3] absolute bottom-[-100px] left-[80px] shadow-md px-8 py-8">
        <CategoryName title={data[0]?.category?.name} p={"hero-list"} />
        <p className="text-[36px] font-bold mt-6 leading-[40px] tracking-[0.5px]">
          {data[0]?.title}
        </p>
        <div className="mt-5 flex items-center justify-start gap-3">
          <div className="w-8 h-8 rounded-full">
            <img
              src={data[0]?.users?.profileImage}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <p className="text-[#ad47b6] underline">{data[0]?.users?.nickname}</p>
          <p className="ml-10 text-[#7f5583]">
            {moment(data[0]?.createdAt).format("lll")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
