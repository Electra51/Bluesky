import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import cheerio from "cheerio";
import imgIcon from "../../../assets/imageicon.png";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

const AddPost = () => {
  const [auth, setAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const quillRef = useRef();
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFeaturedImage(file);
  }, []);
  const navigate = useNavigate();
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const useId = auth?.user?._id;
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];
  const imageHandler = async () => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post(
            "https://blue-sky-backend-umber.vercel.app/api/v1/post/upload-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const imageUrl = response.data.url;
          editor.insertEmbed(editor.getSelection(), "image", imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        console.error("You could only upload images.");
      }
    };
  };
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
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const fetchDataTags = async () => {
    try {
      const response = await axios.get(
        "https://blue-sky-backend-umber.vercel.app/api/v1/tag/tags"
      );

      if (response.status === 200) {
        setAllTags(response.data);
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchDataTags();
  }, []);

  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const fetchData = async () => {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBlogPost = async () => {
    try {
      let imageUrl = "";

      // Upload featured image if it exists
      if (featuredImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", featuredImage);

        const imageUploadResponse = await axios.post(
          "https://blue-sky-backend-umber.vercel.app/api/v1/post/upload-image",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = imageUploadResponse.data.url;
      }

      // Create the blog post
      const blogPostData = {
        title,
        description: value,
        featuredImage: imageUrl,
        category: selectedCategory,
        users: useId, // Use user ID for associating the post
        tags: tags,
        status: ["Pending"],
      };

      await axios.post(
        "https://blue-sky-backend-umber.vercel.app/api/v1/post/posts",
        blogPostData
      );

      // Reset form fields
      setTitle("");
      setValue("");
      setFeaturedImage(null);
      setSelectedCategory();
      setTags([]);

      navigate("/dashboard/post");
      toast.success("Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Error creating blog post. Please try again.");
    }
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTag(selectedOptions);
  };

  const handleAddTag = () => {
    if (selectedTag) {
      setTags([...tags, ...selectedTag?.map((tag) => tag?.value)]);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 w-[1440px]">
      <div className="col-span-2 bg-white m-3 ">
        <DashboardHeader title={"Add New Post"} />
        <div className="mt-[7px] border border-gray-100 rounded-md p-4">
          <div className="flex flex-col">
            <label className="text-[14px] font-normal mb-[10px]">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border border-[#E1E1E1] rounded-[4px] h-[40px]"
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
              formats={formats}
              placeholder="Write something..."
              bounds=".ql-editor"
              ref={quillRef}
            />
          </div>
          <div className="my-5 ">
            <p className="text-[14px] font-normal mb-[10px] mt-5">
              Featured Image
            </p>
            <div
              {...getRootProps()}
              className="flex justify-normal items-center gap-[18px] mt-1">
              <div className="w-[383px] h-[222px] border border-dashed rounded-md flex flex-col justify-center items-center">
                <input {...getInputProps()} />
                <div className="h-[40px] w-[40px] rounded-full bg-[#76c4eb] flex justify-center items-center">
                  <MdOutlineFileUpload className="text-white text-xl" />
                </div>
                <p className="mt-[16px] mb-[3px]">
                  Drag & Drop or <span className="text-[#76c4eb]">Choose</span>{" "}
                  image to upload
                </p>
                <p className="text-[#5F5F5F] text-[14px] font-normal">
                  Supported formats: PNG, JPG, JPEG
                </p>
              </div>
              {featuredImage ? (
                <div className="w-[383px] h-[222px] bg-[#F4F8FA] flex justify-center items-center rounded-[4px]">
                  <img
                    src={URL.createObjectURL(featuredImage)}
                    alt="Featured"
                    width={97}
                  />
                </div>
              ) : (
                <div className="w-[383px] h-[222px] bg-[#F4F8FA] flex justify-center items-center rounded-[4px]">
                  <img src={imgIcon} alt="Featured" width={97} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[270px] bg-white mt-4 border-0 border-l pl-4">
        <div className="flex justify-normal items-center gap-5 mx-auto p-2">
          <button className="w-[113px] h-[40px] rounded-md border hover:bg-[#f34624] flex justify-center items-center gap-1">
            <RiDeleteBinLine className="text-[24px]" />
            <span className="text-[14px]">Delete </span>
          </button>
          <button
            className="w-[113px] h-[40px] rounded-md bg-[#0077B6] gap-1 hover:bg-[#76C4EB] text-white flex justify-center items-center "
            onClick={handleBlogPost}>
            <MdOutlineFileUpload className="text-[24px]" />{" "}
            <span className="text-[14px]">Publish</span>
          </button>
        </div>
        <hr className="pt-4 text-[#E9E9E9]" />
        <p className="text-[16px] font-medium pb-3 px-2">Select Categories</p>
        <div className="flex flex-col items-start px-2 gap-y-1.5">
          {categories?.map((category, i) => (
            <div className="flex justify-normal items-center gap-1" key={i}>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(category._id)}
                className="checkbox checkbox-primary w-5 h-5"
              />
              <label>{category.name}</label>
            </div>
          ))}

          <hr />
          <div className="relative mt-3">
            <label className="text-[16px] font-medium pb-3 mt-5 mb-2">
              Select Tags
            </label>
            <Select
              isMulti
              options={allTags?.map((tag) => ({
                value: tag?.name,
                label: tag?.name,
              }))}
              onChange={handleTagChange}
              className="mt-2"
            />
            <button
              className="border border-[#E1E1E1] w-[238px] rounded-[4px] h-[40px] text-[14px] text-[#76C4EB] mt-3  gap-1 hover:bg-[#0077B6]"
              onClick={handleAddTag}>
              Add
            </button>
            <div className="my-1 flex justify-normal items-center gap-2 flex-wrap">
              {tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-normal items-center gap-2 border border-[#EDEDED] px-2 py-1 m-1 rounded-[4px]">
                  <p className="text-[#5F5F5F]">{tag}</p>
                  <IoIosClose
                    onClick={() => setTags(tags?.filter((t) => t !== tag))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
