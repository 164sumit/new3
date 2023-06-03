import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const FloatingPlusButton = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <Link to="/admin/product" style={{ textDecoration: "none", color: "tomato" }}>
        <div
          style={{
            width: "120px",
            height: "40px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            gap: "8px",
          }}
        >
          <FaPlus size={20} />
          <span style={{ fontWeight: "bold" }}>SELL</span>
        </div>
      </Link>
    </div>
  );
};

export default FloatingPlusButton;
