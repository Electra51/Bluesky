import React from "react";
import DOMPurify from "dompurify";
const BlogDescription = ({ description }) => {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      className="px-1 text-justify py-3"
    />
  );
};

export default BlogDescription;
