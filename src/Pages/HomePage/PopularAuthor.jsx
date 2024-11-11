import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import post1 from "../../assets/recent/recent1.png";
import post2 from "../../assets/recent/recent2.png";
import post3 from "../../assets/recent/recent3.png";
const PopularAuthor = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
  return (
    <div className="bg-[#f5fff1f5] h-[500px] flex items-center justify-center">
      <div className="container">
        <Slider {...settings}>
          <div>
            <h3>
              <img src={post1} alt="" width={300} />
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              <img src={post1} alt="" width={300} />
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              <img src={post1} alt="" width={300} />
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              <img src={post1} alt="" width={300} />
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              <img src={post1} alt="" width={300} />
            </h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default PopularAuthor;
