import React from "react";
import img1Logo from "../../assets/heroImg5.png";
import img2 from "../../assets/Image.png";
import CategoryName from "../../components/Common/CategoryName";

const Hero = () => {
  return (
    <div className="container  relative">
      <div className="h-[600px] w-full round-curve">
        <img
          src={img1Logo}
          alt="hero"
          className="h-full w-full object-fit round-curve"
        />
        <div className="absolute top-32 left-[70px] text-white w-1/3">
          <p className="text-[36px] font-bold mt-4 leading-[40px]">
            Welcome to Our Blog!
          </p>
          <p className="text-justify mt-2">
            Explore a world of insights, ideas, and inspiration. Dive into
            articles that spark curiosity, fuel knowledge, and connect you with
            a community of like-minded readers. Happy reading!
          </p>
        </div>
      </div>

      <div className="w-[598px] h-[304px] round-curve bg-[#f7fafc] border border-[#f3f3f3] absolute bottom-[-90px] left-[70px] shadow-md px-8 py-4">
        <CategoryName title={"Technology"} />
        <p className="text-[36px] font-bold mt-4 leading-[40px]">
          The Impact of Technology on the Workplace: How Technology is Changing
        </p>
        <div className="mt-5 flex items-center justify-start gap-3">
          <img src={img2} alt="" />
          <p>Jason Francisco</p>
          <p className="ml-10">August 20, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
