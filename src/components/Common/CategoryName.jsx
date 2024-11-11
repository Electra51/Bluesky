import React from "react";

const CategoryName = ({ title }) => {
  return (
    <button className="bg-[#0077B6] rounded-md px-2 py-0.5 text-white mt-5">
      {title}
    </button>
  );
};

export default CategoryName;
