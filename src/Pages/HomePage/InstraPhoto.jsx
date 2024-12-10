import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import img1 from "../../assets/food1.jpeg";
import img6 from "../../assets/food2.jpeg";
import img2 from "../../assets/technology.jpeg";
import img3 from "../../assets/travel1.jpeg";
import img4 from "../../assets/uiux.jpeg";
import img5 from "../../assets/img1.jpg";
const InstraPhoto = () => {
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
  return (
    <div className="container pb-20">
      <h2 className="text-[25px] font-semibold text-center lg:text-left mb-7">
        Insta Gallarys
      </h2>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
        <Masonry gutter="10px">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              style={{ width: "100%", display: "block", borderRadius: "10px" }}
              alt=""
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default InstraPhoto;
