import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BreadCrum from "../../../components/Common/BreadCrum";
import BlogDescription from "../../../components/Common/BlogDescription";

const EditPostForAdmin = () => {
  const [data, setData] = useState("");
  const [status, setStatus] = useState(""); // State for selected status
  const [rejected, setRejected] = useState(false); // State for reject button
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${id}`
      );

      if (response.status === 200) {
        setData(response.data.post);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const updateStatus = async (status) => {
    try {
      const response = await axios.patch(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${id}/status`,
        { status }
      );

      if (response.status === 200) {
        {
          status === "reject"
            ? toast.success(`Post status ${status}ed successfully!`)
            : toast.success(`Post status updated to ${status} successfully!`);
        }

        fetchPostData(); // Refresh the data after updating
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus); // Update state with the selected status
    updateStatus(selectedStatus); // Update the status of the post
  };

  const handleReject = () => {
    setRejected(true); // Set rejected state to true
    updateStatus("Reject");
  };

  return (
    <>
      <div className="flex justify-normal items-start">
        <BreadCrum
          still={"Blog Details"}
          prev={"Blog Lists"}
          link={"/dashboard/post"}
        />
      </div>
      <div className="grid grid-cols-3 gap-5 w-[1440px]">
        <div className="col-span-2 bg-white h-[90vh] overflow-auto">
          <div className="mt-[7px] rounded-md">
            <p className="mb-3 font-semibold text-xl">{data?.title}</p>
            <div className="h-[430px] w-full">
              <img
                src={data?.featuredImage}
                alt="Featured"
                className="h-full w-full object-fill"
              />
            </div>

            <div className="flex flex-col mt-[18px]">
              <BlogDescription description={data?.description} />
            </div>
          </div>
        </div>
        <div className="border-0 border-l pl-10">
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-3">
              <label className="text-nowrap">Approve Type: </label>
              <select
                className="bg-white border border-gray-300 rounded-[5px] w-[200px] py-0.5"
                value={status}
                onChange={handleStatusChange}>
                <option value="Trending">Trending</option>
                <option value="Featured">Featured</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button
              className={`text-[14px] border rounded-[5px] px-2 py-1 cursor-pointer ${
                rejected
                  ? "bg-red-500 text-white border-red-500"
                  : "text-gray-500 border-red-500 hover:bg-red-500 hover:text-white"
              }`}
              onClick={handleReject}>
              {rejected ? "Rejected" : "Reject"}
            </button>
          </div>
          <div className="mt-12 flex justify-normal items-start gap-5">
            <div className="h-20 w-24">
              <img
                src={data?.users?.profileImage}
                alt={data?.users?.name}
                className="h-full w-full object-fill"
              />
            </div>
            <div>
              <p>
                <span className="text-[14px] font-semibold">Author: </span>
                {data?.users?.nickname}
              </p>
              <p>
                <span className="text-[14px] font-semibold">
                  Author's UserName:{" "}
                </span>
                @{data?.users?.name}
              </p>
              <p>
                <span className="text-[14px] font-semibold">
                  Author's Email:{" "}
                </span>
                {data?.users?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostForAdmin;
