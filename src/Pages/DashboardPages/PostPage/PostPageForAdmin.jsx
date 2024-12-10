import React from "react";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import moment from "moment";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useFetchPosts from "../../../hooks/useFetchPosts";

const PostPageForAdmin = () => {
  const { data, loading, error } = useFetchPosts(
    "http://localhost:8080/api/v1/post/posts"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[1440px]">
      <div className="flex justify-between items-center m-3 ">
        <DashboardHeader title={"All Blog Post"} />
      </div>

      <div className="w-[1415px] mt-[7px] ml-3 rounded-sm">
        <div className="grid grid-cols-3 gap-7 mt-10">
          {data?.map((e, i) => (
            <div
              className="border rounded-[5px] flex justify-normal items-start gap-2 relative"
              key={i}>
              <div className="w-[180px] h-[100px] rounded-[5px] p-2">
                <img
                  src={e?.featuredImage}
                  alt=""
                  className="object fit h-full w-full rounded-[5px]"
                />
              </div>
              <div className="mt-3 col-span-2">
                <p className="text-[13px] text-gray-500">
                  @{e?.users?.name} . {moment(e?.createdAt).format("lll")}
                </p>

                <Link to={`/dashboard/editPost/${e._id}`}>
                  <RiArrowRightUpLine className="absolute top-3 right-3" />
                </Link>
                {e?.title?.length < 25 ? (
                  <p>{e?.title}</p>
                ) : (
                  <p>{e?.title?.slice(0, 25) + "..."}</p>
                )}
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-3">
                    <p className="cursor-pointer text-[13px] text-gray-500 border border-green-300 rounded-[5px] px-2 py-0.5">
                      {e?.status}
                    </p>
                    <p className="cursor-pointer text-[13px] text-gray-500 border border-red-300 rounded-[5px] px-2 py-0.5">
                      Cancel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPageForAdmin;
