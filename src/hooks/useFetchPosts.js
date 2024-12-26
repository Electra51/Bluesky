import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPosts = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          const postData = response.data.posts;

          // Fetch and set tags and user names for each post
          const postsWithDetails = await Promise.all(
            postData?.map(async (post) => {
              const tags = await fetchTagNames(post.tags);

              return { ...post, tagNames: tags };
            })
          );

          setData(postsWithDetails);
        } else {
          setError("Failed to fetch post data");
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const getTagNameById = async (tagId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tag/tags/${tagId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.status === 200 ? response.data.name : "N/A";
    } catch (err) {
      console.error("Error:", err.message);
      return "N/A";
    }
  };

  const fetchTagNames = async (tagIds) => {
    const tagNames = await Promise.all(
      tagIds?.map((tagId) => getTagNameById(tagId))
    );
    return tagNames;
  };

  return { data, loading, error };
};

export default useFetchPosts;
