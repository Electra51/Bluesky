import React from "react";

const Tags = ({ tag }) => {
  return (
    <p className="font-medium text-[12px] text-[#0077B6] px-3.5 py-0.5 bg-[#acd9f2d4] border border-[#acdaf2fc] rounded-full">
      {tag}
    </p>
  );
};

export default Tags;
