import React from "react";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";
const ModalReact = ({ setVisible, visible, id, handleReaction }) => {
  return (
    <Dialog
      visible={visible}
      modal={false}
      className="bg-white p-3 shadow-md shadow-slate-300"
      style={{ width: "40vw" }}
      onHide={() => setVisible(false)}>
      <IoClose onClick={() => setVisible(false)} className="cursor-pointer" />
      <div className="flex justify-between items-center py-4">
        <p
          className="text-3xl cursor-pointer"
          onClick={() => handleReaction("like")}>
          👍
        </p>
        <p
          className="text-3xl cursor-pointer"
          onClick={() => handleReaction("love")}>
          💖
        </p>
        <p
          className="text-3xl cursor-pointer"
          onClick={() => handleReaction("wow")}>
          😍
        </p>
        <p
          className="text-3xl cursor-pointer"
          onClick={() => handleReaction("funny")}>
          🤣
        </p>
        <p
          className="text-3xl cursor-pointer"
          onClick={() => handleReaction("angry")}>
          😡
        </p>
      </div>
    </Dialog>
  );
};

export default ModalReact;
