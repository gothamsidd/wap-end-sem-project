import React from "react";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "#4a90e2",
      padding: "1rem 2rem",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        React Dictionary
      </div>
      <div style={{ textAlign: "right", fontSize: "0.95rem" }}>
        <div><strong>WAP END SEM PROJECT</strong></div>
        <div>by Siddharth Pareek</div>
      </div>
    </nav>
  );
}

export default Navbar;