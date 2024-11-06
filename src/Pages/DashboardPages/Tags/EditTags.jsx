import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditTags = ({
  tagId,
  fetchData,
  setEditingTagId,
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
    const fetchTagData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/tag/tags/${tagId}`
        );

        if (response.status === 200) {
          const tagData = response.data;
          console.log("tagData", tagData);
          setValue({
            name: tagData.name,
            slug: tagData.slug,
            description: tagData.description,
          });
        } else {
          console.error("Failed to fetch Tag data for editing");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchTagData();
  }, [tagId]);

  const handleTagUpdate = async (e) => {
    e.preventDefault();

    const data = {
      name: value.name,
      slug: value.slug,
      description: value.description,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/tag/tags/${tagId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("tag updated successfully");
        fetchData();
        setEditingTagId(null);
      } else {
        console.error("Failed to update tag");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-[270px] h-[846px] bg-white">
      <p className="text-[16px] font-medium px-4 pt-4">Edit Category</p>
      <form className="rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleTagUpdate}>
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

export default EditTags;
