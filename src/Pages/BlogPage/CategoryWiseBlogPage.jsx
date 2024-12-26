import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Tags from "../../components/Common/Tags";
import moment from "moment";

const CategoryWiseBlogPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate(); // For navigation
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryWisePosts, setCategoryWisePosts] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
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
    fetchCategories();
  }, []);

  // Fetch category-wise posts
  const fetchCategoryWisePosts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/v1/post/category-wise-posts/${categoryId}`;
      if (categoryId == "All") {
        url = "http://localhost:8080/api/v1/post/posts";
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch category-wise posts");
      }

      const data = await response.json();
      setCategoryWisePosts(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWisePosts();
  }, [categoryId]); // Trigger when categoryId changes

  // Handle category button click
  const handleCategoryClick = (categoryId) => {
    navigate(`/blog/${categoryId}`); // Update the route dynamically
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-5 justify-normal items-start">
        {/* Sidebar with Categories */}
        <div className="mt-7">
          <p className="py-2 font-medium">Categories:</p>
          <div className="mt-3 flex flex-col justify-normal items-start space-y-3">
            <button
              className={`category-list ${
                categoryId === "All" ? "font-bold text-purple-600" : ""
              }`}
              onClick={() => handleCategoryClick("All")}>
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-list ${
                  categoryId === category._id ? "font-bold text-purple-600" : ""
                }`}
                onClick={() => handleCategoryClick(category._id)}>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="col-span-3 gap-12 mt-7">
          {loading ? (
            "Loading..."
          ) : error ? (
            <p>Error loading posts: {error}</p>
          ) : !categoryWisePosts.length ? (
            "No posts found"
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {categoryWisePosts.map((post) => (
                <Link to={`/details/${post?._id}`} key={post._id}>
                  <div className="border rounded-[6px] flex flex-col gap-5">
                    <div className="w-full h-[260px] rounded-t-[6px]">
                      <img
                        src={post?.featuredImage}
                        alt=""
                        className="object fit h-full w-full rounded-t-[6px]"
                      />
                    </div>
                    <div className="mt-2 px-4">
                      <p className="text-[#ad47b6] text-[15px] flex justify-normal items-center">
                        {post?.users?.nickname}
                        {moment(post?.createdAt).format("lll")}
                      </p>
                      <p className="text-[18px] font-medium text-black mt-2">
                        {post?.title?.slice(0, 30).replace(/<[^>]*>/g, "") +
                          "..."}
                      </p>
                      <p className="text-[16px] text-gray-600 mt-2">
                        {post?.description
                          ?.slice(0, 120)
                          .replace(/<[^>]*>/g, "") + "..."}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 pb-3">
                        {post?.tagNames?.slice(0, 2)?.map((tag, index) => (
                          <Tags tag={tag} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseBlogPage;
