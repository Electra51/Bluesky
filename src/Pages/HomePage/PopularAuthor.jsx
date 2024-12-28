import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

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
                  <div className=" w-40 h-40 rounded-full">
                    <img
                      src={author?.profileImage}
                      alt=""
                      width={300}
                      className="h-full w-full object-fill rounded-full"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <p>{author?.nickname}</p>
                    <p>{author?.email}</p>
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
