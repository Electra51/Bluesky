import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const InstraPhoto = () => {
  const images = [
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1016/400/300",
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1020/400/300",
    "https://picsum.photos/id/1024/400/300",
    "https://picsum.photos/id/1031/400/300",
  ];
  return (
    <div className="container">
      <h2 className="text-[25px] font-semibold text-center lg:text-left mb-7">
        Trending Blogs
      </h2>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              style={{ width: "100%", display: "block" }}
              alt=""
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default InstraPhoto;
