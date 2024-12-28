import React from "react";
import logo from "../../assets/logo.png";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="wavy flex justify-center items-end"
        style={{ letterSpacing: "14px" }}>
        <span style={{ "--i": 2, paddingRight: "5px" }}>
          <img src={logo} alt="BlueSky Logo" width={20} />
        </span>
        <span
          style={{
            "--i": 3,
          }}>
          B
        </span>
        <span
          style={{
            "--i": 4,
          }}>
          L
        </span>
        <span
          style={{
            "--i": 5,
          }}>
          U
        </span>
        <span
          style={{
            "--i": 6,
          }}>
          E
        </span>
        <span
          style={{
            "--i": 7,
          }}>
          S
        </span>
        <span
          style={{
            "--i": 8,
          }}>
          K
        </span>
        <span
          style={{
            "--i": 9,
          }}>
          {" "}
          Y
        </span>
        <span
          style={{
            "--i": 10,
          }}>
          .
        </span>
        <span
          style={{
            "--i": 11,
          }}>
          .
        </span>
        <span
          style={{
            "--i": 12,
          }}>
          .
        </span>
      </div>
    </div>
  );
};

export default Loader;
