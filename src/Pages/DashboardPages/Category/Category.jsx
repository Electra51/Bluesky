import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import Loader from "../../../components/Common/Loader";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Category name",
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
    setLoading(true);
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/category/categories"
      );

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://blue-sky-backend-umber.vercel.app/api/v1/category/categories/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEdit = (id) => {
    setEditingCategoryId(id);
    setIsEditVisible(true);
  };

  const handleEditCancel = () => {
    setEditingCategoryId(null);
    setIsEditVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-[1440px]">
      <>
        {loading ? (
          <div className="col-span-2 bg-white m-3 rounded-md">
            {" "}
            <Loader />
          </div>
        ) : (
          <div className="col-span-2 bg-white m-3 rounded-md">
            <DashboardHeader title={"All Categories"} />

            <div className="mt-[7px] border rounded-sm">
              <DataTable
                columns={columns}
                data={categories}
                pagination
                conditionalRowStyles={[
                  {
                    when: (row) => row._id === editingCategoryId,
                    style: { backgroundColor: "#76C4EB" },
                  },
                ]}
              />
            </div>
          </div>
        )}
      </>

      {isEditVisible ? (
        <EditCategory
          categoryId={editingCategoryId}
          fetchData={fetchData}
          onCancel={handleEditCancel}
        />
      ) : (
        <AddCategory fetchData={fetchData} onCancel={handleEditCancel} />
      )}
    </div>
  );
};

export default Category;
