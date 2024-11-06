import React from "react";
import { Link } from "react-router-dom";

const AuthInstruction = ({ title, link, route_name }) => {
  return (
    <p className="text-[14px] text-gray-500 mt-4">
      {title}
      <Link to={link} className="text-blue-600 hover:underline">
        {" "}
        {route_name}
      </Link>
    </p>
  );
};

export default AuthInstruction;
