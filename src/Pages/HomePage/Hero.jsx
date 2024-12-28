import React from "react";
import img1Logo from "../../assets/cover/1.png";
import CategoryName from "../../components/Common/CategoryName";
import useFetchPosts from "../../hooks/useFetchPosts";
import moment from "moment";
import { Link } from "react-router-dom";

const Hero = () => {
  const { data } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts"
  );
  return (
    <div className="sm-container lg:container relative">
      <div className="h-[240px] lg:h-[600px] w-full round-curve">
        <img
          src={img1Logo}
          alt="hero"
          className="h-full w-full object-fit round-curve"
        />
      </div>

      <Link
        to={`/details/${data[0]?._id}`}
        className="lg:w-[598px] lg:h-[304px] w-[360px] h-[204px] round-curve bg-[#f7fafc] border border-[#f3f3f3] absolute lg:bottom-[-100px] -bottom-40 left-[15px] lg:left-[80px] shadow-md px-4 lg:px-8 lg:py-8 py-4">
        <CategoryName title={data[0]?.category?.name} p={"hero-list"} />
        <p className="text-[18px]  lg:text-[36px] font-bold mt-3 lg:mt-6 lg:leading-[40px] tracking-[0.5px]">
          {data[0]?.title}
        </p>
        <div className="mt-2 lg:mt-5 flex items-center justify-start gap-3">
          <div className="w-8 h-8 rounded-full">
            <img
              src={data[0]?.users?.profileImage}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <p className="text-[#ad47b6] underline lg:text-[16px] text-[14px] text-nowrap">
            {data[0]?.users?.nickname}
          </p>
          <p className="ml-10 text-[#7f5583] lg:text-[16px] text-[13px] text-nowrap">
            {moment(data[0]?.createdAt).format("lll")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
