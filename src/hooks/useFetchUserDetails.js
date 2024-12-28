import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUserDetails = (email) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://blue-sky-backend-umber.vercel.app/api/v1/auth/user/${email}`
        );
        setUserDetails(response.data.user);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, [email]);

  return { userDetails, loading, error };
};

export default useFetchUserDetails;
