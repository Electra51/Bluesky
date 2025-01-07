import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import SocialIcon from "../../components/Common/SocialIcon";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PopularAuthor = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllAuthors = async () => {
      try {
        const response = await axios.get(
          `https://blue-sky-backend-umber.vercel.app/api/v1/auth/users/authors`
        );

        if (response?.data?.success && response?.data?.authors) {
          const authorsWithIndex = response?.data?.authors?.map(
            (author, i) => ({
              ...author,
              index: i + 1, // Add a 1-based index
              verified: author.isVerified || false, // Add verified field
            })
          );

          setAuthors(authorsWithIndex);
        } else {
          setError("Failed to fetch authors");
        }
      } catch (error) {
        setError(error.message || "Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAuthors();
  }, []);
  return (
    <div className="bg-[#f5fff1f5] h-[500px] flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col justify-between mb-24">
          <h2 className="text-[25px] font-semibold text-center lg:text-center">
            Our Popular Authors
          </h2>
          <p className="text-[16px] text-gray-800 font-normal text-center lg:text-center">
            Discover the Depths of Knowledge and Inspiration in Every Post
          </p>
        </div>
        <Slider {...settings}>
          {authors.map((author, index) => {
            return (
              <div key={index}>
                <div className="px-3 flex flex-col justify-center items-center">
                  <div className="w-36 h-36 rounded-full">
                    <img
                      src={author?.profileImage}
                      alt=""
                      width={300}
                      className="h-full w-full object-fill rounded-full"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-[15px] font-semibold tracking-[1px]">
                      {author?.nickname}
                    </p>
                    <p className="text-[13px] font-normal text-gray-500">
                      {author?.email}
                    </p>
                    <div className="mt-1 flex justify-center items-center gap-2">
                      <div className="h-7 w-7 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
                        <FaFacebookF className="text-[14px] text-blue-600 group-hover:text-white" />
                      </div>
                      <div className="h-7 w-7 group hover:bg-blue-500  hover:shadow-md rounded-full border flex justify-center items-center">
                        <FaLinkedinIn className="text-[14px] text-blue-600 group-hover:text-white" />
                      </div>

                      <div className="h-7 w-7 group hover:bg-blue-500 hover:shadow-md rounded-full border flex justify-center items-center">
                        <FaXTwitter className="text-[14px] text-blue-600 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default PopularAuthor;
