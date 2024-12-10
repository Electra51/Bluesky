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
          `http://localhost:8080/api/v1/auth/users/authors`
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
  console.log("authors", authors);
  return (
    <div className="bg-[#f5fff1f5] h-[500px] flex items-center justify-center">
      <div className="container">
        <Slider {...settings}>
          {authors.map((author, index) => {
            return (
              <div>
                <div className="px-3 flex flex-col justify-center items-center">
                  <div className=" w-48 h-48 rounded-full">
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
