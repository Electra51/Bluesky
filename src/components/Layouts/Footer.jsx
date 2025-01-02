import React from "react";
import SocialIcon from "../Common/SocialIcon";
import Logo from "../Common/Logo";

const Footer = () => {
  const footerData = [
    {
      id: 2,
      title: "Quick Links",
      subtitle: [
        "Home",
        "Explore Blogs",
        "Write a Blogs",
        "Categories",
        "Contact Us",
        "Profile",
      ],
    },
    {
      id: 3,
      title: "Resources",
      subtitle: [
        "Writing Tips",
        "Popular Blogs",
        "How to Start Blogging",
        "FAQ",
        "Terms & Privacy",
      ],
    },
    {
      id: 1,
      title: "Features",
      subtitle: [
        "Read Blogs",
        "Write Your Blog",
        "See Best Authors",
        "Customized Profiles",
        "Subscriptions",
        "Responsive Design",
      ],
    },

    {
      id: 4,
      title: "Contact",
      subtitle: [
        "55 East Birchwood Ave.",
        " Brooklyn, New York 11201",
        "contact@selhono.com",
        "(123) 456 - 7890",
      ],
    },
  ];

  return (
    <div className="border-t border-[#ECECEC] pt-7">
      <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-[100px] max-w-[1440px] mx-auto pt-[79px] pl-[20px]">
        <div className="flex flex-col justify-start items-start lg:block">
          <Logo />
          <h3 className="text-[#565656] text-[14px] mt-[26px] w-[333px] text-center lg:text-justify tracking-[1px]">
            Join our bluesky community to share your thoughts, explore inspiring
            stories, and discover a world of ideas.
          </h3>
          <p className="mt-4 text-[14px] text-[#565656] tracking-[1px]">
            Stay connected with us on
          </p>
          <SocialIcon />
        </div>

        <div className="grid grid-cols-2 -mt-3 lg:mt-0 lg:flex gap-[50px] lg:gap-[80px]">
          {footerData.map((section) => (
            <div
              key={section.id}
              className={`${
                section.title === "Contact"
                  ? "w-[364px] sm:col-span-2 sm:mx-auto"
                  : "text-center lg:text-start"
              }`}>
              <h1 className="font-medium text-[16px] mt-1 text-nowrap">
                {section.title}
              </h1>
              <div className="leading-[30px] mt-[25px] font-normal text-[14px] text-[#565656] tracking-[1px] text-nowrap">
                {section.subtitle.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-[#A4A4A4] text-[14px] mt-[29px] lg:mt-[69px] border-t border-[#F4F4F4] pt-[15px] pb-6 text-center max-w-[1200px] mx-auto">
        Copyright © 2024 safayet
      </h3>
    </div>
  );
};

export default Footer;
