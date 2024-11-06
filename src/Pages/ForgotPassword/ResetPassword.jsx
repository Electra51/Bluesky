import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    // // Validate password and confirmation match
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    axios
      .post(`http://localhost:8080/api/v1/auth/reset-password/${id}/${token}`, {
        password,
        password2,
      })
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          alert("Password updated successfully");
          navigate("/login");
        } else {
          alert("Password update failed. Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              name="confirmPassword"
              className="form-control rounded-0"
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
