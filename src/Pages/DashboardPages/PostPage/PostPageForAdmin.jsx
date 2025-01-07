import React, { useState } from "react";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import moment from "moment";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useFetchPosts from "../../../hooks/useFetchPosts";
import Loader from "../../../components/Common/Loader";
import { BsDot } from "react-icons/bs";

const PostPageForAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useFetchPosts(
    "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts",
    loading,
    setLoading
  );
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[1440px]">
          <div className="flex justify-between items-center m-3 ">
            <DashboardHeader title={"All Blog Post"} />
          </div>

          <div className="w-[1415px] mt-[5px] ml-3 rounded-sm">
            <div className="grid grid-cols-3 gap-7 mt-4">
              {data?.map((e, i) => (
                <div
                  className="border rounded-[5px] flex justify-normal items-start gap-2 relative"
                  key={i}>
                  <div className="w-[180px] h-[110px] rounded-[5px] p-2">
                    <img
                      src={e?.featuredImage}
                      alt=""
                      className="object fit h-full w-full rounded-[5px]"
                    />
                  </div>
                  <div className="mt-3 col-span-2">
                    <p className="flex justify-normal items-center tracking-[0.5px] gap-[-2px]">
                      <span className="text-[#ad47b6] text-[12px] underline">
                        {e?.users?.nickname}
                      </span>{" "}
                      <BsDot className="text-xl text-[#ad47b6]" />
                      <span className="text-[#7f5583] text-[12px] tracking-[0.5px]">
                        {moment(e?.users?.createdAt).format("lll")}
                      </span>{" "}
                    </p>
                    <Link to={`/dashboard/editPost/${e._id}`}>
                      <RiArrowRightUpLine className="absolute top-3 right-3" />
                    </Link>
                    {e?.title?.length < 25 ? (
                      <p className="mt-1 text-[16px] tracking-[0.5] font-medium">
                        {e?.title}
                      </p>
                    ) : (
                      <p className="mt-1 text-[16px] tracking-[0.5] font-medium">
                        {e?.title?.slice(0, 25) + "..."}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-3">
                        {e?.status == "Featured" ? (
                          <p className="cursor-pointer text-[13px] text-white border border-green-300 bg-green-500 rounded-[5px] px-2 py-0.5">
                            {e?.status}
                          </p>
                        ) : e?.status == "Trending" ? (
                          <p className="cursor-pointer text-[13px] text-white border border-green-300 bg-blue-500 rounded-[5px] px-2 py-0.5">
                            {e?.status}
                          </p>
                        ) : (
                          <p className="cursor-pointer text-[13px] text-gray-500 border border-green-300 rounded-[5px] px-2 py-0.5">
                            Pending
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPageForAdmin;
