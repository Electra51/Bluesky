import React from "react";
import DOMPurify from "dompurify";
const BlogDescription = ({ description }) => {
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} className="px-1" />
  );
};

export default BlogDescription;
