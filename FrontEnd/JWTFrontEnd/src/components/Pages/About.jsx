// src/components/About.jsx
import React from "react";

const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("About form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h1 className="text-xl mb-2">About</h1>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default About;
