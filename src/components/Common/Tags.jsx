import React from "react";

const Tags = ({ tag }) => {
  return (
    <p className="font-medium text-[12px] text-white px-3.5 py-0.5  bg-red-400 rounded-full">
      {tag}
    </p>
  );
};

export default Tags;
