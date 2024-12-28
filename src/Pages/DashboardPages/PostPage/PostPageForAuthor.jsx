import React from "react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../../context/auth";

const PostPageForAuthor = () => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useAuth();

  const userId = auth?.user?._id;
  localStorage.setItem("blogsLength", data?.length);
  const fetchGetData = async () => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/user/${userId}`
      );

      if (response.status === 200) {
        const postData = response.data.posts;

        // Fetch and set tags for each post
        const postsWithTags = await Promise.all(
          postData.map(async (post) => {
            const tags = await fetchTagNames(post.tags);
            return { ...post, tagNames: tags };
          })
        );
        const dataByUser = postsWithTags?.filter(
          (e) => e?.users == auth?.user?._id
        );
        setData(dataByUser);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchGetData();
  }, []);

  const getTagNameById = async (tagId) => {
    try {
      const response = await axios.get(
        `https://blue-sky-backend-umber.vercel.app/api/v1/tag/tags/${tagId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.status === 200 ? response.data.name : "N/A";
    } catch (error) {
      console.error("Error:", error.message);
      return "N/A";
    }
  };

  // Fetch tag names for a post
  const fetchTagNames = async (tagIds) => {
    const tagNames = await Promise.all(
      tagIds.map((tagId) => getTagNameById(tagId?._id))
    );
    return tagNames;
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://blue-sky-backend-umber.vercel.app/api/v1/post/posts/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        fetchGetData(); // Refresh data after delete
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row, index) => (
        <p>
          {index + 1}. {row.title}
        </p>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
    },
    {
      name: "Tags",
      selector: (row) => row.tagNames.join(", "), // Display fetched tag names
    },
    {
      name: "Create Date",
      selector: (row) => moment(row.createdAt).format("L"),
    },
    {
      name: "Status",
      button: true,
      cell: (row) => (
        <div className="my-3 border rounded-md px-2 py-0.5">
          {row?.status[0]?.charAt(0)?.toUpperCase() + row?.status[0]?.slice(1)}
        </div>
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} className="m-1">
              <BsThreeDotsVertical />
            </div>
            <ul className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => handleDelete(row._id)}>Delete</a>
              </li>
              <li>
                <Link to={`/dashboard/editPost/${row._id}`}>View</Link>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[1440px]">
      <div className="flex justify-between items-center m-3 ">
        <DashboardHeader title={`All Blog Post (${data?.length})`} />
        <Link to="/dashboard/addPost">
          <button className="bg-[#0077B6] gap-2 hover:bg-[#76C4EB] rounded-md px-3 text-white h-[40px] text-[14px] font-medium flex justify-normal items-center">
            Add New Blog <FiPlus className="text-white font-bold" />
          </button>
        </Link>
      </div>
      <div className="w-[1415px] mt-[7px] ml-3 border rounded-sm">
        {" "}
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
};

export default PostPageForAuthor;
