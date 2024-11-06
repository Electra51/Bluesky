import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [tagNames, setTagNames] = useState([]);
  const [data, setData] = useState();
  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts`
      );

      if (response.status === 200) {
        const PostData = response.data;
        setData(PostData.posts);
        console.log("postData", PostData.posts);
      } else {
        console.error("Failed to fetch category data for editing");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);

  const getTagNameById = async (tagId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tag/tags/${tagId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data.name;
      } else {
        console.error("Failed to fetch tag");
        return "N/A";
      }
    } catch (error) {
      console.error("Error:", error.message);
      return "N/A";
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/post/posts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Category deleted successfully");
        fetchPostData();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to fetch tag names for a post
  const fetchTagNames = async (tagIds) => {
    const tagNames = await Promise.all(
      tagIds.map(async (tagId) => await getTagNameById(tagId))
    );
    setTagNames(tagNames);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
    },
    {
      name: "Tags",
      selector: (row) => {
        useEffect(() => {
          fetchTagNames(row.tags || []);
        }, [row.tags]);
        return tagNames.join(", ");
      },
    },
    {
      name: "Create Date",
      selector: (row) => moment(row.createdAt).format("l"),
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
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a onClick={() => handleDelete(row._id)}>Delete</a>
              </li>
              <li>
                <a>View</a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pt-[56px] px-[56px] ">
        <h2>All Post</h2>
        <Link to="/dashboard/addPost">
          <button className="bg-[#76C4EB] rounded-[4px] px-3 text-white py-1 text-[14px] font-medium">
            Add New Post
          </button>
        </Link>
      </div>
      <div className="px-[56px] mt-[10px] w-[1400px]">
        {" "}
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
};

export default PostPage;
