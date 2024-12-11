import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const ModatRating = ({
  setVisible,
  visible,
  id,
  handleSubmitRating,
  handleRatingChange,
  ratingValue,
}) => {
  return (
    <Dialog
      visible={visible}
      modal={false}
      className="bg-white p-3 shadow-md shadow-slate-300"
      style={{ width: "30vw" }}
      onHide={() => setVisible(false)}>
      <IoClose onClick={() => setVisible(false)} className="cursor-pointer" />
      <div className="flex justify-around items-center py-4">
        <div className="rating rating-lg rating-half">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              className={`mask mask-star-2 mask-half-${
                value % 2 === 0 ? 2 : 1
              } bg-orange-500`}
              checked={ratingValue === value}
              onChange={() => handleRatingChange(value)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmitRating}
          className="border rounded-[5px] px-2 py-0.5 text-[14px]">
          Submit
        </button>
      </div>
    </Dialog>
  );
};

export default ModatRating;
