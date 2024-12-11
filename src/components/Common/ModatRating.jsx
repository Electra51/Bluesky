import React from "react";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
const ModatRating = ({ setVisible, visible, id, handleReaction }) => {
  return (
    <Dialog
      visible={visible}
      modal={false}
      className="bg-white p-3 shadow-md shadow-slate-300"
      style={{ width: "30vw" }}
      onHide={() => setVisible(false)}>
      <IoClose onClick={() => setVisible(false)} className="cursor-pointer" />
      <div className="flex justify-center items-center py-4">
        <div className="rating rating-lg rating-half">
          <input type="radio" name="rating-10" className="rating-hidden" />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-orange-500"
            defaultChecked
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-orange-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-orange-500"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ModatRating;
