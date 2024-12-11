import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import BreadCrum from "../../components/Common/BreadCrum";
import AuthorDetailsForPost from "./AuthorDetailsForPost";
import BlogDescription from "../../components/Common/BlogDescription";
import Tags from "../../components/Common/Tags";

const DetailsofBlog = ({ post }) => {
  return (
    <>
      <div className="text-[14px] font-medium bg-white h-[56px] flex justify-between items-center">
        <Link
          to="/blog"
          className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
          <IoIosArrowBack />
          Back
        </Link>

        <div className="flex justify-normal items-center gap-2">
          <BreadCrum prev={"Blog"} still="Blog Details" link="/" />
        </div>
      </div>
      <div className="mt-[20px]  mx-auto">
        <div className="container h-[569px]">
          <img
            src={post?.featuredImage}
            alt=""
            className="h-full w-full object-fill"
          />
        </div>
        <AuthorDetailsForPost post={post} />
        <BlogDescription description={post.description} />
        <hr className="mt-10" />
        <div className="flex gap-5 justify-start py-5 items-center">
          {post?.tags?.map((e, i) => {
            return <Tags tag={e.name} key={i} />;
          })}
        </div>
        <hr className="pt-5 pb-3" />
      </div>
    </>
  );
};

export default DetailsofBlog;
