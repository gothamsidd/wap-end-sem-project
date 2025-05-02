import React from "react";
import Navbar from "./components/Navbar";
import Dictionary from "./components/Dictionary";

const App = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#eef2f5", minHeight: "100vh" }}>
      <Navbar />
      <Dictionary />
    </div>
  );
};

export default App;


