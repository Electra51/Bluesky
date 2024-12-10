import moment from "moment";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  function removeHtmlTags(inputString) {
    var doc = new DOMParser().parseFromString(inputString, "text/html");
    return doc.body.textContent || "";
  }
  const details = removeHtmlTags(data?.description);
  return (
    <div className="card h-[416px] w-[360px] rounded-md bg-white pt-[16px] px-[16px]">
      <figure className="h-[200px] w-[328px] mx-auto  rounded-sm">
        <img
          src={data?.featuredImage}
          alt={data?.title}
          className="w-full h-full object-fill"
        />
      </figure>
      <div className="items-center">
        <div className="flex justify-between items-center gap-3 my-4">
          <p className="text-[12px] text-[#76C4EB] font-medium">
            {data?.category?.name}
          </p>
          <p className="text-[#5F5F5F] text-[12px] font-normal">
            {moment(data?.createdAt).format("LL")}
          </p>
        </div>
        <h2 className="text-[16px] font-medium mb-[10px]">
          {data?.title?.length > 60 ? (
            <p className="text-[16px]">{data?.title.slice(0, 60) + "..."}</p>
          ) : (
            <p className="text-[16px]">{data?.title}</p>
          )}
        </h2>

        {details?.length > 80 ? (
          <p className="text-[12px]">{details.slice(0, 80) + "..."}</p>
        ) : (
          <p className="text-[12px]">{details}</p>
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
