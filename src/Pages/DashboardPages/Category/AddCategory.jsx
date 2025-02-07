import axios from "axios";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { toast } from "react-toastify";

const AddCategory = ({ fetchData, onCancel }) => {
  const [value, setValue] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const handleCategoryAdd = async (e) => {
    e.preventDefault();

    const data = {
      name: value.name,
      slug: value.slug,
      description: value.description,
    };

    try {
      const response = await axios.post(
        "https://blue-sky-backend-umber.vercel.app/api/v1/category/categories",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const newCategory = response.data;

        fetchData();
        setValue({
          name: "",
          slug: "",
          description: "",
        });
        toast.success("Category Added Successfully !");
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="w-[270px] bg-white mt-4 border-0 border-l ">
      <div className="pl-4">
        <DashboardHeader title={"Add New Category"} />
      </div>
      <form
        className="rounded px-4 pt-6 pb-8 mb-4"
        onSubmit={handleCategoryAdd}>
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
        <div className="flex items-center justify-center">
          <button
            className="bg-[#76C4EB] gap-1 hover:bg-[#76C4EB] text-white text-[14px] font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline flex justify-normal items-center"
            type="submit">
            <FiPlus className="text-[#76C4EB]" /> Add New Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
