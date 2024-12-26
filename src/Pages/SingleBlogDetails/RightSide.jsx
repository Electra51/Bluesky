import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import imgab from "../../assets/ab.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Tags from "../../components/Common/Tags";
import axios from "axios";
import img1 from "../../assets/food1.jpeg";
import img6 from "../../assets/food2.jpeg";
import img2 from "../../assets/technology.jpeg";
import img3 from "../../assets/travel1.jpeg";
import img4 from "../../assets/uiux.jpeg";
import img5 from "../../assets/img1.jpg";

const RightSide = ({ post }) => {
  const [categoryWisePosts, setCategoryWisePosts] = useState([]);
  const [tags, setTags] = useState([]);
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1016/400/300",
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1020/400/300",
    "https://picsum.photos/id/1024/400/300",
    "https://picsum.photos/id/1031/400/300",
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/tag/tags");

      if (response.status === 200) {
        setTags(response.data);
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Fetch category-wise posts from the backend
  const fetchCategoryWisePosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/post/category-wise-posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category-wise posts");
      }
      const data = await response.json();
      setCategoryWisePosts(data.data); // assuming your response is structured like { data: [...] }
      // setLoading(false);
    } catch (err) {
      // setError(err.message);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWisePosts();
  }, []);

  console.log("categoryWisePosts", categoryWisePosts);
  return (
    <div className="flex flex-col justify-end">
      <div className="flex justify-center items-start relative">
        <img src={imgab} alt="" className="absolute top-0 right-0 mx-10" />
        <div className="flex flex-col justify-center border border-violet-100 bg-violet-50 rounded-sm z-10 mx-10 align-middle items-center h-[500px] w-full">
          <div className="h-32 w-32 rounded-full">
            <img
              src={post?.users?.profileImage}
              alt=""
              className="w-full h-full object-fill rounded-full"
            />
          </div>
          <p className="text-[#ad47b6] text-[22px] font-semibold mt-5">
            {post?.users?.nickname}
          </p>
          <p className="text-gray-600 text-[15px] pl-2">
            {" "}
            @{post?.users?.name}
          </p>

          <p className="text-[15px] mt-5 px-10 text-center">
            Hi! beautiful people. I`m an authtor of this blog. Read our post
          </p>
          <p className="text-[14px] mt-4">stay with us</p>
          <div className=" mt-6">
            <div className="flex justify-normal items-center gap-2">
              <div className="h-8 w-8 rounded-full border-gray-300 bg-violet-200 flex justify-center items-center">
                <FaFacebookF />
              </div>
              <div className="h-8 w-8 rounded-full border-gray-300 bg-violet-200 flex justify-center items-center">
                <FaInstagram />
              </div>
              <div className="h-8 w-8 rounded-full border-gray-300 bg-violet-200 flex justify-center items-center">
                <FaTwitter />
              </div>
              <div className="h-8 w-8 rounded-full border-gray-300 bg-violet-200 flex justify-center items-center">
                <FaLinkedinIn />
              </div>
              <div className="h-8 w-8 rounded-full border-gray-300 bg-violet-200 flex justify-center items-center">
                <FaPinterestP />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-10">
        <div className="flex flex-col border border-violet-100 rounded-sm mx-10 z-10">
          <p className="px-4 pt-4 font-medium">Category</p>
          <div className="p-4 space-y-5">
            {categoryWisePosts?.map((e, i) => {
              return (
                <div className="flex justify-between items-center">
                  <p className="flex justify-normal items-center gap-2">
                    <FaAngleRight />
                    {e?.categoryName}
                  </p>
                  <p>{e?.CountPost}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" mt-10">
        <div className="flex flex-col border border-violet-100 rounded-sm mx-10 z-10">
          <p className="px-4 pt-4 font-medium">Instra Photos</p>
          <div className="p-4 space-y-5">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
              <Masonry gutter="10px">
                {images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: "6px",
                    }}
                    alt=""
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
      <div className=" mt-10">
        <div className="flex flex-col border border-violet-100 rounded-sm mx-10 z-10">
          <p className="px-4 pt-4 font-medium">Tags</p>
          <div className="p-4  flex flex-wrap justify-normal gap-3 items-center">
            {tags?.map((e, i) => {
              return (
                <div key={i} className="">
                  <Tags tag={e?.name} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
