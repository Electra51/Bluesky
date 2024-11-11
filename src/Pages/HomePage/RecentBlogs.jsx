import React from "react";
import post1 from "../../assets/recent/recent1.png";
import post2 from "../../assets/recent/recent2.png";
import post3 from "../../assets/recent/recent3.png";
import SectionHeader from "../../components/Common/SectionHeader";

const RecentBlogs = () => {
  const recent_post = [
    {
      id: 1,
      featuredImage: post1,
      category: "Technology",
      title: "The Future of Artificial Intelligence",
      description:
        "Exploring the latest advancements in AI and how they shape our future.",
      date: "2024-10-15",
      tag: ["AI", "Machine Learning", "Innovation", "Future", "Tech Trends"],
      likes: 150,
      comments: 75,
      shares: 30,
      authors: {
        name: "Alice Smith",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-15",
      },
    },
    {
      id: 2,
      featuredImage: post2,
      category: "Health & Wellness",
      title: "Top 10 Benefits of a Plant-Based Diet",
      description:
        "Discover the health benefits of plant-based eating and how to start today.",
      date: "2024-10-12",
      tag: ["Health", "Wellness", "Diet", "Nutrition", "Lifestyle"],
      likes: 220,
      comments: 40,
      shares: 65,
      authors: {
        name: "Mark Lee",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-12",
      },
    },
    {
      id: 3,
      featuredImage: post3,
      category: "Travel",
      title: "Exploring Hidden Gems in Europe",
      description:
        "A guide to uncovering Europe’s best-kept secrets for adventurous travelers.",
      date: "2024-10-08",
      tag: ["Travel", "Adventure", "Europe", "Guides", "Hidden Gems"],
      likes: 180,
      comments: 55,
      shares: 45,
      authors: {
        name: "Sarah Brown",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-08",
      },
    },
    {
      id: 4,
      featuredImage: post1,
      category: "Finance",
      title: "How to Start Investing in 2024",
      description:
        "Learn the basics of investing and tips for building a strong financial future.",
      date: "2024-10-01",
      tag: ["Finance", "Investing", "Wealth", "Money Management", "2024"],
      likes: 305,
      comments: 90,
      shares: 75,
      authors: {
        name: "David Johnson",
        image: "https://via.placeholder.com/150",
        publish_date: "2024-10-01",
      },
    },
  ];

  return (
    <div className="container">
      <SectionHeader title={"Recent Blog Posts"} />

      <div className="grid grid-cols-2 gap-16">
        <div className="border">
          <div className="card1 border">
            <div className="h-[300px] rounded">
              <img
                src={recent_post[0]?.featuredImage}
                alt=""
                className="object fit h-full w-full"
              />
            </div>
            <div className="mt-3">
              <p>
                {recent_post[0]?.authors?.name} .{" "}
                {recent_post[0]?.authors?.publish_date}
              </p>
              <p className="text-2xl">{recent_post[0]?.title}</p>
              <p>{recent_post[0]?.description}</p>
              <div className="flex flex-wrap gap-3">
                {recent_post[0]?.tag.slice(0, 2).map((tag, index) => (
                  <p
                    key={index}
                    className="text-[#333] px-2 border bg-green-400">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          {recent_post
            .filter((_, index) => index === 1 || index === 2 || index === 3)
            .map((post) => (
              <div key={post.id} className="card1 border flex gap-5">
                <div className="w-[340px] h-full rounded">
                  <img
                    src={post.featuredImage}
                    alt=""
                    className="object fit h-full w-full"
                  />
                </div>
                <div className="mt-3">
                  <p>
                    {post.authors.name} . {post.date}
                  </p>
                  <p className="text-2xl">{post.title}</p>
                  <p>{post.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {post.tag.slice(0, 2).map((tag, index) => (
                      <p
                        key={index}
                        className="text-[#333] px-2 border bg-red-400">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
