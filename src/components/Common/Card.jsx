import moment from "moment";
import React from "react";
import { BsDot } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  function removeHtmlTags(inputString) {
    var doc = new DOMParser().parseFromString(inputString, "text/html");
    return doc.body.textContent || "";
  }
  const details = removeHtmlTags(data?.description);
  return (
    <div className="border  h-[416px] w-[360px] rounded-none bg-white pt-[16px] px-[16px]">
      <figure className="h-[200px] w-[328px] mx-auto !p-0 rounded-sm">
        <img
          src={data?.featuredImage}
          alt={data?.title}
          className="w-full h-full object-fill"
        />
      </figure>
      <div className="items-center">
        <div className="flex justify-between items-center gap-3 my-2">
          <p className="text-[12px] text-[#0077B6] tracking-[0.5px] font-medium">
            {data?.category?.name}
          </p>
          <p className="text-[#5F5F5F] text-[12px] font-normal tracking-[0.5px]">
            {moment(data?.createdAt).format("lll")}
          </p>
        </div>

        <h2 className="text-[16px] font-medium mb-[3px] tracking-[0.5px] mt-3">
          {data?.title?.length > 30 ? (
            <p className="text-[15px]">{data?.title.slice(0, 30) + "..."}</p>
          ) : (
            <p className="text-[15px]">{data?.title}</p>
          )}
        </h2>
        <p
          className={`text-[14px] flex justify-normal gap-1 items-center tracking-[0.5px] mt-0.5`}>
          <span className="text-gray-900 font-medium text-[13px]">
            Author:{" "}
          </span>{" "}
          <span className="text-[#ad47b6] text-[13px] underline">
            {" "}
            {data?.users?.nickname}
          </span>{" "}
        </p>

        {details?.length > 80 ? (
          <p className="text-[13px] text-gray-500 tracking-[1px]">
            {details.slice(0, 80) + "..."}
          </p>
        ) : (
          <p className="text-[13px] text-gray-500 tracking-[1px]">{details}</p>
        )}
        <div className="card-actions">
          <Link to={`/details/${data?._id}`}>
            <button className="text-[14px] text-[#76C4EB] flex justify-center items-center font-medium gap-2 mt-[18px]">
              <p className="text-[#76C4EB]">Read More</p>
              <IoIosArrowRoundForward className="text-[#50bdf3] text-[16px]" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
