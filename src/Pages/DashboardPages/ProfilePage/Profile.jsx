import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import userImage from "../../../assets/user.png";
import { MdOutlineEdit } from "react-icons/md";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { AiOutlineEdit } from "react-icons/ai";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Reference for the file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://blue-sky-backend-umber.vercel.app/api/v1/auth/user/${auth?.user?.email}`
        );
        setUserDetails(response.data.user);
        setEditedUserDetails(response.data.user);
      } catch (error) {
        setError(error.message || "Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.email) {
      fetchUserDetails();
    }
  }, [auth?.user?.email]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Programmatically click file input
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedUserDetails.name);
      formData.append("nickname", editedUserDetails.nickname);
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await axios.put(
        `https://blue-sky-backend-umber.vercel.app/api/v1/auth/user/update/${auth?.user?.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserDetails(response.data.user);
      setIsEditMode(false);
      setSelectedImage(null);
      setPreviewImage(null);
      window.location.reload();
    } catch (error) {
      setError(error.message || "Error updating user details");
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedUserDetails(userDetails);
    setSelectedImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="m-3">
      <DashboardHeader title={"User Details"} />
      {userDetails ? (
        <div className="max-w-[400px] my-10 px-3">
          {isEditMode ? (
            <div className="p-3  border rounded-sm">
              <div className="h-44 w-44 rounded-full relative">
                <img
                  src={previewImage || userDetails.profileImage || userImage}
                  alt="User"
                  width={150}
                  className="h-full w-full object-fill rounded-full"
                />
                <div className="absolute bottom-3 right-3">
                  <div
                    className="h-10 w-10 rounded-full flex justify-center items-center shadow-md bg-gray-600 cursor-pointer"
                    onClick={handleIconClick}>
                    <MdOutlineEdit className="text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <span className="font-semibold w-52">Display Name: </span>

                  <input
                    type="text"
                    name="nickname"
                    value={editedUserDetails.nickname || ""}
                    onChange={handleChange}
                    className="border rounded p-2"
                  />
                </div>
                <div className="mt-2">
                  <span className="font-semibold w-52">User Name: </span>
                  <span className="font-normal text-gray-600">
                    @{editedUserDetails.name}
                  </span>{" "}
                </div>
                <div className="mt-1">
                  <span className="font-semibold w-52">E-mail Address: </span>
                  <span className="font-normal text-gray-600">
                    {editedUserDetails.email}
                  </span>{" "}
                </div>
                <div className="mt-1">
                  <span className="font-semibold w-52">Join Date: </span>
                  <span className="font-normal text-gray-600">
                    {moment(userDetails.createdAt).format("ll")}
                  </span>{" "}
                </div>
              </div>

              <div>
                <button
                  className="bg-[#0077B6] gap-1 hover:bg-[#76C4EB] border border-[#0077B6] text-white text-[14px] rounded-md px-2 py-1 mt-6"
                  onClick={handleSave}>
                  Save
                </button>
                <button
                  className="border border-gray-400 text-[14px] rounded-md px-2 py-1 mt-6 ml-2"
                  onClick={handleCancel}>
                  Cancel
                </button>
              </div>

              <p className="text-[13px] mt-6">
                <span className="text-red-500"> *Note: </span>You can only edit
                your profile image & display name. Thank You!
              </p>
            </div>
          ) : (
            <div className="p-3 ">
              <div className="h-44 w-44 rounded-full">
                <img
                  src={userDetails.profileImage || userImage}
                  alt="User"
                  width={150}
                  className="h-full w-full object-fill rounded-full"
                />
              </div>
              <p className="mt-5 text-[15px]">
                <span className="font-semibold">User Name:</span>{" "}
                <span className="font-normal text-gray-600">
                  @{userDetails.name}
                </span>
              </p>
              <p className="text-[15px] mt-1">
                <span className="font-semibold">Display Name:</span>{" "}
                <span className="font-normal text-gray-600">
                  {userDetails.nickname || "N/A"}
                </span>
              </p>
              <p className="text-[15px] mt-1">
                <span className="font-semibold">Email:</span>{" "}
                <span className="font-normal text-gray-600">
                  {userDetails.email}
                </span>
              </p>
              <p className="text-[15px] mt-1">
                <span className="font-semibold">Join Date:</span>{" "}
                <span className="font-normal text-gray-600">
                  {moment(userDetails.createdAt).format("ll")}
                </span>
              </p>
              <button
                className="border border-gray-400 rounded-md px-2 py-1 mt-6 flex justify-center items-center gap-1"
                onClick={handleEditClick}>
                Edit Profile <AiOutlineEdit />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default Profile;
