import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "../../../components/Common/DashboardHeader";

const EditCategory = ({
  categoryId,
  fetchData,
  setEditingCategoryId,
  setIsEditVisible,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel();
  };
  const [value, setValue] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `https://blue-sky-backend-umber.vercel.app/api/v1/category/categories/${categoryId}`
        );

        if (response.status === 200) {
          const categoryData = response.data;
          setValue({
            name: categoryData.name,
            slug: categoryData.slug,
            description: categoryData.description,
          });
        } else {
          console.error("Failed to fetch category data for editing");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();

    const data = {
      name: value.name,
      slug: value.slug,
      description: value.description,
    };

    try {
      const response = await axios.put(
        `https://blue-sky-backend-umber.vercel.app/api/v1/category/categories/${categoryId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        setEditingCategoryId(null);
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-[270px] bg-white mt-4 border-0 border-l">
      <div className="pl-4">
        <DashboardHeader title={"Edit Category"} />
      </div>{" "}
      <form
        className="rounded px-4 pt-6 pb-8 mb-4"
        onSubmit={handleCategoryUpdate}>
        <div className="mb-4">
          <label className="block font-normal text-[14px] mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={value.name}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block font-normal text-[14px] mb-2" htmlFor="slug">
            Slug
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="slug"
            type="text"
            value={value.slug}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, slug: e.target.value }));
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block font-normal text-[14px] mb-2" htmlFor="slug">
            Description
          </label>
          <textarea
            className="w-[238px] border-[#E1E1E1] shadow-sm appearance-none border rounded h-[120px] py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="slug"
            type="text"
            value={value.description}
            onChange={(e) => {
              setValue((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-[73px] h-[40px] rounded-[4px] border border-[#EDEDED]"
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="bg-[#76C4EB] gap-2 hover:bg-[#76C4EB] w-[149px] h-[40px] text-white text-[14px] font-medium flex justify-center rounded-[4px] focus:outline-none focus:shadow-outline items-center"
            type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
