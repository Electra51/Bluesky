import React from "react";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";
const ShareModal = ({ setVisible, visible, id, handleCopyLink }) => {
  return (
    <Dialog
      visible={visible}
      modal={false}
      className="bg-white p-3 shadow-md shadow-slate-300"
      style={{ width: "40vw" }}
      onHide={() => setVisible(false)}>
      <IoClose onClick={() => setVisible(false)} className="cursor-pointer" />
      <div className="flex justify-between items-center py-4">
        <input
          type="text"
          readOnly
          value={`http://localhost:8080/api/v1/post/posts/${id}`} // The link to share
          className="text-[#0077B6]"
        />
        <button
          onClick={handleCopyLink}
          className="px-2 py-0.5 bg-[#0077B6] rounded-[5px] text-white">
          Copy Link
        </button>
      </div>
    </Dialog>
  );
};

export default ShareModal;
