import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddTags from "./AddTags";
import EditTags from "./EditTags";
import DashboardHeader from "../../../components/Common/DashboardHeader";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);

  const columns = [
    {
      name: "Tag name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
                <a onClick={() => handleEdit(row._id)}>Edit</a>
              </li>
              <li>
                <a onClick={() => handleDelete(row._id)}>Delete</a>
              </li>
              <li>
                <a onClick={() => handleEdit(row._id)}>View</a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/tag/tags"
      );

      if (response.status === 200) {
        setTags(response.data);
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://blue-sky-backend-umber.vercel.app/api/v1/tag/tags/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Failed to delete Tag");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEdit = (id) => {
    setEditingTagId(id);
    setIsEditVisible(true);
  };

  const handleEditCancel = () => {
    setEditingTagId(null);
    setIsEditVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-[1440px]">
      <div className="col-span-2 bg-white m-3 rounded-md">
        <DashboardHeader title={"All Tags"} />

        <div className="mt-[7px] border rounded-sm">
          <DataTable
            columns={columns}
            data={tags}
            pagination
            conditionalRowStyles={[
              {
                when: (row) => row._id === editingTagId,
                style: { backgroundColor: "#76C4EB" },
              },
            ]}
          />
        </div>
      </div>

      {isEditVisible ? (
        <EditTags
          tagId={editingTagId}
          fetchData={fetchData}
          onCancel={handleEditCancel}
        />
      ) : (
        <AddTags fetchData={fetchData} onCancel={handleEditCancel} />
      )}
    </div>
  );
};

export default Tags;
