import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Card from "../../components/Common/Card";

const BlogDescription = ({ description }) => {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

const SingleBlogDetails = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (params?.id) {
      getPostById();
    }
  }, [params?.id]);

  const getPostById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/posts/${params.id}`
      );

      if (response.status === 200) {
        setPost(response.data.post);
        getSimilarProduct(
          response.data.post._id,
          response.data.post.category._id
        );
      } else {
        console.error("Failed to fetch blog post");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/post/related-post/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("relatedProducts", relatedProducts);
  return (
    <div>
      <div className="mt-[60px] text-[14px] font-medium bg-white h-[56px] flex">
        <div className="max-w-[1120px] ml-[20px] lg:ml-[387px] flex items-center gap-10">
          <Link
            to="/"
            className="flex justify-normal items-center gap-5 text-[#5F5F5F] cursor-pointer">
            <IoIosArrowBack />
            Back
          </Link>
          <div className="flex justify-normal items-center gap-2">
            {" "}
            <p className="text-[#5F5F5F]">Blogs</p>
            <span className="text-[#5F5F5F]">/</span>
            <p className="text-[#5F5F5F]">Blog Details</p>
          </div>
        </div>
      </div>
      <div className="mt-[32px] max-w-[1120px] mx-auto">
        <div className="w-[1120px] h-[569px]">
          {" "}
          <img
            src={post?.featuredImage}
            alt=""
            className="h-full w-full object-fill"
          />
        </div>

        <div className="flex justify-normal items-center gap-3 my-4">
          <p className="text-[12px] text-[#76C4EB] font-medium">
            {post?.category?.name}
          </p>
          <p className="text-[#5F5F5F] text-[12px] font-normal">
            {moment(post?.createdAt).format("LL")}
          </p>
        </div>

        <BlogDescription description={post.description} />

        <hr className="mt-10" />

        <div className="flex gap-5 justify-start items-center">
          {post?.tags?.map((e, i) => {
            return (
              <div className="bg-gray-200 rounded-[5px] px-3 py-2 my-5">
                {e.name}
              </div>
            );
          })}
        </div>
        <hr className="py-5" />
        {relatedProducts.length > 0 ? (
          <p className="text-[18px] font-semibold my-5">Releted Posts</p>
        ) : (
          ""
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] justify-start items-center mt-5 pb-10">
          {relatedProducts?.map((data, i) => {
            return <Card data={data} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
