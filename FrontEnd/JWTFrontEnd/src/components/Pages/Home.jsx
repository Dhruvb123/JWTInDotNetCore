// src/components/Home.jsx
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [details, setDetails] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const res = await axios.get(
        "http://localhost:5000/api/Home/getHomeDetails"
      );
      setDetails(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, handle session expiration
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("jwtToken"); // Clear expired token
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("An error occurred:", error);
      }
      // Handle the error
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h1 className="text-xl mb-2">Home</h1>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
      <h1>{details}</h1>
    </form>
  );
};

export default Home;
