import React from "react";
import { Link } from "react-router-dom";

const CategoryName = ({ title, p, categoryId }) => {
  return (
    <>
      {p == "hero-list" ? (
        <button className=" bg-[#0077B6] text-white shadow-md rounded-[4px] lg:px-2 lg:py-0.5 px-0.5 py-0">
          {title}
        </button>
      ) : p == "category-list" ? (
        <Link to={`/blog/${categoryId}`}>
          <button className="border border-[#c3e5ff] hover:border-[#0077B6] hover:bg-[#0077B6] hover:text-white shadow-md rounded-md px-2 py-0.5 text-black text-nowrap">
            {title}
          </button>
        </Link>
      ) : (
        <button className="border border-white hover:border-[#0077B6] hover:bg-[#0077B6] shadow-md rounded-[5px] px-2 py-0.5 text-white text-[14px]">
          {title}
        </button>
      )}
    </>
  );
};

export default CategoryName;
