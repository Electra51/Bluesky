import React from "react";
import { Dialog } from "primereact/dialog";
const ConfirmationModal = ({ setVisible, visible, handleLogout }) => {
  return (
    <Dialog
      header="Header"
      visible={visible}
      modal={false}
      className="bg-white p-3 shadow-md shadow-slate-300"
      style={{ width: "30vw" }}
      onHide={() => setVisible(false)}>
      <p className="text-center text-[16px] font-semibold">
        Are you want to Logout?
      </p>
      <div className="flex justify-center items-center gap-5 my-5">
        <button
          className="bg-gray-500 py-0.5 px-3 rounded-md text-white text-[14px] cursor-pointer"
          onClick={() => setVisible(false)}>
          No
        </button>
        <button
          className="bg-red-500 py-0.5 px-3 rounded-md text-white text-[14px] cursor-pointer"
          onClick={handleLogout}>
          Yes
        </button>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;

// const imgbbApiKey = "6561524504248459896c8cd554e3726f";
// const imgbbUploadEndpoint = "https://api.imgbb.com/1/upload";
