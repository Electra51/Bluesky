import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <h1 className=" text-[400px] font-bold text-center mt-48">404</h1>
      <p className="text-center">Page Not Found</p>
      <div className="flex justify-center items-center mt-3">
        {" "}
        <button className="rounded-[4px] bg-black text-white px-10 py-1">
          Go back home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
