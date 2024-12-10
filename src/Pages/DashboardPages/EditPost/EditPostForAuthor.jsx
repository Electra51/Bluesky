import React, { useMemo, useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForAuthor = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef();
  const { id } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFeaturedImage(acceptedFiles[0]),
  });

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
              ],
            },
          ],
        ],
        handlers: {
          image: async () => {
            const editor = quillRef.current.getEditor();
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              if (file && /^image\//.test(file.type)) {
                const formData = new FormData();
                formData.append("image", file);
                try {
                  const response = await axios.post(
                    "http://localhost:8080/api/v1/post/upload-image",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                  );
                  const imageUrl = response.data.url;
                  editor.insertEmbed(editor.getSelection(), "image", imageUrl);
                } catch (error) {
                  console.error("Error uploading image:", error);
                }
              }
            };
          },
        },
      },
    }),
    []
  );

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/categories"
      );
      if (response.status === 200) setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/tag/tags");
      if (response.status === 200) setAllTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleBlogPost = async () => {
    try {
      let imageUrl = featuredImage;

      // Check if featuredImage is a file and needs to be uploaded
      if (featuredImage && typeof featuredImage !== "string") {
        const formData = new FormData();
        formData.append("image", featuredImage);
        const response = await axios.post(
          "http://localhost:8080/api/v1/post/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = response.data.url;
      }

      const blogPostData = {
        title,
        description: value,
        featuredImage: imageUrl,
        category: selectedCategory,
        tags,
      };

      // Use PUT request to update the post
      await axios.put(
        `http://localhost:8080/api/v1/post/posts/${id}`,
        blogPostData
      );

      // Reset the form fields
      setTitle("");
      setValue("");
      setFeaturedImage(null);
      setSelectedCategory();
      setTags([]);

      // Navigate back to the post list or another page
      navigate("/dashboard/post");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts/${id}`
      );

      if (response.status === 200) {
        const postData = response.data.post;
        setTitle(postData.title);
        setValue(postData.description);
        setFeaturedImage(postData.featuredImage);
        setSelectedCategory(postData.category._id);
        setTags(postData?.tags?.map((tag) => tag?._id));
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

  return (
    <div className="grid grid-cols-3 gap-4 w-[1440px]">
      <div className="col-span-2 bg-white m-3 border-0 border-b">
        <DashboardHeader title={"View Post"} />
        <div className="mt-[7px] border border-gray-100 rounded-md p-4">
          <div className="flex flex-col">
            <label className="text-[14px] font-normal mb-[10px]">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#E1E1E1] rounded-[4px] px-2 h-[40px]"
            />
          </div>
          <div className="flex flex-col mt-[18px]">
            <label className="text-[14px] font-normal mb-[10px]">
              Post Description
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              placeholder="Write something..."
              bounds=".ql-editor"
              ref={quillRef}
            />
          </div>
          <div className="my-5">
            <p className="text-[14px] font-normal mb-[10px] mt-5">
              Featured Image
            </p>
            <div
              {...getRootProps()}
              className="flex justify-normal items-center gap-[18px] mt-1">
              <div className="w-[383px] h-[222px] border border-dashed rounded-md flex flex-col justify-center items-center">
                <input {...getInputProps()} />
                <MdOutlineFileUpload className="text-xl text-[#76c4eb] mt-1" />
                <p className="mt-[16px] mb-[3px]">
                  Drag & Drop or <span className="text-[#76c4eb]">Choose</span>{" "}
                  image to upload
                </p>
                <p className="text-[#5F5F5F] text-[14px] font-normal">
                  Supported formats: PNG, JPG, JPEG
                </p>
              </div>
              {featuredImage && (
                <div className="w-[383px] h-[222px] bg-[#F4F8FA] flex justify-center items-center rounded-[4px]">
                  <img
                    src={
                      typeof featuredImage === "string"
                        ? featuredImage
                        : URL.createObjectURL(featuredImage)
                    }
                    alt="Featured"
                    width={97}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[270px] bg-white mt-4 border-0 border-l pl-4">
        <div className="border border-gray-100 rounded-md p-3">
          <h3 className="text-[15px] font-semibold my-3">Categories</h3>
          <div className="flex flex-col">
            {categories?.map((category, i) => (
              <label key={i} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === category._id}
                  onChange={() => setSelectedCategory(category._id)}
                  className="mr-2"
                />
                {category.name}
              </label>
            ))}
          </div>
          <h3 className="text-[15px] font-semibold my-3">Tags</h3>
          <Select
            options={allTags.map((tag) => ({
              label: tag.name,
              value: tag._id,
            }))}
            value={allTags
              .filter((tag) => tags.includes(tag._id))
              .map((tag) => ({
                label: tag.name,
                value: tag._id,
              }))}
            isMulti
            onChange={(selectedTags) =>
              setTags(selectedTags.map((tag) => tag.value))
            }
          />
          {/* <button
            onClick={handleBlogPost}
            className="w-full bg-blue-500 text-white mt-3 rounded p-2">
            Update Post
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default EditPostForAuthor;
