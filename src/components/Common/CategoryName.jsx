import React from "react";

const CategoryName = ({ title, p }) => {
  return (
    <>
      {p == "hero-list" ? (
        <button className=" bg-[#0077B6] text-white shadow-md rounded-[4px] px-2 py-0.5 ">
          {title}
        </button>
      ) : p == "category-list" ? (
        <button className="border border-[#c3e5ff] hover:border-[#0077B6] hover:bg-[#0077B6] hover:text-white shadow-md rounded-md px-2 py-0.5 text-black">
          {title}
        </button>
      ) : (
        <button className="border border-white hover:border-[#0077B6] hover:bg-[#0077B6] shadow-md rounded-md px-2 py-0.5 text-white">
          {title}
        </button>
      )}
    </>
  );
};

export default CategoryName;
