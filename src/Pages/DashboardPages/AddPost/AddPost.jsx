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
import { toast } from "react-toastify";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const quillRef = useRef();
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFeaturedImage(file);
  }, []);

  console.log("featuredImage", featuredImage);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        console.log("first", file);

        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/post/upload-image",
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
      const response = await axios.get("http://localhost:8080/api/v1/tag/tags");

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
  const handleNewCategoryClick = () => {
    setShowNewCategoryInput(true);
  };

  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const handleCategoryAdd = async (e) => {
    e.preventDefault();

    const data = {
      name: inputValue.name,
      slug: inputValue.name,
      description: inputValue.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/category/categories",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const newCategory = response.data;
        console.log(newCategory);
        fetchData();
        setInputValue({
          name: "",
          slug: "",
          description: "",
        });
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/categories"
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

  console.log("title", title, "value", value, "feat ", featuredImage);

  const handleBlogPost = async () => {
    try {
      let imageUrl = "";

      if (featuredImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", featuredImage);

        const imageUploadResponse = await axios.post(
          "http://localhost:8080/api/v1/post/upload-image",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = imageUploadResponse.data.url;
      }

      // Now, create the blog post
      const blogPostData = {
        title,
        description: value,
        featuredImage: imageUrl,
        category: selectedCategory,
        tags: tags,
      };
      console.log("blogpostdata", blogPostData);
      await axios.post("http://localhost:8080/api/v1/post/posts", blogPostData);

      setTitle("");
      setValue("");
      setFeaturedImage(null);
      setSelectedCategory();
      setTags([]);

      console.log("Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };
  const handleTagChange = (selectedOptions) => {
    setSelectedTag(selectedOptions);
  };

  const handleAddTag = () => {
    if (selectedTag) {
      setTags([...tags, ...selectedTag.map((tag) => tag.value)]);
    }
  };
  return (
    <div className="flex justify-normal items-center gap-24">
      <div className="w-[822px] bg-white m-[32px] rounded-[4px] p-[16px]">
        {" "}
        <h2 className="text-[16px] font-semibold">Add New post</h2>
        <div className="flex flex-col mt-[24px]">
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
        <div className="flex flex-col mt-[16px]">
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
          <p className="text-[14px] font-normal mb-[10px]">Featured Image</p>
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

      <div className="w-[270px] h-[746px] bg-white mt-4">
        <div className="flex justify-normal items-center gap-5 mx-auto p-2">
          <button className="w-[113px] h-[40px] rounded-[4px] border  flex justify-center items-center gap-1">
            <RiDeleteBinLine className="text-[24px]" />
            <span className="text-[14px]">Delete </span>
          </button>
          <button
            className="w-[113px] h-[40px] rounded-[4px] bg-[#76C4EB] flex justify-center items-center gap-1"
            onClick={handleBlogPost}>
            <MdOutlineFileUpload className="text-[24px]" />{" "}
            <span className="text-[14px]">Publish</span>
          </button>
        </div>
        <hr className="pt-4 text-[#E9E9E9]" />
        <p className="text-[16px] font-medium pb-3 px-2">All Categories</p>
        <div className="flex flex-col items-start px-2 gap-y-1.5">
          {categories?.map((category, i) => (
            <label key={i}>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(category._id)}
              />
              {category.name}
            </label>
          ))}
          {showNewCategoryInput ? (
            <form onSubmit={handleCategoryAdd}>
              <input
                type="text"
                value={inputValue.name}
                onChange={(e) => {
                  setInputValue((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                className="border border-[#E1E1E1] w-[238px] rounded-[4px] h-[40px]"
              />
              <div className="flex justify-normal items-center gap-5">
                <button
                  className="border border-[#EDEDED] w-[87px] rounded-[4px] h-[40px] mt-4 text-[14px] text-[#5F5F5F]"
                  onClick={() => setShowNewCategoryInput(false)}>
                  Cancel
                </button>
                <button
                  className="border border-[#E1E1E1] w-[135px] rounded-[4px] h-[40px] mt-4 text-[14px] text-[#76C4EB]"
                  type="submit">
                  {" "}
                  Add
                </button>
              </div>
            </form>
          ) : (
            <p
              className="text-[14px] text-[#76C4EB] cursor-pointer"
              onClick={handleNewCategoryClick}>
              + Add New Category
            </p>
          )}
          <hr />
          <div className="relative">
            <label>Tags</label>
            <Select
              isMulti
              options={allTags?.map((tag) => ({
                value: tag?.name,
                label: tag?.name,
              }))}
              onChange={handleTagChange}
            />
            <button
              className="border border-[#E1E1E1] w-[238px] rounded-[4px] h-[40px] text-[14px] text-[#76C4EB] mt-3"
              onClick={handleAddTag}>
              Add
            </button>
            <div className="my-1 flex justify-normal items-center gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-normal items-center gap-2 border border-[#EDEDED] px-2 py-1 m-1 rounded-[4px]">
                  <p className="text-[#5F5F5F]">{tag}</p>
                  <IoIosClose
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
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
