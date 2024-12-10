import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../components/Common/DashboardHeader";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import DataTable from "react-data-table-component";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAuthors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/auth/users/authors`
        );

        if (response?.data?.success && response?.data?.authors) {
          const authorsWithIndex = response?.data?.authors?.map(
            (author, i) => ({
              ...author,
              index: i + 1, // Add a 1-based index
              verified: author.isVerified || false, // Add verified field
            })
          );

          setAuthors(authorsWithIndex);
        } else {
          setError("Failed to fetch authors");
        }
      } catch (error) {
        setError(error.message || "Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAuthors();
  }, []);

  if (loading) {
    return <p>Loading authors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleVerify = async (authorId, index) => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/v1/auth/author/verify`,
        {
          authorId,
        }
      );

      if (res.data.success) {
        const updatedAuthors = [...authors];
        updatedAuthors[index].verified = true; // Mark as verified
        setAuthors(updatedAuthors);

        // Show success toast
        toast.success("Author verified successfully.");
      }
    } catch (err) {
      console.error("Verification failed", err);
      setError("Failed to verify author.");
      toast.error("Verification failed.");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <p>
          {row.index}. {row.nickname}
        </p>
      ),
    },
    {
      name: "Username",
      selector: (row) => <>@{row.name}</>,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Entry Time",
      selector: (row) => moment(row.createdAt).format("lll"),
    },

    {
      name: "Actions",
      button: true,
      cell: (row, index) => (
        <div className="h-7 flex justify-normal items-center ">
          {!row.verified ? (
            <button
              onClick={() => handleVerify(row._id, index)}
              className="cursor-pointer text-[13px] text-black border border-green-200 rounded-md py-1 px-2">
              Verify
            </button>
          ) : (
            <button className="cursor-pointer text-[13px] text-green-800 flex justify-center items-center gap-0.5 bg-green-200 rounded-md py-1 px-2">
              Verified <IoMdCheckmarkCircleOutline className="text-green-800" />
            </button>
          )}
          <button className="cursor-pointer text-[13px] text-gray-500 rounded-[5px]">
            <IoClose />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[1440px]">
      <div className="flex justify-between items-center m-3 ">
        <DashboardHeader title={`All Author Lists (${authors?.length})`} />
      </div>

      <div className="w-[1415px] mt-[7px] ml-3 border rounded-sm">
        <DataTable columns={columns} data={authors} pagination />
      </div>
    </div>
  );
};

export default AuthorList;
