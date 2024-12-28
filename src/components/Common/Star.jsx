import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ ratingPoint }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {ratingPoint >= index + 1 ? (
          <FaStar className="text-orange-500 text-[0.9rem]" />
        ) : ratingPoint >= number ? (
          <FaStarHalfAlt className="text-orange-500 text-[0.9rem]" />
        ) : (
          <AiOutlineStar className="text-orange-500 text-[0.9rem]" />
        )}
      </span>
    );
  });
  return (
    <div>
      {ratingPoint == "NaN" ? (
        <span className="text-[0.8rem]">no reviews</span>
      ) : (
        <div className="flex gap-[1px] items-center">
          {ratingPoint}
          {ratingStar}
        </div>
      )}
    </div>
  );
};

export default Star;
